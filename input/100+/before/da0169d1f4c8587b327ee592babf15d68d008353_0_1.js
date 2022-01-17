function storeData(key) {
		var id,
			item = {};
		if(!key){
			id = Math.floor(Math.random() * 1000100001);
		} else {
			id = key
		}
		//store form fields in object
		//object will contain array with form label and input value
		getRadio();
		item.category = ["Bill Category:", ElId('categories').value];
		item.billName = ["Bill Name:", ElId('billName').value];
		item.accountNum = ["Account Number:", ElId('accountNum').value];
		item.billAmount = ["Amount Due:", ElId('billAmount').value];
		item.dueDate = ["Date Due:", ElId('dueDate').value];
		item.billPaid = ["Is Bill Paid?", paidValue];
		item.priority = ["Priority:", ElId('priority').value];
		item.comments = ["comments:", ElId('comments').value];
		//Save into local storage and convert to string(JSON.stringify)
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved");
	}