function() {
            if ($('#from').val() == '' || from.status == STATUS_INVALID) {
                $('#from').focus().parent().effect('pulsate');
                return;
            }
            
            if ($('#to').val() == '' || to.status == STATUS_INVALID) {
                $('#to').focus().parent().effect('pulsate');
                return;
            }
            
            if (from.status == STATUS_NONE || to.status == STATUS_NONE) {
                setTimeout('HomePage.search()', 100);
                return;
            }

            retrieveDateTime();
            if(date == null) {
                $('#datepicker').focus().parent().effect('pulsate');
                return;
            }
            if(!time) {
                $('#timepicker').focus().parent().effect('pulsate');
                return;
            }

            this.goToDirections();
        }