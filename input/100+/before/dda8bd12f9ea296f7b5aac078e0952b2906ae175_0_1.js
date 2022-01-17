function handle_attach(title,caption,id,thumb){
        var source   = $('#attachment-template').html();
        var template = Handlebars.compile(source);

        var order = $('#attachments-list > ul > li').length + 1;

        $('div#attachments-list ul', top.document).append(template({title:title,caption:caption,id:id,thumb:thumb,order:order}));

        $('#attachments-list > ul > li').each(function(i, id) {
            $(this).find('input.attachment_order').val(i+1);
        });

        return false;
    }