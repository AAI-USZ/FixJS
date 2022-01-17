function(e){
			e = new Event(e);

			this.layout.arrows.setStyle(
				'top', e.page.y - this.layout.slider.getTop() + this.snippet('slider') - arwH
			);
                        this.sliderDrag.call(this);
			this.layout.sliderDrag.start(e);
		}