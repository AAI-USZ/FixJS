function () 
    {
        var self = $(this.element),
            width = self.outerWidth(),
            that = this;
           
        if (self.data('limit')) that.options.limit = self.data('limit');
        
        if (self.data('warning')) that.options.limit = self.data('warning');

        self.after($('<p />')
            .css({
                //'width': width,
                //'text-align': 'right',
                //'margin-top': '10px',
                //'color': this.options.defaultColor,
                'position':'relative',
                'top':'-1px',
                'left':'5px',
                'display':'inline',
                
            })
            .html($('<span />', {'class': 'label char-counter', 'html': this.options.limit}).addClass(this.options.defaultClass).css('font-size',this.options.fontSize))
        );
        
        self.on('charcounter.recount keyup change focus blur', function(e) {
            
            if (that.options.notAllowOverflow) {
                
                if (!that.handle($(this).val())) {
                    //console.log($(this).val().substring(0, that.options.limit));
                    $(this).val($(this).val().substring(0, that.options.limit));
                }
            } else {
                that.handle($(this).val());
            }
        });
        
        that.handle(self.val());
    }