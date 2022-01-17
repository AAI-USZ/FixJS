function (container, options) {
			this.container = $(container);
			this.options = $.extend(true, {}, this.options, options);

			this.wrapper = this.container.find(this.options.cls.wrapper);
			this.viewport = this.wrapper.find(this.options.cls.viewport);
			this.elements = this.viewport.find(this.options.cls.elements);
			this.navigation = this.container.find(this.options.cls.navigation);

			this.index = this.options.index;
			this.bound = this.elements.length;
			this.timer = function () {};

			this.triggerLeft = this.container.find(this.options.cls.leftTrigger);
			this.triggerRight = this.container.find(this.options.cls.rightTrigger);

			this._setup();
		}