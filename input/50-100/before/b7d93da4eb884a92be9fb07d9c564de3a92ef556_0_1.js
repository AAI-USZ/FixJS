function(file) {
		if (file[0] === '.') {return;}
		file = file.split('.');
		if (file.length > 1 && file.pop() === 'js') {
			file = file.join('.');
			file = path.join(modelPath, file);
			models[path.basename(file)] = file;
		}
	}