function loadLocalFile (e) {
			var file, name, type
			  , debugMsg = ''
		      , files = e.list
		      , len = files.length
		      , i = len
		      , $util = INNERCONTEXT.UTILITY
		      ;
			while (0 < i--) {
				file = files[i];
				name = file.name;
				type = $util.supportedImageType(name);
				INNERCONTEXT.CONSTANTS.DEBUGMODE && (debugMsg = ['loadLocalFile: for file "', name, '", file ', (i+1), ' of ', len].join(''));
				if (!type) {
					$.log(debugMsg + ', unusable file type detected');
					continue;
				}
				$.log([debugMsg, ', usable file type "', type, '" detected'].join(''));
				"jpg" === type ? INNERCONTEXT.UTILITY.addDropboxImage(file, "local")
/*temp code*/                  : true;
//							   : convertImage(file, type, name);
			}
		}