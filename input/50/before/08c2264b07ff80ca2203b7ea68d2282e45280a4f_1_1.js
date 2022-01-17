function () {
        console.log('xcxc', Meteor.user());
        test.equal(Meteor.user().username, username);
      }