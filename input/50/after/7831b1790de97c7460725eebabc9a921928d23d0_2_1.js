function() {
            info("Your bundle is complete.".green);
            return typeof cb === "function" ? cb() : void 0;
          }