function initTabBox() {
        var $htabs = $('.htab'),
            $items = $htabs.find('>ul>li');
        $htabs
            .append($('#compat-desktop'))
            .append($('#compat-mobile'));

        $items.find('a').click(function() {
            var $this = $(this)
            $items.removeClass('selected');
            $this.parent().addClass('selected');
            $htabs.find('>div').hide().eq($items.index($this.parent())).show();
        }).eq(0).click();
    }