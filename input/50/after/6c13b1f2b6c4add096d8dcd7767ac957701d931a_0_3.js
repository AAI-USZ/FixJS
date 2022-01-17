function (pass) {

    // Prompt for confirmation

    getPassword('Confirm password: ', function (pass2) {

      if (pass === pass2) {

        fn (pass);

      } else {

        throw new Error('Passwords do not match.');

      }

    });

  }