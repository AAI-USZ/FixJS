f
    // STOP ALL <a> clicks
    
    $("a.noclick").click( function(event) {
            console.log("removed click for a link");
            event.preventDefault();
        });

    /** Binding POST ajax  a trick to bind fucking everything new:**/
    /*  Decent explanation:
     *  http://stackoverflow.com/questions/8752321/jquery-live-vs-on-method-for-adding-a-click-event-after-loading-dynamic-ht
     *  so go like: $("parent that does not change").on("event", "child that does change", function() {
     */
    $("body").on("mouseover mouseoff", '.eventSingle', function(e){

        $("a.noclick").click( function(event) {
            //console.log("removed click for a link");
            event.preventDefault();
        });
        
    /** image mouse overs **/
    
        $('.btnShowMap').mouseover( function() {
            //console.log("hovered map btn");
            $(this).attr('src','images/buttons/btns_content/btn_map_active.png');
        });
        
        $('.btnShowMap').mouseout( function() {
            $(this).attr('src','images/buttons/btns_content/btn_map_inactive.png');
        });
        
    /** event feed mouseovers **/
    
        $('.eventSingle').mouseover( function() {
            //console.log("hovered event");
            $(this).css("background-color", "white");
            
            });
        
        $('.eventSingle').mouseout( function() {
            $(this).css("background-color", "#F8F8F8");
            });
            
    /*** Modify the X button on the single event viewer to be in the top right corner of the singleEvent Viewer
     ***/ /*
        $('.eventSingle').click( function() {
            console.log("repositioned closer");
            var topOff = $('#singleEventWrapper').offset().top;
            var leftOff = $('#singleEventWrapper').offset().left;
            leftOff += $('#singleEventWrapper').width();
            $('#singleEventCloser').css({
                position: "absolute",
                zIndex: "500",
                top: String(topOff) + "px",
                left: String(leftOff) +"px"
                });
        });  */
    
    });
    
    
    $('body').on("mouseover mouseoff", "#loginMainForm", function() {
    
        $("#loginMainForm").submit(function(event) {
        console.log("submitting signin");
        event.preventDefault();
        signIn();
        });
        
        // SIGNUP BUTTON!
        // this needs to be .on'ed also!
        $('#signupBtn').toggle(function(){
            $('#signupPanel').show();
            },
            function(){
            $('#signupPanel').hide();
            }
        );
    });




    /*
    //modify search bar to change size with window
    var width = $(window).width();
    $('#srch_bar').attr({size: width*0.04});
    */
    
    //Shows Login Panel
        $('#advancedButton').toggle(
        function() {
            $('#advancedPanel').show();
            $(this).rotate(-90);
            //$('#dimmer').show();
            //$(this).addClass('close');
        },
        function() {
            $('#advancedPanel').hide();
            $(this).rotate(0); //haha it rotates with regards to original position...
            //$(this).removeClass('close');
            //$('#dimmer').hide();
            }
        ); // end toggle
        
    // another listener for if you click login message  
        $('.login_msg').toggle(
        function() {
            $('#advancedPanel').show();
            $('#advancedButton').rotate(-90);
            //$('#dimmer').show();
            //$(this).addClass('close');
        },
        function() {
            $('#advancedPanel').hide();
            $('#advancedButton').rotate(0); //haha it rotates with regards to original position...
            //$(this).removeClass('close');
            //$('#dimmer').hide();
            }
        );
        
    
    // geolocation scripting see -> location_detection.js
/**** MAP/ LOCATION SCRIPTING ****/
    get_location();
    //$('#map_wrapper').hide();
    

/**** EVENT POSTING SCRIPTING ***/
    //$('#postEventForm-wrapper').hide();
    
    
/*** login ***/

    $("#loginMainForm").submit(function(event) {
        console.log("submitting signin");
        event.preventDefault();
        signIn();
        });

/*** search ***/

    $("#searchBarForm").submit( function(event) {
        event.preventDefault();
        console.log("searching");
        // some call to a search function goes here.
        var searchTerm = $('#searchBarAuto').val();
        console.log("searching: " + searchTerm);
        mainSearch(searchTerm);
    });
    
    // this is for the search. Just testing for now. Remote data source next.
    // need to write a remote data scource that looks throught stuff in DB
    // just a php script to scan titles and descriptions and addresses?
        
        $("#searchBarAuto").autocomplete({
            source: "php/autocomplete-backend.php",
            minLength: 1,
            select: function( event, ui ) {
                console.log( ui.item ?
                    "Selected: " + ui.item.value + " aka " + ui.item.id :
                    "Nothing selected, input was " + this.value );
            }
        });
    
    
/**** SIGNUP SUBMISSION STUFF BELOW:  ****/
    // CHECK FOR VALID EMAIL    
        $('#email').keyup(function(){
            var email = $('#email').val();
            
            // returns BINARY - 1 = not matched = good
            // This is the nasty bit:
            //var res = 1;//find_email(email);
            var re = /\S+@\S+/g;
            
            // PROMISE FROM AJAX CALL
            var promise = find_email_prom(email);
            
            promise.success(function (data) {
                var res = data;
                if(res == 0 && re.test(email))
                    $("#emailIsValid").empty().append("<font color='green'>good</font>");
                else
                    $("#emailIsValid").empty().append("<font color='red'>bad</font>");
                    
            }); 
        });

    // check for password len
    $('#password').keyup(function(){
        var pass1 = $('#password').val();
       // console.log(pass1);
        if(pass1.length < 8)
            $('#password1Validating').empty().append("<font color='red'>too short...</font>");
        else
            $('#password1Validating').empty().append("<font color='green'>good</font>");

    });
    
    // check psswd match
    $('#passwordcheck').keyup(function(){
        var pass1 = $('#password').val();
        var pass2 = $('#passwordcheck').val();
       // console.log(pass1 + pass2);
        if(pass1 == pass2)
            $('#password2Validating').empty().append("<font color='green'>match!</font>");
        else
            $('#password2Validating').empty().append("<font color='red'>not a match</font>");
    });
            
            
/*** POSTING EVENT ACCORDION ***/
//$( "#accordion" ).accordion();


$('.accordion .head').click(function() {
        $(this).next().toggle("fast");
        return false;
    }).next().hide();
    
   // restricts so only one is open at a time. 
$('.accordion .head').click(function() {
    $('.accordion .head').next().hide();
    $(this).next().show();
    
    $('.accordion .head').css({fontSize:"100%"});
    $(this).css({fontSize:"150%"});
});
          
          
$('#selectTags').change(function(){
    console.log($('#selectTags').val());
    var newTag = $('#selectTags').val();
    var oldTags = $('#txtTagsInpt').val();
    
    if(oldTags.length > 50) {
       $('#lblTagInputErrors').empty().append("<font color='red'>tags too long</font>");
    }
    else {
        if(oldTags != "") 
            oldTags = oldTags + "," + newTag;
        else
            oldTags = newTag;
        $('#lblTagInputErrors').empty().append("<font color='green'>tag added</font>");
        }
    $('#txtTagsInpt').val(oldTags);
    });
            
            
/*** POSTING EVENT DATA PICKER ***/ 
        
    // "%Y-%m-%d %h:%i %p" <-- w/ am and pm
    // 
    $("#eventDateBegin").AnyTime_picker({ 
        format: "%Y-%m-%d %h:%i %p",
        formatUtcOffset: "%: (%@)",
        hideInput: false 
        });
    
    $("#eventDateEnd").AnyTime_picker({
        format: "%Y-%m-%d %h:%i %p",
        formatUtcOffset: "%: (%@)",
        hideInput: false            //change later only for dev purposes
          //placement: "inline" 
        });
    
    
    
    $("#eventDateBegin").change(function() {
        var dateBeginAgain = $("#eventDateBegin").val();
        // push date ahead 3 hrs.
        // 0123-56-89- 10/11:
        // looks lke this: 2012-06-24 04:04 PM ... too complicated for shitty broswers.
        var yrMoDay = dateBeginAgain.substr(0,10);
        var origHours = dateBeginAgain.substr(11,2);
        var origMins = dateBeginAgain.substr(14,2);
        var origAmPm = dateBeginAgain.substr(17,2);
        
        if(origAmPm == "PM") {
            origHours = parseInt(origHours) + 12;
        }
        console.log("converted to 24 hours time:" + origHours + ":" + origMins);
        dateBeginAgain = yrMoDay + " " + origHours + ":" + origMins;
        
        // push date ahead 3 hrs
        var newTime = strtotime(dateBeginAgain) + 60*60*3; // + 3 hrs
        console.log("parsed date string to:" + newTime + " from:" + dateBeginAgain);
        var d = new Date(newTime * 1000);
        
        var month = d.getMonth() + 1;
        if(month < 10)
            month = "0" + month.toString();
        var day = d.getDate();  
        if(day < 10)
            day = "0" + day.toString();
            
        // hours: 
        var amPm = "AM";
        var hrs = d.getHours();
        if(hrs < 10)
            hrs = "0" + hrs.toString();
        if(hrs > 12) {
            hrs = hrs - 12;
            amPm = "PM";
            }
        var mins = d.getMinutes();
        if(mins < 10) 
            mins = "0" + mins.toString();
        var newDateEnd = d.getFullYear() + "-" + month + "-" + day + " " + hrs + ":" + mins + " " + amPm;
        console.log(newDateEnd);
        $("#eventDateEnd").val(newDateEnd);
        
        // Check if 45 days ahead
        var dateNow = new Date();
        console.log("date seconds" + d.getTime() + " now seconds:" + dateNow.getTime());
        if(d.getTime() - dateNow.getTime() > 60*60*24*45*1000) {
            $('#lblEventDateErrors').empty().append("<font color='red'>Warning: events more than 45 days ahead will not show up in the default searches.</font>");
        }
        else 
            $('#lblEventDateErrors').empty();
        });
    
    
    
    // char count for the description
    $('#eventDescription').keyup(function(){
        var txt = $('#eventDescription').val();
        var count = txt.length;
        if(count >= 500) {
            $('#descriptionCount').empty().append("<font color='red'>" + count + "</font>");
            }
        else {
            $('#descriptionCount').empty().append("<font color='green'>" + count + "</font>");
            }
        });
        
        
    // checkbox for contacting:
    $('#contactingOptions').hide();
    
    $('#allowContactEvtent').change( function(){
        var contact = $('#allowContactEvtent').attr('checked');
        console.log("contact value=" + contact);
        if(contact == "checked"){
            $('#contactingOptions').show();
            }
        else {
            $('#contactingOptions').hide();
            }
        });
    
    $('#eventContactType').change( function() {
        var valType = $('#eventContactType').val();
        if(valType == "email") {
            $('#contactInfo').empty().append("<input type='text' size='15' id='emailContactInfo' /><br />");
            }
        
        if(valType == "phone") {
            $('#contactInfo').empty().append(
            "<input type='text' size='3' maxlength='3' id='phone1ContactInfo' />\
            <input type='text' size='3' maxlength='3' id='phone2ContactInfo' />\
            <input type='text' size='4' maxlength='4' id='phone3ContactInfo' />\
            <br />");
            }
        });
    
    // event tags
    $('#eventTagsChoices').hide();
    $('#eventTags').click( function() {
        $('#eventTagsChoices').show();
        console.log("tags clicked");
        });
    
    

/**** EVENT EDITING WINDOW ****/


/*** SINGLE EVENT MAP ***/

    //$('#EventMapWrapper').hide();
    //$('#EventDirections').hide();
    
    
/*** MY EVENTS ***/
    //$('#myEventsWrapper').hide();
    
/*** Hotkey to close out pop-up ***/
    $(document).keydown(function(e){
        //console.log("keypress");
        //console.log(e.keyCode);
        if(e.keyCode == 27) {
            //console.log("escape key");
            controlDimmer(-10);
            // kill all the popups:
            $('.popup').hide();
        }
    }); 
    


/*** FOOTER popups ***/
    //$('#aboutWaanoo').hide();
    //$('#contactWaanoo').hide();
    
    
/*** ajax loaders ***/

    $('#ajaxLoaderLoadEvents').hide();
    $('#ajaxLoaderLoadMore').hide();
    $('#ajaxLoaderPostEvent').hide();
    $('#ajaxLoaderSignUp').hide();
    
    
/*** IMG UPLOADER ***/

$('#uploader').click(function() {
                
    var w = window.open("php/imgPopupForm.php", "Photo Uploader!", "width=500,height=500,left=200,top=100");
    
    var watchClose = setInterval(function() {
        try {
            if (w.closed) {
             clearTimeout(watchClose);
             //Do something here...
        /*
         *
        Steps:
        -have JS set a cookie if the image uploads OK/ or session variable???
        -IF OK:
        -get the link for the image and show a thumbnail here
        -then set the location of the image temporarily 
        -if the user posts the event, the PHP script, takes the location of the image
        copies it to a permenant location, resizes image: thumbnail, lrg
        then finally we store these links in the DB.
        */
            var file = $('#imgFileLocation').val();
            console.log("img uploader window closed!");
            $("#imgUploadedSpot").empty().append("<img src='images/img_temp/" + file + "' width='100' />");
            }
        } catch (e) {}
     }, 100);
     
});
    
    
/***fb auth ***/
    
    /*

    $('#facebookBtn').click( function() {
       // var pos = screenCenterPos(800, 500);
        var url = 'fb/channel.php';
        signinWin = window.open(url, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + ($(window).width() / 2) + ",top=" + ($(window).height() / 2));
        setTimeout(CheckLoginStatus, 2000);
        signinWin.focus();
        return false;
        }); 
    
    */
/*** IMG BUTTON SWAP ***/

    
    
    
        
});  // end ready
