function (err, doc) {
		if ( err !== null ) {
			database.save('_design/'+ hashName +'View', {
			view: {
			map: queryGen.mapContains("name", name)
			}});
			database.view(hashName + 'View/view', function (err, doc) {
				if ( err !== null ) {
					console.log("GET" + "::" + "retrieveByName" + "::" + name + "::" + "ERROR" + JSON.stringify(err));
					callbackFunction(false, err);
				} else {
					console.log("GET" + "::" + "retrieveByName" + "::" + name + "::" + "DONE");
					var docs = {};
					for(var d = start; d < doc.length && d < end; d++){
						//delete doc[d].value._id;
						//delete doc[d].value._rev;
						docs[d] = idConverter.decimalToAlfa(doc[d].id);
					}
					callbackFunction(true, docs);
					}
			});
		} else {
			console.log("GET" + "::" + "retrieveByName" + "::" + name + "::" + "DONE");
			var docs = {};
			for(var d = start; d < doc.length && d < end; d++){
				//delete doc[d].value._id;
				//delete doc[d].value._rev;
						docs[d] = idConverter.decimalToAlfa(doc[d].id);
			}
			callbackFunction(true, docs);
		}
	}