function () {
		
		window.myFiddleHistory.insert(new UsedFiddle({
			"fragment": "!" + this.get("dbType").id + "/" + this.get("short_code")
		}));
		
		window.router.navigate("!" + this.get("dbType").id + "/" + this.get("short_code"));
	}