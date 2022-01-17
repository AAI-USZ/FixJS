function(file)
    {
        var text = NetUtils.getPostText(file, this.context, true);
        var url = Url.reEncodeURL(file, text, true);
        System.copyToClipboard(url);
    }