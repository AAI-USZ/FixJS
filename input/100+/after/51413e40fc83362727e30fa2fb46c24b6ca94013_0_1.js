function()
    {
        var minbox = document.getElementById("ew.min");
        var minval = parseInt(minbox.value);
        if (isNaN(minval) || minval <= 0 || minval > this.retVal.max) {
            alert("Minimum value must be a positive integer between 1 and " + this.retVal.max);
            minbox.select();
            return false;
        }
        // Assumes validateMin has been called
        var maxbox = document.getElementById("ew.max");
        var maxval = parseInt(maxbox.value);
        if (isNaN(maxval) || maxval <= 0 || maxval > this.retVal.max) {
            alert("Maximum value must be a positive integer between 1 and " + this.retVal.max);
            maxbox.select();
            return false;
        }
        if (minval > maxval) {
            alert("Maximum value may not be smaller than minimum value between 1 and " + maxval);
            minbox.select();
            return false;
        }

        this.retVal.imageId = this.image.id;
        this.retVal.kernelId = document.getElementById("ew.aki").value;
        this.retVal.ramdiskId = document.getElementById("ew.ari").value;
        this.retVal.instanceType = document.getElementById("ew.instancetypelist").selectedItem.value;
        this.retVal.minCount = document.getElementById("ew.min").value.trim();
        this.retVal.maxCount = document.getElementById("ew.max").value.trim();
        this.retVal.tag = document.getElementById("ew.tag").value.trim();
        this.retVal.name = document.getElementById("ew.name").value.trim();
        this.retVal.securityGroups = this.used;

        var subnet = document.getElementById("ew.subnetId").value;
        if (subnet == "" && this.vpcMenu.value != "") {
            alert("No subnet selected for VPC. Please select a subnet to continue.");
            return false;
        }
        this.retVal.subnetId = subnet;
        this.retVal.ipAddress = document.getElementById("ew.ipAddress").value.trim();

        // This will be an empty string if <none> is selected
        this.retVal.keyName = document.getElementById("ew.keypairlist").selectedItem.value;

        // This will be an empty string if <any> is selected
        this.retVal.availabilityZone = this.azMenu.value;
        this.retVal.tenancy = this.tnMenu.value;

        if (this.retVal.tenancy == "dedicated") {
            if (this.vpcMenu.value == "") {
                alert('For dedicated tenancy to work please choose a VPC');
                return false;
            }
            if (!confirm("You have chosen to launch your instance(s) with dedicated tenancy. " +
                         "This choice can add a signficant amount of cost to your EC2 charges "+
                         "(see http://aws.amazon.com/dedicated-instances/). Are you sure you want to continue?")) {
                return false;
            }
        }
        this.retVal.monitoring = document.getElementById("ew.monitor").checked;

        this.retVal.userData = document.getElementById("ew.userdata").value;
        if (this.retVal.userData == "") {
            this.retVal.userData = null;
        }
        this.retVal.properties = document.getElementById("ew.properties").value;
        if (this.retVal.properties == "") {
            this.retVal.properties = null;
        }
        this.retVal.ok = true;

        return true;
    }