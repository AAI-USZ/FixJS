function(event){
            self.hideItems = ['Login'];
            if(self.phrescoapi.userLogin() === true){
                var obj =  self.api.doLogin(self.phrescoapi.logindata);
                self.phrescoapi.hideWidget(self.hideItems);
                self.listener.publish(event,"LoginSuccess",[event.data]);
                self.listener.publish(event,"Navigation",[event.data]);
            }
        }