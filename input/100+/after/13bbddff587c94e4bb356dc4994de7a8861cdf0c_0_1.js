function (){

		//$("#sendjson").html(JSON.stringify(this));

		var photoId = ($("#photoid").html()).toString();





		var postAddress = photoId + "/save";

		$.ajax({

			type: "POST",

			url: postAddress,

			data: { data: this.data.toString() }

		}).done(function( msg ) {

			if(msg == "1"){

				$("#sendjson").html("SAVED");

			}else if(msg == "0"){

				$("#sendjson").html("SAVED FAILED");

			}

			else{}

		});

	}