function (i) {
							if (!found && i instanceof Array) {
								found = true;
								data  = i.clone();
							}
						}