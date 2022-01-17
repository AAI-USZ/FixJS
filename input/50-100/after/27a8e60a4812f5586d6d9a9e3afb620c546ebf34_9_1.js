function (valid) {
          var result = invalidInfo;

          if (valid) {
            result = _.extend({ valid: valid }, info);
            // Now that the address is verified, its verified bit has to be
            // updated as well or else the user will be forced to verify the
            // address again.
            markAddressVerified(info.email);
            storage.setReturnTo("");
          }

          complete(onComplete, result);
        }