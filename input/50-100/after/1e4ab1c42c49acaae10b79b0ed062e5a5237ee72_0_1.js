function(){
				var s = Kreator.getCurrentSlide();
				slideTemplate.addLayout.call($(this), s, function(){
					$('span', s).each(function(el){
						console.log(el);
					})
				});
			}