function() {
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
		return false;
	}