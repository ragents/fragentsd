# Licensed under the Apache License. See footer for details.

require "cakex"

zlib = require "zlib"

preReqFile = "../ragents-test/tmp/pre-reqs-updated.txt"

#-------------------------------------------------------------------------------
task "watch", "source file changes -> build, serve", -> taskWatch()
task "build", "run a build",                         -> taskServe()
task "serve", "start server",                        -> taskServe()

WatchSpec = "lib/**/* www/**/* ang-src/**/*"

#-------------------------------------------------------------------------------
mkdir "-p", "tmp"

#-------------------------------------------------------------------------------
watchIter = ->
  taskBuild()
  taskServe()

#-------------------------------------------------------------------------------
taskWatch = ->
  watchIter()

  watch
    files: WatchSpec.split " "
    run:   watchIter

  watch
    files: "Cakefile"
    run: (file) ->
      return unless file == "Cakefile"
      log "Cakefile changed, exiting"
      exit 0

#-------------------------------------------------------------------------------
taskBuild = ->
  log "building"
  copyBowerFiles "www/bower"

  #----------------------------------
  log " - building views module"

  viewsDir = "ang-src/views"
  views = ls viewsDir
  angMap = {}
  libArr = []
  for view in views
    iFile = "#{viewsDir}/#{view}"
    [base, ext] = view.split(".")

    if ext is "md"
      oFile = "tmp/#{view}.html"
      marked "-i #{iFile} -o #{oFile} --gfm"
      iFile = oFile

    angMap[base] = cat iFile
    libArr.push(base)

  JSON.stringify(angMap, null, 4).to "ang-src/views.json"
  JSON.stringify(libArr, null, 4).to "lib/views.json"

  #----------------------------------
  log " - browserify'ing"

  # modules = "events path util underscore"
  # modules = modules.split " "

  # args = modules.map (module) -> "--require #{module}"

  args = []
  args.push "--entry ang-src/app.js"
  args.push "--outfile tmp/ang-app.js"
  args.push "--debug"
  args.push "--insert-globals"

  browserify args.join " "

  #----------------------------------
  log " - cat-source-map'ing"

  cat_source_map "--fixFileNames tmp/ang-app.js www/ang-app.js"

  files = ["www/ang-app.js", "www/ang-app.js.map.json"]

  for file in files
    iFile = file
    oFile = "#{file}.gz"

    log " - gzipping #{iFile}"
    iFile = fs.readFileSync(iFile)
    fs.writeFileSync(oFile, zlib.gzipSync(iFile))

  return

#-------------------------------------------------------------------------------
taskServe = ->
  log "restarting server at #{new Date()}"

  daemon.start "server", "node", ["app"]

#-------------------------------------------------------------------------------
copyBowerFiles = (dir) ->
  bowerConfig = require "./bower-config"

  log "installing files from bower"

  cleanDir dir

  for name, {version, files} of bowerConfig
    unless test "-d", "bower_components/#{name}"
      bower "install #{name}##{version}"
      log ""

  for name, {version, files} of bowerConfig
    for src, dst of files
      src = "bower_components/#{name}/#{src}"

      if dst is "."
        dst = "#{dir}/#{name}"
      else
        dst = "#{dir}/#{name}/#{dst}"

      mkdir "-p", dst

      cp "-R", src, dst

#-------------------------------------------------------------------------------
cleanDir = (dir) ->
  mkdir "-p", dir
  rm "-rf", "#{dir}/*"

#-------------------------------------------------------------------------------
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
#-------------------------------------------------------------------------------
