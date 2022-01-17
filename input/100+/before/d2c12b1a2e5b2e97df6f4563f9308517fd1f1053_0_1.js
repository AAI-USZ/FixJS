function(tab) {
    console.log(chrome.extension.getBackgroundPage());
    var microformatData = chrome.extension.getBackgroundPage().hNewsData[tab.id];

    document.getElementById('title').innerHTML = microformatData.hNews.title || '';
    document.getElementById('author').innerHTML = microformatData.hNews.author || '';
    document.getElementById('source').innerHTML = microformatData.hNews.source || '';
    document.getElementById('updated').innerHTML = (microformatData.hNews.updated) ? new Date(microformatData.hNews.updated) : '';

    document.getElementById('dateline').innerHTML = microformatData.hNews.dateline || '';
    document.getElementById('geo').innerHTML = (microformatData.hNews.geo) ? microformatData.hNews.geo.latitude + ", " + microformatData.hNews.geo.longitude : '';
    document.getElementById('license').innerHTML = (microformatData.hNews.license) ? microformatData.hNews.license.link : '';
    document.getElementById('principles').innerHTML = (microformatData.hNews.principle) ? microformatData.hNews.principle.link : '';
    document.getElementById('published').innerHTML = (microformatData.hNews.published) ? new Date(microformatData.hNews.published) : '';

    for (var x = 0; x < microformatData.hNews.tags.length; x++) {
      var tagSpan = document.createElement('span');
      tagSpan.setAttribute('class', 'tag');
      tagSpan.innerHTML = microformatData.hNews.tags[x];

      document.getElementById('tags').appendChild(tagSpan);
    }

    document.getElementById('licenseAP').innerHTML = (microformatData.hNews.license) ? 'Yes (see above)' : 'No';
    if (microformatData.apBeacon) {
      document.getElementById('beacon').innerHTML = (microformatData.apBeacon.isValid) ? 'Yes' : 'Invalid';
      document.getElementById('beaconData').style.display = 'block';

      document.getElementById('apCreatorId').innerHTML = microformatData.apBeacon.creatorId || '';
      document.getElementById('apReleaseWebSite').innerHTML = microformatData.apBeacon.rws || '';
      document.getElementById('apCreatorArticleId').innerHTML = microformatData.apBeacon.cai  || '';
      document.getElementById('apMyArticleId').innerHTML = microformatData.apBeacon.mai || '';
      document.getElementById('apCreatorVersionId').innerHTML = microformatData.apBeacon.cvi || '';
      document.getElementById('apEnvironment').innerHTML = microformatData.apBeacon.e || '';
      document.getElementById('apPermissionCategory').innerHTML = microformatData.apBeacon.pc || '';
      document.getElementById('apArticleType').innerHTML = microformatData.apBeacon.at || '';
    } else {
      document.getElementById('beacon').innerHTML = 'No';
    }
  }