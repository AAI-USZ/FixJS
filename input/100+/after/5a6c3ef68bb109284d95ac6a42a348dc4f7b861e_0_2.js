function processRemoteImage (e) {
			var ic          = INNERCONTEXT
			  , utils       = ic.UTILITY
			  , $target     = $(e.target)
			  , uri         = $target.data('uri')
			  , filename    = 'image' + Date.now() + '.jpg'
			  , $comlink    = $(this)
			  , imageBase64 = $comlink.text()
			  , imageType   = $target.data('type')
			  , imageFile   = $.dataURItoBlob(imageBase64, utils.getMime(imageType, uri))
			  ;

			if (!$comlink.hasClass('image')) { // This comlink isn't being used for an image file.
				return;
			}

			var createNewFile = function createNewFile (thisFile) { // Create a new file in the temp local file system.
				thisFile.createWriter(function (fileWriter) {   // Write to the new file.
					fileWriter.onwriteend = function (e) {      // Writing has completed.
						if (fileWriter.position) {              // fileWriter.position points to the next empty byte in the file.
							thisFile.file(function (file) { 
								if (imageType !== 'jpg') {
									utils.convertImage(file, imageType, uri);
									utils.addDropboxImage(file, 'converted remote ' + imageType, uri);
								} else {
									utils.addDropboxImage(file, 'Remote', uri);
								}
							});
						}
					};

					fileWriter.write(imageFile);
					$comlink.remove();
				});
			};

			ic.DATA.localFileSystem.root.getFile(filename, { create: true, exclusive: true }, createNewFile);
		}