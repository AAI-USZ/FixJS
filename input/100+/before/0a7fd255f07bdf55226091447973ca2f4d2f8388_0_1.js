function storeData(key) {
        //IF there is no key, this means this is a brand new item we need a new key.
        if (!key) {


            var id = Math.floor(Math.random() * 1000000001);
        } else {
            //Set the id to the existing key we're editting so that it will save the data.
            //The key is the same key that's been passed along from the editSubmit eventhanbdler.
            //to the validate function, then passed here, into the storeData 
            id = key;

        }
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input values
        var item = {};
        item.group = ["Event:", gE("groups").value];
        item.firstName = ["FirstName:", gE("firstName").value];
        item.lastName = ["LastName:", gE("lastName").value];
        item.address = ["address:", gE("address").value];
        item.city = ["City:", gE("city").value];
        item.state = ["State:", gE("state").value];
        item.phoneNumber = ["PhoneNumber:", gE("phoneNumber").value];
        item.email = ["Email:", gE("email").value];
        item.timeEVent = ["TimeOfEvent:", gE("timeOfEvent").value];
        item.date = ["DateOfEvent:", gE("dateOfEvent").value];
        item.textBox = ["TextBox:", gE("textBox").value];
        item.iq = ["Range:", gE("range").value];
        item.checkBox = ["CheckBox:", gE("checkbox").value];


        //save data to local storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved");


    }