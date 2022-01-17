function (err, id) {
				if (err) {
					if (colParams && colParams.hooks && typeof colParams.hooks.afterSave == "function") {
						colParams.hooks.afterSave(false, self);
					}
					if (typeof callback == "function") {
						callback(err);
					}
					return;
				}

				if (!self[idProperty]) self[idProperty] = id;

				if (colParams && colParams.hooks && typeof colParams.hooks.afterSave == "function") {
					colParams.hooks.afterSave(true, self);
				}

				if (plugins.hasOwnProperty("afterSave")) {
					for (var k in plugins["afterSave"]) {
						plugins["afterSave"][k](data, model);
					}
				}

				if (typeof callback == "function") {
					callback(null, self);
				}
			}