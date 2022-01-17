function() {
			
			// Clear out existing content
			VMM.attachElement(layout, "");
			
			// Get DOM Objects to local objects
			$slider = VMM.getElement("div.slider");
			$slider_mask = VMM.appendAndGetElement($slider, "<div>", "slider-container-mask");
			$slider_container = VMM.appendAndGetElement($slider_mask, "<div>", "slider-container");
			$slides_items = VMM.appendAndGetElement($slider_container, "<div>", "slider-item-container");
			
			// BUILD NAVIGATION
			buildNavigation();

			// ATTACH SLIDES
			buildSlides(data);
			
			/* MAKE SLIDER TOUCHABLE
			================================================== */
			
			var __duration = 3000;
			
			if (VMM.Browser.device == "tablet" || VMM.Browser.device == "mobile") {
				config.duration = 500;
				__duration = 1000;
				//VMM.TouchSlider.createPanel($slider_container, $slider_container, VMM.Lib.width(slides[0]), config.spacing, true);
				//VMM.TouchSlider.createPanel($slider_container, $slider_container, slides[0].width(), config.spacing, true);
				//VMM.bindEvent($slider_container, onTouchUpdate, "TOUCHUPDATE");
			} else if (VMM.Browser.device == "mobile") {
				
			} else {
				//VMM.DragSlider.createPanel($slider_container, $slider_container, VMM.Lib.width(slides[0]), config.spacing, true);
			}
			
			reSize(false, true);
			VMM.Lib.visible(navigation.prevBtn, false);
			goToSlide(config.current_slide, "easeOutExpo", __duration, true, !_active);
			
			_active = true;
		}