function(textStyle, $, htmlEntites, bHandler, slideTemplate){
	console.log(bHandler);
	var Kreator = (function (options) {

		var slideX = 0, // to keep track of the current slide we're on
			slideY = 0, // to keep track of the current slide we're on
			$ = options.jquery,
			Reveal = options.reveal,
			dummyText = $('<span contentEditable></span>'), // this is the generic span in which gets added to the section you edit this to insert content
			$span,
			hljs = options.hljs;

		var init = function() {

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


		};

		var formatCode = function($s) {
			// a quick example of paste-code-and-automatically-format-it
			// highlightAuto returns an object if the pasted code is recognised
			$s.html($s.html().replace(/(<([^>]+)>)/ig,""));
			var result = hljs.highlightAuto($s.html());

			if(result.keyword_count > 2) {
				// more than 2 because words like `if` can be interpreted as code
				$s.replaceWith('<pre contentEditable><code contentEditable>'+result.value+'</code></pre>');
				var $code = $('code', getCurrentSlide());
				$code.on('click', function(e){
					e.stopPropagation();
				});
				var content = $code.html();
				$code.html(htmlEntites(content));
			}
		};

		var addContentToSlide = function() {

			if($('#custom-move').hasClass('active')) return;

			var d = dummyText.clone()
				.on('click', editSpan);

			var list = ($('.btn.active').attr('data-textstyle') === 'li');

			// in case the [li] button is active append a list item
			if(list) {
				d.html('<li>list item</li>');
			}

			if($span) {
				if($('li', $span).length && $('.btn.active').length) {
					var html = $span.html();
					$span.html(html + '<li>list item</li>');
				} else {
					d.appendTo(Kreator.getCurrentSlide())
						.trigger('click')
						.focus();
				}
			} else {
				d.appendTo(Kreator.getCurrentSlide())
						.trigger('click')
						.focus();
			}
		};
		
		var setSlideX = function(x) {
			slideX = x;
		};

		var setSlideY = function(y) {
			slideY = y;
		};

		var getLastSpan = function() {
			var s = Kreator.getCurrentSlide();
			var spans = $('span', s);
			return spans.eq(spans.length-1);
		};

		var getCurrentSlide = function() {
			var s = $('.present');
			if(!s.hasClass('stack')) {
				if(s.length > 1) {
					return s.eq(slideX);
				} else {
					return s;
				}
			}
			else {
				return $('section', s).eq(slideY);
			}
		};

		var getDownSlide = function() {
			var s = $('.slides>section').eq(slideX),
				c = $('section', s);
			if(!c.length) return 0;
			else {
				return c[this.slideY+1];
			}
		};

		var addSlideRight = function() {
			var s = this.getCurrentSlide();

			// if the current slide is the last slide on the X axis we append to the parent
			if($('.slides>section').length == slideX+1) {
				$('<section/>').on('click', addContentToSlide).appendTo('.slides');
			} else { // else we just append after the current element
				$('<section/>').on('click', addContentToSlide).insertAfter(s);
			}
		};

		var addSlideDown = function() {
			var s = this.getCurrentSlide();

			if(s.parent().hasClass('slides')) {
				var c = $('<section/>').append(s.html());
				var ns = $('<section/>');
				s.html('').append(c).append(ns);
			} else {
				$('<section/>').insertAfter(s);
			}
		};

		var editSpan = function(e) {
			console.log('editing span');
			e.stopPropagation();
			$span = $(this);
		};

		return {
			addSlideDown: addSlideDown,
			addSlideRight: addSlideRight,
			editSpan: editSpan,
			setSlideX: setSlideX,
			setSlideY: setSlideY,
			getCurrentSlide: getCurrentSlide,
			init: init
		};
	})({
		jquery: $,
		reveal: Reveal,
		hljs: hljs
	});

	return Kreator;
}