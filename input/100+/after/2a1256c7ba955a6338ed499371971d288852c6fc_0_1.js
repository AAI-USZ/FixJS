function(e){
								
									var dot0 = e.pageX;
									var thebar = $(this).offset().left;
									
									if($(this).data('activated')[0] && $(this).data('activated')[1]){
										
										var dot1 = $(this).children(".noUi_lowerHandle").offset().left;
										var dot2 = $(this).children(".noUi_upperHandle").offset().left;
										
										var z = (dot1 + dot2) / 2;

										if ( dot0 > z ){
											$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
										} else {
											$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
										}

									} else {
										if ($(this).data('activated')[0]){
											$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
										}
										if ($(this).data('activated')[1]){
											$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
										}
									}
									
									if(settings.bar&&settings.bar!='off'){
										rebuildMidBar(element);
									}
									
									if ( typeof(options.tracker) == "function" ){ options.tracker.call(this); }
									if ( typeof(options.clickmove) == "function" ){ options.clickmove.call(this); }
									if ( typeof(options.change) == "function" ){ options.change.call(this); }
									
									e.stopPropagation();

								}