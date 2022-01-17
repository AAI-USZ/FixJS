function(element, options){
        this.element = $(element);
        this.language = options.language||this.element.data('date-language')||"en";
        this.language = this.language in dates ? this.language : "en";
        this.format = $.fn.datepicker.DPGlobal.parseFormat(options.format||this.element.data('date-format')||'MM/DD/YYYY');
        this.period = options.period || this.element.data('date-period') || 'D';
        this.withPeriod = options.withPeriod || this.element.data('date-with-period') || false;
        this.picker = $($.fn.datepicker.DPGlobal.template)
            .appendTo('body')
            .on({
                click: $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
        if(this.component && this.component.length === 0) {
            this.component = false;
        }

        if (this.isInput) {
            this.element.on({
                focus: $.proxy(this.show, this),
                blur: $.proxy(this._hide, this),
                keyup: $.proxy(this.update, this),
                keydown: $.proxy(this.keydown, this)
            });
        } else {
            if (this.component){
                // For components that are not readonly, allow keyboard nav
                this.element.find('input').on({
                    focus: $.proxy(this.show, this),
                    blur: $.proxy(this._hide, this),
                    keyup: $.proxy(this.update, this),
                    keydown: $.proxy(this.keydown, this)
                });

                this.component.on('click', $.proxy(this.toggle, this));
                this.element.find('input').on({
                    blur: $.proxy(this._hide, this)
                });
            } else {
               this.element.on('click', $.proxy(this.toggle, this));
            }
        }

        this.autoclose = false;
        if ('autoclose' in options) {
            this.autoclose = options.autoclose;
        } else if ('dateAutoclose' in this.element.data()) {
            this.autoclose = this.element.data('date-autoclose');
        }

        switch(options.startView){
            case 2:
            case 'decade':
                this.viewMode = this.startViewMode = 2;
                break;
            case 1:
            case 'year':
                this.viewMode = this.startViewMode = 1;
                break;
            default:
                this.viewMode = this.startViewMode = 0;
                break;
        }

        this.weekStart = ((options.weekStart||this.element.data('date-weekstart')||dates[this.language].weekStart||0) % 7);
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.setStartDate(options.startDate||this.element.data('date-startdate'));
        this.setEndDate(options.endDate||this.element.data('date-enddate'));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
    }