function addVideo(videodata) {
    // If this is the first video we've found,
    // remove the "no videos" message
    if (videos.length === 0)
      document.getElementById('novideos')
      .classList.add('hidden');

    var index = videos.length;
    videos.push(videodata);

    if (videodata.poster) {
      var poster = document.createElement('img');
      poster.src = URL.createObjectURL(videodata.poster);
      poster.onload = function() {
        URL.revokeObjectURL(poster.src);
      };
    }

    var title = document.createElement('p');
    title.className = 'name';
    title.textContent = videodata.title;

    var duration = document.createElement('p');
    duration.className = 'time';
    if (isFinite(videodata.duration)) {
      var d = Math.round(videodata.duration);
      var mins = Math.floor(d / 60);
      var secs = d % 60;
      if (secs < 10) secs = '0' + secs;
      duration.textContent = mins + ':' + secs;
    }

    var thumbnail = document.createElement('li');
    if (poster) {
      thumbnail.appendChild(poster);
    }
    thumbnail.appendChild(title);
    thumbnail.appendChild(duration);
    thumbnail.addEventListener('click', function(e) {
      showPlayer(videodata);
    });

    $('thumbnails').appendChild(thumbnail);
  }