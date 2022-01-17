function (data, start, length, callback) {

	var self = this;
	var tiffOffset = start + 6;
	var ifdOffset, numberOfEntries;
	
	// Exif data always starts with Exif\0\0
	if (data.toString('utf8', start, tiffOffset) != 'Exif\0\0') {
		callback({ message : 'The Exif data ist not valid.' });
		return;
	}
	
	// After the Exif start we either have 0x4949 if the following data is 
	// stored in big endian or 0x4D4D if it is stored in little endian
	if (data.getShort(tiffOffset) == 0x4949) {
		this.isBigEndian = false;
	} else if (data.getShort(tiffOffset) == 0x4D4D) {
		this.isBigEndian = true;
	} else {
		callback({ message : 'Invalid TIFF data! Expected 0x4949 or 0x4D4D at offset '+(tiffOffset)+' but found 0x'+data[tiffOffset].toString(16).toUpperCase()+data[tiffOffset + 1].toString(16).toUpperCase() });
		return;
	}
	
	// Valid TIFF headers always have 0x002A here
    if (data.getShort(tiffOffset + 2, this.isBigEndian) != 0x002A) {
    	var expected = (this.isBigEndian) ? '0x002A' : '0x2A00';
    	callback({ message : 'Invalid TIFF data! Expected '+expected+' at offset '+(tiffOffset + 2)+' but found 0x'+data[tiffOffset + 2].toString(16).toUpperCase()+data[tiffOffset + 3].toString(16).toUpperCase() });
    	return;
    }
    
    /********************************* IFD0 **********************************/
    
    // Offset to IFD0 which is always followed by two bytes with the amount of
    // entries in this IFD
	ifdOffset = tiffOffset + data.getLong(tiffOffset + 4, this.isBigEndian);
	numberOfEntries = data.getShort(ifdOffset, this.isBigEndian);
	
	if (numberOfEntries>20){
		callback({ message : 'Number of entries greater than expected: ' + numberOfEntries + '. Invalid EXIF?'});	
	}
	
	// Each IFD entry consists of 12 bytes which we loop through and extract
	// the data from
	for (var i = 0; i < numberOfEntries; i++) {
		var exifEntry = self.extractExifEntry(data, (ifdOffset + 2 + (i * 12)), tiffOffset, this.isBigEndian, ExifImage.TAGS.tiff);
		if (exifEntry) this.exifData.image.push(exifEntry);			
	}
	
	/********************************* IFD1 **********************************/
	
    // Check if there is an offset for IFD1. If so it is always followed by two
	// bytes with the amount of entries in this IFD, if not there is no IFD1
    ifdOffset = tiffOffset + data.getLong(ifdOffset + 2 + (numberOfEntries * 12), this.isBigEndian);
	if (ifdOffset != 0x00000000) {
		numberOfEntries = data.getShort(ifdOffset, this.isBigEndian);
		
		if (numberOfEntries>20){
			callback({ message : 'Number of entries greater than expected: ' + numberOfEntries + '. Invalid EXIF?'});	
		}
		
		// Each IFD entry consists of 12 bytes which we loop through and extract
		// the data from
		for (var i = 0; i < numberOfEntries; i++) {
			var exifEntry = self.extractExifEntry(data, (ifdOffset + 2 + (i * 12)), tiffOffset, this.isBigEndian, ExifImage.TAGS.tiff);
			if (exifEntry) this.exifData.thumbnail.push(exifEntry);
		}
	}
	
	/******************************* EXIF IFD ********************************/

	// Look for a pointer to the Exif IFD in IFD0 and extract information from
	// it if available
	for (exifEntry in this.exifData.image) {
		if (this.exifData.image[exifEntry].tag.getShort(0, this.isBigEndian) == 0x8769) {
			ifdOffset = tiffOffset + this.exifData.image[exifEntry].value;
			numberOfEntries = data.getShort(ifdOffset, this.isBigEndian);

			// Each IFD entry consists of 12 bytes which we loop through and extract
			// the data from
			for (var i = 0; i < numberOfEntries; i++) {
				var exifEntry = self.extractExifEntry(data, (ifdOffset + 2 + (i * 12)), tiffOffset, this.isBigEndian, ExifImage.TAGS.exif);
				if (exifEntry) this.exifData.exif.push(exifEntry);
			}
			
			break;
		}
	}
	
	/******************************** GPS IFD ********************************/
	
	// Look for a pointer to the GPS IFD in IFD0 and extract information from
	// it if available
	for (exifEntry in this.exifData.image) {
		if (this.exifData.image[exifEntry].tag.getShort(0, this.isBigEndian) == 0x8825) {
			ifdOffset = tiffOffset + this.exifData.image[exifEntry].value;
			numberOfEntries = data.getShort(ifdOffset, this.isBigEndian);
			
			// Each IFD entry consists of 12 bytes which we loop through and extract
			// the data from
			for (var i = 0; i < numberOfEntries; i++) {
				var exifEntry = self.extractExifEntry(data, (ifdOffset + 2 + (i * 12)), tiffOffset, this.isBigEndian, ExifImage.TAGS.gps);
				if (exifEntry) this.exifData.gps.push(exifEntry);
			}
			
			break;
		}
	}
	
	/************************* Interoperability IFD **************************/

	// Look for a pointer to the interoperatbility IFD in the Exif IFD and 
	// extract information from it if available
	for (exifEntry in this.exifData.exif) {
		if (this.exifData.exif[exifEntry].tag.getShort(0, this.isBigEndian) == 0xA005) {
			ifdOffset = tiffOffset + this.exifData.exif[exifEntry].value;
			numberOfEntries = data.getShort(ifdOffset, this.isBigEndian);
			
			// Each IFD entry consists of 12 bytes which we loop through and extract
			// the data from
			for (var i = 0; i < numberOfEntries; i++) {
				var exifEntry = self.extractExifEntry(data, (ifdOffset + 2 + (i * 12)), tiffOffset, this.isBigEndian);
				if (exifEntry) this.exifData.interoperability.push(exifEntry);
			}
			
			break;
		}
	}
	
	/***************************** Makernote IFD *****************************/
	
	// Look for Makernote data in the Exif IFD, check which type of proprietary
	// Makernotes the image contains, load the respective functionality and 
	// start the extraction
	for (exifEntry in this.exifData.exif) {
		if (this.exifData.exif[exifEntry].tag.getShort(0, this.isBigEndian) == 0x927C) {
			
			// Check the header to see what kind of Makernote we are dealing with
			if (this.exifData.exif[exifEntry].value.getString(0, 7) === "OLYMP\x00\x01") {
				this.extractMakernotes = require('./makernotes/olympus').extractMakernotes;
			} else if (this.exifData.exif[exifEntry].value.getString(0, 7) === "AGFA \x00\x01") {
				this.extractMakernotes = require('./makernotes/agfa').extractMakernotes;
			} else if (this.exifData.exif[exifEntry].value.getString(0, 8) === "EPSON\x00\x01\x00") {
				this.extractMakernotes = require('./makernotes/epson').extractMakernotes;
			} else {
				// Makernotes are available but the format is not recognized so
				// an error message is pushed instead, this ain't the best 
				// solution but should do for now
				this.exifData.makernote.push({ error: 'Unable to extract Makernote information as it is in an unrecognized format.' });
				break;
			}
			
			this.exifData.makernote = this.extractMakernotes(data, this.exifData.exif[exifEntry].valueOffset, tiffOffset);
			
		}
	}

	callback(false, this.exifData);
	
}