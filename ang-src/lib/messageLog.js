// Licensed under the Apache License. See footer for details.

exports.create = create

//------------------------------------------------------------------------------
function create() {
  return new MessageLog()
}

//------------------------------------------------------------------------------
function MessageLog() {
  this.messages = []
}

MessageLog.prototype.getMessages = Messages_messages
MessageLog.prototype.clear       = Messages_clear
MessageLog.prototype.log         = Messages_log

//------------------------------------------------------------------------------
function Messages_messages() {
  return this.messages
}

//------------------------------------------------------------------------------
function Messages_clear() {
  this.messages.splice(0, this.messages.length)
}

//------------------------------------------------------------------------------
function Messages_log(message) {
  this.messages.push(getTime() + " - " + message)
}

//------------------------------------------------------------------------------
function getTime() {
  var d = new Date()

  return "" +
    right2(d.getHours()) + ":" +
    right2(d.getMinutes()) + ":" +
    right2(d.getSeconds())
}

//------------------------------------------------------------------------------
function right2(s) {
  s = "" + s
  if (s.length == 1) s = "0" + s
  return s
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
