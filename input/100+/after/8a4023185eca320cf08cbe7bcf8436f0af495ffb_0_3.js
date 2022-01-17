function UI() {

    // Cloned parts of a DOM tree, responsible for displaying and
    // manipulating access control list. The structure is defined in
    // the html file, this way js code does not need to create complex
    // DOM 'manually'.
    var view = {
      // A path to a location + controls to remove and visit a location.
      locationPath : $('#location-list-item').clone(true),
      // A list of users that can access a location (contains
      // view.allowedUser elements) + input box for adding a new user.
      locationInfo : $('#location-info-list-item').clone(true),
      // A single user that is allowed to access a location + control
      // to revoke access.
      allowedUser : $('#allowed-user-list-item').clone(true),
      // An input box for adding a new location.
      addLocation : $('#add-location').clone(true),
      // User that is on contact list (was granted access to some
      // location at some point) + controls to remove the user (along
      // with access to all locations), check which locations a user
      // can access, notify a user and grant access to currently
      // active location.
      user : $('.user-list-item').clone(true),
      // Box for displaying error messages.
      errorMessage : $('.alert-error').clone(true)
    },
    that = this,
    controller = null,
    ENTER_KEY = 13;

    /**
     * Annotates currently signed in user to make it clearer that this
     * user is treated a little specially (can not be removed, can not
     * be revoked access to the admin location).
     */
    function userAnnotation(user) {
      if (user.email === controller.adminUserEmail) {
        return ' (you)';
      }
      return '';
    }

    function focusedElement() {
      return $(document.activeElement);
    }

    /**
     * Returns id of a DOM element responsible for displaying a given
     * location path (clone of the view.locationPath).
     */
    function locationPathId(location) {
      return 'location-' + utils.urn2uuid(location.id);
    }

    /**
     * Returns id of a DOM element responsible for displaying a list
     * of users allowed to access a given location (clone of the
     * view.locationInfo).
     */
    function locationInfoId(location) {
      return 'location-info-' + utils.urn2uuid(location.id);
    }

    /**
     * Returns id of an input box responsible for adding emails of
     * users allowed to access a given location.
     */
    function addAllowedUserInputId(location) {
      return 'add-allowed-user-input-' + utils.urn2uuid(location.id);
    }

    /**
     * Returns an active location (the one for which a list of allowed
     * users is currently displayed) or null.
     */
    function findActiveLocation() {
      var activeElement, urn;
      activeElement = $('#location-list').find('.active');
      if (activeElement.length === 0) {
        return null;
      }
      urn = activeElement.attr('location-urn');
      return utils.findOnly(controller.locations, function(location) {
        return location.id === urn;
      });
    }

    /**
     * Displays a dialog to compose a notification about shared resources.
     */
    function showNotifyDialog(to, locations) {
      // TODO: finalize this dialog.
      var body, website, locationsString, delimiter;
      if (locations.length === 0) {
        body = 'I have shared nothing with you. Enjoy.';
      } else {
        website = 'a website';
        if (locations.length > 1) {
          website = 'websites';
        }
        locationsString = $.map(locations, function(locationPath) {
          return 'https://' + window.location.host + locationPath;
        }).join('\n');

        body = 'I have shared ' + website + ' with you.\n'
          + 'Please visit:\n' + locationsString;
      }
      $('#notify-modal')
        .find('#notify-to').attr('value', to.join(', '))
        .end()
        .find('#notify-body').text(body)
        .end()
        .modal('show');
    }

    /**
     * Creates a DOM subtree to handle a given location. The subtree
     * contains a list of emails of allowed users, an input box to
     * grant access to a new user, controls to revoke access from a
     * particular user.
     */
    function createLocationInfo(location) {
      var locationInfo, allowedUserList, isAdminLocation, isAdminUser;

      isAdminLocation = (location.path === controller.adminPath);

      locationInfo = view.locationInfo.clone(true)
        .attr('id', locationInfoId(location))
        .attr('location-urn', location.id)
        .find('.add-allowed-user')
        .attr('id', addAllowedUserInputId(location))
        .keydown(function(event) {
          var userId;
          if (event.which === ENTER_KEY) {
            userId = $.trim($(this).val());
            if (userId === '*') {
              controller.grantOpenAccess(location);
            } else if (userId !== '') {
              controller.grantAccess(userId, location);
            }
            $(this).val('');
          }
        })
        .end();

      allowedUserList = locationInfo.find('.allowed-user-list');
      if (location.openAccess) {
        // Disable entering email addresses of allowed user: everyone
        // is allowed.
        locationInfo.find('.add-allowed-user')
          .addClass('disabled')
          .attr('placeholder', 'Location does not require authentication.')
          .attr('disabled', true);

        view.allowedUser.clone(true)
          .find('.user-mail').text('*')
          .end()
          .find('.unshare').click(function() {
            controller.revokeOpenAccess(location);
          })
          .end()
          .appendTo(allowedUserList);
      } else {
        utils.each(
          utils.sortByProperty(location.allowedUsers, 'email'), function(user) {
            isAdminUser = (user.email === controller.adminUserEmail);
            view.allowedUser.clone(true)
              .find('.user-mail').text(user.email + userAnnotation(user))
              .end()
              .find('.unshare').click(function() {
                controller.revokeAccess(user, location);
              })
              // Protect the currently signed-in user from disallowing
              // herself access to the admin application.
              .css('visibility',
                   isAdminLocation && isAdminUser ? 'hidden' : 'visible')
              .end()
              .appendTo(allowedUserList);
          });
      }
      locationInfo.appendTo('#location-info-list');
      // Break circular references.
      locationInfo = null;
    }

    /**
     * Creates a DOM subtree to handle a list of all defined
     * locations. The subtree contains locations paths, controls to
     * add/remove a location and to compose notification about a
     * shared location, a link to visit a location with a
     * browser. When location is clicked, more details become visible
     * (created with the createLocationInfo function).
     */
    function showLocations() {
      var isAdminLocation, sortedLocations;
      sortedLocations = utils.sortByProperty(controller.locations, 'path');
      utils.each(sortedLocations, function(location) {
        isAdminLocation = (location.path === controller.adminPath);
        view.locationPath.clone(true)
          .attr('id', locationPathId(location))
          .attr('location-urn', location.id)
          .find('.url').attr(
            'href', '#' + locationInfoId(location))
          .end()
          .find('.path').text(location.path)
          .end()
          .find('.remove-location').click(function(event) {
            // Do not show removed location info.
            event.preventDefault();
            controller.removeLocation(location);
          })
          // Do not allow admin location to be removed.
          .css('visibility', isAdminLocation ? 'hidden' : 'visible')
          .end()
          .find('.notify').click(function() {
            showNotifyDialog(
              location.allowedUsers, [location.path]);
          })
          .end()
          .find('.view-page').click(function() {
            window.open(location.path,'_blank');
          })
          .end()
          .appendTo('#location-list');
        createLocationInfo(location);
      });

      view.addLocation.clone(true)
        .find('#add-location-input')
        .keydown(function(event) {
          var path;
          if (event.which === ENTER_KEY) {
            path = $.trim($(this).val());
            if (path !== '') {
              controller.addLocation($(this).val());
            }
            $(this).val('');
          }
        })
        .end()
        .appendTo('#location-list');
    }

    /**
     * Activates a location. Active location is the one for which
     * detailed information and controls are displayed.
     */
    function activateLocation(location) {
      // If any location is already active, deactivate it:
      $('#location-list').find('.active').removeClass('active');
      $('#location-info-list').find('.active').removeClass('active');

      $('#' + locationPathId(location)).addClass('active');
      $('#' + locationInfoId(location)).addClass('active');
    }

    /**
     * Highlights locations a user can access.
     */
    function highlightAccessibleLocations(user) {
      utils.each(controller.locations, function(location) {
        var id = '#' + locationPathId(location);
        if (controller.canAccess(user, location)) {
          $(id + ' a').addClass('accessible');
        } else {
          $(id + ' a').addClass('not-accessible');
        }
      });
    }

    /**
     * Turns off location highlighting.
     */
    function highlighLocationsOff() {
      $('#location-list a').removeClass('accessible');
      $('#location-list a').removeClass('not-accessible');
    }

    /**
     * Creates a DOM subtree to handle a list of known users. The
     * subtree contains an email of each user and controls to remove a
     * user, highlight which locations a user can access, notify a
     * user about shared locations. It also contains a control to
     * grant a user access to a currently active location (this
     * control is visible only if the user can not already access the
     * location).
     */
    function showUsers(activeLocation) {
      var userView, isAdminUser, sortedUsers;
      sortedUsers = utils.sortByProperty(controller.users, 'email');
      utils.each(sortedUsers, function(user) {
        userView = view.user.clone(true);
        if (activeLocation !== null &&
            !controller.canAccess(user, activeLocation)) {
          userView.find('.share')
            .removeClass('hide')
            .click(function() {
              controller.grantAccess(user.email, activeLocation);
            });
        }
        isAdminUser = (user.email === controller.adminUserEmail);
        userView.find('.user-mail')
          .text(user.email + userAnnotation(user))
          .end()
          .find('.remove-user').click(function() {
            controller.removeUser(user);
          })
          // Do not allow currently signed-in user to delete herself
          // (this is only UI enforced, from a server perspective such
          // operation is OK).
          .css('visibility', isAdminUser ? 'hidden' : 'visible')
          .end()
          .find('.highlight').hover(function() {
            highlightAccessibleLocations(user);
          }, highlighLocationsOff)
          .end()
          .find('.notify').click(function() {
            showNotifyDialog(
              [user.email],
              utils.extractLocationsPaths(
                controller.accessibleLocations(user))
            );
          })
          .end()
          .appendTo('#user-list');
      });
      // Break circular reference.
      userView = null;
    }

    /**
     * Handles errors. Not network related errors (status undefined) or
     * client induced HTTP errors (HTTP status codes 400-499) are
     * displayed and automatically hidden after some time.
     *
     * Other errors (server related status codes 5XX) are considered
     * fatal - received error message replaces the current document.
     */
    this.handleError = function(message, status) {
      if (typeof status !== 'undefined' && status >= 400 && status < 500) {
        var error = view.errorMessage.clone(true);

        error.removeClass('hide')
          .find('.alert-message')
          .text(message)
          .end()
          .appendTo('#error-box');

        window.setTimeout(function() {
          error.alert('close');
        }, 15000);
      } else {
        // Fatal error.
        $('html').html(message);
      }
    };

    /**
     * Refreshes all controls. Displayed data (with the exception of
     * an error message) is never updated partially. All UI elements
     * are cleared and recreated. If locationToActivate is given, it
     * becomes activated, otherwise currently active location stays
     * active or if none, the first location in alphabetical order.
     */
    this.refresh = function(locationToActivate) {
      var focusedElementId, activeLocation = locationToActivate;

      if (typeof locationToActivate === 'undefined') {
        // DOM subtrees representing a currently focused input box and
        // an active location will be removed, corresponding elements in
        // a new DOM structure need to be focused and activated.
        activeLocation = findActiveLocation();
      }
      // Active location was probably just removed, activate the first
      // location on the list.
      if (activeLocation === null && controller.locations.length > 0) {
        activeLocation = utils.sortByProperty(controller.locations, 'path')[0];
      }

      focusedElementId = focusedElement().attr('id');

      $('#location-list').empty();
      $('#location-info-list').empty();
      $('#user-list').empty();

      showLocations();
      showUsers(activeLocation);

      if (activeLocation !== null) {
        activateLocation(activeLocation);
      }
      if (focusedElementId) {
        $('#' + focusedElementId).focus();
      }
    };

    /**
     * Must be called before the first call to refresh().
     */
    this.setController = function(controllerArg) {
      controller = controllerArg;
    };

    /**
     * Initializes the UI.
     */
    function initialize() {
      // locationInfo contains a single allowed user element from the
      // html document. Remove it.
      view.locationInfo.find('#allowed-user-list-item').remove();

      // Refreshes the UI when new location is activated (to update
      // the user list, so only users that can not access the location
      // have active 'share' icon).
      view.locationPath.find('a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
        that.refresh();
      });

      // Displays for which host the admin interface manages access
      // (in a future may need to be configurable).
      $('.locations-root').text(location.host);

      // TODO: this is only needed if alert is to be removed programmatically.
      $(".alert").alert();

      // Configure static help messages.
      $('.help').click(function() {
        if ($('.help-message').hasClass('hide')) {
          $('.help-message').removeClass('hide');
          $('.help').text('Hide help');
        } else {
          $('.help-message').addClass('hide');
          $('.help').text('Show help');
        }
      });
    }
    initialize();
  }