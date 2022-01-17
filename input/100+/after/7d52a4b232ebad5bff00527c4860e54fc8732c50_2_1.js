function updateNowPlaying() {   
   
   // get the video ID
   var videoID = document.URL.match(/^[^v]+v.(.{11}).*/);
   if (videoID && videoID.length > 0)
      videoID = videoID[1];
   else
      videoID = null;
   
   // videoID from title at profile page
   if ($('#playnav-curvideo-title > span[id!=chrome-scrobbler-status]').length > 0) {
      videoID = $('#playnav-curvideo-title > span[id!=chrome-scrobbler-status]').attr('onclick').toString().match(/\?v=(.{11})/);
      if (videoID && videoID.length > 0)
         videoID = videoID[1];
   }
   // videoID from title at profile page - newer version
   if ($('#playnav-curvideo-title > a').length > 0) {
      videoID = $('#playnav-curvideo-title > a').attr('href').toString().match(/\?v=(.{11})/);
      if (videoID && videoID.length > 0)
         videoID = videoID[1];
   }
   
   // something changed?
   if (!videoID) {
      console.log('If there is a YouTube player on this page, it has not been recognized. Please fill in an issue at GitHub');
      //alert('YouTube has probably changed its code. Please get newer version of the Last.fm Scrobbler extension');
      return;
   }   

   // http://code.google.com/intl/cs/apis/youtube/2.0/developers_guide_protocol_video_entries.html
   var googleURL = "http://gdata.youtube.com/feeds/api/videos/" + videoID + "?alt=json";
   
   // clear the message
   displayMsg();
   
   // Get clip info from youtube api
   chrome.extension.sendRequest({type: "xhr", url: googleURL}, function(response) {
   	var info = JSON.parse(response.text);         	
   	var parsedInfo = parseInfo(info.entry.title.$t);
      var artist = null;
      var track = null;

      // Use the #eow-title #watch-headline-show-title if available
      var track_dom = $('#eow-title').clone();
      var artist_dom = $('#watch-headline-show-title', track_dom);
      var mdata_dom = $('#watch-description-extra-info .metadata-info > span.link-like');
      if (artist_dom.length) {
        artist = artist_dom.text();
        artist_dom.remove();
        track = track_dom.text();
        parsedInfo = cleanArtistTrack(artist, track);
      }
      /*
      // Use description metadata if available
      else if ($('#watch-description-extra-info img.music-artist').length && mdata_dom.length) {
        artist = mdata_dom.text();
        track = track_dom.text();
        track.replace(artist, '');
        parsedInfo = cleanArtistTrack(artist, track);
      }*/
      else if (parsedInfo['artist'] == '') {
        parsedInfo = parseInfo(track_dom.text());
      }

      artist = parsedInfo['artist'];
      track = parsedInfo['track'];

      // get the duration from the YT API response
      var duration = '';
   	if (info.entry.media$group.media$content != undefined)
         duration = info.entry.media$group.media$content[0].duration;
      else if (info.entry.media$group.yt$duration.seconds != undefined)
         duration = info.entry.media$group.yt$duration.seconds;                	      
      
      // Validate given artist and track (even for empty strings)
      chrome.extension.sendRequest({type: 'validate', artist: artist, track: track}, function(response) {
         // on success send nowPlaying song
         if (response != false) {
            var song = response; // contains valid artist/track now
            // substitute the original duration with the duration of the video
            chrome.extension.sendRequest({type: 'nowPlaying', artist: song.artist, track: song.track, duration: duration});
         }
         // on failure send nowPlaying 'unknown song'
         else {
            chrome.extension.sendRequest({type: 'nowPlaying', duration: duration});
            displayMsg('Not recognized');
         }
   	});
      
   });
   
}