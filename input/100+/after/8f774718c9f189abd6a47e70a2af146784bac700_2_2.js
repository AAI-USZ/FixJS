function(ev){

		ev.preventDefault();

		var email = encodeURIComponent($('#emailAddress').val());



		$.ajax({

			url: '/addEmail?email='+email,

			type: "GET",

			success: function(){

				$('#emailNotificationSent').removeClass('hidden');

				$('#emailNotificationError').addClass('hidden');

			},

			error: function(){

				$('#emailNotificationSent').addClass('hidden');

				$('#emailNotificationError').removeClass('hidden');

			}

		})

		return false;

	}