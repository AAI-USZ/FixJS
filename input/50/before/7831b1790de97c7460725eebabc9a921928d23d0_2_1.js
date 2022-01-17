function() {
            info("Your bundle is complete.".info);
            return typeof cb === "function" ? cb() : void 0;
          }