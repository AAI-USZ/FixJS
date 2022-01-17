function(time, index, msg) {
    if ((!mmap.statusTextSeq) || index > mmap.statusTextSeq) {
        var audioElement = new Audio('drone_chime.mp3');
        audioElement.play();
        $('#t_sta_txt').html(msg.text)
            .stop(true, true)
            .css('color', 'yellow')
            .css('background-color', 'rgb(0, 0, 0, 1.0)')
            .animate({
                color: $.Color('yellow'),
                backgroundColor: $.Color('rgb(0, 0, 0, 1.0)')
            }, {
                duration: 200,
                queue: true
            })
            .animate({
                color: $.Color('white'),
                backgroundColor: $.Color('rgb(0, 0, 0, 0.0)')
            }, {
                duration: 5000,
                queue: true
            });
        mmap.statusTextSeq = index;
    }
}