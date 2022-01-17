function (err, signedIntermediate) {
                          cert.sign(user_kp.publicKey, {email: "john@root.com"},
                                    {issuser: "intermediate.root.com", issuedAt: new Date(), expiresAt: expiration},
                                    null, intermediate_kp.secretKey,
                                    function(err, signedUser) {
                                      signAssertion(root_kp.publicKey,
                                                    [signedIntermediate, signedUser],
                                                    user_kp);
                                    });
                        }