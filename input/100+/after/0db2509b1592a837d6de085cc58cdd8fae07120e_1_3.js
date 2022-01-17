function () {

	

	$('#downspeed_limit_label').sfLabel({text: "Limit down speed"});

	$('#upspeed_limit_label').sfLabel({text: "Limit up speed"});

	$('#download_path_label').sfLabel({text: "Download path: "});

	

	$('#upspeed_limit_value').sfLabel({text: "..."});

	$('#downspeed_limit_value').sfLabel({text: "..."});

	$('#download_path_value').sfLabel({text: "/dtv/usb/sda1/..."});

	

	$('#browseButton').sfButton({

			text: 'Change path..'

	});

	

	 $('#upspeed_limit_toggle').sfToggleButton({

		}).sfToggleButton('addCallback', 'changed', function (event, checked) {

			if (checked) {

				if (!textinit){

					initText('#upspeed_limit_value');

				}

				$("#input").sfTextInput('option','text',$('#upspeed_limit_value').sfLabel("get").text());

				label = '#upspeed_limit_value';

				$('#input').sfTextInput('show');

				$('#input').sfTextInput('focus');

			} else {

					$('#upspeed_limit_value').sfLabel("option","text","0");

					var settings_url = tv_url + "/settings:" + $('#upspeed_limit_value').sfLabel("get").text() + ":" +

											  + $('#downspeed_limit_value').sfLabel("get").text() + ":" +

											  + $('#download_path_value').sfLabel("get").text();

					sendHttp(settings_url);

			}

	});

	

	$('#downspeed_limit_toggle').sfToggleButton({

		}).sfToggleButton('addCallback', 'changed', function (event, checked) {

			if (checked) {

				if (!textinit){

					initText('#downspeed_limit_value');

				}

				$("#input").sfTextInput('option','text',$('#downspeed_limit_value').sfLabel("get").text());

				label = '#downspeed_limit_value';

				$('#input').sfTextInput('show');

				$('#input').sfTextInput('focus');

			} else {

					$('#downspeed_limit_value').sfLabel("option","text","0");

					var settings_url = tv_url + "/settings:" + $('#upspeed_limit_value').sfLabel("get").text() + ":" +

											  + $('#downspeed_limit_value').sfLabel("get").text() + ":" +

											  + $('#download_path_value').sfLabel("get").text();

					sendHttp(settings_url);

			}

	});

	

	index = new Array('#upspeed_limit_toggle','#downspeed_limit_toggle','#browseButton');

	

	var _THIS_ = this;

	$('#popup').sfPopup({

			text: "Please enter a valid number",

			buttons: "OK",

			callback: function(){

			$(index[_THIS_.row]).sfToggleButton('toggle');

		}

	});

	

	textinit = false;

	settingsResult = "";

	

	this.row = 0;

}