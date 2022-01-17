function () {
		var dbObject = null;
		var dbType = null;
		var dbPath = "";
		var cb = function () {};
		var uri = "";

		for (var i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case "string":
					uri = dbType = arguments[i];
					break;
				case "function":
					cb = arguments[i];
					break;
				case "object":
					dbObject = arguments[i];
					break;
			}
		}

		if (dbObject === null) {
			uri = require("url").parse(uri);

			if (!uri.protocol) {
				return cb(false, { "number": 1, "message": "Protocol not defined" });
			}

			dbType = uri.protocol.substr(0, uri.protocol.length - 1);
		}

		if (db_alias.hasOwnProperty(dbType)) {
			dbType = db_alias[dbType];
		}

		dbPath = __dirname + "/databases/" + dbType + ".js";

		require("path").exists(dbPath, function (exists) {
			if (!exists) {
				return cb(false, { "number": 2, "message": "Protocol not installed" });
			}

			var db = require(dbPath);

			var handleResult = function (success, info) {
				if (!success) return cb(false, info);

				return cb(true, new ORM(info));
			};

			if (dbObject !== null) {
				db.use_db(dbObject, handleResult);
			} else {
				db.connect(uri, handleResult);
			}
		});
	}