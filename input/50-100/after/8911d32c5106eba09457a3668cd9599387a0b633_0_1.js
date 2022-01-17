function (evt) {
    var addons = Joshfire.factory.getAddOns('share');
    addons.startActivity({
      data: ((currentData === Object(currentData)) ? currentData.url : ''),
      type: 'text/uri-list'
    }, function (data) {
      console.log('Intent "share" done', data);
    }, function (err) {
      console.log('Intent "share" err', err);
    });
  }