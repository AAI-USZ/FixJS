function(file)
    {
        if (!NetUtils.isURLEncodedRequest(file, this.context))
            return;

        var text = NetUtils.getPostText(file, this.context, true);
        if (text)
        {
            var lines = text.split("\n");
            var params = Url.parseURLEncodedText(lines[lines.length-1]);
            var result = params.map(function(o) { return o.name + "=" + o.value; });
            System.copyToClipboard(result.join(Str.lineBreak()));
        }
    }