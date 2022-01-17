function() {
            var thisRef = this,
                command,
                commandName,
                propertyName,
                state,
                prevState,
                method,
                descriptor,
                i;

            var COMMANDS = this.COMMANDS;
            var numCommands = COMMANDS.length;
            for (i = 0; i < numCommands; i ++) {
                command = COMMANDS[i];

                if (typeof command == "object") {
                    propertyName = command.property;
                    commandName = command.name || propertyName.toLowerCase();
                    method = command.method || this._getState;
                } else {
                    continue;
                }

                descriptor = ChangeNotification.getPropertyChangeDescriptor(this, propertyName);
                if (descriptor) {
                    prevState = this["_" + propertyName];
                    state = method.call(this, propertyName, commandName);
                    if (state !== prevState) {
                        this["_" + propertyName + "_locked"] = true;
                        this.dispatchPropertyChange(propertyName, function() {
                            thisRef["_" + propertyName] = state;
                        });
                        thisRef["_" + propertyName + "_locked"] = false;
                    }
                }
            }
        }