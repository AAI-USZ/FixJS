function (id, value) {
							if (same && id !== 'action' && id !== 'node') {
								if (id === 'node') {
									same = a.node === b.node;
								} else {
									same = !different(value, b[id]);								
								}
							}
						}