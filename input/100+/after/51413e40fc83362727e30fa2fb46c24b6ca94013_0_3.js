function()
    {
        this.image = window.arguments[0];
        this.core = window.arguments[1];
        this.retVal = window.arguments[2];

        // Get the list of keypair names visible to this user.
        // This will trigger a DescribeKeyPairs if the model
        // doesn't have any keypair info yet. If there are no keypairs,
        // this dialog shouldn't be initialized any further.
        var keypairs = this.core.queryModel('keypairs');
        if (keypairs == null) {
            alert("Please create a keypair before launching an instance");
            return false;
        }

        var keypairMenu = document.getElementById("ew.keypairlist");
        keypairMenu.appendItem("<none>", null);
        for ( var i in keypairs) {
            keypairMenu.appendItem(keypairs[i].name, keypairs[i].name);
        }
        // If the user created at least one EC2 Keypair, select it.
        keypairMenu.selectedIndex = (keypairs.length > 0) ? 1 : 0;

        var typeMenu = document.getElementById("ew.instancetypelist");
        // Add the instance sizes based on AMI architecture
        var types = this.core.getInstanceTypes(this.image.arch);
        for (var i in types) {
            typeMenu.appendItem(types[i].name, types[i].id);
        }
        typeMenu.selectedIndex = 0;

        var textBox = document.getElementById("ew.ami");
        textBox.value = this.image.id;

        textBox = document.getElementById("ew.ami.tag");
        textBox.value = this.image.tag || "";

        textBox = document.getElementById("ew.ami.location");
        textBox.value = this.image.location.split('/').pop();

        textBox = document.getElementById("ew.min");
        textBox.focus();

        // availability zones
        this.azMenu = document.getElementById("ew.azId");
        this.azMenu.appendItem("<any>", null);
        var availZones = this.core.queryModel('availabilityZones');
        for ( var i in availZones) {
            this.azMenu.appendItem(availZones[i].name + " (" + availZones[i].state + ")", availZones[i].name);
        }
        this.azMenu.selectedIndex = 0;

        this.tnMenu = document.getElementById("ew.tenancy");

        // vpcs
        this.vpcMenu = document.getElementById("ew.vpcId");
        this.subnetMenu = document.getElementById("ew.subnetId");

        document.getElementById("ew.ipAddress").disabled = true;

        // Grab handles to the unused and used security group lists.
        this.unusedSecGroupsList = document.getElementById("ew.secgroups.unused");
        this.usedSecGroupsList = document.getElementById("ew.secgroups.used");

        // Get the list of security groups visible to this user. This will trigger a DescribeSecurityGroups
        // if the model doesn't have any info yet.
        this.securityGroups = this.core.queryModel('securityGroups');
        this.buildGroupList();

        var aki = this.image.aki;
        var ari = this.image.ari;

        // Populate the AKI and ARI lists
        var akiList = document.getElementById("ew.aki");
        var ariList = document.getElementById("ew.ari");
        var images = this.core.queryModel('images');
        var akiRegex = regExs["aki"];
        var ariRegex = regExs["ari"];
        akiList.appendItem("");
        ariList.appendItem("");

        if (!isWindows(this.image.platform)) {
            i = 0;
            var imgId = null;
            for (i in images) {
                imgId = images[i].id;
                if (imgId.match(akiRegex)) {
                    akiList.appendItem(imgId);
                    continue;
                }

                if (imgId.match(ariRegex)) {
                    ariList.appendItem(imgId);
                }
            }

            akiList.value = aki;
            ariList.value = ari;
        }

        // Populate VPCs
        var vpcs = this.core.queryModel('vpcs');
        this.vpcMenu.appendItem("Traditional EC2 Networking", "");
        for (var i in vpcs) {
            this.vpcMenu.appendItem(vpcs[i].toString(), vpcs[i].id);
        }
        this.vpcMenu.selectedIndex = 0;
        this.vpcIdSelected();
        this.refreshDisplay();
    }