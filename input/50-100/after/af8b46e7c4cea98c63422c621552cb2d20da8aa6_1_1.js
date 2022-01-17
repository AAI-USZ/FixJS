function(sender, vm) {
                    vm.loadParent(
                        function(hn){
                            this.fireBusEvent('displayEditVMDialog', {hn: hn, compute: vm});
                        }.bind(this),
                        function(operation){
                            console.error('Error while loading parent: ', operation);
                        }.bind(this)
                    );
                }