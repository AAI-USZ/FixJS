function(event){
            self.hideItems = ['Register'];
            if(self.phrescoapi.userRegister() === true){
				self.registerTest(self.phrescoapi.registerdata);
                self.phrescoapi.hideWidget(self.hideItems);
                self.listener.publish(event,"RegisterSuccess",[event.data]);
            }
        }