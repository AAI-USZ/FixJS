function (o) {
						cache[name] = o;
						(callback['resolve'] || callback)(o);
					}