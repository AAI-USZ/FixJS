function() {
        var instance = this.getSelected();
        if (instance == null) return;
        if (instance.state != "running") {
            alert("Instance should in running state")
            return;
        }

        // Determine if there is actually an EIP to associate with
        var eipList = this.core.queryModel('addresses');
        if (!eipList) {
            if (confirm ("Would you like to create a new Elastic IP to associate with this instance?")) {;
                this.core.selectTab('ew.tabs.eip');
                ew_ElasticIPTreeView.allocateAddress();
            }
            return;
        }

        var eips = [];
        for (var i in eipList) {
            var eip = eipList[i];
            if ((instance.vpcId != '' && eip.domain != "vpc") || (instance.vpcId == '' && eip.domain == "vpc")) continue;
            eips.push(eip)
        }
        var idx = this.core.promptList("Associate EIP with Instance", "Which EIP would you like to associate with " + instance.toString() + "?", eips);
        if (idx < 0) return;
        var eip = eips[idx];

        if (eip.instanceId) {
            if (!this.core.promptYesNo("Confirm", "Address " + eip.publicIp + " is already mapped to an instance, continue?")) {
                return false;
            }
        }
        this.core.api.associateAddress(eip, instance.id, null, function() { me.refresh() });
    }