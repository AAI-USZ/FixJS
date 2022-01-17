function init_visio () {
    $(".visio_img").click(function () {
        current = $(this)
        updateFullImage($(this).prop("href"))
        return false
    })
    $("#visio_preview").hide()
    document.body.style.overflow = 'hidden';
    nextprev()
    
    jwerty.key('s/n/→/↓', function () { nextprev()});
    jwerty.key('p/←/↑', function () {nextprev(true)});
}