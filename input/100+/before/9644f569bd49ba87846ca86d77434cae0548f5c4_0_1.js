function(){
    
    var evform = $("#eventForm");
    evform.validate({
    invalidHandler: function(form, validator){

},
submitHandler: function(){
var data = evform.serializeArray();
parseEventForm(data);
console.log(data);


}
    
});

function gE(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

function toggleControls(tag) {
        switch (tag) {
        case "on":
            gE("eventForm").style.display = "none";
            gE("clearStoredData").style.display = "inline";
            gE("displayStoredData").style.display = "none";
            gE("addNew").style.display = "inline";
            break;
        case "off":
            gE("eventForm").style.display = "block";
            gE("clearStoredData").style.display = "inline";
            gE("displayStoredData").style.display = "inline";
            gE("addNew").style.display = "none";

            break;
        default:
            return false;


        }
    }
    
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


    function autoFillData() {
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in JSON) {
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(JSON[n]));

        }

    }

    function editItem() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var saveLink = gE("saveEvent");
        //shows the form
        toggleControls("off");

        //populate the form files with the current localStorage values
        gE("groups").value = item.group[1];
        gE("firstName").value = item.firstName[1];
        gE("lastName").value = item.lastName[1];
        gE("address").value = item.address[1];
        gE("city").value = item.city[1];
        gE("state").value = item.state[1];
        gE("phoneNumber").value = item.phoneNumber[1];
        gE("email").value = item.email[1];
        gE("timeOfEvent").value = item.timeEVent[1];
        gE("dateOfEvent").value = item.date[1];
        gE("textBox").value = item.textBox[1];
        gE("range").value = item.iq[1];

        if (gE("Monday").value == item.checkBox[1]) {
            gE("Monday").setAttribute("checked", "checked");
        }


        if (gE("Tuesday").value == item.checkBox[1]) {
            gE("Tuesday").setAttribute("checked", "checked");
        }
        if (gE("Wednesday").value == item.checkBox[1]) {
            gE("Wednesday").setAttribute("checked", "checked");
        }
        if (gE("Thursday").value == item.checkBox[1]) {
            gE("Thursday").setAttribute("checked", "checked");
        }
        if (gE("Friday").value == item.checkBox[1]) {
            gE("Friday").setAttribute("checked", "checked");
        }

        if (gE("Saturday").value == item.checkBox[1]) {
            gE("Saturday").setAttribute("checked", "checked");
        }

        if (gE("Sunday").value == item.checkBox[1]) {
            gE("Sunday").setAttribute("checked", "checked");
        }

        //remove the initial listener from the input "save contact"       
        saveLink.removeEventListener("click", storeData);
        //change submit button value to edit button
        gE("saveEvent").value = "Edit Contact";
        var editSubmit = gE("saveEvent");
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;



    }


    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this event?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Event was NOT removed");

        }

    }

    function makeItemLinks(key, linksLi) {
        //add edit single item link
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Event";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        //add line break
        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);


        //delete link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Event";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);

    }

    function getImage(catName, makeOtherList) {
        var imageLi = document.createElement("li");
        makeOtherList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSource = newImage.setAttribute("src", "Images/" + catName + ".png");
        imageLi.appendChild(newImage);

    }

    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data inside Local Storage so default data was added.");
            autoFillData();
        }
        //write Data from Local Storage to the browser.
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.getElementById("displayPage").appendChild(makeDiv);
        gE("items").style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeLi = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value to an object by using json.Parse
            var obj = JSON.parse(value);
            var makeOtherList = document.createElement("ul");
            makeLi.appendChild(makeOtherList);
            getImage(obj.group[1], makeOtherList);
            for (var tag in obj) {
                var makeOtherLi = document.createElement("li");
                makeOtherList.appendChild(makeOtherLi);
                var optSubText = obj[tag][0] + " " + obj[tag][1];
                makeOtherLi.innerHTML = optSubText;
                makeOtherList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
        }

    }

    //get image for right catagory being displayed.

    function clearLocal() {
        if (localStorage.length === 0) {
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
        }
    }
    
    


var displayLink = gE("displayStoredData");
    displayLink.addEventListener("click", getData);
    var clearLink = gE("clearStoredData");
    clearLink.addEventListener("click", clearLocal);
    var saveLink = gE("saveEvent");
    saveLink.addEventListener(storeData);
    var editSubmit = gE("saveEvent");
    editSubmit.addEventListener("click",getData);

}