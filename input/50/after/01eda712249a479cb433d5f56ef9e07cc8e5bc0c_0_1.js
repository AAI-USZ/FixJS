function (v, k) {
					if (v === null) return;
					if (typeof v.data !== "undefined" && typeof v.data.teardown === "function") v.data.teardown();
				}