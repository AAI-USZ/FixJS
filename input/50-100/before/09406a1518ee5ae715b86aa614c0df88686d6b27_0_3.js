function updateNowPlaying( _song, _cover) {

    dynplayModel.set({
        "artist": _song.artist,
        "song": _song
    });

    var coverImg = new ui.SPImage(_cover);
    coverImg.node.setAttribute("id", "cover_placeholder");
    document.getElementById("np_cover").replaceChild(coverImg.node, document.getElementById("cover_placeholder"));

	enablePlayerControls();
}