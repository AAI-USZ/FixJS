function(){
			// var butt_text = ["Change the World",'Make a million','Be famous','Start a Business','Make a startup','Do something','New weekend project'];
			// $('#button').attr('value',Gen.butt_text[Math.floor(Math.random()*butt_text.length)]);
			$('#button').attr('value',Gen.random(Gen.button_text.length));
		}