function(sender, vm) {
                 // NOTE: this will fail, we have to implement getParent method to obtain HN from VM
                    this.fireBusEvent('displayEditVMDialog', {hn: vm.getParent(), compute: vm});
                }