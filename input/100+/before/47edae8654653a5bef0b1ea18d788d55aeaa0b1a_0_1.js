function() {
		// scan page to get accounts list!
		var balances_table = this.tab.document().findFirst("tbody td.name");
		if (!balances_table) {
			sys.log("Could not locate table with account balances");
			sys.abort();
		}

		while(balances_table.tagName() != "TBODY") balances_table = balances_table.parentNode();

		// for each tr...
		var account_tr = balances_table.firstChild();
		if (account_tr.tagName() != "TR") {
			sys.log("Table containing accounts contained something unexpected");
			sys.abort();
		}

		this.accounts = [];
		
		while(account_tr) {
			var a = account_tr.getElementsByTagName("a")[0];
			var data = {
				href: a.attribute("href"),
				account: account_tr.getElementsByTagName("em")[0].textContent(),
				account_type: a.textContent(),
				balance: account_tr.findFirst("td.money div").textContent(),
			};
			sys.log("Found account number ["+data.account+"] of type "+data.account_type+" with balance "+data.balance);
			this.accounts.push(data);
			account_tr = account_tr.nextSibling();
		}

		return this.accounts;
	}