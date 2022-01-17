function()
{
    var preset_list = $('#list-presets');

    var template = Handlebars.compile($('#tmpl_preset').html());

    $.ajax({
        dataType: 'jsonp',
        url: 'http://10.10.200.121:3000/list',
        success: function(data)
        {
            data = { presets: data };
            preset_list.html(template(data));
        }
    });

    $('.js-cancel-save').live('click', function(e)
    {
        e.preventDefault();
        $('#save-preset').slideUp(300, function(){ $(this).addClass('hidden'); $('#save-preset form')[0].reset(); });
    });
}