function(item)
    {
        if (!item) return null;
        var name = getNodeValue(item, "DBSubnetGroupName");
        if (name == "") return null;
        var descr = getNodeValue(item,"DBSubnetGroupDescription");
        var status = getNodeValue(item, "DBSubnetGroupStatus");
        var vpcId = getNodeValue(item, "VpcId");
        var subnets = this.getItems(item, "Subnets", "Subnet", ["SubnetIdentifier","Name","SubnetStatus"], function(obj) { return new DBSubnet(onj.SubnetIdentifier,obj.Name,obj.SubnetStatus) });
        return new DBSubnetGroup(name, descr, status, vpcId, subnets);
    }