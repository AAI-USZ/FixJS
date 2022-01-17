function on_orientation_change() {
						if(orientation == '0' || orientation == '180') {
							$('#UCFHBHeader div.UCFHBWrapper').width('768px');
							$('body').scrollLeft(0)
							$('#blueprint-container').width('768px');
							$('#header-wrap.front-page').width('768px');
							if(!$('#front-page').length) {
								$('body').css('zoom', '.65');
							}
						} else {
							$('#UCFHBHeader div.UCFHBWrapper').width('974px');
							$('#blueprint-container').width('950px');
							$('#header-wrap.front-page').width('100%');
							if(!$('#front-page').length) {
								$('body').css('zoom', '1');
							}
						}
					}