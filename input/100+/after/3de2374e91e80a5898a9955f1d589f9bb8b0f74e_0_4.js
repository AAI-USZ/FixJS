function editItem () {
        //Grab data from our item from local storage
        var value = localStorage.getItem(this.key);
        var obj = JSON.parse(value);
 
        //show form
        //toggleControls("off");
 
        //Populate the form fields with current localStorage values.
        $('fname').val = obj.fname[1];
        $('lname').val = obj.lname[1];
        $('email').val = obj.email[1];
        var radios = $(document.forms[0].sex);
        for(var i = 0, r = radios.length; i < r; i++){
            if (radios[i].val() == "male" && obj.sex[1] == "male"){
                radios[i].attr("checked", "checked");
            }else if(radios[i].value == "female" && obj.sex[1] == "female"){
                radios[i].attr("checked", "checked");
            };
        };
        $('groups').val = obj.group[1];
 
        var check = $(document.forms[1].pop);
        for (var a = 0, c = check.length; i < c; i++) {
            if(check[i].val == "Small" && obj.pop[1] == "Small") {
                $('small').attr("checked", "checked");
            }else if(check[i].value == "Medium" && obj.pop[1] == "Medium") {
                $('medium').attr("checked", "checked");
            }else if(check[i].value == "Large" && obj.pop[1] == "Large") {
                $('large').attr("checked", "checked");
            };
        };
        $('#comments').val = obj.interests[1];
         // Remove the initial listener from the input 'submit' button.
        save.off.on('click', saveData);
 
        // Change submit button value to edit button
        $('#submit').val = "Edit Information";
        var editSubmit = $('#submit');
        //Save the key value established in this function as a property of the editSumbit event
        //so we can use that value when we save the data we edited.
        editSubmit.on('click',validate);
        
        editSubmit.key = this.key;
    }