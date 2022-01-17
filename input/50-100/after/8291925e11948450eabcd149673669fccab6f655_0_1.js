function () {
            this.setHour(parseInt($('input.bootstrap-timepicker-hour').val()));
            this.setMinute(parseInt($('input.bootstrap-timepicker-minute').val()));
            if (true === this.showSeconds) {
                this.setSecond(parseInt($('input.bootstrap-timepicker-second').val()));
            }
            this.setMeridian($('input.bootstrap-timepicker-meridian').val());
        }