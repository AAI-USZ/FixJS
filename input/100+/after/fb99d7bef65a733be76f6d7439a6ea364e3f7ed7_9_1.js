function () {
		var data = this._frame;
		if (!data) {
			return;
		}

		// jc - fixed all the weirdness in the animation frame sliding code, was playing one extra for each slide
		// and one extra slide for the first frame
		if (++this._frame.frameNumberBetweenSlides === data.numberOfFramesBetweenSlides)
		{
			data.currentSlideNumber++;

			if (data.currentSlideNumber === data.currentReel.length)
			{
				if (this._frame.repeatInfinitly === true || this._frame.repeat > 0)
				{
					if (this._frame.repeat) this._frame.repeat--;
					this._frame.frameNumberBetweenSlides = 0;
					this._frame.currentSlideNumber = 0;
				}
				else
				{
					this.trigger("AnimationEnd", { reel: data.currentReel });
					this.stop();
					return;
				}
			}
			else
			{
				var pos = data.currentReel[data.currentSlideNumber];

				this.__coord[0] = pos[0];
				this.__coord[1] = pos[1];
				this._frame.frameNumberBetweenSlides = 0;
			}
		}

		this.trigger("Change");
	}