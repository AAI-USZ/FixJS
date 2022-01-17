function()
    {
        this.el.find('#beforecrop').slideUp(500);
        this.el.find('#cropwait').slideDown(500);

        this.options.fragment.crop({
            start: this.start.text()-1,
            end: this.end.text()-1,
            f_internal: this.cb_internal.is(':checked'),
            f_all: (this.cb_internal.is(':checked') && 
                    this.cb_all.is(':checked')),
            result: this.result_type.selectmenu('value'),
            new_name: this.name.val(),
            new_desc: this.desc.val(),
        }, function(id){
            if($('#go_new').is(':checked'))
                window.location = '/fragment/'+id;
            else
                location.reload();
        });

    }