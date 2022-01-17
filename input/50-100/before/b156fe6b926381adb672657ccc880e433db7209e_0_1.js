function(e){
			e.preventDefault();
			// This object is a 'parsed' version of the model
			var ngModel = $parse(attrs.ngModel);
			// This lets you SET the value of the 'parsed' model
			ngModel.assign(scope, null);
			scope.$apply();
		}