function() {
if (window.location.href.indexOf("pitchfork.com/reviews/tracks") != -1) {
    $("li.player-target").each(function () {
                               var song = $.trim($(this).find('span.title').text());
                               song = song.replace('"', '');
                               song = song.replace('"', '');
                               
                               var artist = $.trim($(this).find('span.artist').text());
                               artist = artist.replace(':', '');
        Playgrub.playlist.add_track(artist, song);
    });

    $('.review-meta .info').each(function() {
      var title = $(this).find("h2").text();
      title = title.replace('"', '');
      title = title.replace('"', '');

      var artist = $(this).find('h1 a').html();
        Playgrub.playlist.add_track(artist, title);
    })
    
} else if (window.location.href.indexOf("pitchfork.com/reviews/best/tracks") != -1) {
    $("li").each(function () {
                               var song = $.trim($(this).find('span.title').text());
                               song = song.replace('"', '');
                               song = song.replace('"', '');
                               
                               var artist = $.trim($(this).find('span.artist').text());
                               artist = artist.replace(':', '');
        Playgrub.playlist.add_track(artist, song);
                       });  
}

}