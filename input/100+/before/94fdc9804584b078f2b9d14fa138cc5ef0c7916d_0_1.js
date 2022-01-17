function select_track(tracks) {
    while (tracks.length != 0) {
      var random_index = parseInt(Math.random() * tracks.length, 10);
      var track_info = tracks[random_index];

      if (track_info.tracks.length > 0) {
        var track = track_info.tracks[0];

        if (track.preview_url && track.release_image) {
          return {
            title: track_info.title,
            artist_id: track_info.artist_id,
            artist_name: track_info.artist_name,
            preview_url: track.preview_url,
            release_image: track.release_image
          };
        }
      }
      tracks.splice(random_index, 1);
    }
    return null;
  }