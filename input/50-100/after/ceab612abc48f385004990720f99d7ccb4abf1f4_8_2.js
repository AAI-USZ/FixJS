function (err, signedIntermediate) {
                          cert.sign({publicKey: user_kp.publicKey, principal: {email: "john@root.com"}},
                                    {issuer: "intermediate.root.com", issuedAt: new Date(), expiresAt: expiration},
                                    null, intermediate_kp.secretKey,
                                    function(err, signedUser) {
                                      signAssertion(root_kp.publicKey,
                                                    [signedIntermediate, signedUser],
                                                    user_kp);
                                    });
                        }