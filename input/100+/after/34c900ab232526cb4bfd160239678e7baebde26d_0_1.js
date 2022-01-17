function() {
	try {
		if(!config.getItem('AutoStat', false) || !caap.stats['points']['skill']) {
			return false;
		}

		if(!state.getItem("statsMatch", true)) {
			if(state.getItem("autoStatRuleLog", true)) {
				con.log(2, "User should possibly change their stats rules");
				state.setItem("autoStatRuleLog", false);
			}

			return false;
		}

		var atributeSlice = $j("div[style*='keep_cont_top.jpg']", caap.appBodyDiv), startAtt = 0, stopAtt = 4, attrName = '', attribute = '', attrValue = 0, n = 0, returnIncreaseStat = '';

		if(!$u.hasContent(atributeSlice)) {
			caap.navigateTo('keep');
			return true;
		}

		if(config.getItem("AutoStatAdv", false)) {
			startAtt = 5;
			stopAtt = 9;
		}

		for( n = startAtt; n <= stopAtt; n += 1) {
			attrName = 'Attribute' + n;
			attribute = config.getItem(attrName, '');
			if(attribute === '') {
				con.log(4, attrName + " is blank: continue");
				continue;
			}

			if(caap.stats['level'] < 10) {
				if(attribute === 'Attack' || attribute === 'Defense' || attribute === 'Health') {
					con.log(1, "Characters below level 10 can not increase Attack, Defense or Health: continue");
					continue;
				}
			}
			attrValue = config.getItem('AttrValue' + n, 0);
			returnIncreaseStat = caap.increaseStat(attribute, attrValue, atributeSlice);
			switch (returnIncreaseStat) {
				case "Next" :
					con.log(4, attrName + " : next");
					continue;
				case "Click" :
					con.log(4, attrName + " : click");
					return true;
				default :
					con.log(4, attrName + " return value: " + returnIncreaseStat);
					return false;
			}
		}

		con.log(1, "No rules match to increase stats");
		state.setItem("statsMatch", false);
		return false;
	} catch (err) {
		con.error("ERROR in autoStat: " + err);
		return false;
	}
}