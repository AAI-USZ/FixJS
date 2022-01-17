function add_track(track_id, track_url){
    tracks[track_id] = track_url;
    last_track_index++;
    tracks_ids[last_track_index] = track_id;
  }