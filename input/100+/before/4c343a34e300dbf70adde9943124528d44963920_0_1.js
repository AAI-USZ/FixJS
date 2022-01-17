function(defaultTime){
            if (defaultTime) {
                if (defaultTime === 'current') {
                    var dTime = new Date();
                    var hours = dTime.getHours();
                    var minutes = Math.floor(dTime.getMinutes() / this.minuteStep) * this.minuteStep;
                    var meridian = "AM";
                    if ( this.showMeridian ) {
                        if (hours === 0) {
                            hours = 12;
                        } else if (hours > 12) {
                            hours = hours - 12;
                            meridian = "PM";
                        } else {
                           meridian = "AM";
                        }
                    }
                    this.hour = hours;
                    this.minute = minutes;
                    this.meridian = meridian;
                } else if (defaultTime === 'value') {
                    this.setValues( this.$element.val() );
                } else {
                    this.setValues(defaultTime);
                }
                this.update();
            } else {
                this.hour = 0;
                this.minute = 0;
            }
        }