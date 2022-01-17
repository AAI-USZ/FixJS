function Controller(ui, stub) {
    var that = this;

    this.locations = [];
    this.users = [];

    // An email of a currently signed in user that accesses the admin
    // application. This is kept to prevent the user from deleting a
    // permission that allows him to access the admin application.
    // Such operation is not illegal in itself and the back-end allows
    // it, but it is unlikely what the user would like to do (after
    // deleting the permission the admin application becomes unusable
    // for the user and only other admin user can fix it).
    this.adminUserEmail = null;
    // Path to the admin application
    this.adminPath = null;
    // Delegate errors to the UI.
    this.errorHandler = ui.handleError;

    /**
     * Returns true if a user can access a location.
     */
    this.canAccess = function(user, location) {
      return location.openAccess || utils.inArray(
        user.id, utils.allowedUsersIds(location));
    };

    /**
     * Removes a user from an array of users that can access a given
     * location (this affect only a local representation of the
     * location object, nothing is sent to the server).
     */
    this.removeAllowedUser = function(user, location) {
      location.allowedUsers = $.grep(location.allowedUsers, function(u) {
        return u.id !== user.id;
      });
    };

    /**
     * Returns a user object with a given email or null.
     */
    this.findUserWithEmail = function(email) {
      return utils.findOnly(that.users, function(user) {
        return user.email === email;
      });
    };

    /**
     * Returns a location object with a given id or null.
     */
    this.findLocationWithId = function(id) {
      return utils.findOnly(that.locations, function(location) {
        return location.id === id;
      });
    };

    /**
     * Returns an array of locations that a given user can access.
     */
    this.accessibleLocations = function(user) {
      return $.grep(that.locations, function(location) {
        return that.canAccess(user, location);
      });
    };

    /**
     * Retrieves an array of locations from the server, invokes
     * successCallback when successfully done.
     */
    this.getLocations = function(successCallback) {
      stub.ajax('GET', 'api/locations/', null, function(result) {
        that.locations = result.locations;
        successCallback();
      });
    };

    /**
     * Retrieves an array of users from the server, invokes
     * successCallback when successfully done.
     */
    this.getUsers = function(successCallback) {
      stub.ajax('GET', 'api/users/', null, function(result) {
        that.users = result.users;
        successCallback();
      });
    };

    /**
     * Retrieves an email of currently signed in user, invokes
     * successCallback when successfully done. Displays warning if no user
     * is sign in, which means the admin interface is likely
     * misconfigured (can be accessed without authentication).
     */
    this.getAdminUser = function(successCallback) {
      // Do not use the default error handler, display a more
      // meaningful error message.
      stub.ajax('GET', '/auth/api/whoami/', null,
                function(result) {
                  that.adminUserEmail = result.email;
                  successCallback();
                },
                function(errorMessage, errorStatus) {
                  if (errorStatus === 401) {
                    that.errorHandler(
                      'wwwhisper likely misconfigured: Admin application can ' +
                        'be accessed without authentication!');
                    successCallback();
                  } else {
                    that.errorHandler(errorMessage, errorStatus);
                  }
                });
    };

    /**
     * Returns a callback that, when invoked, executes all callbacks
     * from a callbacks array in sequence. Each callback from the
     * array needs to accept a single argument: the next callback to
     * be invoked.
     */
    this.buildCallbacksChain = function(callbacks) {
      if (callbacks.length === 1) {
        return callbacks[0];
      }
      return function() {
        callbacks[0](
          that.buildCallbacksChain(callbacks.slice(1, callbacks.length))
        );
      };
    };

    /**
     * Adds a location with a given path.
     *
     * Refuses to add sub location to the admin application (this is
     * just a client side check to prevent the user from shooting
     * himself in the foot).
     */
    this.addLocation = function(locationPathArg, successCallback) {
      var locationPath = $.trim(locationPathArg);
      if (utils.startsWith(locationPath, that.adminPath + '/')) {
        that.errorHandler(
          'Adding sublocations to admin is not supported '+
            '(It could easily cut off access to the admin application.)');
        return;
      }
      stub.ajax('POST', 'api/locations/', {path: locationPath},
                function(newLocation) {
                  that.locations.push(newLocation);
                  ui.refresh(newLocation);
                });
    };

    this.removeLocation = function(location) {
      stub.ajax('DELETE', location.self, null,
        function() {
          utils.removeFromArray(location, that.locations);
          ui.refresh();
        });
    };

    /**
     * Adds a user with a given email. Invokes a callback on success.
     */
    this.addUser = function(emailArg, successCallback) {
      stub.ajax('POST', 'api/users/', {email: emailArg},
                function(user) {
                  that.users.push(user);
                  successCallback(user);
                });
    };

    this.removeUser = function(user) {
      stub.ajax('DELETE', user.self, null,
                function() {
                  utils.each(that.locations, function(location) {
                    if (that.canAccess(user, location)) {
                      that.removeAllowedUser(user, location);
                    }
                  });
                  utils.removeFromArray(user, that.users);
                  ui.refresh();
                });
    };

    /**
     * Allows not authenticated access to a location.
     */
    this.grantOpenAccess = function(location) {
      if (location.openAccess) {
        return;
      }
      stub.ajax(
        'PUT',
        location.self + 'open-access/',
        null,
        function() {
          location.openAccess = true;
          ui.refresh();
        }
      );
    };

    /**
     * Disallows not authenticated access to a location.
     */
    this.revokeOpenAccess = function(location) {
      if (!location.openAccess) {
        return;
      }
      stub.ajax(
        'DELETE',
        location.self + 'open-access/',
        null,
        function() {
          location.openAccess = false;
          ui.refresh();
        }
      );
    };

    /**
     * Grants a user with a given email access to a given location.
     *
     * Is user with such email does not exist, adds the user first.
     */
    this.grantAccess = function(email, location) {
      var cleanedEmail, user, grantPermissionCallback;
      cleanedEmail = $.trim(email);
      if (cleanedEmail.length === 0) {
        return;
      }

      user = that.findUserWithEmail(cleanedEmail);
      if (user !== null && that.canAccess(user, location)) {
        // User already can access the location.
        return;
      }

      grantPermissionCallback = function(userArg) {
        stub.ajax(
          'PUT',
          location.self + 'allowed-users/' + utils.urn2uuid(userArg.id) + '/',
          null,
          function() {
            location.allowedUsers.push(userArg);
            ui.refresh();
          });
      };

      if (user !== null) {
        grantPermissionCallback(user);
      } else {
        that.addUser(cleanedEmail, grantPermissionCallback);
      }
    };

    /**
     * Revokes access to a given location by a given user.
     */
    this.revokeAccess = function(user, location) {
      stub.ajax(
        'DELETE',
        location.self + 'allowed-users/' + utils.urn2uuid(user.id) + '/',
        null,
        function() {
          that.removeAllowedUser(user, location);
          ui.refresh();
        });
    };

    /**
     * Activates the admin application (retrieves all dynamic data
     * from the server and refreshes the UI).
     */
    this.activate = function() {
      that.adminPath = utils.stripTrailingIndexHtmlAndSlash(
        window.location.pathname);
      stub.setErrorHandler(that.errorHandler);
      that.buildCallbacksChain([that.getLocations,
                                that.getUsers,
                                that.getAdminUser,
                                ui.refresh])();
    };
  }