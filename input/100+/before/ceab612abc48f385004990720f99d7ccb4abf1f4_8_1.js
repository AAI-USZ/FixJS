function(err, payload, assertionParams, certParams) {
          assert.isString(assertionParams.issuer);
          assert.equal(assertionParams.issuer, "issuer.com");        
          assert.isNotNull(assertionParams.issuedAt);        
          assert.isNotNull(assertionParams.expiresAt);
          assert.isObject(certParams.principal);
          assert.isObject(certParams['public-key']);
          
          // make sure iss and exp are dates
          assert.isFunction(assertionParams.issuedAt.getFullYear);
          assert.isFunction(assertionParams.expiresAt.getFullYear);
          assert.equal(certParams.principal.email, "john@issuer.com");
        }