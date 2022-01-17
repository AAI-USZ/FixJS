function NetworkInterface(id, status, descr, subnetId, vpcId, availabilityZone, macAddress, privateIpAddress, sourceDestCheck, groups, attachment, association, tags)
{
    this.id = id
    this.status = status
    this.descr = descr || "";
    this.subnetId = subnetId
    this.vpcId = vpcId
    this.availabilityZone = availabilityZone
    this.macAddress = macAddress
    this.privateIpAddress = privateIpAddress
    this.sourceDestCheck = sourceDestCheck
    this.groups = groups || [];
    this.attachment = attachment
    this.association = association
    this.tags = tags
    ew_core.processTags(this, "descr")

    this.toString = function() {
        return this.privateIpAddress + fieldSeparator + this.status + fieldSeparator + this.id + fieldSeparator +  this.descr +
               " (" + ew_core.modelValue("subnetId", this.subnetId) + ")";
    }
}