function(err, user_kp) {
              // generate the two certs
              cert.sign(intermediate_kp.publicKey, {host: "intermediate.root.com"},
                        {issuer: "root.com", issuedAt: new Date(), expiresAt: expiration}, null,
                        root_kp.secretKey, function (err, signedIntermediate) {
                          cert.sign(user_kp.publicKey, {email: "john@root.com"},
                                    {issuer: "intermediate.root.com", issuedAt: new Date(), expiresAt: expiration},
                                    null, intermediate_kp.secretKey,
                                    function(err, signedUser) {
                                      signAssertion(root_kp.publicKey,
                                                    [signedIntermediate, signedUser],
                                                    user_kp);
                                    });
                        });
              
            }