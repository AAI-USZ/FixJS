function(e) {
      var interfaces={};
      interfaces["name"]=this._edit_interface_name.getValue();
      interfaces["type"]=this._edit_interface_types.getSelection()[0].getModel();
      interfaces["inet"]=this._edit_interface_inet_types.getSelection()[0].getModel();
      if (interfaces["type"]=="loopback" && interfaces["inet"]=="loopback") {
        interfaces["ip"]=null;
        interfaces["netmask"]=null;
        interfaces["gateway"]=null;
      } else if (interfaces["inet"]=="dhcp") {
        interfaces["ip"]=null;
        interfaces["netmask"]=null;
        interfaces["gateway"]=null;        
      } else {
        interfaces["ip"]=this._edit_interface_ip.getValue();
        interfaces["netmask"]=this._edit_interface_netmask.getValue();
        interfaces["gateway"]=this._edit_interface_gateway.getValue();        
      }
      if (interfaces["type"]=="vlan") {
        interfaces["vlan_raw_device"]=this._edit_interface_vlan_raw_device.getSelection()[0].getModel();
      } else {
        interfaces["vlan_raw_device"]=null;
      }     
      if (interfaces["type"]=="bond_1" || interfaces["type"]=="bond_2") {
        interfaces["slaves"]="";
        var slaves=this._edit_interface_slaves.getSelection();
        interfaces["slaves"]=[]
        for (var i=0;i<slaves.length;i++) {
          interfaces["slaves"].push(slaves[i].getModel());
          //  interfaces["slaves"]+" "+slaves[i].getModel();
        }
      } else {
        interfaces["slaves"]=null;
      }
      interfaces["pre_up"]=this._edit_interface_pre_up.getValue();
      interfaces["pre_down"]=this._edit_interface_pre_down.getValue();
      interfaces["post_up"]=this._edit_interface_post_up.getValue();
      interfaces["post_down"]=this._edit_interface_post_down.getValue();
      this.fireDataEvent("returnData",interfaces);
    }