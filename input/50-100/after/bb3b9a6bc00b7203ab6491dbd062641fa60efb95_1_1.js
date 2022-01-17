function() {
		if (arrsources.length > 0){
		$.ajax({
			type: 'POST',
			url: "/save/sources",
			data: JSON.stringify(arrsources)
			}).done(function(msg){
				console.log(msg);
				if (msg==1){
					window.location.reload();
				}
			});
		}
		else{
			alert('You must add atleast one folder to Library!');
		}
		return false;
	}