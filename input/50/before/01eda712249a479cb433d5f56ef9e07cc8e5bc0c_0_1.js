function (v, k) {
					if (v === null) return;
					if (typeof v.data !== "undefined") v.data.teardown();
				}