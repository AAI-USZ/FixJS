function () {

				this.paused = true;
				this.element[getElement]('.pause-upload').addClass('resume-upload').set('text', Locale[get]('uploadManager.RESUME')).style.display = '';
				this[fireEvent]('pause', this)
			}