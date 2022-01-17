function()
    {
        var me = this;
        var inputs = [ {label:"VPC",help:"Specify IP block for a VPC and optionally name for easy navigation in the system",type:"section"},
                       {label:'IP CIDR block:',type:'cidr',required:1,help:"Example: 10.0.0.0/16"},
                       {label:'Tenancy',type:'menulist',list:["default","dedicated"],required:1},
                       {label:'VPC Name:'},
                       {label:"Subnets",type:"section",help:"Optonally, create one or both subnets in the new VPC:"},
                       {label:'Public Subnet',help:"Example: 10.1.0.0/24"},
                       {label:'Private Subnet',help:"Example: 10.2.0.0/24"},
                       {label:'Availability Zone',type:'menulist',list: this.core.queryModel('availabilityZones'),key:'name'},
                       {label:"VPN Connection",type:"section",help:"Optonally, create VPN connection to your VPC:"},
                       {label:'Customer Gateway IP',type:'ip'},
                       {label:'BGP ASN',value:65000},
                       ];

        var values = this.core.promptInput("Create VPC", inputs);
        if (values) {
            this.core.api.createVpc(values[1], values[2], function(vpcId) {
                if (values[3]) {
                    me.core.setTags(vpcId, "Name:" + values[3], function() { me.refresh() });
                } else {
                    me.refresh();
                }

                // Public subnet
                if (values[5]) {
                    me.core.api.createSubnet(vpcId, values[5], values[7], function(subnetId) {
                        me.core.api.createInternetGateway(function(igwId) {
                            me.core.api.attachInternetGateway(igwId, vpcId, function() {
                                me.core.api.createRouteTable(vpcId, function(tableId) {
                                    me.core.api.associateRouteTable(tableId, subnetId, function() {
                                        me.core.api.createRoute(tableId, "0.0.0.0/0", igwId, null, null, function() {
                                            ew_SubnetsTreeView.refresh(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }

                // Private subnet
                if (values[6]) {
                    me.core.api.createSubnet(vpcId, values[6], values[7], function(id) {
                        ew_SubnetsTreeView.refresh(true);
                    });
                }

                // VPN
                if (values[9] && values[10]) {
                    me.core.api.createCustomerGateway("ipsec.1", values[9], values[10], function(cgwId) {
                        me.core.api.createVpnGateway("ipsec.1", values[7], function(vgwId) {
                            me.core.api.attachVpnGatewayToVpc(vgwId, vpcId, function() {
                                me.core.api.createVpnConnection("ipsec.1", cgwId, vgwId, function(vpnId) {
                                    me.refreshModel('vpnGateways', 'customerGateways', 'vpnConnections');
                                });
                            });
                        });
                    });
                }
            });
        }
    }