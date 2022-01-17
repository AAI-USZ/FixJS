function () {
							if (r++ && r === nth) {
								obj.un("afterDataDelete", guid);
								completed();
							}
						}