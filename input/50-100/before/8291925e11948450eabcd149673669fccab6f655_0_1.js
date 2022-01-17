function () {
            this.hour = $('input.bootstrap-timepicker-hour').val();
            this.minute = $('input.bootstrap-timepicker-minute').val();
            if (true === this.showSeconds) {
                this.second = $('input.bootstrap-timepicker-second').val();
            }
            this.meridian = $('input.bootstrap-timepicker-meridian').val();

            this.update();
        }