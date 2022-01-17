function play_all()
  { autoplay_next = true;
    for(var i = 0; i < tracks_ids.length; i++)
    { play(tracks_ids[i]);
      break;
    }
  }