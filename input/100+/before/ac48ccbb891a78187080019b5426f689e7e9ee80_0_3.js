function(item)
    {
        if (!item) return null;
        var id = getNodeValue(item, "Id");
        var name = getNodeValue(item, "Name")
        var ref = getNodeValue(item, "CallerReference")
        var count = getNodeValue(item, "ResourceRecordSetCount");
        var comment = getNodeValue(item, "Config", "Comment");
        return new HostedZone(id, name, ref, count, comment);
    }