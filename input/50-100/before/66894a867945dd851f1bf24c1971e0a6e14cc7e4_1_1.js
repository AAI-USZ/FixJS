function (valid) {
          var result = invalidInfo;

          if (valid) {
            result = _.extend({ valid: valid }, info);
            var email = info.email,
                idInfo = storage.getEmail(email);

            // Now that the address is verified, its verified bit has to be
            // updated as well or else the user will be forced to verify the
            // address again.
            if (idInfo) {
              idInfo.verified = true;
              storage.addEmail(email, idInfo);
            }

            storage.setReturnTo("");
          }

          complete(onComplete, result);
        }