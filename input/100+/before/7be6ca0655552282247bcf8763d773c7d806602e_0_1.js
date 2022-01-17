function (err, created) {
      if (err) return cb(err)

      if (created) {
        log.verbose('created nodedir', created)
      }

      // now download the node tarball
      var tarballUrl = distUrl + '/v' + version + '/node-v' + version + '.tar.gz'
        , badDownload = false
        , extractCount = 0
        , gunzip = zlib.createGunzip()
        , extracter = tar.Extract({ path: devDir, strip: 1, filter: isValid })

      // checks if a file to be extracted from the tarball is valid.
      // only .h header files and the gyp files get extracted
      function isValid () {
        var name = this.path.substring(devDir.length + 1)
        var isValid = valid(name)
        if (name === '' && this.type === 'Directory') {
          // the first directory entry is ok
          return true
        }
        if (isValid) {
          log.verbose('extracted file from tarball', name)
          extractCount++
        } else {
          // invalid
          log.silly('ignoring from tarball', name)
        }
        return isValid
      }

      gunzip.on('error', cb)
      extracter.on('error', cb)
      extracter.on('end', afterTarball)

      // download the tarball, gunzip and extract!
      var req = download(tarballUrl)

      // something went wrong downloading the tarball?
      req.on('error', function (err) {
        badDownload = true
        cb(err)
      })

      req.on('close', function () {
        if (extractCount === 0) {
          cb(new Error('Connection closed while downloading tarball file'))
        }
      })

      req.on('response', function (res) {
        if (res.statusCode !== 200) {
          badDownload = true
          cb(new Error(res.statusCode + ' status code downloading tarball'))
          return
        }
        // start unzipping and untaring
        req.pipe(gunzip).pipe(extracter)
      })

      // invoked after the tarball has finished being extracted
      function afterTarball () {
        if (badDownload) return
        if (extractCount === 0) {
          return cb(new Error('There was a fatal problem while downloading/extracting the tarball'))
        }
        log.verbose('tarball', 'done parsing tarball')
        var async = 0

        if (isLegacy) {
          // copy over the files from the `legacy` dir
          async++
          copyLegacy(deref)
        }

        if (win) {
          // need to download node.lib
          async++
          downloadNodeLib(deref)
        }

        // write the "installVersion" file
        async++
        var installVersionPath = path.resolve(devDir, 'installVersion')
        fs.writeFile(installVersionPath, gyp.package.installVersion + '\n', deref)

        if (async === 0) {
          // no async tasks required
          cb()
        }

        function deref (err) {
          if (err) return cb(err)
          --async || cb()
        }
      }

      function copyLegacy (done) {
        // legacy versions of node (< 0.8) require the legacy files to be copied
        // over since they contain many bugfixes from the current node build system
        log.verbose('legacy', 'copying "legacy" gyp configuration files for version', version)

        var legacyDir = path.resolve(__dirname, '..', 'legacy')
        log.verbose('legacy', 'using "legacy" dir', legacyDir)
        log.verbose('legacy', 'copying to "dev" dir', devDir)

        var reader = fstream.Reader({ path: legacyDir, type: 'Directory' })
        var writer = fstream.Writer({ path: devDir, type: 'Directory' })

        reader.on('entry', function onEntry (entry) {
          log.verbose('legacy', 'reading entry:', entry.path)
          entry.on('entry', onEntry)
        })

        reader.on('error', done)
        writer.on('error', done)

        // Like `cp -rpf`
        reader.pipe(writer)

        reader.on('end', done)
      }

      function downloadNodeLib (done) {
        log.verbose('on Windows; need to download `node.lib`...')
        var dir32 = path.resolve(devDir, 'ia32')
          , dir64 = path.resolve(devDir, 'x64')
          , nodeLibPath32 = path.resolve(dir32, 'node.lib')
          , nodeLibPath64 = path.resolve(dir64, 'node.lib')
          , nodeLibUrl32 = distUrl + '/v' + version + '/node.lib'
          , nodeLibUrl64 = distUrl + '/v' + version + '/x64/node.lib'

        log.verbose('32-bit node.lib dir', dir32)
        log.verbose('64-bit node.lib dir', dir64)
        log.verbose('`node.lib` 32-bit url', nodeLibUrl32)
        log.verbose('`node.lib` 64-bit url', nodeLibUrl64)

        var async = 2
        mkdir(dir32, function (err) {
          if (err) return done(err)
          log.verbose('streaming 32-bit node.lib to:', nodeLibPath32)

          var req = download(nodeLibUrl32)
          req.on('error', done)
          req.on('response', function (res) {
            if (res.statusCode !== 200) {
              done(new Error(res.statusCode + ' status code downloading 32-bit node.lib'))
              return
            }

            var ws = fs.createWriteStream(nodeLibPath32)
            ws.on('error', cb)
            req.pipe(ws)
          })
          req.on('end', function () {
            --async || done()
          })
        })
        mkdir(dir64, function (err) {
          if (err) return done(err)
          log.verbose('streaming 64-bit node.lib to:', nodeLibPath64)

          var req = download(nodeLibUrl64)
          req.on('error', done)
          req.on('response', function (res) {
            if (res.statusCode !== 200) {
              done(new Error(res.statusCode + ' status code downloading 64-bit node.lib'))
              return
            }

            var ws = fs.createWriteStream(nodeLibPath64)
            ws.on('error', cb)
            req.pipe(ws)
          })
          req.on('end', function () {
            --async || done()
          })
        })
      } // downloadNodeLib()

    }