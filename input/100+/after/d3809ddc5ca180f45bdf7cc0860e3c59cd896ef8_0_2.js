function () {
    $('a#subscription').click(function () {
        var link = $(this)[0];
        $.ajax({
            url:link.href,
            type:"GET",
            async:false,
            success:function (data) {
                if (link.href.indexOf("unsubscribe") == -1) {
                    // subscribe operation success
                    link.textContent = $labelUnsubscribe;
                    link.setAttribute('data-original-title', $labelUnsubscribeTooltip);
                    link.href = link.href.replace("subscribe", "unsubscribe");
                } else {
                    // unsubscribe operation success
                    link.textContent = $labelSubscribe;
                    link.setAttribute('data-original-title', $labelSubscribeTooltip);
                    link.href = link.href.replace("unsubscribe", "subscribe");
                }
            }});
        return false;
    })
}