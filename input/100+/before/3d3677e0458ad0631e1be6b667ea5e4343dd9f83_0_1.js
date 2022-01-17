function on_orientation_change() {
						if(orientation == '0' || orientation == '180') {
							$('#UCFHBHeader div.UCFHBWrapper').width('768px');/*
							$('body').scrollLeft(0)
							$('.container').width('768px');
							$('#header-wrap.front-page').width('768px');
							*/
							if(!$('#front-page').length) {
								$('body').css('zoom', '.65');
							}
						} else {
							$('#UCFHBHeader div.UCFHBWrapper').width('974px');
							$('.container').width('950px');
							$('#header-wrap.front-page').width('100%');
							$('#footer').css({'height':'180px','padding':'10px 0'});
							$('body').css('overflow-y', 'hidden');
							if(!$('#front-page').length) {
								$('body').css('zoom', '1');
							}
						}
					}