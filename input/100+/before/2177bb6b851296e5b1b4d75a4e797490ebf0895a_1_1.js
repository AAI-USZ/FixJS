function validate(e){
            //Define the elements that we want to check
            var getFname = ge('fname');
            var getLname = ge('lname');
            var getEmail = ge('email');
            
            //reset error messages
            errMsg.innerHTML = "";
            getFname.style.border = "1px solid black";
            getLname.style.border = "1px solid black";
            getEmail.style.border = "1px solid black";
            //Get Error Messages
            var messageAry = [];
            //First Name Validation
            if (getFname.value === ""){
                var fNameError = "Please Enter Your First Name";
                getFname.style.border = "3px solid red";
                messageAry.push(fNameError);
            }
            //Last Name Validation
            if (getLname.value === ""){
                var lNameError = "Please Enter Your Last Name";
                getLname.style.border = "3px solid red";
                messageAry.push(lNameError);
            }
            //Email Validation
            var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}ge/;
            if(!(re.exec(getEmail.value))){
                var emailError = "Please Enter A Valid Email Address";
                getEmail.style.border = "3px solid red";
                messageAry.push(emailError);
            }
             //If there were errors display them on the screen
             if (messageAry.length >=1){
                for (var i = 0, j = messageAry.length; i < j; i++){
                     var txt = document.createElement('li');
                     txt.innerHTML = messageAry[i];
                     errMsg.appendChild(txt);
                }
                e.preventDefault();
                return false; 
             }else{
                //If all is ok Save our Data. Send the key value from editData function
                //Remember this key value was passed through the editSubmit listener as a property.
                 storeData(this.key);
             }
            
        }