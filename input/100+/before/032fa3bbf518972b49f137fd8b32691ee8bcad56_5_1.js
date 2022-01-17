function() {
		order = 0;
		var s1 = subscribe("A", "a1/b1/c1");
		var s2 = subscribe("A", "a1");
		var s3 = subscribe("Z", "a2");
		var s4 = subscribe("A", "a2");
		var s5 = subscribe("A", "a1/b2/c2");
		var s6 = subscribe("A", "a1/b1/c1");
		var s7 = subscribe("A", "a1/b2");
		var s8 = subscribe("X");
		var s9 = subscribe("X");
		var s10 = subscribe("X", "a2");
		var subscriptions = {
			"A": {
				"a1": {
					"contexts": {
						"b1": {
							"contexts": {
								"c1": {"contexts": {}, "handlers": [{"id": s1.id, "handler": s1.handler}, {"id": s6.id, "handler": s6.handler}]}
							},
							"handlers": []
						},
						"b2": {
							"contexts": {
								"c2": {"contexts": {}, "handlers": [{"id": s5.id, "handler": s5.handler}]}
							},
							"handlers": [{"id": s7.id, "handler": s7.handler}]
						}
					},
					"handlers": [{"id": s2.id, "handler": s2.handler}]
				},
				"a2": {"contexts": {}, "handlers": [{"id": s4.id, "handler": s4.handler}]}
			},
			"Z": {
				"a2": {"contexts": {}, "handlers": [{"id": s3.id, "handler": s3.handler}]}
			},
			"X": {
				"empty": {"contexts": {}, "handlers": [{"id": s8.id, "handler": s8.handler}, {"id": s9.id, "handler": s9.handler}]},
				"a2": {"contexts": {}, "handlers": [{"id": s10.id, "handler": s10.handler}]}
			}
		};
		QUnit.deepEqual(Echo.Events._subscriptions.A, subscriptions.A, "Checking full structure of subscribers");
		QUnit.deepEqual(Echo.Events._subscriptions.X, subscriptions.X, "Checking full structure of subscribers");
		QUnit.deepEqual(Echo.Events._subscriptions.Z, subscriptions.Z, "Checking full structure of subscribers");

		publish({"topic": "A", "context": "a1"});
		QUnit.deepEqual(published, [2, 1, 6, 7, 5], "Publish: handlers order (topic \"A\", context \"a1\")");
		publish({"topic": "X"});
		QUnit.deepEqual(published, [8, 9], "Publish: handlers order (topic \"X\", empty context)");
		publish({"topic": "X", "context": "a2"});
		QUnit.deepEqual(published, [10, 8, 9], "Publish: handlers order (topic \"X\", context \"a2\")");

		QUnit.ok(unsubscribe("A", s1.id, "a1/b1/c1"), "Unsubscribe: event \"A\", handlerId: \"" + s1.id + "\", context \"a1/b1/c1\"");
		QUnit.ok(unsubscribe("A", s2.id), "Unsubscribe: event \"A\", handlerId: \"" + s2.id + "\", unknown context");
		QUnit.ok(unsubscribe(undefined, undefined, "a2"), "Unsubscribe: all events, all handlers, context \"a2\"");
		QUnit.ok(!unsubscribe("A", s1.id, "a1/b1/c1"), "Unsubscribe from previously unsubscribed handler: nothing to do");
		var subscriptions2 = {
			"A": {
				"a1": {
					"contexts": {
						"b1": {
							"contexts": {
								"c1": {"contexts": {}, "handlers": [{"id": s6.id, "handler": s6.handler}]}
							},
							"handlers": []
						},
						"b2": {
							"contexts": {
								"c2": {"contexts": {}, "handlers": [{"id": s5.id, "handler": s5.handler}]}
							},
							"handlers": [{"id": s7.id, "handler": s7.handler}]
						}
					},
					"handlers": []
				},
				"empty": {
					"contexts": {},
					"handlers": []
				}
			},
			"Z": {},
			"X": {
				"empty": {"contexts": {}, "handlers": [{"id": s8.id, "handler": s8.handler}, {"id": s9.id, "handler": s9.handler}]}
			}
		};
		QUnit.deepEqual(Echo.Events._subscriptions.A, subscriptions2.A, "Checking full structure of subscribers after several unsubscriptions");
		QUnit.deepEqual(Echo.Events._subscriptions.X, subscriptions2.X, "Checking full structure of subscribers after several unsubscriptions");
		QUnit.deepEqual(Echo.Events._subscriptions.Z, subscriptions2.Z, "Checking full structure of subscribers after several unsubscriptions");

		publish({"topic": "A", "context": "a1"});
		QUnit.deepEqual(published, [6, 7, 5], "Publish: handlers order (topic \"A\", context \"a1\")");
		publish({"topic": "X"});
		QUnit.deepEqual(published, [8, 9], "Publish: handlers order (topic \"X\", empty context)");
		publish({"topic": "X", "context": "a2"});
		QUnit.deepEqual(published, [8, 9], "Publish: handlers order (topic \"X\", context \"a2\")");
	}