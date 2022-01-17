function ( e ) {
        var $this = $(this)
        , form = $this.closest('form')
        , be = true;
        
        if ($this.hasClass('preview')) {
            form.attr('target', '_blank');
            var action = form.attr('action');
            form.attr('action', action.replace(/new/, 'preview'));
        }else{
            form.removeAttr('target');
            var action = form.attr('action');
            form.attr('action', action.replace(/preview/, 'new'));
        }
        $('.help-inline, .help-block').each(function(i, e){
            var c = $(this).prev()
            , g = $(this).closest('.control-group');
            g.removeClass('error');
            if (typeof c.attr('name') === 'undefined'){
                c = c.find('input');
            }
            if (c.val() === '') {
                $(this).closest('.control-group').addClass('error');
                be = false;
            }
            return true;
        })
        $this.trigger('censorn')
        if (be) {form.submit();}
        return false;
    }