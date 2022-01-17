function(scope, elm, attrs) {
		var init = true, // Only query the selected value's data when the plugin loads
			opts, // instance-specific options
			prevVal = '',
			loaded = false,
			ctrl = elm.data("$ngModelController");


		opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));
		if (attrs.multiple !== undefined) {
			opts.multiple = true;
			// Set the view and model value and update the angular template manually for the ajax/multiple select2.
		     elm.bind("change", function(){
		         ctrl.$setViewValue(elm.val());
		         scope.$apply();
		     });
		}

		function initialize(newVal) {
			setTimeout(function(){
				if (newVal !== undefined) {
					if (opts.ajax) {
						if (newVal && !$.isEmptyObject(newVal)) {
							if (init && opts.initial) {
								var url = opts.initial(opts.ajax.url, newVal, opts.multiple);
							    $http({ method: 'GET', url: url }).success(function(data, status, headers, config){
									data = opts.ajax.results(data);
									elm.select2('val', data.results || '');
								});
								init = false;
							}
						} else {
						    elm.select2('val', '');
						}
					} else {
						elm.select2('val', newVal);
					}
				}
			},0);
		}

		// Initialize the plugin late so that the injected DOM does not disrupt the template compiler
		// ToDo: $timeout service
		setTimeout(function(){
			elm.select2(opts);
			loaded = true;
			// If a watch was fired before initialized, set the init value
			initialize(prevVal);
		},0);

		// Watch the model for programmatic changes
		scope.$watch(attrs.ngModel, function(newVal, oldVal, scope) {
			if (newVal === prevVal) {
				return;
			}
			if (loaded) {
				initialize(newVal);
				if (attrs.multiple !== undefined && !newVal) {
				    // Push the model change to the view(only the null value in this case)
				    elm.select2('val', '');
				}
			}
			prevVal = newVal;
		});
		// If you want you can watch the options dataset for changes
		if (angular.isString(opts.watch)) {
			scope.$watch(opts.watch, function(newVal, oldVal, scope){
				if (loaded && prevVal) {
					setTimeout(function(){
						elm.select2('val', prevVal);
					},0);
				}
			});
		}
	}