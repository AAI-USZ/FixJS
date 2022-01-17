function()
    {
        this.el.find('#beforecrop').slideUp(500);
        this.el.find('#cropwait').slideDown(500);

        this.options.fragment.crop({
            start: this.start.text(),
            end: this.end.text(),
            f_internal: this.cb_internal.is(':checked'),
            f_all: (this.cb_internal.is(':checked') && 
                    this.cb_all.is(':checked')),
            result: this.result_type.selectmenu('value'),
            new_name: this.name.val(),
            new_desc: this.desc.val(),
        }, function(id){
            console.log('id = '+id);
        });

    }