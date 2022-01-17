function(response){
			console.log(response);
			read(response);
			$('#dictionary-add-view').toggleClass('slide');
			$('#add-dict').show();
		}