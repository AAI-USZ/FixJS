function(email, assertion, onComplete, onFailure) {
      post({
        url: "/wsapi/auth_with_assertion",
        data: {
          assertion: assertion,
          ephemeral: !storage.usersComputer.confirmed(email)
        },
        success: handleAuthenticationResponse.curry("assertion", onComplete, onFailure),
        error: onFailure
      });
    }