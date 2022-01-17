function EventHandler(view, options) {
	var self = {
	};
	
	$.extend(self, Bindable(view.bus || options.bus));
	return self; 
}