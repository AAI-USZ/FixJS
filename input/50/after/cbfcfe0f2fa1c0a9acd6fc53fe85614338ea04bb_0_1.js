function load_assets(assets, callback) {
    yepnope({load: collect(assets, 'link'), complete: callback});
  }