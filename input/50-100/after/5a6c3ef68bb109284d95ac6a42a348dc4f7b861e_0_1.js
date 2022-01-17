function getMime (imageType, uri) {
			switch (imageType) {
				case ('jpg') : return (/pjpeg$/i).test(uri) ? 'pjpeg' : 'jpeg';
				case ('ico') : return 'vnd.microsoft.icon';
				case ('jng') : return 'x-jng';
				case ('pic') : return 'x-lotus-pic';
				default      : return imageType;
			}
		}