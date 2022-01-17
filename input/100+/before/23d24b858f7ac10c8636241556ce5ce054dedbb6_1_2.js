function(e) {
        var self    = this,
            $toggle = $(e.target),
            $li     = $toggle.parents('li:first');

        if ($toggle.prop('tagName') == 'H1')
        {
            $toggle = $li.find('.toggle');
        }

        console.log("toggleItem");

        var title   = $toggle.attr('title');

        e.preventDefault();
        e.stopPropagation();

        if ($li.hasClass('collapsed'))
        {
            $li.removeClass('collapsed');
            $li.find('.curation-items').slideDown(function() {
                $toggle.attr('title', title.replace('expand', 'collapse'));
            });
        }
        else
        {
            $li.find('.curation-items').slideUp(function() {
                $li.addClass('collapsed');
                $toggle.attr('title', title.replace('collapse', 'expand'));
            });
        }
    }