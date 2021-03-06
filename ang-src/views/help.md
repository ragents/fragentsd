<!-- Licensed under the Apache License. See footer for details. -->

fragents
================================================================================

<img src="images/ragents.png" style="float:right;">

fragents is a Friendly
[ragents server](https://github.com/ragents/ragents-server),
which can be used to communicate with
[ragents](https://github.com/ragents/ragents),
and has a nice web front end to see all the ragents connected to a session.

The web front end consists of three pages:

- [Sessions](/) - shows sessions attached to, and ragents connected to those
  sessions

- [Integrations](/integrations) - shows integrations you've created, to link
  to other ragents-capable applications

- [Messages](/messages) - shows diagnostic messages for the web front end

- Help - this help page


Sessions page
--------------------------------------------------------------------------------

The Sessions page shows the sessions you are connected to, and the ragents
connected to that session.

You can click on the "Add Session" button to create a new session on the
server.  This will show up as a new panel under the "Sessions" header,
and show you the connected ragents.  You can disconnect (and forget) the
session by clicking the "x remove" button beside the session URL.


Integrations page
--------------------------------------------------------------------------------

The integrations page shows integrations you've defined, which allow you to
link connected ragents to other ragents-capable application.

You can click on the "Add Integration" button to create a new integration.  An
integration has a human readable name, a ragent name to match with connected
ragents, and a URL pointing to the integration application.  You can delete
the integration by clicking the "x remove" button beside the integration.

Integrations will be launched in a new browser window, with the specified URL
that has a fragment suffixed to it, which is the ragents server URL (which
itself has a fragment).


Messages page
--------------------------------------------------------------------------------

You can click the "verbose" check-box to show informational messages, and
click the "Clear" button to clear all the messages.


version
--------------------------------------------------------------------------------

package: {{pkg.name}}, version: {{pkg.version}}

fork me at [GitHub]({{pkg.homepage}})


<!--
#===============================================================================
# Copyright IBM Corp. 2014
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#===============================================================================
-->
