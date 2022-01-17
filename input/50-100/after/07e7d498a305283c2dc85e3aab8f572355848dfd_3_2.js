function examAddMaterial(material, target) {
	if (material.Material)
		material = material.Material;
	
	$("<li class='material'>")
		.append($("<a>")
			.attr('href', '/fragenkatalog/materials/view/' + material.id)
			.attr('target', '_blank')
			.html(material.title)
		)
		.appendTo(target);
}