function start(status) {
    // If cookies are disabled, do not run any of the page specific code and
    // instead just show the error message.
    if(!status) return;


    if (!path || path === "/") {
      bid.index();
    }
    else if (path === "/signin") {
      var module = bid.signIn.create();
      module.start({});
    }
    else if (path === "/signup") {
      var module = bid.signUp.create();
      module.start({});
    }
    else if (path === "/forgot") {
      bid.forgot();
    }
    else if (path === "/add_email_address") {
      var module = bid.verifySecondaryAddress.create();
      module.start({
        token: token,
        verifyFunction: "verifyEmail"
      });
    }
    else if(path === "/verify_email_address") {
      var module = bid.verifySecondaryAddress.create();
      module.start({
        token: token,
        verifyFunction: "verifyUser"
      });
    }
    else {
      // Instead of throwing a hard error here, adding a message to the console
      // to let developers know something is up.
      helpers.log("unknown path");
    }

    user.checkAuthentication(function(authenticated) {
      if (authenticated) {
        displayAuthenticated();
      }
      else {
        displayNonAuthenticated();
      }

      // The footer is initially tied to the bottom while the page is loading
      // so that it does not appear to flicker.  Untie the footer and let it
      // rest in its natural position.
      $("footer").css({ position: "", bottom: "" });
    });

    function displayAuthenticated() {
      $(".display_always,.display_auth").fadeIn(ANIMATION_TIME);
      dom.addClass("body", "authenticated");

      if (!path || path === "/") {
        bid.manageAccount();
        $(window).trigger("resize");
      }

      $("a.signOut").click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        user.logoutUser(function() {
          document.location = "/";
        }, pageHelpers.getFailure(bid.Errors.logout));
      });
    }

    function displayNonAuthenticated() {
      $(".display_always").fadeIn(ANIMATION_TIME);
      dom.addClass("body", "not_authenticated");
      $(".display_nonauth").fadeIn(ANIMATION_TIME);
    }
  }