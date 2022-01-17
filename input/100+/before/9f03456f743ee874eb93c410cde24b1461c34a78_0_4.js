function(type) {
	var slide_data = { name : type, scene : null};
	switch(type) {
	case "problem":
		var scene_data = { animations : null, interactions : new Hash()};
		var image_data = specfactory.BuildingBlocksFactory.ImageData();
		image_data.source = "chara4.gif";
		image_data.source_size = { width : 32.0, height : 32.0};
		image_data.position = { x : 0.0, y : 0.0};
		var animation_data = specfactory.NovelFactory.AnimationData("image");
		animation_data.image_path = function(f) {
			return { x : 40 + 10 * Math.cos(f / 50), y : 50 + 5 * Math.sin(f / 60)};
		};
		animation_data.image_data = function(p) {
			image_data.position = p;
			image_data.angle += Math.PI / 360;
			image_data.angle %= 2 * Math.PI;
			image_data.frame += 1;
			return image_data;
		};
		scene_data.animations = [animation_data];
		slide_data.scene = scene_data;
		break;
	case "solution":
		break;
	case "finance":
		break;
	case "comparison":
		break;
	default:
		throw "Fuck you";
	}
	return slide_data;
}