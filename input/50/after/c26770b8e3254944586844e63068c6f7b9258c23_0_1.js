function (x) {
							  log({cancelled: x});
                                                          channel.basicPublish("", queue, "Two");
                                                          log({finished: "tests passed"});
						      }