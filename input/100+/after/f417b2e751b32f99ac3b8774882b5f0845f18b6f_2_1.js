function(line) {
		if (inComment && /^.*\*\/\s*$/.test(line)) // end of comment ("*/")
			inComment = false;
		else if (inComment) {
			var l = line.replace(/^\s*\*?\s*/, '').replace(/\s*$/, '');
			var tagmatch = l.match(/^@[a-z]+/);
			if (tagmatch) { // comment tag found
				var tag = tagmatch[0].substring(1);
				var content = v.trim(l.replace(/^@[a-z]+\s*/, ''));
				if (tag == 'syntax')
					currentSection.syntax.push(content);
				else if (tag == 'requires') {
					if (content.length)
						v.each(content.split(/\s+/), function(c) {	currentSection.requires[c] = 1; });
				}
				else if (tag == 'params')
					currentSection.params.push({name: content.replace(/\s.*$/, ''), desc: content.replace(/^\S+\s+/, ''), funcs: []});
				else if (tag == 'return')
					currentSection.params.push({name: '@return', desc: content, funcs: []});
				else if (tag == 'function')
					currentSection.params[currentSection.params.length-1].funcs.push(content);
				else
					currentSection[tag] = (content != '') ? content : 1;
			}
			else if (currentSection.params.length) // in parameter
				currentSection.params[currentSection.params.length-1][1] += '\n' + l;
			else if (v.trim(l).length)// main description
				currentSection.desc += v.trim(l) + '\n';
		}
		else if (/^\s*\/\*\*/.test(line) && !/\*\/\s*$/.test(line)){ // start of comment ("/**" at start of line)
			inComment = true;
			sections.push(currentSection);
			currentSection = createSection();
		}
		else
			currentSection.src.push(line);
	}