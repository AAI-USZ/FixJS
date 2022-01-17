function() {

				if($(this).is('.red')){

					timeout = setTimeout(function() {

						red_explanation('reserve')},

						2);

				}

				else if($(this).is('.red_expired')){

					timeout = setTimeout(function() {

						red_explanation('expire')},

						2);

				}

			}