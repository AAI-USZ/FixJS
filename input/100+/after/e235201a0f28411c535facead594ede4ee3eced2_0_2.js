function _pack(obj, path){
		var name, buffer, compressedBuffer, hb, isDir, isDeflate, _level,
			dir = obj.children || obj.dir || obj.folder;
		
		if(typeof obj === 'undefined') return;
		if(dir){
			name = path + obj.name + (obj.name.substr(-1) === '/' ? '' : '/');
			buffer = new ArrayBuffer(0);
			isDir = true;
		} else if(obj.url){
			buffer = jz.utils.loadSync(obj.url);
			name = path + (obj.name || obj.url.split('/').pop());
		} else if(obj.str){
			buffer = jz.utils.stringToArrayBuffer(obj.str);
			name = path + obj.name;
		} else if(obj.buffer){
			buffer = obj.buffer;
			name = path + obj.name;
		} else {
			error('This type is not supported.');
		}
		compressedBuffer = buffer;

		//if you don't set compression level to this file, set level of the whole file.
		_level = obj.level != null ? obj.level : level;
		
		if(_level > 0 && typeof dir === 'undefined') {
			compressedBuffer = jz.algorithms.deflate(buffer, _level);
			isDeflate = true;
		}
		
		hb = new HeaderBuilder(buffer, compressedBuffer, name, date, offset, isDir, isDeflate);
		achiveArr.push(hb.getLocalFileHeader());
		achiveArr.push(new Uint8Array(compressedBuffer));
		centralDirArr.push(hb.getCentralDirHeader());
		
		offset += hb.getAchiveLength();
		n++;
		
		if(dir){
			dir.forEach(function(item){
				_pack(item, name);
			});
		}
	}