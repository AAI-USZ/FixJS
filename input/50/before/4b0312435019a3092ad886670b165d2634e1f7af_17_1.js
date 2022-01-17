function(err) {
            if (err != null) {
              return puts(error(err.message));
            }
            puts("package.json generated".green);
            return typeof cb === "function" ? cb() : void 0;
          }