function() {

			options.right = $('<div data-direction="right">+</div>')
					.addClass('add-slide add-right')
					.on('click', function(){
						Kreator.addSlideRight();
						Reveal.navigateRight();
					});
			
			options.down = $('<div data-direction="bottom">+</div>')
					.addClass('add-slide add-down')
					.on('click', function(){
						Kreator.addSlideDown();
						Reveal.navigateDown();
					});

			$('body').append(options.right)
				.append(options.down);

			Reveal.addEventListener( 'slidechanged', function( event ) {
				Kreator.setSlideX(event.indexh);
				Kreator.setSlideY(event.indexv);
			});

			slideTemplate.init($('#select-template'));

			$('#select-template img').on('addLayout', function(){
				var s = Kreator.getCurrentSlide();
				slideTemplate.addLayout.call($(this), s, function(){
					$('span', s).each(function(el){
						console.log(el);
					})
				});
			});

			$('section').on('click', addContentToSlide);

			$('section span').on('click', editSpan);

			$('.btn-group a').on('click', function(e){
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
					bHandler.disableButtons($('a.enabled'));
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

			});

			$(window).on('mouseup', function(){
				var selection = (window.getSelection()).toString();
				if(!selection.length) return;
				else {
					bHandler.enableButtons($('a.disabled'));
				}
			});

			$('#select-dimensions').on('change', function(){
				var tag = $(this).val(),
				string = textStyle.paragraph(tag, $span);
				if(string) $span.html(string);
			});

			$('#fullscreen').on('click', bHandler.toggleFullscreen);

			$(window).on('paste', function(e){
				setTimeout(function(){formatCode($span);}, 100);
			});

			$('#remove').on('click', function(){
				$span.remove();
				// get the last span on the current slide 
				// if there is one after the removal
				$span = getLastSpan();
			});

			// show hide the layout selection
			$('.templates button').on('hover', function(){
				$('#select-template').addClass('show-templates');
				$('#select-template').on('mouseleave', function(){
					$(this).removeClass('show-templates');
				});
			});


		}