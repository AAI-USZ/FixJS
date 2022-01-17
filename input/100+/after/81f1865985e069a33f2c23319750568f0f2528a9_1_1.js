function(e){
				e.preventDefault();
				var tag = $(this).data('textstyle');
				if(tag === 'li') {
					var resp = textStyle.tryToCreateList($span);
					if(!resp) {
					// if there aren't any line breaks we didn't create a list
					// we activate the [li] button so that for every new click the span will be a <li> item
						$(this).toggleClass('active');
					}
				}

				var string = '';
				if(['b', 'i'].indexOf(tag)>=0) {
					$span.html(textStyle.format(tag, $span));
				} else if(['blockquote'].indexOf(tag)>=0) {
					textStyle.paragraph(tag, $span);
				} else if(['left', 'center', 'right'].indexOf(tag)>=0) {
					textStyle.align(tag, $span);
				} else if(tag === 'a') {
					textStyle.insertHiperlink(this, $span);
				} else if(tag === 'move') {
					$(this).toggleClass('active');
					if($span && $(this).hasClass('active')) {
						$('span').attr('contenteditable', 'false');
						$('section span').off('click', editSpan);
						$span.css({
							'cursor' : 'move',
							'position' : 'absolute',
							'width':'auto'
						});
						$(window).on('mousemove', function(e){
							var w = ( document.width - $('.slides').width() ) / 2;
							var x = e.clientX - w;
							
							$span.css({
								'top' : bHandler.round(e.clientY-80, 45),
								'left' : bHandler.round(x, 10)
							});
						});
						setTimeout(function(){
							$(window).on('click', function(e){
								console.log('triggered');
								e.stopPropagation();
								e.preventDefault();
								$span.css({
									'cursor' : 'text'
								});
								$(window).off('mousemove');
							});
						}, 500);
					} else {
						$(window).off('click');
						$('span').attr('contenteditable', 'true');
						$('section span').on('click', editSpan);
					}
				}

			}