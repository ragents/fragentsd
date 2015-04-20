// Licensed under the Apache License. See footer for details.

window.App = angular.module("app", [ "ngRoute", "ngResource" ])

require("./controllers/body")
require("./controllers/help")
require("./controllers/integrations")
require("./controllers/messages")
require("./controllers/sessions")
require("./routes")

// auto-close response navbar items when clicked
// https://github.com/twbs/bootstrap/issues/9013
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
})

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
