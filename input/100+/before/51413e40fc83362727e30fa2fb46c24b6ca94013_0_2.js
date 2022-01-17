function()
    {
        var sel = this.vpcMenu.selectedItem;
        var az = this.azMenu.value

        // Reset subnets
        this.subnetMenu.removeAllItems();
        document.getElementById("ew.ipAddress").disabled = true;

        if (sel.value != null && sel.value != '') {
            var subnets = this.core.queryModel('subnets');
            for ( var i in subnets) {
                if (subnets[i].vpcId == sel.value && (az == "" || az == subnets[i].availabilityZone)) {
                    this.subnetMenu.appendItem(subnets[i].toString(), subnets[i].id)
                }
            }
            this.subnetMenu.selectedIndex = 0;
            document.getElementById("ew.ipAddress").disabled = false;
        }

        this.buildGroupList();
        this.refreshDisplay();
    }