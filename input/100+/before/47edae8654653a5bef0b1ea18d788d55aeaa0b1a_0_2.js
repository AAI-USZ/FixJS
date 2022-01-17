function(i, callback) {
		// i is account index in this.accounts
		// callback should return true if it had any use in the new data, or false if it didn't. In case it didn't for a whole page, process will end
		var data = this.accounts[i];
		sys.log("Centrum24: Accessing account number ["+data.account+"] with balance "+data.balance);
		this.tab.browse(data.href);
	
		var page_cnt = 1;
	
		while(true) {
			if (page_cnt > 15) break; // max 15 pages
			//sys.log("Parsing page "+page_cnt);
			page_cnt++;
	
			var page_trx_desc = [];
			var page_was_useful = false;
	
			while(true) {
				var history_data = this.tab.document().getElementById("historypage").getElementsByTagName("tbody")[0];
				var history_tr = history_data.firstChild();
				if (!history_tr) break;
	
				if (history_tr.tagName() != "TR")
					throw new Error("Page is wrong");
	
				var page_trx_index = 0;
				var do_parse = false;
	
				while(history_tr) {
					if (history_tr.getComputedStyle("display") == "none") {
						history_tr = history_tr.nextSibling();
						continue;
					}
					var data = {
						date: history_tr.findAll("td.date span")[0].textContent(),
						value_date: history_tr.findAll("td.date span")[1].textContent(),
						href: history_tr.findAllContaining("Print")[0].attribute("href"),
						desc: history_tr.getElementsByTagName("a")[0].textContent(),
						amount: history_tr.findFirst("td.amount span").textContent(),
						meta: {},
					};
					page_trx_index++;
	
					if (page_trx_desc[page_trx_index] == data.desc) {
						history_tr = history_tr.nextSibling();
						continue;
					}
					page_trx_desc[page_trx_index] = data.desc;
					do_parse = true;
					break;
				}
	
				if (do_parse) {
					this.tab.browse(data.href);
					var tx_table = this.tab.document().findFirst("table.table tbody");
	
					var tx_table_tr = tx_table.firstChild();
	
					while(tx_table_tr) {
						var td = tx_table_tr.firstChild();
						var key = td.textContent();
						var value = td.nextSibling().textContent();
						data.meta[key] = value;
						tx_table_tr = tx_table_tr.nextSibling();
					}
					data.pdf = tab.printBase64();
	
					if (callback(data)) page_was_useful = true;
					this.tab.back();
					this.tab.wait();
					continue;
				}
				break;
			}

			if (!page_was_useful) break; // nothing useful on this page => go away
	
			var prev = this.tab.document().findAllContaining("Previous");
			if (prev.length == 0) {
				//sys.log("Previous not found, considering this to be the end!");
				break;
			}
			prev[0].click();
			prev[0].setFocus();
			while(true) {
				sys.sleep(100);
				if (!prev[0].hasFocus())
					break;
			}
		}

		// return to main page
		this.tab.document().findAllContaining("Portfolio24")[0].click();
		this.tab.wait();
		this.getAccounts(); // to get the new href

		return true;
	}