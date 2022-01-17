function(e) {
           if (this.picker.data('datepicker-show')) {
               this._hide(e);
           } else {
               this.show(e);
           }
        }