function (o,args) {
	o.pos = args.pos || [0,0,0];
	o.rot = args.rot || [0,0,0];
	o.rotOrder = args.rotOrder || o.rotOrder || [0,1,2];
	o.scale = args.scale || o.scale || [1,1,1];
	o.lastScaleString = false;
	o.lastRotString = false;
	o.transformedPointCache = [];
	o.transformedLineCache = [];
	o.boundingBox = [[0,0,0],[0,0,0]];
	o.shape = args.shape || o.shape;
	o.color = args.color || undefined;
	o.renderAlways = args.renderAlways || o.renderAlways || false;
	o.renderStyle = args.renderStyle || o.renderStyle || 'lines';//points, both
	o.pointScale = args.pointScale || o.pointScale || 2;
	o.pointStyle = args.pointStyle || o.pointStyle || 'fill';//stroke
	o.lineWidth = args.lineWidth || undefined;
	o.scene = false; //An object should know which scene it's in, if it would like to be destroyed.
	if (o.renderStyle === 'lines') {
		o.render = function () {
			o.scene.drawLines(o);
		}
	}else if (o.renderStyle === 'points') {
		o.render = function () {
			o.scene.drawPoints(o);
		}
	}else if (o.renderStyle === 'both') {
		o.render = function () {
			o.scene.drawLines(o);
			o.scene.drawPoints(o);
		}
	} else {
		throw 'Invalid renderStyle specified: ' + o.renderStyle;
	}
	o.destroy = NPos3d.destroyFunc;
}