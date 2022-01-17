function (placeholderPath) {
            var contents = [];
            var typeUtils = aria.utils.Type;

            var providers = this._providers;
            for (var i = 0, ii = providers.length; i < ii; i++) {
                var provider = providers[i];
                var content = provider.getContent(placeholderPath);
                if (content) {
                    if (typeUtils.isArray(content)) {
                        for (var j = 0, jj = content.length; j < jj; j++) {
                            contents.push(content[j]);
                        }
                    } else {
                        contents.push(content);
                    }
                }
            }
            
            // Warn if no content has been found
            if (contents.length == 0) {
	            this.$logWarn(this.PLACEHOLDER_PATH_NOT_FOUND, [placeholderPath]);
            }
            
            return contents;
        }