// Licensed under the Apache License. See footer for details.

//------------------------------------------------------------------------------
// packages/modules we're using
//------------------------------------------------------------------------------
var fs   = require("fs")
var path = require("path")

var hapi          = require("hapi")
var cfenv         = require("cfenv")
var ragents       = require("ragents")
var ragentsServer = require("ragents-server")

var pkg   = require("../package.json")
var views = require("./views")

//------------------------------------------------------------------------------
process.on("exit", function(code) {
  console.log("exiting: code: " + code)
})

process.on("uncaughtException", function(err) {
  console.log("uncaught exception: " + err.stack)
  process.exit(1)
})

//------------------------------------------------------------------------------
var wwwDir = path.join(__dirname, "..", "www")
var ragentsBrowserDir = path.join(__dirname, "..", "node_modules", "ragents", "www")

var appEnv = cfenv.getAppEnv()

var server = new hapi.Server()
server.connection({host: appEnv.bind, port: appEnv.port})

server.route({ method: "GET",   path: "/index.html",   handler: get_index_html })
server.route({ method: "GET",   path: "/",             handler: get_index_html })
for (var i=0; i<views.length; i++) {
  server.route({ method: "GET", path: "/" + views[i],  handler: get_index_html })
}

server.route({
  method:  "GET",
  path:    "/{param*}",
  handler: { directory: { path: wwwDir } }
})

server.route({
  method:  "GET",
  path:    "/browser/{param*}",
  handler: { directory: { path: ragentsBrowserDir } }
})

server.route({
  method:  "GET",
  path:    "/api/something/{parm}",
  handler: api_something
})

console.log("http server starting on: " + appEnv.url)
server.start(function() {
  console.log("http server started  on: " + appEnv.url)

  var rServer = ragentsServer.createServer({httpServer: server.listener})
  rServer.start()

  console.log("ragents server started")
})

//------------------------------------------------------------------------------
function get_index_html(request, reply) {
  var content = get_index_html.content
  if (!content) {
    content = getVersioned_index_html()
    get_index_html.content = content
  }

  var response = reply(content)
  response.type("text/html")
}

//------------------------------------------------------------------------------
function getVersioned_index_html() {
  iFile = path.join(wwwDir, "index.html")
  content = fs.readFileSync(iFile, "utf8")
  content = content.replace(/v\?\.\?\.\?/, "v" + pkg.version)

  return content
}

//------------------------------------------------------------------------------
function api_something(request, reply) {
  var parm = request.params.parm
  reply({parm: parm})
}

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
