function(keyCode) {
            if (keyCode !== undef) {
                return this.keyState[keyCode];          
            } else {
                return this.keyState;
            }
        }