function (operation, callback, scope) {
		var me = this;
		var records = operation.getRecords(),
				length = records.length, i,
				queries = [];

		onSuccess = function () {
			operation.setCompleted();
			operation.setSuccessful();
			if (typeof callback == 'function') {
				callback.call(scope, operation);
			}
		};

		onError = function (tx, err) {
			operation.setCompleted();
			operation.setException(err ? err : '');
			if (typeof callback == 'function') {
				callback.call(scope, operation);
			}
		};

		operation.setStarted();
		for (i = 0; i < length; i++) {
			queries.push(this.getDeleteRecordFunc(records[i], me.getDbConfig().tablename));
		}

		// do transaction
		me.transactionDB(me.getDb(), queries, onSuccess, onError);
	}