function(idImage,image){
					ed.execCommand('mceInsertContent', false,'<img src="'+basedir+'web/files/cms_images/'+idImage+'.jpg"'/* width="'+image.width+'" height="'+image.height+'"*/+'/>');
					gallery.close();
				}