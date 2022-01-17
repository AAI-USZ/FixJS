function()
    {
        window.editing = false;
        jQuery(".token_edit").unbind('click').bind('click', function(e)
        {
            if (window.editing)
                return true;
            var row = jQuery(this).closest('.jqgrow');
            var func = function()
            {
                jQuery('#displaytokens').restoreRow(row.attr('id'));
                row.find('input').show();
                row.find('.drop_editing').remove();
                row.find('.save').remove();
                window.editing = false;
            }

            jQuery('#displaytokens').editRow(row.attr('id'), true, null, null, null, null, func);
            jQuery(this).parent().find('input').hide();
            window.editing = true;

            var validfrom = row.find('[aria-describedby="displaytokens_validfrom"]');
            validfrom.find('input').css('width', '119px').datetimepicker({
                showOn: 'button',
                dateFormat: userdateformat
            });
            var validuntil = row.find('[aria-describedby="displaytokens_validuntil"]');
            validuntil.find('input').css('width', '119px').datetimepicker({
                showOn: 'button',
                dateFormat: userdateformat
            });

            jQuery('<input type="image" class="drop_editing" src="' + jQuery(this).parent().find('input:eq(1)').attr('src') + '" />')
                .appendTo(jQuery(this).parent())
                .click(func);
            jQuery('<input type="image" class="save" src="' + imageurl + '/ok.png" width="16" />')
                .appendTo(jQuery(this).parent())
                .click(function()
                {
                     jQuery('#displaytokens').saveRow(row.attr('id'));
                     func();
                });
        });
    }