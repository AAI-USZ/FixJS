function compile(sections, sectionMap, enabledSections) {
	var enabledSectionsWithDeps = calculateDependencies(sectionMap, enabledSections);
	return v.filter(sections, function(s) {
		return enabledSectionsWithDeps[s.id] || !(s.configurable || s.dependency); 
	}).map(function(s){
		return s.src;
	}).join('\n');
}