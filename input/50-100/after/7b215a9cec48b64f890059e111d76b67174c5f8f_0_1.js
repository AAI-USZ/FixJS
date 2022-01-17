function saveList () {
		
		var saveObj = {};
		var saveCount = 0;
		
		objLoop(subs, function (sub, name) {
			saveObj[name] = sub.getSaveable();
			++saveCount;
		});
		
		if (saveCount >= 2) {
			localStorage.setItem("YTBSP", JSON.stringify(saveObj));
		}
	}