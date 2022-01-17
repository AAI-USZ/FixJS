function() {
	try {
		if(config.getItem("NoBankAfterLvl", true) && state.getItem('KeepLevelUpGeneral', false)) {
			return false;
		}

		var maxInCash = -1, minInCash = 0, depositButton = null, numberInput = null, deposit = 0;
		maxInCash = config.getItem('MaxInCash', -1);
		minInCash = config.getItem('MinInCash', 0);
		if(!maxInCash || maxInCash < 0 || caap.stats['gold']['cash'] <= minInCash || caap.stats['gold']['cash'] < maxInCash || caap.stats['gold']['cash'] < 10) {
			return false;
		}

		if(general.Select('BankingGeneral')) {
			return true;
		}
		depositButton = $j("input[src*='btn_stash.gif']");
		if(!depositButton || !depositButton.length) {
			// Cannot find the link
			return caap.navigateTo('keep');
		}
		numberInput = $j("input[name='stash_gold']");
		if(!numberInput || !numberInput.length) {
			con.warn('Cannot find box to put in number for bank deposit.');
			return false;
		}
		deposit = numberInput.attr("value").parseInt() - minInCash;
		numberInput.attr("value", deposit);
		con.log(1, 'Depositing into bank:', deposit);
		caap.click(depositButton);
		return true;
	} catch (err) {
		con.error("ERROR in Bank: " + err);
		return false;
	}
}