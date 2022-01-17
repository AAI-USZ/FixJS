function () {
						if (r.readyState != 4) return;
						if (r.status != 200 && r.status != 304) {
							err(r);
						}
						else suc(r.responseText);
					}