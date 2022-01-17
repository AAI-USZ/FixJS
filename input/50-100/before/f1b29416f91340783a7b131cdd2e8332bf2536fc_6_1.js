function(error) {
            // failed to fill
            optionCount = optionCount - 1;
            options[param] = "error";
            console.error("Fill map error on param '" + param + "': "+ error.message);
            if (filledCount >= optionCount) {
              callback(options);
            }
          }