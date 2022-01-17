function () {
              if (self.hasBeenDefined('$'))
                callback('Could not load Zepto (needed for testing)');
              else
                callback(null, self);
            }