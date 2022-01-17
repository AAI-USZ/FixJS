function load(content, type, line) {
		if (editor) {
			console.log('loading', content, type, line);
			editor.setInput(resource.url, null, content);
			// editor.setOption('mode', (type === 'script' ? 'javascript' : 'css'));
			// editor.setCursor({line:line||0, ch:0});
		} else {
			buffer = {content:content, type:type, line:line};
			console.log('buffering load', buffer);
		}
	}