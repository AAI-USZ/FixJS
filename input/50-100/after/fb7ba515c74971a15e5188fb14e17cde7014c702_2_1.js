function(event){
            self.hideItems = ['Login'];
            if(self.phrescoapi.userLogin() === true){
				self.loginTest(self.phrescoapi.logindata);
                self.phrescoapi.hideWidget(self.hideItems);
                self.listener.publish(event,"LoginSuccess",[event.data]);
                self.listener.publish(event,"Navigation",[event.data]);
            }
        }