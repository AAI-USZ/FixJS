function setMediaSrc(domElement, url, kind) {
    var player, $d;
    $d = $(domElement);
    player = $d.siblings(kind).get(0);
    $(player).attr('src', url);
    player.load();
    player.play();
}