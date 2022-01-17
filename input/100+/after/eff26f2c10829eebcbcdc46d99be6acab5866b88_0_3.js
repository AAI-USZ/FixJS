function validate(e){
		//define the elements we check
		var getName = $('buffName');
		var getDescription = $('description');
//		var getEmail = $('email');
		
		//reset error messages
		errorMsg.innerHTML = "";
		
		//Create array for mass display of error messages
		var messageAry = [];
		
		//Group Validation
		if(getName.value === ""){
			var nameError = "Please enter a name for the buff.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);
		}else{
			getName.style.border = "1px solid green";	
		};
		
		if(getDescription.value === ""){
			var descriptionError = "Please enter a description.";
			getDescription.style.border = "1px solid red";
			messageAry.push(descriptionError);
		}else {
			getDescription.style.border = "1px solid green";
		};
		
/*
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1ps solid red";
			messageAry.push(emailError);
		};
		
*/
		//If there were errors, display them
		//requires that an HTML element exist in page already <ul id="errors"></ul>
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		}else{
			//Store data if no errors
			storeData(this.key);
		};
	}