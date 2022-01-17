function (id, value) {
							if (same && id !== 'action') {
								if (id === 'node') {
									same = b.node === a.node;
								} else {
									same = !different(value, a[id]);								
								}
							}
						}