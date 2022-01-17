function(contextInfo) {
            this.inherited(arguments);
            var tmpContextInfo = contextInfo
            var self = this;
            require(["dojo/ready"], function (ready) {
                ready(function () {
                    // console.debug("XFControl.handleStateChanged");
                    if (self.value != null) {
                        // console.debug("XFControl.handleStateChange contextInfo:", contextInfo);
                        self.currentValue = tmpContextInfo["value"];
                        // console.debug("XFControl.handleStateChanged: calling self.setValue with value:",self.value ," and this.schemavalue:",tmpContextInfo["schemaValue"]);
                        self.setValue(self.currentValue, tmpContextInfo["schemaValue"]);
                    }
                })
            });


        }