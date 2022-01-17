function()
        {
            $(this).click(function()
            {
                $('#slot_' + $(this).attr('ref')).animate({
                  height: 'toggle'
                }, 200);

                return false;
            });
        }