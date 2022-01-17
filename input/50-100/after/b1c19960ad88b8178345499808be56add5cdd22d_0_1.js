function (element, index, array){
			// Require each file, skipping dotfiles.
			if (_fs.lstatSync(_path.join(path, element)).isFile() && element.substring(0,1) !== "."){
				trimmedName = _path.basename(element, _path.extname(element));
				module = require(_path.join(path, trimmedName));			
				moduleList.push(module);
				obj[trimmedName] = module;
			}
		}