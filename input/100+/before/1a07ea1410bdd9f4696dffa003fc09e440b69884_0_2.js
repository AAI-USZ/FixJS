function(file)
    {
        var params = NetUtils.getPostText(file, this.context, true);
        System.copyToClipboard(params);
    }