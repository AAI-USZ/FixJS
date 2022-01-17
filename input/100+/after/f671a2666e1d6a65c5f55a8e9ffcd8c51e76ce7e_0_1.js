function storeData() {
        var id              = Math.floor(Math.random()*100000001);
        //Gather all form field values and store in an object.
        //Object properties contain array with the form label and input value.
        
        //Caling Radio Function to see which one the user chose
        getSelectedRadio();
        //Stores form data into an object
        var item            = {};
            item.spiritName = ["Name: ", $('spiritName').value];
            item.bottleMIL  = ["Bottle Size: ", $('bottleMIL').value + " ML"];
            item.shelve     = ["Quality: ", shelveValue];
            item.date       = ["Date Purchased: ", $('datePurchase').value];
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Spirit Stored!");
        toggleControls("on");
    }