function(node) {
							if (matchNode(node, format, {}, similar)) {
								if (!currentFormats[format]) {
									// Execute callbacks
									each(callbacks, function(callback) {
										callback(true, {node: node, format: format, parents: parents});
									});

									currentFormats[format] = callbacks;
								}

								matchedFormats[format] = callbacks;
								return false;
							}
						}