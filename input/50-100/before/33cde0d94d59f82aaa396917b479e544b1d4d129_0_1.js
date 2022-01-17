function getYouTube(searchLat, searchLon, searchRadius, searchQuery) {
    var endpoint = 'https://gdata.youtube.com/feeds/api/videos';

    return jQuery.ajax({
      url: endpoint,
      data: {
        'v': 2,
        'alt': 'json',
        'safeSearch': 'none',
        'orderby': 'published',
        'location': searchLat + ',' + searchLon,
        'location-radius': searchRadius + 'km',
        'q': searchQuery,
      },
      dataType: 'jsonp'
    });
  }