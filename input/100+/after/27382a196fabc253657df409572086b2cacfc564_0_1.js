function displayPatches(data) {
	var patches = data.patches;
	console.log(patches);
	var blocks = ['a', 'b', 'c', 'd'];
	$('#patchgrid').empty();
	$.each(
	patches, function(index, p) {
		var patch_name = p.patch.name;
		var patch_image = p.patch.image_url;
		var patch_id = p.patch._id;
		var k = index % 4;
		var cls = "ui-block-" + blocks[k];
		$('#patchgrid').append('<div class=' + cls + '> <a href="patch.html?id=' + patch_id + '" data-transition="none" data-ajax="false"><div class="patch"><img class="patchImg" src="' + patch_image + '"></div></a></div>');
	});
}