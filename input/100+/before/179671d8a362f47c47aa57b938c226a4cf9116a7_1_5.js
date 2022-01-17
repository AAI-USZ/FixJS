function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    // status is good. Go ahead an submit form with the geocoded lat and lng
                                    var party_position = results[0].geometry.location
                                    var lat_event = party_position.lat();
                                    var lng_event = party_position.lng();
                                    
                                    // image uploading info:
                                    
                                    var isImageBool = 0;
                                    if(isImage == 1) 
                                        isImageBool = 1;
                                    else 
                                        isImageBool = 0;
                                    
                                    console.log("is there an image: " + isImage);
                                    
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
                                        contactInfoContent: contactInfo
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
                                                //alert("Event Posted Successfully!");
                                                $('#ajaxLoaderPostEvent').hide();
                                                
                                                $('#postEventForm-wrapper').hide();
                                                controlDimmer(-1);
                                                //$('#postEventSuccess').show();
                                                load_events(latitude, longitude);
                                                
                                                // clear out the form fields on success
                                                $('#eventName').val("");
                                                $('#eventLocation').val("");
                                                $('#eventDateBegin').val("");
                                                $('#eventDateEnd').val("");
                                                $('#eventDescription').val("");
                                                $('#imgFileLocation').val("");
                                                $('#isThereImage').val("0");
                                                
                                                $('#allowContactEvtent').removeAttr("checked");
                                                $('#eventPostErrors').empty();
                                                }
                                            else {
                                                $('#ajaxLoaderPostEvent').hide();
                                                $('#eventPostErrors').empty().append("\
                                                <font color='red'>" + msg + "</font>");
                                                }
                                        
                                            }
                                        });
                                    }
                                else {
                                    $('#ajaxLoaderPostEvent').hide();
                                    $('#eventPostErrors').empty().append("\
                                    <font color='red'>That address is not valid!</font>");
                                    }
                                }