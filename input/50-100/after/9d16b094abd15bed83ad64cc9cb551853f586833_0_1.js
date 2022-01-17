function setMediaSrc(domElement, url, kind) {
    // var player, player_parent, $d;
    // $d = $(domElement);
    // player_parent = $d.siblings(kind).get(0);
    // player = player_parent.find('video').get(0);
    // $(player).attr('src', url);
    // player.load();
    // player.play();

    var video = $($(domElement).siblings()[0]).find('video')[0];
    $(video).attr('src', url);
    video.load();
    video.play();
}