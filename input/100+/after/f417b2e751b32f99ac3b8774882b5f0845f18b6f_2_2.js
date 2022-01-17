function compile(sections, sectionMap, enabledSections) {
	var src = '';
	var enabledSectionsWithDeps = calculateDependencies(sectionMap, enabledSections);
	v.each(v.filter(sections, function(s) {
		return enabledSectionsWithDeps[s.id] || !(s.configurable || s.dependency); 
	}), function(s){
		v.each(s.src, function(line) {
			var m = line.match(/^(\s*)\/\/\s*@cond\s+(\w+)\s*(.*)$/);
			if (m && enabledSections[m[2]])
				src += m[1] + m[3] + '\n';
			else
				src += line + '\n';
		});
	});
	return src;
}