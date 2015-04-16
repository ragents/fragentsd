// Licensed under the Apache License. See footer for details.

var pkg = require("../../package.json")

var messageLog = require("../lib/messageLog")

var Logger      = messageLog.create()
var TitlePrefix = "fragents"

App.controller("BodyController", controller)

//------------------------------------------------------------------------------
function controller($scope, $document, $location) {
  $scope.pkg         = pkg
  $scope.TitlePrefix = TitlePrefix
  $scope.subtitle    = ""

  $scope.messages      = Logger.getMessages()
  $scope.info          = info
  $scope.log           = log
  $scope.error         = error
  $scope.clearMessages = clearMessages
  $scope.toggleVerbose = toggleVerbose
  $scope.verbose       = false

  $scope.info("body controller initialized")

  //-----------------------------------
  function log(message)   { Logger.log(message) }
  function info(message)  { Logger.info(message) }
  function error(message) { Logger.error(message) }

  //-----------------------------------
  function clearMessages() {
    Logger.clear()
  }

  //-----------------------------------
  function toggleVerbose() {
    $scope.verbose = !$scope.verbose
  }
}

//------------------------------------------------------------------------------
function setTitle($scope, $document, $location) {
  var match = $location.path().match(/\/(.*)/)
  if (!match) return

  var subtitle = match[1].replace(/-/g, " ")

  if (subtitle == "") {
    title    = TitlePrefix
  }
  else {
    subtitle = ": " + subtitle
    title    = TitlePrefix + subtitle
  }

  $document[0].title = title
  $scope.subtitle    = subtitle
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
