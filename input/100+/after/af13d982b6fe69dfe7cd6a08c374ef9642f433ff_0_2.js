function() {
			this._upapproved = false;
			var self = this;
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
								if(self._unapproved == true) {
									$("#star").removeClass("pass");
									$("#star").css({
										opacity : 0.4
									});
								}	
							});	
						});	
					});
				});
			});
		}