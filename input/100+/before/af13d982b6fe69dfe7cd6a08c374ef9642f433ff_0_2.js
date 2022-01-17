function() {
			$("#star").addClass("pass");
			$("#star").animate({
				opacity: 1
			},300, function(){
				$("#star").animate({
					opacity: 0.2
				},300,function() {
					$("#star").animate({
						opacity: 1
					},500,function() {
						$("#star").animate({
							opacity: 0.2
						},300,function() {
							$("#star").animate({
								opacity: 1
							},500,function(){

							});	
						});	
					});
				});
			});
		}