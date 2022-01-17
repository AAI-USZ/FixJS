function (err, data) {
      if (err) {
        if (err.code == 'ENOENT') {
          callback(new Error('You must run `node-gyp configure` first!'))
        } else {
          callback(err)
        }
        return
      }
      config = JSON.parse(data.replace(/\#.+\n/, ''))

      // get the 'arch', 'buildType', and 'nodeDir' vars from the config
      buildType = config.target_defaults.default_configuration
      arch = config.variables.target_arch
      nodeDir = config.variables.nodedir
      copyDevLib = config.variables.copy_dev_lib == 'true'

      if ('debug' in gyp.opts) {
        buildType = gyp.opts.debug ? 'Debug' : 'Release'
      }
      if (!buildType) {
        buildType = 'Release'
      }

      log.verbose('build type', buildType)
      log.verbose('architecture', arch)
      log.verbose('node dev dir', nodeDir)

      if (win) {
        findSolutionFile()
      } else {
        doWhich()
      }
    }