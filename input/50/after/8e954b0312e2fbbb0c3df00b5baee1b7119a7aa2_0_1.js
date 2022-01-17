function(status) {
            if (status === 0) {
              info(green("Your bundle is complete."));
            } else {
              error(red("An error occured during the installation!"));
            }
            return typeof cb === "function" ? cb() : void 0;
          }