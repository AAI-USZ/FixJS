function (existingDoodle){

		for(var i=0;i<existingDoodle.length;i++){

			$('#doodleSelector').append("<div><img src=" + existingDoodle[i].profile_photo_url + "align='middle'><input type='checkbox' class= 'selectorCheckbox' checked='yes' value=" + i + " /><br>"+ existingDoodle[i].user_name+"</div>");

		}

	}