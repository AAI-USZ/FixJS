function(eventEmitter) {
  eventEmitter.on('playerExited', function(message){
      nowPlaying = null;
      if(queue.length != 0) {
        // Play the next song on the queue
        var next = queue.shift();
        mplayer.play(next);
        setNowPlaying(next, false);
      } else if(shouldPlayRandomSong) {
        // Find a random song in the database to play
        database.getRandomSong(function(err, song) {
          if(err) throw err;
          mplayer.play(song);
          setNowPlaying(song, false);
        });
      } else {
        setNowPlaying(undefined, false);
      }
  });
}