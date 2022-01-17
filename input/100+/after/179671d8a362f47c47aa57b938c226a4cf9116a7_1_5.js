function submitNewEvent(){
        // Set up the things we need for validation:
        var errors = "";
        var errFlag = false; // start with no errors
        $('#ajaxLoaderPostEvent').show();
        console.log("submitting new event");
        
        // get our variables:
        var eventName = $('#eventName').val();
        var eventLoc = $('#eventLocation').val();
        var eventBegin = $('#eventDateBegin').val();
        var eventEnd = $('#eventDateEnd').val();
        var eventDescrip = $('#eventDescription').val();
        var imgFileName = $('#imgFileLocation').val();
        var isImage = $('#isThereImage').val();
        var contact = $('#allowContactEvtent').attr('checked');
        
        // stuff added 7/7/2012
        var homeURL = $('#txtEventHomepageURL').val();
        var tagsList = $('#txtTagsInpt').val();
        var outdoors = $('#chkOutdoorsEvent').attr('checked'); // either undefined or "checked"
        var radioFree = $("#freeEvent").attr('checked');
        var radioNonFree = $("#nonFreeEvent").attr('checked');
        var currencyType = $("#priceCurrency").val();
        var eventCost = $('#eventPrice').val();
        var isFree = true;
        
        // event cost info.. convert to boolean
        if(radioNonFree == "checked") {
            if(!testEmpty(eventCost)) {
                errors += "If the event is not free, you should note the cost. <br />";
                errFlag = true;
            }
            isFree = false;
        } else {
            isFree = true;
        }
        
        // outdoors.. convert to boolean
        if(outdoors == "checked") {
            outdoors == true;
        } else {
            outdoors == false;
        }
        
        
        // image uploading info:
        var isImageBool = 0;
        if(isImage == 1) 
            isImageBool = 1;
        else 
            isImageBool = 0;
        console.log("is there an image: " + isImage);
        
        // convert date to MySQL format:
        console.log("converting times");
        eventBegin = toMySQLTime(eventBegin);
        eventEnd = toMySQLTime(eventEnd);
        
        // get optional contact info
        var isContactInfo = 0;
        var isContactInfoValid = false;  // so if (0 and False) or (1 and true)
        if(contact == "checked") {
            isContactInfo = 1;
            var contactType = $('#eventContactType').val();
            if(contactType == "email") {
                var contactInfo = $('#emailContactInfo').val();
                isContactInfoValid = testContactEmail();
                }
            if(contactType == "phone") {
                var contactInfo = {
                    phone1: $('#phone1ContactInfo').val(),
                    phone2: $('#phone2ContactInfo').val(),
                    phone3: $('#phone3ContactInfo').val()
                    }; // JSON for phone
                isContactInfoValid = testContactPhone();    
                }
            }
        else {
            isContactInfo = 0;
            var contactInfo = "none";
            var contactType = "none";
            }
            
        // validate contact info
        if(isContactInfo != 0) {
            if(!(isContactInfoValid)) {
                errors += "Contact info is not valid. <br />";
                errFlag = true;
            }
        }
        
        
        // check empty
        if(!(testEmpty(eventName) && testEmpty(eventLoc) && 
            testEmpty(eventBegin) && testEmpty(eventEnd) 
            && testEmpty(eventDescrip))){
            errors += "A required field was empty! <br />";
            errFlag = true;
        }
        
        // check dates
        var re = /\d+-\d+-\d+ \d+:\d+/i;
        if(!(re.test(eventBegin) && re.test(eventEnd))){
            errors += "Dates are not valid! <br />";
            errFlag = true;
        }
        
        
        // decide wether to submit or not
        if(errFlag) {
            $('#eventPostErrors').empty().append(errors);
            $('#ajaxLoaderPostEvent').hide();

        } 
        else {
            console.log("Passes all validation");
            //now to geocode the address and check to see if it is OK
            var address = eventLoc;
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // status is good. Go ahead an submit form with the geocoded lat and lng
                    var party_position = results[0].geometry.location
                    var lat_event = party_position.lat();
                    var lng_event = party_position.lng();
                      
                    // format JSON
                    postEventData = {
                        latitude: lat_event,
                        longitude: lng_event,
                        eventName: eventName,
                        eventLocation: address,
                        eventBegin: eventBegin,
                        eventEnd: eventEnd,
                        eventDescription: eventDescrip,
                        isImageSubmitted: isImageBool,
                        imageFileName: imgFileName,
                        isContactInfoActive: isContactInfo,
                        contactInfoType: contactType,
                        contactInfoContent: contactInfo,
                        isFree : isFree,
                        eventPrice: eventCost,
                        eventCurrency: currencyType,
                        isOutdoors: outdoors,
                        homepageURL: homeURL,
                        tagsList: tagsList
                        };
                    
                    // ajax call to post our event
                    $.ajax({
                        type: "POST",
                        url: "./php/postevent.php", 
                        data: postEventData,
                        dataType: "json",
                        success: function(result){
                            var msg = result.message;
                            var successMsg = result.status;
                            //alert("Data returned: " + msg);
                            if(successMsg == 1){
                                // clear fields
                                clearPostEvent();
                                // hide the form
                                $('#postEventForm-wrapper').hide();
                                controlDimmer(-1);
                                
                                // load up events again.
                                load_events(latitude, longitude);
                                }
                            else {
                                $('#ajaxLoaderPostEvent').hide();
                                $('#eventPostErrors').empty().append(msg);
                                }
                        
                            }
                        });
            } // end if ok
            else {
                // status was NOT OK
                $('#eventPostErrors').empty().append("Google maps geocoder failed to respond...<br />");
                }// end Not OK else
            });// end geocoder.
        }// end main else
    }