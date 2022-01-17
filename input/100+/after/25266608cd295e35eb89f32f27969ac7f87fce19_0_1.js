function()
  { if(current_track != false)
    { var loaded = Math.round((100 * this.bytesLoaded) / this.bytesTotal);
      var position = Math.round((100 * this.position) / this.duration);
      $("#track_" + current_track).find(".loaded").get(0).style.width = loaded + "%";
      $("#track_" + current_track).find(".position").get(0).style.width = position + "%";
      if(this.position > 0) has_started = true;
      if(this.position == 0 && has_started)
      { _stop();
        var FOUND = false;
        if(autoplay_next)
        { for(var i = 0; i < tracks_ids.length; i++)
          { if(FOUND)
            { play(tracks_ids[i]);
              break;
            }
            else
            { if(tracks_ids[i] == current_track) FOUND = true;
            }
          }
        }
        if(!FOUND) current_track = false;
      }
    }
  }