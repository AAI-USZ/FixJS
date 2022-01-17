function()
    {
        ew_HostedRecordsTreeView.display([]);

        var item = this.getSelected();
        if (!item) return;
        if (!item.nameServers) {
            this.core.api.getHostedZone(item.id, function(obj) { item.nameServers = obj.nameServers; })
        }
        if (!item.records) {
            this.core.api.listResourceRecordSets(item.id, function(list) { ew_HostedRecordsTreeView.display(list); })
        } else {
            ew_HostedRecordsTreeView.display(item.records);
        }
    }