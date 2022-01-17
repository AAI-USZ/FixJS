function assets_loader(assets, callback) {
    yepnope({load: collect(assets, 'link'), complete: callback});
  }