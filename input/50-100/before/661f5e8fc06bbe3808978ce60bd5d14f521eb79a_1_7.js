function () {

				this.paused = false;
				this.failed = 0;
				this[element][getElement]('.pause-upload').removeClass('resume-upload')[set]('text', Locale[get]('uploadManager.PAUSE')).style.display = this.options.pause ? '' : 'none';
				this[fireEvent]('resume', this).upload()
			}