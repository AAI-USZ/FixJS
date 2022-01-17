function ()
            {
                // move left or right
                if (this.visible)
                {
                    //Reset acceleration X
                    this.accel.x = 0;
                    this.accel.y = 0;

                    // Handle input
                    if (!this.states)
                    {
                        this.states = [
                            {state:"actions", method:"Down"},
                            {state:"presses", method:"Pressed"},
                            {state:"delayedKeyup", method:"Released"}
                        ];

                        this.totalStates = this.states.length;
                    }

                    // Loop through input states and call action handlers
                    for (var action in ig.input.actions)
                    {
                        for (var i = 0; i < this.totalStates; i++)
                        {
                            var state = this.states[i].state;
                            var stateValue = ig.input[state][action];

                            if (stateValue)
                            {
                                this.onInputAction(action, this.states[i].method);
                            }
                        }
                    }

                    this.currentAnim.flip.x = this.flip;
                }

                // move!
                this.parent();
            }