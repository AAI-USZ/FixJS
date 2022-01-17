function() {
	var actions = ["problem","solution","finance","comparison"];
	var output = new Hash();
	var _g1 = 0, _g = actions.length;
	while(_g1 < _g) {
		var k = [_g1++];
		var act = actions[k[0]];
		var button = specfactory.NovelFactory.AnimationData("image");
		button.image_path = (function(k) {
			return function(f) {
				return { x : 5.0 + 5 * k[0], y : 2.0};
			};
		})(k);
		var image_data = specfactory.BuildingBlocksFactory.ImageData();
		image_data.source = "chara4.gif";
		image_data.source_size = { width : 32.0, height : 32.0};
		image_data.position = { x : 0.0, y : 0.0};
		image_data.size = { width : 5.5, height : 5.5};
		image_data.frame = k[0];
		button.image_data = ((function() {
			return function(i) {
				return (function() {
					return function(f) {
						return i;
					};
				})();
			};
		})())(image_data);
		output.set(act,button);
	}
	return output;
}