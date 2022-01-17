function() {
    $('a#subscription').click(function () {
        var link = $(this)[0];
        $.getJSON(link.href, function (controlInfo) {
            link.textContent = controlInfo.caption;
            link.setAttribute('data-original-title', controlInfo.tooltip);
            link.href = $root + controlInfo.urlSuffix;
        });
        return false;

    })
}