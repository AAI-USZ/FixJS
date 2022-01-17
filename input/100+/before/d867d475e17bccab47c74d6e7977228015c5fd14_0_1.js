function(i) {
		// i is account index in this.accounts
		var data = this.accounts[i];
		this.tab.browse(data.href);
	
		var trx_list = [];
		var page_cnt = 1;
	
		while(true) {
			if (page_cnt > 10) break; // max 10 pages
			//sys.log("Parsing page "+page_cnt);
			page_cnt++;
	
			var page_trx_desc = [];
	
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
	
	//				sys.log(JSON.stringify(data));
	
					trx_list.push(data);
					this.tab.back();
					//tab.document().findAllContaining("Back")[0].click();
					this.tab.wait();
					continue;
				}
				break;
			}
	
			accounts[i].transactions = trx_list;
//			sys.filePutContents("poland_account_"+(accounts[i].account.replace(/ /g,''))+"_page"+(page_cnt-1)+".csv", JSON.stringify(accounts[i]));
	
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
	
		tab.document().findAllContaining("Portfolio24")[0].click(); // back to main page
		tab.wait();
		this.getAccounts(); // to get the new href

		return trx_list;
	}