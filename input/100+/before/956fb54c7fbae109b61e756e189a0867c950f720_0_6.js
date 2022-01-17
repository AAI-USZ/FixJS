function()
{

    // $('#torrents').on('click', '.torrent', function(e)
    // {
    //     e.preventDefault()
    //     // $('.torrent', '#torrents').removeClass('selected')
    //     $(this).toggleClass('selected')

    //     $('#torrent_controls').toggleClass('open', $('.torrent.selected', '#torrents').length > 0)
    // })

    $('#controls_top').on('click', '.sub ul a', function(e)
    {
        e.preventDefault()
        $(this).closest('.sub').removeClass('open')
    })

    $('#controls_top').on('click', '.sub > a:first', function(e)
    {
        e.preventDefault()
        $(this).parent().toggleClass('open')
        $(this).next('ul').css({
            scale: 0.8,
            opacity: 0
        }).animate({
            scale: 1,
            opacity: 1
        }, 200)
    })
}