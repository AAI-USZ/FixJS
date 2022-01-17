function (event, checked) {

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

	}