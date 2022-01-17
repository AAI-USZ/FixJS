function(id, success, error, options) {

			options = (options) ? options : {};

			var connector = this;

			connector._iterate( {
				method : connector._getTextContentByID,
				methodNode : connector._getTextContentByIDNode,

				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');

					var index = (opts.index) ? opts.index
							: this.options.contenthub.index;

					u += "/" + index.replace(/\/$/, '');
					u += "/store/raw";

					return u;
				},
				args : {
					id : id,
					// format : "application/json",
					format : "text/plain",
					options : options
				},
				success : success,
				error : error,
				urlIndex : 0
			});
		}