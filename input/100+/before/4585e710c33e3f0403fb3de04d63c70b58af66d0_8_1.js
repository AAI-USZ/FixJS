function(err, certParamsArray, payload, assertionParams) {
      if (err) return errorCB(err);

      // audience must match!
      var err = compareAudiences(assertionParams.audience, audience)
      if (err) {
        logger.debug("verification failure, audience mismatch: '"
                     + assertionParams.audience + "' != '" + audience + "': " + err);
        return errorCB("audience mismatch: " + err);
      }

      // principal is in the last cert
      var principal = certParamsArray[certParamsArray.length - 1].certParams.principal;

      // verify that the issuer is the same as the email domain or
      // that the email's domain delegated authority to the issuer
      var domainFromEmail = principal.email.replace(/^.*@/, '');

      if (ultimateIssuer != HOSTNAME && ultimateIssuer !== domainFromEmail)
      {
          primary.delegatesAuthority(domainFromEmail, ultimateIssuer, function (delegated) {
            if (delegated) {
              return successCB(principal.email, assertionParams.audience, assertionParams.expiresAt, ultimateIssuer);
            } else {
              return errorCB("issuer '" + ultimateIssuer + "' may not speak for emails from '"
                         + domainFromEmail + "'");
            }
          });
      } else {
        return successCB(principal.email, assertionParams.audience, assertionParams.expiresAt, ultimateIssuer);
      }
    }