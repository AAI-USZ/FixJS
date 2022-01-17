function editItem() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var saveLink = gE("saveEvent");
        //shows the form
        toggleControls("off");

        //populate the form files with the current localStorage values
        gE("select-choice-1").value = item.group[1];
        gE("firstName").value = item.firstName[1];
        gE("lastName").value = item.lastName[1];
        gE("address").value = item.address[1];
        gE("city").value = item.city[1];
        gE("state").value = item.state[1];
        gE("phoneNumber").value = item.phoneNumber[1];
        gE("email").value = item.email[1];
        //gE("timeOfEvent").value = item.timeEVent[1];
        gE("mydate").value = item.date[1];
        gE("textBox").value = item.textBox[1];
        gE("range").value = item.iq[1];

//        if (gE("Monday").value == item.checkBox[1]) {
//            gE("Monday").setAttribute("checked", "checked");
//        }
//
//
//        if (gE("Tuesday").value == item.checkBox[1]) {
//            gE("Tuesday").setAttribute("checked", "checked");
//        }
//        if (gE("Wednesday").value == item.checkBox[1]) {
//            gE("Wednesday").setAttribute("checked", "checked");
//        }
//        if (gE("Thursday").value == item.checkBox[1]) {
//            gE("Thursday").setAttribute("checked", "checked");
//        }
//        if (gE("Friday").value == item.checkBox[1]) {
//            gE("Friday").setAttribute("checked", "checked");
//        }
//
//        if (gE("Saturday").value == item.checkBox[1]) {
//            gE("Saturday").setAttribute("checked", "checked");
//        }
//
//        if (gE("Sunday").value == item.checkBox[1]) {
//            gE("Sunday").setAttribute("checked", "checked");
//        }

        //remove the initial listener from the input "save contact"       
        saveLink.removeEventListener("click", storeData);
        //change submit button value to edit button
        gE("saveEvent").value = "Edit Contact";
        var editSubmit = gE("saveEvent");
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;



    }