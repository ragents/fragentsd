// Licensed under the Apache License. See footer for details.

var ragents = require("ragents")

exports.create   = create
exports.list     = list
exports.onUpdate = onUpdate

var States = {
  notConnected: "not connected",
  connecting:   "connecting",
  connected:    "connected"
}

var Sessions        = []
var OnUpdateHandler = null

//------------------------------------------------------------------------------
function initialize() {
  restoreSessions()
}

//------------------------------------------------------------------------------
function onUpdate(onUpdateHandler) {
  OnUpdateHandler = onUpdateHandler
}

//------------------------------------------------------------------------------
function updated() {
  if (!OnUpdateHandler) return
  OnUpdateHandler()
}


//------------------------------------------------------------------------------
function create(config) {
  for (var i=0; i<Sessions.length; i++) {
    if (Sessions[i].url != config.url) continue
    if (Sessions[i].key != config.key) continue

    return Sessions[i]
  }

  var session = new Session(config)
  Sessions.push(session)
  saveSessions()

  return session
}

//------------------------------------------------------------------------------
function list() {
  return Sessions
}

//------------------------------------------------------------------------------
function saveSessions() {
  var savedSessions = Sessions.map(function(session) {
    return {
      url:  session.url,
      key:  session.key,
      name: session.name
    }
  })

  savedSessions = JSON.stringify(savedSessions, null, 2)
  localStorage.fragents_sessions = savedSessions
}

//------------------------------------------------------------------------------
function restoreSessions() {
  var savedSessions = localStorage.fragents_sessions
  if (!savedSessions) return

  savedSessions = JSON.parse(savedSessions)

  savedSessions.forEach(function(sessionConfig){
    create(sessionConfig)
  })

  updated()
}

//------------------------------------------------------------------------------
function Session(config) {
  this.url  = config.url
  this.key  = config.key
  this.name = config.name || "unnamed"

  this.ragents = []
  this.state   = States.notConnected

  this.connect()
}

Session.prototype.connect    = Session_connect
Session.prototype.disconnect = Session_disconnect
Session.prototype.del        = Session_del
Session.prototype.ragents    = Session_ragents
Session.prototype._addRagent = Session__addRagent
Session.prototype._delRagent = Session__delRagent

//------------------------------------------------------------------------------
function Session_connect() {
  this.state = States.connecting

  var session = this
  var config = { url: this.url, key: this.key }

  ragents.createSession(config, sessionCreated)

  //-----------------------------------
  function sessionCreated(err, rSession) {
    if (err) {
      session.state = States.notConnected
      console.log("error during session creation: " + err)
      updated()
      return
    }

    session.rSession = rSession
    session.state    = States.connected
    updated()

    rSession.on("ragentCreated",   ragentCreated)
    rSession.on("ragentDestroyed", ragentDestroyed)
    rSession.getRemoteAgents(gotRemoteAgents)
  }

  //-----------------------------------
  function ragentCreated(ragent) {
    session._addRagent(ragent)
  }

  //-----------------------------------
  function ragentDestroyed(ragent) {
    session._delRagent(ragent)
  }

  //-----------------------------------
  function gotRemoteAgents(err, ragents) {
    if (err) return

    ragents.forEach(function(ragent){
      session._addRagent(ragent)
    })
  }
}

//------------------------------------------------------------------------------
function Session_del() {
  this.disconnect()

  var index = -1
  for (var i=0; i<Sessions.length; i++) {
    if (Sessions[i].url != this.url) continue
    if (Sessions[i].key != this.key) continue

    index = i
    break
  }

  if (index == -1) return

  Sessions.splice(index, 1)
  saveSessions()
  updated()
}

//------------------------------------------------------------------------------
function Session_disconnect() {
  this.rSession.close()
}

//------------------------------------------------------------------------------
function Session_ragents() {
  return this.ragents
}

//------------------------------------------------------------------------------
function Session__addRagent(ragent) {
  for (var i=0; i<this.ragents.length; i++) {
    if (this.ragents[i].info.id == ragent.info.id) {
      return
    }
  }

  this.ragents.push(ragent)
  updated()
}

//------------------------------------------------------------------------------
function Session__delRagent(ragent) {
  var index = -1

  for (var i=0; i<this.ragents.length; i++) {
    if (this.ragents[i].info.id == ragent.info.id) {
      index = i
      break
    }
  }

  if (index == -1) return

  this.ragents.splice(index, 1)
  updated()
}

//------------------------------------------------------------------------------
initialize()

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
