function startFile(request, win)
    {
        var file = this.getRequestFile(request, win);
        if (file)
        {
            // Parse URL params so, they are available for conditional breakpoints.
            file.urlParams = Url.parseURLParams(file.href);
            this.breakOnXHR(file);
        }
    }