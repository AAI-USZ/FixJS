function(e){
            if (this.picker.is(':not(:visible)')){
                if (e.keyCode == 27) { // allow escape to hide and re-show picker
                    this.show();
                }
                return;
            }
            var dateChanged = false,
                dir, day, month;
            switch(e.keyCode){
                case 27: // escape
                    this.hide();
                    e.preventDefault();
                    break;
                case 37: // left
                case 39: // right
                    dir = (e.keyCode == 37) ? -1 : 1;
                    if (e.ctrlKey){
                        this.date = this.moveYear(this.date, dir);
                        this.viewDate = this.moveYear(this.viewDate, dir);
                    } else if (e.shiftKey){
                        this.date = this.moveMonth(this.date, dir);
                        this.viewDate = this.moveMonth(this.viewDate, dir);
                    } else {
                        this.date.setDate(this.date.getDate() + dir);
                        this.viewDate.setDate(this.viewDate.getDate() + dir);
                    }
                    this.setValue();
                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                    break;
                case 38: // up
                case 40: // down
                    dir = (e.keyCode == 38) ? -1 : 1;
                    if (e.ctrlKey){
                        this.date = this.moveYear(this.date, dir);
                        this.viewDate = this.moveYear(this.viewDate, dir);
                    } else if (e.shiftKey){
                        this.date = this.moveMonth(this.date, dir);
                        this.viewDate = this.moveMonth(this.viewDate, dir);
                    } else {
                        this.date.setDate(this.date.getDate() + dir * 7);
                        this.viewDate.setDate(this.viewDate.getDate() + dir * 7);
                    }
                    this.setValue();
                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                    break;
                case 13: // enter
                    this.hide();
                    e.preventDefault();
                    break;
            }
            if (dateChanged){
                this.element.trigger({
                    type: 'changeDate',
                    date: this.date
                });
                var element;
                if (this.isInput) {
                    element = this.element;
                } else if (this.component){
                    element = this.element.find('input');
                }
                if (element) {
                    element.change();
                }
            }
        }