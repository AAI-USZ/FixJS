function(err) {
              if (err != null) {
                throw err;
              }
              print(("source for " + _this.file.relativePath + "                   documentation processed").squeeze());
              return typeof callback === "function" ? callback() : void 0;
            }