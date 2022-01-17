function(opt_initObj, opt_successCallback,
                                  opt_errorHandler) {
    if (!self.requestFileSystem) {
      throw new MyFileError({
        code: FileError.BROWSER_NOT_SUPPORTED,
        name: 'BROWSER_NOT_SUPPORTED'
      });
    }

    var initObj = opt_initObj ? opt_initObj : {}; // Use defaults if obj is null.

    var size = initObj.size || DEFAULT_FS_SIZE;
    this.type = self.TEMPORARY;
    if ('persistent' in initObj && initObj.persistent) {
      this.type = self.PERSISTENT;
    }

    var init = function(fs) {
      this.size = size;
      fs_ = fs;
      cwd_ = fs_.root;
      isOpen_ = true;

      opt_successCallback && opt_successCallback(fs);
    };
    
    if (this.type == self.PERSISTENT) {
      self.webkitStorageInfo.requestQuota(this.type, size, function(grantedBytes) {
        self.requestFileSystem(this.type, grantedBytes, init.bind(this), opt_errorHandler);
      }.bind(this), opt_errorHandler);
    } else {
      self.requestFileSystem(this.type, size, init.bind(this), opt_errorHandler);
    }
  }