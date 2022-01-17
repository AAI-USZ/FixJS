function() {

				if($(this).is('.red')){

					var timeout = setTimeout(function() {

						red_explanation('reserve')},

						2);

				}

				else if($(this).is('.red_expired')){

					var timeout = setTimeout(function() {

						red_explanation('expire')},

						2);

				}

			}