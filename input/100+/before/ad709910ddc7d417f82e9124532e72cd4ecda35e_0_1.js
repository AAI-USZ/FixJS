function(nik, password) {
		// we should be on the home, with focus on NIK
		this.tab.type(nik);
		this.tab.document().getElementById("okBtn").click();
		this.tab.wait();

		// next page is the crazy password page
		// try to get pass input location
		var password_tr = this.tab.document().getElementById("pass1").parentNode().parentNode();

		if (password_tr.tagName() != "TR")
			throw new Error("Failed: password field is not as it should! :(");

		var password_td = password_tr.firstChild();
		var password_fields = [];
		for(var i = 0; i < 20; i++) {
			password_td = password_td.nextSibling();
			var input = password_td.firstChild();
			if (input.tagName() != "INPUT")
				throw new Error("Could not find input in password field, update script!");
			if (input.hasAttribute("disabled"))
				continue;

			input.setAttribute("value", password.charAt(i));
		}
		this.tab.document().getElementById("okBtn2").click();
		this.tab.wait();

		this.getAccounts(); // we are on the accounts page
	}