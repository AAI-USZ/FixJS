function() {
            this.$widget.find('input.bootstrap-timepicker-hour').val(this.hour);
            this.$widget.find('input.bootstrap-timepicker-minute').val(this.minute < 10 ? '0' + this.minute : this.minute);
            ;
            if (this.showSeconds) {
                this.$widget.find('input.bootstrap-timepicker-second').val(this.second < 10 ? '0' + this.second : this.second);
            }
            if (this.showMeridian) {
                this.$widget.find('input.bootstrap-timepicker-meridian').val(this.meridian);
            }
        }