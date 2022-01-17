function(e) {
      if (this._btnApply != null){
        this._btnApply.setEnabled(true);
      }
      if (!this._edit_interface_types.isSelectionEmpty() && this._edit_interface_types.getSelection()[0].getModel()=="loopback") {
        if (this._compInterfaceNames_hwdevices!=null) {
          this._compInterfaceNames_hwdevices.exclude();
        }
        if (this._interface_data!=null && this._interface_data["name"]=="NewInterface") {
          if (this._compInterfaceNames!=null) {
            this._compInterfaceNames.setEnabled(true);
          }  
         } else {
           if (this._compInterfaceNames!=null) {
             this._compInterfaceNames.setEnabled(false);
           }  
         }
        var loopbackItem=this._edit_interface_inet_types.getChildrenContainer().findItem("Loopback");
        if (loopbackItem != null) {
          loopbackItem.setEnabled(true);
        }
        if (this._compInterfaceBondingSlaves!= null) {
          this._compInterfaceBondingSlaves.exclude();
        }
        if (this._compInterfaceVlanRawDevice != null) {
          this._compInterfaceVlanRawDevice.exclude();
        }
        if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="loopback") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.exclude();
          }          
        } else if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="dhcp") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.exclude();
          }        
        } else {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.show();
          }                  
        }   
      } else if (!this._edit_interface_types.isSelectionEmpty() && this._edit_interface_types.getSelection()[0].getModel()=="ethernet") {
        if (this._compInterfaceNames_hwdevices!=null) {
          this._compInterfaceNames_hwdevices.show();
        }
        if (this._interface_data!=null && this._interface_data["name"]=="NewInterface") {
         if (this._compInterfaceNames!=null) {
           this._compInterfaceNames.setEnabled(true);
         }  
        } else {
          if (this._compInterfaceNames!=null) {
            this._compInterfaceNames.setEnabled(false);
          }  
        }
        var loopbackItem=this._edit_interface_inet_types.getChildrenContainer().findItem("Loopback");
        if (loopbackItem != null) {
          loopbackItem.setEnabled(false); 
          if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="loopback") {
            this._edit_interface_inet_types.setModelSelection([this._interface_data["inet"]]);
          }
        }
        if (this._compInterfaceBondingSlaves!= null) {
          this._compInterfaceBondingSlaves.exclude();
        }
        if (this._compInterfaceVlanRawDevice != null) {
          this._compInterfaceVlanRawDevice.exclude();
        }
        
        if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="dhcp") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.exclude();
          }                  
        } else if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="static") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.show();
          }                            
        } else if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="manual") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.show();
          }                  
        }
      } else if (!this._edit_interface_types.isSelectionEmpty() && ( this._edit_interface_types.getSelection()[0].getModel()=="bond_1" || this._edit_interface_types.getSelection()[0].getModel()=="bond_2")) {
        if (this._compInterfaceNames_hwdevices!=null) {
          this._compInterfaceNames_hwdevices.exclude();
        }
        if (this._interface_data!=null && this._interface_data["name"]=="NewInterface") {
         if (this._compInterfaceNames!=null) {
           this._compInterfaceNames.setEnabled(true);
         }
        } else {
          if (this._compInterfaceNames!=null) {
            this._compInterfaceNames.setEnabled(false);
          }  
        }
        if (this._compInterfaceBondingSlaves!= null) {
          this._compInterfaceBondingSlaves.show()
        }
        if (this._compInterfaceVlanRawDevice != null) {
          this._compInterfaceVlanRawDevice.exclude();
        }
        
        var loopbackItem=this._edit_interface_inet_types.getChildrenContainer().findItem("Loopback");
        if (loopbackItem != null) {
          loopbackItem.setEnabled(false); 
          if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="loopback") {
            this._edit_interface_inet_types.setModelSelection([this._interface_data["inet"]]);
          }
        }
        //
        // Set Selection to bond slaves
        //
        if (this._interface_data != null) {
          if (this._interface_data["slaves"]!=null) {
            // var iarray=this._interface_data["slaves"].split(" ");
            var iarray=this._interface_data["slaves"]
            this._edit_interface_slaves.setModelSelection(iarray);
          }

        }
        if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="dhcp") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.exclude();
          }
        } else if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="static") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.show();
          }          
        } else if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="manual") {
          if (this._compInterfaceDetails != null) {
            this._compInterfaceDetails.show();
          }                    
        }
      } else if (!this._edit_interface_types.isSelectionEmpty() && this._edit_interface_types.getSelection()[0].getModel()=="vlan") {
        if (this._compInterfaceNames_hwdevices!=null) {
          this._compInterfaceNames_hwdevices.exclude();
        }
        if (this._interface_data!=null && this._interface_data["name"]=="NewInterface") {
         if (this._compInterfaceNames!=null) {
           this._compInterfaceNames.setEnabled(true);
         }
        } else {
          if (this._compInterfaceNames!=null) {
            this._compInterfaceNames.setEnabled(false);
          }  
        }
        if (this._compInterfaceBondingSlaves!= null) {
          this._compInterfaceBondingSlaves.exclude()
        }
        if (this._compInterfaceVlanRawDevice != null) {
          this._compInterfaceVlanRawDevice.show();
        }        
        var loopbackItem=this._edit_interface_inet_types.getChildrenContainer().findItem("Loopback");
        if (loopbackItem != null) {
          loopbackItem.setEnabled(false); 
          if (!this._edit_interface_inet_types.isSelectionEmpty() && this._edit_interface_inet_types.getSelection()[0].getModel()=="loopback") {
            this._edit_interface_inet_types.setModelSelection([this._interface_data["inet"]]);
          }
        }
        if (this._interface_data != null) {
          this._edit_interface_vlan_raw_device.setModelSelection([this._interface_data["vlan_raw_device"]]);
        }
      }
    }