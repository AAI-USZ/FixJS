function() {
	
    var file = Components.classes["@mozilla.org/file/local;1"]
	  .createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("c:\test.eqf");

    var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
            .createInstance(Components.interfaces.nsIFileOutputStream);
    // 0x02 = PR_WRONLY (write only)
    // 0x08 = PR_CREATE_FILE (create file if the file doesn't exist)
    // 0x10 = PR_APPEND (append to file with each write)
    foStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0);

    var data = "Winamp EQ library file v1.1!--Entry1";

    foStream.write(data, data.length);
    foStream.close();
	
	}