function saveList () {
		
		var saveObj = {};
		
		objLoop(subs, function (sub, name) {
			saveObj[name] = sub.getSaveable();
		});
		
		localStorage.setItem("YTBSP", JSON.stringify(saveObj));
	}