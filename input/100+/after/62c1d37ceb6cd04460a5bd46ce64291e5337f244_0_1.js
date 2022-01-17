function validate(e){
		var getCategory = ElId('categories'),
			getName = ElId('billName'),
			getAmount = ElId('billAmount'),
			getDate = ElId('dueDate'),
			//getPaid = ElId('billPaid'),
			getPaid = ElId('paid'),
			getNotPaid = ElId('notPaid'),
			//error messages
			messageArray = [],
			catError,
			nameError,
			amountError,
			dateError,
			paidError,
			i,
			j,
			txt;
			//reset error messages
		errMessage.innerHTML = "";
		getCategory.style.border = "1px solid grey";
		getName.style.border = "1px solid grey";
		getAmount.style.border = "1px solid grey";
		getDate.style.border = "1px solid grey";
		getPaid.style.border = "1px solid grey";
		getNotPaid.style.border = "1px solid grey";
		//category validation
		if(getCategory.value === "-- Pick A Category --"){
			catError = alert("Please pick a category");
			getCategory.style.border = "1px solid red";
			messageArray.push(catError);
		}
		//bill Name validation
		if (getName.value === ""){
			nameError = alert("Please enter a bill name");
			getName.style.border = "1px solid red";
			messageArray.push(nameError);
		}
		//bill amount validation
		var dollarRe = /^\d+\.\d{2}$/;
		if (!(dollarRe.exec(getAmount.value))){
			amountError = alert("Please enter amount due in format XXX.XX");
			getAmount.style.border = "1px solid red";
			messageArray.push(amountError);
		}
		// date validation
		if (getDate.value === ""){
			dateError = alert("Please enter the due date");
			getDate.style.border = "1px solid red";
			messageArray.push(dateError);
		}
		//bill paid validation
		if (!(paid.checked) && !(notPaid.checked)){
			paidError = alert("Please choose a paid option");
			getPaid.style.border = "1px solid red";
			getNotPaid.style.border = "1px solid red";
			messageArray.push(paidError);
		}
		//display errors if there is any
		if(messageArray.length >= 1){
			for(i = 0, j = messageArray.length; i < j; i++){
				txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMessage.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			//if no errors, run storeData
			storeData(this.key);
		}
			
	}