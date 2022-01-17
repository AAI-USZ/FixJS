function play_all()
  { autoplay_next = true;
    for(var track in tracks)
    { play(track);
      break;
    }
  }