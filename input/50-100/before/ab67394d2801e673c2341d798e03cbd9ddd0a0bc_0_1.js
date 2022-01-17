function () {
    $('.dropdown-toggle').dropdown();
    $(".collapse").collapse();
    
    $('.mechanic-details, .car-details').click(function (e) {
        addActiveClass(this);

        // Load left panel
        target = $(this).attr('data-target')
        url = $(this).attr('url')
        $(target).load(url);
    })
    
}