function(optDesc, optName) {
          if (!hasDefaultOptions && Option.defaultOptions[optName] !== undefined) {
            hasDefaultOptions = true;
          }
        }