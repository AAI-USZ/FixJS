function() {
            puts('Documentation successfully generated'.green);
            return typeof callback === "function" ? callback() : void 0;
          }