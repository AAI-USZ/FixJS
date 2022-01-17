function SidePanel(options) {
	var self = {
		elem: $('.'+options.elemClass),
		setColor: function(color) {
			this.select($('.color a.'+color));
		},
		
		select: function(element) {
			element.siblings().addClass('disabled');
			element.removeClass('disabled');			
		}
	};
	$.extend(self, View());
	var handler = SidePanelHandler(Selectable(self), options);
	handler.enable();
	$('.'+options.elemClass+'.default').trigger('click');
}