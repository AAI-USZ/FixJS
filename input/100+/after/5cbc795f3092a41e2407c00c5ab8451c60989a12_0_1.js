function(scope, elm, attrs) {
			if (!elm[attrs.uiJq]) {
				Error('ui-jq: The "'+attrs.uiJq+'" function does not exist');
				return;
			}
			var evalOptions;
			if (uiConfig['jq'] && uiConfig['jq'][attrs.uiJq]) {
				if (angular.isObject(options) && angular.isObject(uiConfig['jq'][attrs.uiJq])) {
					angular.extend(options, uiConfig['jq'][attrs.uiJq]);
				} else {
					options = uiConfig['jq'][attrs.uiJq];
				}
			}
			if (attrs.uiOptions) {
				evalOptions = scope.$eval('['+attrs.uiOptions+']');
				if (angular.isObject(options) && angular.isObject(evalOptions[0])) {
					evalOptions[0] = angular.extend(options, evalOptions[0]);
				}
			}
			elm[attrs.uiJq].apply(elm, evalOptions);
		}