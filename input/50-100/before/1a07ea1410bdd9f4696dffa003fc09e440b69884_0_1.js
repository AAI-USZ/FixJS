function(file)
    {
        var params = Url.parseURLParams(file.href);
        var result = params.map(function(o) { return o.name + ": " + o.value; });
        System.copyToClipboard(result.join(Str.lineBreak()));
    }