function(){

	var _box = jQuery(this);

	if(_box.is(':visible')){

		if(_box.children('.scroll-content').length == 0){

			var line_w = _options.lineWidth;

			/*--- init part ---*/

			var scrollBar = jQuery('<div class="scroll-bar"><div class="scroll-up"></div><div class="scroll-line"><div class="scroll-slider"><div class="scroll-slider-inner"><div class="scroll-slider-inner-stp"></div></div></div></div><div class="scroll-down"></div></div>');

			_box.wrapInner('<div class="scroll-content"><div class="scroll-hold"></div></div>').append(scrollBar);

			var scrollContent = _box.children('.scroll-content');

			var scrollSlider = scrollBar.find('.scroll-slider');

			var scrollSliderH = scrollSlider.parent();

			var scrollUp = scrollBar.find('.scroll-up');

			var scrollDown = scrollBar.find('.scroll-down');

			/*--- different variables ---*/

			var box_h = _box.height();

			var slider_h = 0;

			var slider_f = 0;

			var cont_h = scrollContent.height();

			var _f = false;

			var _f1 = false;

			var _f2 = true;

			var _f3 = false;

			var _t1, _t2, _s1, _s2;

			/*--- set styles ---*/

			_box.css({

				position: 'relative',

				overflow: 'hidden',

				height: box_h

			});

			scrollContent.css({

				position: 'absolute',

				top: 0,

				left: 0,

				zIndex: 1,

				height: 'auto'

			});

			scrollBar.css({

				position: 'absolute',

				top: 0,

				right: 0,

				zIndex:2,

				width: line_w,

				height: box_h,

				overflow: 'hidden'

			});

			scrollUp.css({

				width: line_w,

				height: line_w,

				overflow: 'hidden',

				cursor: 'pointer'

			});

			scrollDown.css({

				width: line_w,

				height: line_w,

				overflow: 'hidden',

				cursor: 'pointer'

			});

			

			slider_h = scrollBar.height();

			if(scrollUp.is(':visible')) slider_h -= scrollUp.height();

			if(scrollDown.is(':visible')) slider_h -= scrollDown.height();

			scrollSliderH.css({

				position: 'relative',

				width: line_w,

				height: slider_h,

				overflow: 'hidden',

				zIndex: 4

			});

			slider_h = 0;

			scrollSlider.css({

				position: 'absolute',

				top: 0,

				left: 0,

				width: line_w,

				height: slider_h,

				overflow: 'hidden',

				cursor: 'pointer'

			});

			

				

			box_h = _box.height();

			cont_h = scrollContent.height();

			if(box_h < cont_h){

				_f = true;

				slider_h = Math.round(box_h/cont_h*scrollSliderH.height());

				if(slider_h < 5) slider_h = 5;

				scrollSlider.height(slider_h);

				slider_h = scrollSlider.outerHeight();

				slider_f = (cont_h - box_h)/(scrollSliderH.height() - slider_h);

				_s1 = (scrollSliderH.height() - slider_h)/15;

				_s2 = (scrollSliderH.height() - slider_h)/3;

				scrollContent.children('.scroll-hold').css('padding-right', scrollSliderH.width());

			}

			else{

				_f = false;

				scrollBar.hide();

				scrollContent.css({width: _box.width(), top: 0, left:0});

				scrollContent.children('.scroll-hold').css('padding-right', 0);

			 }

			

			

			var _top = 0;

			/*--- element's events ---*/

			scrollUp.mousedown(function(){

										

				_top -= _s1;

				scrollCont();

				_t1 = setTimeout(function(){

					_t2 = setInterval(function(){

						_top -= 4/slider_f;

						scrollCont();

					}, 20);

				}, 500);

			}).mouseup(function(){

				if(_t1) clearTimeout(_t1);

				if(_t2) clearInterval(_t2);

			}).mouseleave(function(){

				

				if(_t1) clearTimeout(_t1);

				if(_t2) clearInterval(_t2);

			});

			scrollDown.mousedown(function(){

				_top += _s1;

				scrollCont();

				_t1 = setTimeout(function(){

					_t2 = setInterval(function(){

						_top += 4/slider_f;

						scrollCont();

					}, 20);

				}, 500);

			}).mouseup(function(){

				if(_t1) clearTimeout(_t1);

				if(_t2) clearInterval(_t2);

			}).mouseleave(function(){

				if(_t1) clearTimeout(_t1);

				if(_t2) clearInterval(_t2);

			});

			scrollSliderH.click(function(e){

				if(_f2){

					if(scrollSlider.offset().top + slider_h < e.pageY){

						_top += _s2;

					}

					else if(scrollSlider.offset().top > e.pageY){

						_top -= _s2;

					}

					scrollCont();

				}

				else{

					_f2 = true;

				}

			});

			var t_y = 0;

			scrollSlider.mousedown(function(e){

											

				t_y = e.pageY - $(this).position().top;

				_f1 = true;

			}).mouseup(function(){

				_f1 = false;

			}).mouseleave(function(){

				_f1 = false;

				});

			$('body').mousemove(function(e){

				if(_f1){

					 _f2 = false;

					 _top = e.pageY - t_y;

					 scrollCont();

				}

			}).mouseup(function(){

				_f1 = false;

				_f3 = false;

			});

			scrollSliderH.mousedown(function(){

				_f3 = true;

			}).mouseup(function(){

				_f3 = false;

			});

			if(window.attachEvent) document.body.attachEvent("onselectstart", function(){

				if(_f1 || _f3) return false;

			});

			_box.bind('mousewheel', function(event, delta){

				if(_f){

					_top -=delta*_s1;

					scrollCont();

					if((_top > 0) && (_top+slider_h < scrollSliderH.height())) return false;

				}

			});

			function scrollCont(){

				if(_top < 0) _top = 0;

				else if(_top+slider_h > scrollSliderH.height()) _top = scrollSliderH.height() - slider_h;

				scrollSlider.css('top', _top);

				scrollContent.css('top', -_top*slider_f);

			}

			this.scrollResize = function(){

				box_h = _box.height();

				cont_h = scrollContent.height();

				if(box_h < cont_h){

					_f = true;

					scrollBar.show();

					slider_h = Math.round(box_h/cont_h*scrollSliderH.height());

					if(slider_h < 5) slider_h = 5;

					scrollSlider.height(slider_h);

					slider_h = scrollSlider.outerHeight();

					slider_f = (cont_h - box_h)/(scrollSliderH.height() - slider_h);

					if(cont_h + scrollContent.position().top < box_h) scrollContent.css('top', -(cont_h - box_h));

					_top = - scrollContent.position().top/slider_f;

					scrollSlider.css('top', _top);

					_s1 = (scrollSliderH.height() - slider_h)/15;

					_s2 = (scrollSliderH.height() - slider_h)/3;

					scrollContent.children('.scroll-hold').css('padding-right', scrollSliderH.width());

				}

				else{

					_f = false;

					scrollBar.hide();

					scrollContent.css({top: 0, left:0});

					scrollContent.children('.scroll-hold').css('padding-right', 0);

				}

			}

			/*

			setInterval(function(){

				if(_box.is(':visible') && cont_h != scrollContent.height()) _box.get(0).scrollResize();

			}, 200);

			*/

		}

		else{

			this.scrollResize();

		}

	}

}