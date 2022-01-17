function (number) {
        // This number increases with each init call and helps to address messages to the right browser window/tab
        this.connectionNumber = number;
        
        this.triggerEvent('setConnectionNumber', [this.connectionNumber]);
    }