function Botprint() {
	var radio	= Bindable();
	var canvas  	= Canvas2D({elemID: 'canvas2d', app: radio});
	var preview 	= Preview3D({elemID:'preview3d', app: radio});
	var sidePanel	= SidePanel({elemClass: 'palette-set a', app: radio});

	var self = {
		VERSION: '0.0.2',
		play: function() {
			preview.animate();
		}
	};
	
	return self;
}