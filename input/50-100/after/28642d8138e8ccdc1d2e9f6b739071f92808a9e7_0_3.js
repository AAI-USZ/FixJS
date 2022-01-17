function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.is(':visible')) {
                $(this).datepicker();
            } else {
                $(this).datepicker();
            }
        }