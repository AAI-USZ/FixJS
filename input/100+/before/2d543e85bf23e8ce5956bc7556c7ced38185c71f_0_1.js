function(){
    /* Fill in phone number at top of screen */
    try {
        var phoneNumberLabel = localStorage["phoneNumber"].replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        $('#phoneNumberDiv').html(phoneNumberLabel);
        $('#twiml-tabs a:first').tab('show');
    } catch(err) {
        // Do Nothing
    }
    /*
		Twilio Client stuff
	*/

	/* Create the Client with a Capability Token */
	  var clientToken = $("#token").val();
    Twilio.Device.setup(clientToken);
 
    /* Let us know when the client is ready. */
    Twilio.Device.ready(function (device) {
        //alert("Ready");
    });
 
    /* Report any errors on the screen */
    Twilio.Device.error(function (error) {
    	//alert("Error: "+ error.message)
    });
 
    Twilio.Device.connect(function (conn) {
    	//alert("Successfully established call")
    });
 
    /* Connect to Twilio when we call this function. */
    var call = function() {
	      params = {
	        "verb": "sms",
	        "demo": "true"
	      };
        Twilio.Device.connect(params)
    }

	/* Connect to Twilio when we call this function. */	
	
	var callPhone = function(){
    var verbType = $("#verb").val();
    
		var makeCall = $.post('/requestCall', 
				{
				  To: '+17863029603',
				  verb: verbType,
				  demo: 'true'
				  },
				function(data) {
					alert("Made call:" + data);
				}
			);
	}

	var hangup = function() {
	    Twilio.Device.disconnectAll();
	}

	$('#callButton').on('click', call);
	$('#hangupButton').on('click', hangup);
	
	/*
		Validating TwiML stuff
	*/

	var validateTwml = function() {
		var submittedTwiml = editor.getValue();
		var Module = {
			xml: submittedTwiml,
			schema: twimlSchema,
			arguments: ["--noout", "--schema", "file.xsd", "file.xml"]
		};
		var result = validateXML(Module).trim();
		alert(result);
		var verbType = $("#verb").val();
		if (result == "file.xml validates"){
			var makeCall = $.post('/requestCall', {
			    To: "+17863029603",
				  twimlBody: submittedTwiml,
				  verb: verbType,
				  demo: 'false'
			  },
				function(data) {
					alert("Made call:" + data);
				}
			);
  	} else {
  			alert("We're sorry. You can't make a call until your TwiML is valid. We have this error: \n" + result);
  	}
	};
	
	
	
	
	
	var validateTwml = function() {
		var submittedTwiml = editor.getValue();
		var Module = {
			xml: submittedTwiml,
			schema: twimlSchema,
			arguments: ["--noout", "--schema", "file.xsd", "file.xml"]
		};
		var result = validateXML(Module).trim();
		alert(result);
		var verbType = $("#verb").val();
		if (result == "file.xml validates"){
		  
		  params = {
		    "verb": "play",
        "demo": "false",
        "twimlBody": submittedTwiml
		  }
		  Twilio.Device.connect(params)
		  /*
			var makeCall = $.post('/requestCall', {
			    To: "+17863029603",
				  twimlBody: submittedTwiml,
				  verb: verbType,
				  demo: 'false'
			  },
				function(data) {
					alert("Made call:" + data);
				}
			); */
  	} else {
  			alert("We're sorry. You can't make a call until your TwiML is valid. We have this error: \n" + result);
  	}
	};
	
	
	
	
	
	
	$("#submitTwiml").on("click", validateTwml);
	
	var twimlSchema = '<?xml version="1.0" encoding="iso-8859-1" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:annotation><xs:documentation>Twilio API TwiML XML Schema Copyright Twilio Inc.		</xs:documentation></xs:annotation><xs:element name="Response"><xs:complexType><xs:sequence maxOccurs="unbounded" minOccurs="0"><xs:choice><xs:element name="Dial" type="DialType"></xs:element><xs:element name="Gather" type="GatherType"></xs:element><xs:element name="Hangup" type="HangupType"></xs:element><xs:element name="Play" type="PlayType" /><xs:element name="Pause" type="PauseType"></xs:element><xs:element name="Record" type="RecordType"></xs:element><xs:element name="Redirect" type="RedirectType"></xs:element><xs:element name="Reject" type="RejectType"></xs:element><xs:element name="Say" type="SayType"></xs:element><xs:element name="Sms" type="SmsType"></xs:element></xs:choice></xs:sequence><xs:attribute name="version" type="xs:string"></xs:attribute></xs:complexType></xs:element><xs:complexType name="PlayType"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="loop" type="xs:int"></xs:attribute></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="SayType" mixed="true"><xs:attribute name="loop" type="xs:int"></xs:attribute><xs:attribute name="voice" type="voiceType"></xs:attribute><xs:attribute name="language" type="xs:string"></xs:attribute></xs:complexType><xs:complexType name="GatherType"><xs:sequence maxOccurs="unbounded" minOccurs="0"><xs:choice><xs:element name="Play" type="PlayType"></xs:element><xs:element name="Say" type="SayType"></xs:element><xs:element name="Pause" type="PauseType"></xs:element></xs:choice></xs:sequence><xs:attribute name="numDigits" type="xs:int"></xs:attribute><xs:attribute name="finishOnKey" type="xs:string"></xs:attribute><xs:attribute name="method" type="methodType"></xs:attribute><xs:attribute name="action" type="xs:string"></xs:attribute><xs:attribute name="timeout" type="xs:int"></xs:attribute></xs:complexType><xs:simpleType name="methodType"><xs:restriction base="xs:string"></xs:restriction></xs:simpleType><xs:complexType name="DialType" mixed="true"><xs:sequence maxOccurs="unbounded" minOccurs="0"><xs:choice><xs:element name="Number" type="NumberType"></xs:element><xs:element name="Client" type="ClientType"></xs:element><xs:element name="Conference" type="conferenceType"></xs:element></xs:choice></xs:sequence><xs:attribute name="action" type="xs:string"></xs:attribute><xs:attribute name="callerId" type="xs:string"></xs:attribute><xs:attribute name="hangupOnStar" type="xs:string"></xs:attribute><xs:attribute name="method" type="methodType"></xs:attribute><xs:attribute name="record" type="xs:string"></xs:attribute><xs:attribute name="timeLimit" type="xs:int"></xs:attribute><xs:attribute name="timeout" type="xs:int"></xs:attribute><xs:attribute name="transcribe" type="xs:string"></xs:attribute><xs:attribute name="transcribeCallback" type="xs:string"></xs:attribute></xs:complexType><xs:complexType name="NumberType"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="sendDigits" type="xs:string"></xs:attribute><xs:attribute name="url" type="xs:string"></xs:attribute></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="ClientType"><xs:simpleContent><xs:extension base="xs:string"></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="RecordType"><xs:attribute name="action" type="xs:string"></xs:attribute><xs:attribute name="finishOnKey" type="xs:string"></xs:attribute><xs:attribute name="maxLength" type="xs:int"></xs:attribute><xs:attribute name="method" type="methodType"></xs:attribute><xs:attribute name="playBeep" type="xs:string"></xs:attribute><xs:attribute name="timeout" type="xs:int"></xs:attribute><xs:attribute name="transcribe" type="xs:string"></xs:attribute><xs:attribute name="transcribeCallback" type="xs:string"></xs:attribute></xs:complexType><xs:simpleType name="voiceType"><xs:restriction base="xs:string"><xs:enumeration value="man"></xs:enumeration><xs:enumeration value="woman"></xs:enumeration></xs:restriction></xs:simpleType><xs:simpleType name="reasonType"><xs:restriction base="xs:string"><xs:enumeration value="busy"></xs:enumeration><xs:enumeration value="rejected"></xs:enumeration></xs:restriction></xs:simpleType><xs:simpleType name="HangupType"><xs:restriction base="xs:string"></xs:restriction></xs:simpleType><xs:complexType name="PauseType"><xs:attribute name="length" type="xs:int"></xs:attribute></xs:complexType><xs:simpleType name="langType"><xs:restriction base="xs:string"><xs:enumeration value="en"></xs:enumeration><xs:enumeration value="es"></xs:enumeration><xs:enumeration value="fr"></xs:enumeration><xs:enumeration value="de"></xs:enumeration></xs:restriction></xs:simpleType><xs:complexType name="RedirectType"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="method" type="methodType"></xs:attribute></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="conferenceType"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="beep" type="xs:string"></xs:attribute><xs:attribute name="endConferenceOnExit" type="xs:string"></xs:attribute><xs:attribute name="maxParticipants" type="xs:string"></xs:attribute><xs:attribute name="method" type="methodType"></xs:attribute><xs:attribute name="muted" type="xs:string"></xs:attribute><xs:attribute name="startConferenceOnEnter" type="xs:string"></xs:attribute><xs:attribute name="url" type="xs:string"></xs:attribute><xs:attribute name="waitMethod" type="xs:string"></xs:attribute><xs:attribute name="waitUrl" type="xs:string"></xs:attribute></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="SmsType"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="from" type="xs:string"></xs:attribute><xs:attribute name="to" type="xs:string"></xs:attribute><xs:attribute name="action" type="xs:string"></xs:attribute><xs:attribute name="method" type="methodType"></xs:attribute><xs:attribute name="statusCallback" type="xs:string"></xs:attribute></xs:extension></xs:simpleContent></xs:complexType><xs:complexType name="RejectType"><xs:attribute name="reason" type="reasonType"></xs:attribute></xs:complexType></xs:schema>';
  $('.nav-tabs').button();
  
  
  
  /*
    Registering a new user locally
  */
  
  function checkDigits(num) {
    num = num.replace(/[^0-9]/g,'');
    return num.length==10;
  }
  
  var registerPhone = function() {
    var phone = $("#phoneNumber").val().trim();
    if (!checkDigits(phone)) {
      alert("Sorry, your number must contain 10 digits");
      return;
    }
    //alert("good");
    $("#phone-number-register").addClass("disabled");
    $("#phone-number-register").html("Saving...");
    //save it locally
    localStorage['phoneNumber'] = phone;
    localStorage['lesson'] = 'say';
    $("#phone-number-register").html("Saved!");
  }
  
  $("#phone-number-register").on("click", registerPhone);
}