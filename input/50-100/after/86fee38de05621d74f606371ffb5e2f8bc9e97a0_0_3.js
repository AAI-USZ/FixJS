function(){

        this.show();

        if(!this.textarea.hasClass('cb-ts')

            && this.blinkInterval == null

            && chatBar.getHeartbeatCount() > 0

            ){

            var that = this

            this.blinkInterval = window.setInterval(function(){

                that.blink();

            }, 1000);

        

        }

    }