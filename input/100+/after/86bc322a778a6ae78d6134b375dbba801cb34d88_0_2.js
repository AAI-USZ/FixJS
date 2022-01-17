function loadLocalFile (e) {
			for (var debugMsg = ''
			       , files = (e.files || e.dataTransfer.files || e.file_list)
			       , len = files.length
			       , i = len
			       , file, name, type; 0 < i--;) {
				file = files[i];
				name = file.name;
				//type = supportedImageType(name);
				INNERCONTEXT.CONSTANTS.DEBUGMODE && (debugMsg = ['loadLocalFile: for file "', name, '", file ', (i+1), ' of ', len].join(''));
				if (!type) {
					$.log(debugMsg + ', unusable file type detected');
					continue;
				}
				$.log([debugMsg, ', usable file type "', type, '" detected'].join(''));
//				"jpg" === type ? addImageToDropbox(file, "local")
//							   : convertImage(file, type, name);
			}
		}