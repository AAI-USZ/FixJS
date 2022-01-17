function(timeout){
        if(this.inactive)
            clearTimeout(this.inactive);
        this.inactive = setTimeout(function(){this.inactivityOverlay();}.bind(this), timeout || 60*60*1000);
    }