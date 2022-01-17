f    // Site Code...
    var parseProjectForm = function(data) {
    // Uses form data here...
    console.log(data);
    };
    $(document).bind('pageinit', function(){
        var projectForm = $("#projectForm"),
            rcerrorslink = $("#rcerrorslink");
        projectForm.validate({
            //options to change behavior of validator
            invalidHandler: function(form, validator){
                //error messages
                rcerrorslink.on();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.length ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordCollegeErrors ul").html(html);
            },
            submitHandler: function(){
                //when valid form is submitted
                //store all data
                //target form
                var data = projectForm.serializeArray();
                //call function & pass data in
                parseProjectForm(data);
            }
        });
    });
    // Style field highlight     
    $('input').focus(function(){
        $(this).addClass('curFocus');
    });

    $('input').blur(function(){
        $(this).removeClass('curFocus');
    });

    // variable defaults
   var sexValue,
       sizeValue,
       json;

    //getElementById function
    function ne (x) {
        var theElement = $(x);
        return theElement;
    };

    // Create select field element and populate with options.
    var gpaRanges = ["--Choose Your GPA--","A: 4.0 - 3.5", "B: 3.4 - 2.5", "C: 2.4 - 1.5", "D: 1.4 - 1.0", "F: 0.9 - 0.0"];       
    

    //obj is the list of option values
    function ranges (){
        var create = '<select id="groups">';
        for(var i = 0, j = gpaRanges.length; i < j; i++)
        {
            create += '<option value="'+gpaRanges[i]+'">'+gpaRanges[i]+'</option>';
        }
        create += '</select>';
        $('#select').append($(create));
    };
    ranges();

    //Find Value of selected radio button
    function getSelectedRadio () {
        var radio = $('#projectForm input.sex');
        for (var i = 0, j = radio.length; i < j; i++) {
            if (radio[i].checked){
                sexValue = radio[i].value;
            };
        };
    };

    //Find Value of selected checkbox
    function getCheckbox () {
        var checkbox = $('#projectForm input.pop');
        for (var i = 0, j = checkbox.length; i < j; i++) {
            if (checkbox[i].checked){
                sizeValue = checkbox[i].value;
            };
        };
    };

    function saveData (key) {
    
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
            id = $(key).val();
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

    //Auto Populate Local Storage
    function autoFillData () {
        // The actual actual JSON OBJECT data required for this to work is coming from out JSON.js file which is loaded to out HTML page.
        // Store the JSON Object into local storage.
        for(var c in json){
            var id   = Math.floor(Math.random()* 10000001);
            localStorage.setItem(id, JSON.stringify(json[c]));
        };
    };
    
    // get the image for the right category being displayed
    function getImage (iconName, makeSubList) {
        var imageLi = $('<li/>');
        makeSubList.append($(imageLi));
        var newImg = $('<img/>');
        var setSrc = newImg.attr('src', "images/icons"+ iconName +".png");
        imageLi.append($(newImg));
     };
     displayLink(localStorage);
     

    function getData () {
       // toggleControls("on");
        if (localStorage.length === 0) {
           var dummy = confirm("There is no data in Local Storage. Add default data?");
            if(dummy=== true){
               autoFillData(); 
               alert("Default data has been added.");
            }else{
                alert('Please enter data.');
                window.location.reload();
            }   
        };
        //displayLink(localStorage); // build the data to display on the list page
        $.mobile.changePage('#displaydata'); // go to page to display list
    };
        //write data from local storage to browser.
        var makeDiv = $('<div></div>');
        makeDiv.attr("id", "#items");
        makeDiv.attr("data-role", "content");
        makeDiv.attr("data-theme", "d");

        var makeDivPrimary = $("<div/>");
        makeDivPrimary.attr("class", "content-primary");

        var makeList = $('<ul/>');
        makeList.attr("id", "one");
        makeList.attr("data-role", "listview");
        makeList.attr("data-filter", "true");
        makeList.attr("data-inset", "true");

        makeDiv.append($(makeList));
        makeDivPrimary.append($(makeList));
        $(document.body).append($(makeDiv));
        $("#items").css({"display": "block"});
        for (var i = 0, ls = localStorage.length; i < ls; i++) {
            var makeli = $('<li></li>');
            makeli.attr("id", "two");
            var linksli = $('<li></li>');
            linksli.attr("id", "#three");
            makeList.append($(makeli));
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = $('<ul></<ul>');
            makeSubList.attr("href", "#");
            makeSubList.attr("id", "#four");
            
            makeli.append($(makeSubList));
            
            getImage(obj.group[1], makeSubList);
            for(var b in obj){
                var makeSubli = $('<li/>');
                makeSubList.append($(makeSubli));
                var optSubText = obj[b][0] + " " + obj[b][1];
                makeSubli.html = optSubText;
                makeSubList.append($(linksli));
            };
            makeItemLinks(localStorage.key(i), linksli ); // Create our edit and delete links/buttons for each item in local storage.
        };
    
    //Make Item Links
    //Create the edit and delete links for each stored item when displayed.
    function makeItemLinks (key, linksli) {
        //Edit single item link
        var editLink = $("<a/>");
            editLink.href = '#';
        editLink.key = key;
        var editText = "Edit Information";
        editLink.on('click', editItem);
        editLink.html = editText;
        linksli.append($(editLink));
 
        //Add line break
        var breakTag = $('<br/>');
        linksli.append($(breakTag));
 
        var deleteLink = $('<a/>');
            deleteLink.href = '#';
        deleteLink.key = key;
        var deleteText = "Delete Information";
        deleteLink.on('click', deleteItem);    
        deleteLink.html = "Delete Text";
    };
        linksli.append($(deleteLink));
 
    
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
    };

    function deleteItem () {
        var ask = confirm("Are you sure you want to delete thins information?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Information successfully deleted.");
            window.location.reload();
        } else{
            alert("Information was not deleted.");
        };
    };
 
    function clearLocal () {
        if (localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All data is deleted.");
            window.location.reload();
            return false;
        };
    };

    function validate (data) {
        //Define the elements we want to check
        var getFname = $('fname');
        var getLname = $('lname');
        var getEmail = $('email');
        var getGroup = $('groups');
        var getInterests = $('comments');
 
        // Reset error messages
        errMsg.html = " ";
        getFname.css({'border': '1px solid black'});
        getLname.css({'border': '1px solid black'});
        getEmail.css({'border': '1px solid black'});
        getGroup.css({'border': '1px solid black'});
        getInterests.css({'border': '1px solid black'});
         
 
        //Get Error Messages
        var messageAry = [];
         
        // First Name Validation
        if (getFname.val === ""){
            var fNameError = "Please enter a first name.";
            getFname.css({'border':'1px solid red'});
            messageAry.push(fNameError);
        };
 
        //Last Name Validation
        if (getLname.val === ""){
            var lNameError = "Please enter a last name.";
            getLname.css({'border':'1px solid red'});
            messageAry.push(lNameError);
        };
 
        //Email Validation
        var reg = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
            if(!(reg.exec(getEmail.val))){
                var emailError = "Please enter a valid email address.";
                getEmail.css({'border':'1px solid red'});
                messageAry.push(emailError);
        };
 
        //Gpa Validation
        if (getGroup.value === "--Choose Your GPA--"){
            var groupError = "Please select your GPA.";
            getGroup.css({'border':'1px solid red'});
            messageAry.push(groupError);
        };
         
        //Interests Validation
        if (getInterests.value === ""){
            var interestsError = "Please type your intrest(s).";
            getInterests.css({'border':'1px solid red'});
            messageAry.push(interestsError);
        };

        // If there are errors display them on screen
        if(messageAry.length >= 1){
            for (var i = 0, j = messageAry.length; i < j; i++) {
                var txt = $('<li/>');
                txt.html = messageAry[i];
                errMsg.append($(txt));
            };
            data.preventDefault();
            return false;
        }else{
            //If all is ok save data. Send the key value (which came from the editData function).
            //Remember this key value was passed through the editSubmit event Listener as a property.
            saveData(this.key);
 
        };
    };

    // Submit Link & Submit Click Events
    $("#displayLink").on('click', getData);

    $("#clear").on('click', clearLocal);

    $('#submit').on('click', saveData);
});