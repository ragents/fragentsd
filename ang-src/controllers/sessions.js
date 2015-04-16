// Licensed under the Apache License. See footer for details.

var sessions = require("../lib/sessions")

App.controller("SessionsController", controller)

//------------------------------------------------------------------------------
function controller($scope) {
  $scope.info("sessions controller initialized")

  $scope.sessions   = sessions.list()
  $scope.addSession = addSession
  $scope.delSession = delSession

  //-----------------------------------
  function addSession() {
    var url = window.location.origin
    url = url.replace(/^http:/,  "ws:")
    url = url.replace(/^https:/, "wss:")

    var sessionOpts = {
      url: url,
      key: getRandomKey()
    }

    var session = sessions.create(sessionOpts)
    $scope.log("session created at: " + url)

    $scope.digest()
  }

  //-----------------------------------
  function delSession(session) {
    session.del()

    $scope.digest()
  }

}

//------------------------------------------------------------------------------
function getRandomKey($scope) {
  return Math.random().toString().substr(2)
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
