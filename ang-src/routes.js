// Licensed under the Apache License. See footer for details.

var views = require("./views.json")

App.config(config)

//------------------------------------------------------------------------------
function config($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({
    enabled:     true,
    requireBase: false
  })

  $routeProvider.when("/", {
    controller: "SessionsController",
    template:   views.sessions
  })

  $routeProvider.when("/messages", {
    controller: "MessagesController",
    template:   views.messages
  })

  $routeProvider.when("/help", {
    controller: "HelpController",
    template:   views.help
  })

  $routeProvider.otherwise( { redirectTo: "/" } )
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
