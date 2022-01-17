function (){

        cForm.validate();                                                   //validate the form before it's sent
        if(cForm.valid()){
            console.log("storing the data");
            var id = Math.floor(Math.random()*9999999);						//if theres no key, create new id
            //gather form field values and store in object
            //object props contain array with form label and input val
            var item        = {'_id':'child:' + id};

            getCheckBoxes(item.allergy);
            //item._id		= "child:" + id;
            item.group		= ["Age Group: ", ($("#selector").val())]; 		//drop down box
            item.fname		= ["First Name: ", $('#fName').val()]; 	        //first name
            item.lname		= ["Last Name: ", $('#lName').val()]; 	    	//last name
            item.bday		= ["Birthday: ", $('#bday').val()]; 		    //birthday
            //item.allergy	= ["Has Allergy?: ", check1];			        //checkbox/allergy
            item.trained	= ["Is Trained?: ", getRadio()];			    //radios/attends life group?
            item.comment	= ["Message: ", $('#message').val()];		    //extra notes
            console.log("This is what I will post: ", item);

            localStorage.setItem(id, JSON.stringify(item));
            //var saveThis = JSON.stringify(item);
            //$db = $.couch.db('dbkids');
/*            $.couch.db('dbkids').saveDoc(item, {
            	success: function(data) {
            		console.log(status);
                    navigator.notification.alert(
                            'Child Added',                                  //Message
                            onConfirm,                                      //callback
                            'Success',                                      //title
                            'Okay');                                        //buttonName
                }//close success
            });//close couch        */
        }//close if form valid
    }