function(){
					$self.addClass('mc-cycle');
					
					var cycleOptions = $.extend(settings.cycleOptions, {
						fit:1,
						height:$(window).height(),
						width:$(window).width()
					});
					
					$self.cycle( cycleOptions );
				}