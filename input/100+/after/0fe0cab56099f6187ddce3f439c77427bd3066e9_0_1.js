function (obj, args) {
				args = Array.prototype.slice.call(args);
				args[1] = args[1] || {};

				var props, options, queue, animation;

				// Check for new syntax
				if (typeof args[1] === "object") {
					props = args[0];

					// Use passed in options, with fallbacks
					options = oCanvas.extend({
						duration: this.defaults.duration,
						easing: this.defaults.easing,
						queue: "default",
						callback: function () {}
					}, args[1]);

					// Parse the easing option
					if (typeof options.easing === "string") {
						// The cubic-bezier() syntax is now deprecated (though it was never really public)
						if (~options.easing.indexOf("cubic-bezier")) {
							options.easing = this.getCustomCubicBezier(options.easing) || this.easing[this.defaults.easing];
						} else {
							options.easing = this.easing[options.easing] || this.easing[this.defaults.easing];
						}
					} else if (typeof options.easing !== "function") {
						options.easing = this.easing[this.defaults.easing];
					}

					// Parse duration
					if (typeof options.duration === "string") {
						options.duration = (options.duration in module.durations) ? module.durations[options.duration] : module.durations[module.defaults.duration];
					}

				// Or parse old deprecated syntax
				} else {
					props = args.shift();
					options = this.getAnimateArguments(args);
				}

				// Create queue and get it
				queue = this.queues.create(obj, options.queue);

				// Create the animation object
				animation = {
					obj: obj,
					properties: props,
					startValues: {},
					diffValues: {},
					options: {
						queue: queue,
						duration: options.duration,
						easing: options.easing,
						callback: options.callback
					}
				};

				// Add the animation to the queue and run queue
				queue.add(animation);
				queue.run();
			}