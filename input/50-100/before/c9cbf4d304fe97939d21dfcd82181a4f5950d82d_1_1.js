function(contextInfo) {
            this.inherited(arguments);
            if (this.value != null) {
                // console.debug("XFControl.handleStateChange this.value:",this.value);
                this.currentValue = this.value;
                this.setValue(this.value, contextInfo["schemaValue"]);
            }

        }