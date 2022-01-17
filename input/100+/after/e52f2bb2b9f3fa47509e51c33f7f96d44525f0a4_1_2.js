function($, undefined){
	return {
		buildElement : function(elementType, elementInst, params) {
			if(elementType) {
				if(App.UI.Library.elementType === undefined) {
					var c = App.UI.Library[elementType],
						h = new c(elementInst, params);
					if(h.hasOwnProperty('init')) {
						return h.init();
					} else {
						if(App.Settings.Debug.enabled) {
							console.warn('Ui Builder: Library item ' + elementType + ' must have `init` function.');
						}
					} 
				} else {
					if(App.Settings.Debug.enabled) {
						console.warn('Ui Builder: element type ' + elementType + ' is not defined.');
					}
				}
			} else {
				if(App.Settings.Debug.enabled) {
					console.warn('Ui Builder: Element type is not defined!');
				}
			}
		}
	}
}