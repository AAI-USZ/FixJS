function(err, obj) {
        var error;
        if (err)
          next(err);
        else if ((error = obj.errors || obj.serverErrors || obj.warnings))
          next(new Error('Failed to compile: ' + util.inspect(error)));
        else
          next(null, obj.compiledCode);
      }