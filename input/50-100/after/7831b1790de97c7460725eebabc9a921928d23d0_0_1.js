function(err) {
              if (err != null) {
                throw err;
              }
              puts(("source for " + _this.file.relativePath.yellow + "                  documentation processed").squeeze(), 1);
              return typeof callback === "function" ? callback() : void 0;
            }