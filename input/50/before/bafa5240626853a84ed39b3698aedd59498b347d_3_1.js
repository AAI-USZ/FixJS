function (value, idx) {
							if (value.id == id) {
								this.alter("splice", idx, 0, value.doc);
							}
						}