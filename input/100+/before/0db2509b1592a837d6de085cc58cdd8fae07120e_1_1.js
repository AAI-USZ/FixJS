function (event, checked) {

			if (checked) {

				if (!textinit){

					initText('#upspeed_limit_value');

				}

				$("#input").sfTextInput('option','text',$('#upspeed_limit_value').sfLabel("get").text());

				label = '#upspeed_limit_value';

				$('#input').sfTextInput('show');

				$('#input').sfTextInput('focus');

			}

	}