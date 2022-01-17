f	var idTemplate = campaignConfig.idField,
		idField = idTemplate.replace('$1', monument.id),
		license = campaignConfig.defaultOwnWorkLicense,
		cats = campaignConfig.defaultCategories;
	
	
	var desc = '';
	desc += '=={{int:filedesc}}==\n';
	desc += '{{Information\n';
	desc += '|description=';
	//
	desc += '{{' + monument.language + '|1=' + description + '}}\n';
	desc += idField + '\n';
	//
	desc += '|date=' + dateYMD() + '\n';
	desc += '|source={{own}}\n';
	desc += '|author=[[User:Fixme|Fixme]]\n'; // @fixme
	desc += '|permission=\n';
	desc += '|other_versions=\n';
	desc += '|other_fields=\n';
	
	desc += '\n';
	
	desc += '=={{int:license-header}}==\n';
	desc += '{{self|' + license + '}}\n';

	desc += '\n';
	
	cats.forEach(function(cat) {
		desc += '[[Category:' + cat + ']]\n';
	});
	
	return desc;
}
