function(href, data)
    {
        if (!data)
            return;

        if (!temporaryDirectory)
        {
            var tmpDir = DirService.getFile(NS_OS_TEMP_DIR, {});
            tmpDir.append("fbtmp");
            tmpDir.createUnique(nsIFile.DIRECTORY_TYPE, 0775);
            temporaryDirectory = tmpDir;
        }

        var lpath = href.replace(/^[^:]+:\/*/g, "").replace(/\?.*$/g, "")
            .replace(/[^0-9a-zA-Z\/.]/g, "_");

        /* dummy comment to workaround eclipse bug */
        if (!/\.[\w]{1,5}$/.test(lpath))
        {
            if (lpath.charAt(lpath.length-1) == "/")
                lpath += "index";
            lpath += ".html";
        }

        if (System.getPlatformName() == "WINNT")
            lpath = lpath.replace(/\//g, "\\");

        var file = Xpcom.QI(temporaryDirectory.clone(), nsILocalFile);
        file.appendRelativePath(lpath);
        if (!file.exists())
            file.create(nsIFile.NORMAL_FILE_TYPE, 0664);
        temporaryFiles.push(file.path);

        // TODO detect charset from current tab
        data = Str.convertFromUnicode(data);

        var stream = Xpcom.CCIN("@mozilla.org/network/safe-file-output-stream;1",
            "nsIFileOutputStream");
        stream.init(file, 0x04 | 0x08 | 0x20, 0664, 0); // write, create, truncate
        stream.write(data, data.length);

        if (stream instanceof nsISafeOutputStream)
            stream.finish();
        else
            stream.close();

        return file;
    }