function (params) {
			if (!params) { return; }

			if (params.urlIndex >= this.options.url.length) {
				params.error.call(this, "Could not connect to the given Stanbol endpoints! Please check for their setup!");
				return;
			}

			var retryErrorCb = function (c, p) {
				/* in case a Stanbol backend is not responding and
				 * multiple URLs have been registered
				 */
				return function () {
					console.log("Stanbol connection error", arguments);
					p.urlIndex = p.urlIndex+1;
					c._iterate(p);
				};
			}(this, params);

			if (typeof exports !== "undefined" && typeof process !== "undefined") {
				/* We're on Node.js, don't use jQuery.ajax */
				return params.methodNode.call(
						this, 
						params.url.call(this, params.urlIndex, params.args.options),
						params.args,
						params.success,
						retryErrorCb);
			}

			return params.method.call(
					this, 
					params.url.call(this, params.urlIndex, params.args.options),
					params.args,
					params.success,
					retryErrorCb);
		}