function createDefaults() {

      var self = this;

      // Create administrative user
      if (calipso.data.adminUser) {

        var adminUser = calipso.data.adminUser;

        // Create a new user
        var admin = new User({
          username:adminUser.username,
          fullname:adminUser.fullname,
          hash:calipso.lib.crypto.hash(adminUser.password,calipso.config.get('session:secret')),
          email:adminUser.email,
          language:adminUser.language,
          about:'',
          roles:['Administrator']
        });
        admin.save(self());

        // Delete this now to ensure it isn't hanging around;
        delete calipso.data.adminUser;

      } else {
        // Fatal error
        self()(new Error("No administrative user details provided through login process!"));
      }

    }