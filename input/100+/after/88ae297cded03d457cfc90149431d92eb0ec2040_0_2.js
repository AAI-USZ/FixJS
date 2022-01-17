function(key, tx, success, error){
			var me = this;
			var sql = ["SELECT * FROM ", idbModules.util.quote(me.__idbObjectStore.name)];
			var sqlValues = [];
			sql.push("WHERE ", me.__keyColumnName, " NOT NULL");
			if (me.__range && (me.__range.lower || me.__range.upper)) {
				sql.push("AND");
				if (me.__range.lower) {
					sql.push(me.__keyColumnName + (me.__range.lowerOpen ? " >=" : " >") + " ?");
					sqlValues.push(idbModules.Key.encode(me.__range.lower));
				}
				(me.__range.lower && me.__range.upper) && sql.push("AND");
				if (me.__range.upper) {
					sql.push(me.__keyColumnName + (me.__range.upperOpen ? " < " : " <= ") + " ?");
					sqlValues.push(idbModules.Key.encode(me.__range.upper));
				}
			}
			sql.push(" ORDER BY ", me.__keyColumnName);
			if (typeof key !== "undefined") {
				sql.push((me.__range && (me.__range.lower || me.__range.upper)) ? "AND" : "WHERE")
				sql.push("key = ?");
				sqlValues.push(idbModules.Key.encode(key));
				sql.push("LIMIT 1");
			} else {
				sql.push("LIMIT 1 OFFSET " + me.__offset);
			}
			logger.log(sql.join(" "), sqlValues);
			tx.executeSql(sql.join(" "), sqlValues, function(tx, data){
				if (data.rows.length === 1) {
					var key = idbModules.Key.decode(data.rows.item(0)[me.__keyColumnName]);
					var val = me.__valueColumnName === "value" ? idbModules.Sca.decode(data.rows.item(0)[me.__valueColumnName]) : idbModules.Key.decode(data.rows.item(0)[me.__valueColumnName]);
					success(key, val);
				} else {
					logger.log("Reached end of cursors");
					success(undefined, undefined);
				}
			}, function(tx, data){
				logger.log("Could not execute Cursor.continue");
				error(data);
			});
		}