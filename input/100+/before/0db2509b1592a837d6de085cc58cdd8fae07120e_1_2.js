function (event, checked) {

			if (checked) {

				if (!textinit){

					initText('#downspeed_limit_value');

				}

				$("#input").sfTextInput('option','text',$('#downspeed_limit_value').sfLabel("get").text());

				label = '#downspeed_limit_value';

				$('#input').sfTextInput('show');

				$('#input').sfTextInput('focus');

			}

	}