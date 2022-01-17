function(data) {
		this.tab.document().findAllContaining("Transfer")[0].click();
		this.tab.wait();
		this.tab.document().findAllContaining("SWIFT transfer")[0].click();
		this.tab.wait();

		var fee_side = 1; // 0=OUR 1=SHA 2=BEN

		// find furst account number matching currency
		var acct_num = -1;
		for(var i = 0; i < this.accounts.length; i++) {
			if (this.accounts[i].balance.substr(-3) == data["data"]["Currency__"]) {
				acct_num = i-1;
				break;
			}
		}
		if (acct_num == -1) {
			sys.log("no account available in requested currency");
			sys.abort();
		}

		this.tab.document().getElementsByName('chargedAccountPanel:chargedAccountContainer:chargedAccountBorder:chargedAccount')[0].eval("this.value="+acct_num);

		this.tab.document().getElementsByName('recipientInputPanel:accountNumberC:accountNumberBorder:_body:country')[0].eval("this.value="+JSON.stringify(this.countries[data["meta"]["swift"].substr(4,2)])); // receiving bank country, from SWIFT
		this.tab.document().getElementsByName('recipientInputPanel:accountNumberC:accountNumberBorder:accountNumber')[0].setAttribute("value", data["meta"]["account_number"]); // account #
		this.tab.document().getElementsByName('recipientInputPanel:nameBorder:name')[0].setAttribute("value", data["meta"]["name"]); // name
		this.tab.document().getElementsByName('recipientInputPanel:streetBorder:street')[0].setAttribute("value", data["meta"]["address"]);
		this.tab.document().getElementsByName('recipientInputPanel:cityBorder:city')[0].setAttribute("value", data["meta"]["city"]);
		this.tab.document().getElementsByName('recipientInputPanel:zipCodeBorder:zipCode')[0].setAttribute("value", data["meta"]["postalcode"]);
		this.tab.document().getElementsByName('transferInput:monetaryTransferType:amountBorder:debitedAmount')[0].setAttribute("value",data["data"]["Amount"]/100);
		this.tab.document().getElementsByName('transferInput:monetaryTransferType:transferAmountBorder:creditedCurrency')[0].eval("this.value="+JSON.stringify(data["data"]["Currency__"]));
		this.tab.document().getElementsByName('transferInput:swiftTransferPanel:swiftCost')[fee_side].eval("this.checked='true'");
		this.tab.document().getElementsByName('transferInput:titleBorder:title')[0].eval("this.value="+JSON.stringify(data["data"]["Label"]+" - "+data["data"]["Money_Bank_Withdraw__"]));
		this.tab.interact(); // user needs to complete TX from there, then close the interaction window on the last screen
		var div = tab.document().findFirst("div.success");
		while(div.tagName() != "UL") div = div.nextSibling();
		div = div.firstChild(); // LI
		while(div.textContent().indexOf("Transaction identifier") == -1) div = div.nextSibling();
		div = div.firstChild(); // STRONG
		if (div.tagName() != "STRONG") {
			sys.log("Could not locate transaction identifier, script may be too old");
			sys.abort();
		}
		div = div.textContent();

		var success = { receipt: div, pdf: this.tab.printBase64() };

		return success;
	}