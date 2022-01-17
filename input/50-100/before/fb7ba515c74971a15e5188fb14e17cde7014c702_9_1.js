function(event){
            this.hideItems = ['Register'];
            if(this.phrescoapi.userRegister() === true){
                this.api.doRegister(this.phrescoapi.registerdata);
                this.phrescoapi.hideWidget(this.hideItems);
                this.listener.publish(event,"RegisterSuccess",[event.data]);
            }
        }