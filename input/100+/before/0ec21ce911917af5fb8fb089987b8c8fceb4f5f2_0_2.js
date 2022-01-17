function getRequestFile(request, win, noCreate)
    {
        var name = Http.safeGetRequestName(request);
        if (!name || reIgnore.exec(name))
            return null;

        for (var i=0; i<this.files.length; i++)
        {
            var file = this.files[i];
            if (file.request == request)
                return file;
        }

        if (noCreate)
            return null;

        if (!win || Win.getRootWindow(win) != this.context.window)
            return;

        var fileDoc = this.getRequestDocument(win);
        var isDocument = request.loadFlags & Ci.nsIChannel.LOAD_DOCUMENT_URI && fileDoc.parent;
        var doc = isDocument ? fileDoc.parent : fileDoc;

        var file = doc.createFile(request);
        if (isDocument)
        {
            fileDoc.documentFile = file;
            file.ownDocument = fileDoc;
        }

        file.request = request;
        this.requests.push(request);
        this.files.push(file);

        if (FBTrace.DBG_NET_EVENTS)
            FBTrace.sysout("net.createFile; " + Http.safeGetRequestName(request) +
                "(" + this.files.length + ")");

        return file;
    }