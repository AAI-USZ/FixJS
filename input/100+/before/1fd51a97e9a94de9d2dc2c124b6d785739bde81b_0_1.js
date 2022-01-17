function(data) {
        albumDetailsContainer = $('<div>');
        albumDetailsContainer.attr('id', 'albumDetails' + s_albumid)                   
                   .addClass('contentContainer')
                   .addClass('albumContainer')
                   .html('<table class="albumView"><thead><tr class="headerRow"><th>Artwork</th><th>&nbsp;</th><th>Name</th><th class="time">Time</th><th>Artist</th><th>Genre</th></tr></thead><tbody class="resultSet"></tbody></table>');
        $('.contentContainer').hide();
        $('#content').append(albumDetailsContainer);
        var albumThumbnail = event.data.album.thumbnail;
        var albumTitle = event.data.album.title||'Unknown Album';
        var albumArtist = event.data.album.artist||'Unknown Artist';
        var trackCount = data.result.limits.total;
        $.each($(data.result.songs), jQuery.proxy(function(i, item) {
          if (i == 0) {
            var trackRow = $('<tr>').addClass('trackRow').addClass('tr' + i % 2);
            trackRow.append($('<td>').attr('rowspan', ++trackCount + 1).addClass('albumThumb'));
            for (var a = 0; a < 5; a++) {
              trackRow.append($('<td>').html('&nbsp').attr('style', 'display: none'));
            }
            $('#albumDetails' + s_albumid + ' .resultSet').append(trackRow);
          }
          var trackRow = $('<tr>').addClass('trackRow').addClass('tr' + i % 2).bind('click', { album: event.data.album, itmnbr: i }, jQuery.proxy(this.playTrack,this));
          var trackNumberTD = $('<td>')
            .html(item.track)

          trackRow.append(trackNumberTD);
          var trackTitleTD = $('<td>')
            .html(item.title);

          trackRow.append(trackTitleTD);
          var trackDurationTD = $('<td>')
            .addClass('time')
            .html(durationToString(item.duration));

          trackRow.append(trackDurationTD);
          var trackArtistTD = $('<td>')
            .html(item.artist);

          trackRow.append(trackArtistTD);
          var trackGenreTD = $('<td>')
            .html(item.genre);

          trackRow.append(trackGenreTD);
          $('#albumDetails' + s_albumid + ' .resultSet').append(trackRow);
        }, this));
        if (trackCount > 0) {
          var trackRow = $('<tr>').addClass('fillerTrackRow');
          for (var i = 0; i < 5; i++) {
            trackRow.append($('<td>').html('&nbsp'));
          }
          $('#albumDetails' + s_albumid + ' .resultSet').append(trackRow);

          var trackRow2 = $('<tr>').addClass('fillerTrackRow2');
          trackRow2.append($('<td>').addClass('albumBG').html('&nbsp'));
          for (var i = 0; i < 5; i++) {
            trackRow2.append($('<td>').html('&nbsp'));
          }
          $('#albumDetails' + s_albumid + ' .resultSet').append(trackRow2);
        }
        $('#albumDetails' + event.data.album.albumid + ' .albumThumb')
          .append(this.generateThumb('album', albumThumbnail, albumTitle, albumArtist))
          .append($('<div>').addClass('footerPadding'));
        $('#spinner').hide();
        myScroll = new iScroll('albumDetails' + s_albumid);
      }