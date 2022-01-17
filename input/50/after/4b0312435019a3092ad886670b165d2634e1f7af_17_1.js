function(err) {
            if (err != null) {
              return error(err.message);
            }
            info("package.json generated".green);
            return typeof cb === "function" ? cb() : void 0;
          }