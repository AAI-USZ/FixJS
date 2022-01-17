function(email,
                                                userData,
                                                serviceName,
                                                serviceUserId,
                                                serviceData) {
    var updateUserData = function() {
      // don't overwrite existing fields
      var newKeys = _.without(_.keys(userData), _.keys(user));
      var newAttrs = _.pick(userData, newKeys);
      Meteor.users.update(user, {$set: newAttrs});
    };

    if (!email)
      throw new Meteor.Error("We don't yet support email-less users");

    var userByEmail = Meteor.users.findOne({emails: userData.email});
    var user;
    if (userByEmail) {

      // If we know about this email address that is our user.
      // Update the information from this service.
      user = userByEmail;
      if (!user.services || !user.services[serviceName]) {
        var attrs = {};
        attrs["services." + serviceName] = _.extend(
          {id: serviceUserId}, serviceData);
        Meteor.users.update(user, {$set: attrs});
      }

      updateUserData();
      return user._id;
    } else {

      // If not, look for a user with the appropriate service user id.
      // Update the user's email.
      var selector = {};
      selector["services." + serviceName + ".id"] = serviceUserId;
      var userByServiceUserId = Meteor.users.findOne(selector);
      if (userByServiceUserId) {
        user = userByServiceUserId;
        if (user.emails.indexOf(email) === -1) {
          // The user may have changed the email address associated with
          // this service. Store the new one in addition to the old one.
          Meteor.users.update(user, {$push: {emails: email}});
        }

        updateUserData();
        return user._id;
      } else {

        // Create a new user
        var attrs = {};
        attrs[serviceName] = _.extend({id: serviceUserId}, serviceData);
        return Meteor.users.insert(_.extend({}, userData, {
          emails: [email],
          services: attrs
        }));
      }
    }
  }