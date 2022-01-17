f    
        // If there is no key this means this is a brand new item and we need a brand new key
        if ($(!key).val() === ''){
         
        //Gather up all form filled values and store in object.
        var id   = Math.floor(Math.random()* 10000001);
        /*Remove Weird Data that creates keys for file directories
        else if(key === "A-Z" || "a-z")
        {
            //delete weird data and move on
            localStorage.removeItem(this.key);
        */
        }else{
            // Set the id to the existing key that we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            var id = $(key).val();
        };
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        getCheckbox();
        var item        = {};
            item.fname  = ["First Name:", $('fname').value];
            item.lname  = ["Last Name:", $('lname').value];
            item.email  = ["Email:", $('email').value];
            item.sex    = ["Sex:", sexValue];
            item.group  = ["Group:", $('groups').value];
            item.pop    = ["Campus Size:", sizeValue];
            item.interests =["Interests:", $('comments').value];
             
        //Save data into local storage; Use stringify to convert object to string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Saved!");
    };
