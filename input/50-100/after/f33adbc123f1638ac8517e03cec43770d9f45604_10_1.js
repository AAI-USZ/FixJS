function(scope, elm, attrs) {
		if (!attrs.ngModel) {
			throw Error('ui-reset depends on ng-model');
		}
		elm.wrap('<span class="ui-resetwrap" />').after('<a class="ui-reset" />').next().click(function(e){
			e.preventDefault();
			// This object is a 'parsed' version of the model
			var ngModel = $parse(attrs.ngModel);
			// This lets you SET the value of the 'parsed' model
			ngModel.assign(scope, null);
			scope.$apply();
		});
	}