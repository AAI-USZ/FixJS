function (callback) {
    var self = this
      , items
      , chain;

    items = [
      _registerModels
    , _registerConstructors
    , _loadRouter
    , _loadSessionStore
    , _loadLocales
    , _loadMetrics
    , _registerTemplatePaths
    , _loadHelpers
    , _runAppLocalInit
    ];

    chain = new geddy.async.SimpleAsyncChain(items, this);
    chain.last = function () {
      self.start(callback);
    };
    chain.run();
  }