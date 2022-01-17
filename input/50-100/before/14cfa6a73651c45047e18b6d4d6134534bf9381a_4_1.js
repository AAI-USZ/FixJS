function (id, value) {
							if (same && id !== 'action') {
								if (id === 'node') {
									same = a.node === b.node;
								} else {
									same = !different(value, b[id]);								
								}
							}
						}