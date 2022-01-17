function (container, options) {
			var that = this;

			this.container = $(container);
			this.options = $.extend(true, {}, this.options, options);
			this.wrapper = this.container.find(this.options.cls.wrapper);
			this.viewport = this.wrapper.find(this.options.cls.viewport);
			this.elements = this.viewport.find(this.options.cls.elements);

			this.index = this.options.index;
			this.bound = this.elements.length;
			this.timer = function () {};

			this.triggerLeft = this.container.find(this.options.cls.leftTrigger);
			this.triggerRight = this.container.find(this.options.cls.rightTrigger);

			this._setup();

			// cancel if bound is bigger then containing items
			if(this.bound < Math.ceil(this.wrapper.outerWidth(true) / $(this.elements[0]).outerWidth(true))) {
				this.triggerLeft.hide();
				this.triggerRight.hide();
				return false;
			}

			// bind event for left triggers
			this.triggerLeft.bind('click', function (e) {
				e.preventDefault();
				that.moveLeft.call(that, e);
			});

			// bind event for right triggers
			this.triggerRight.bind('click', function (e) {
				e.preventDefault();
				that.moveRight.call(that, e);
			});

			// start autoplay
			if(this.options.timeout) this._autoplay();

			// add swipe event
			if(typeof($.fn.swipe) === "function" && (Cl.Utils.mobile() || Cl.Utils.tablet())) this._swipe();

			// init first
			this.move();
		}