function() {

  Luca.CollectionManager = (function() {

    CollectionManager.prototype.name = "main";

    CollectionManager.prototype.__collections = {};

    function CollectionManager(options) {
      var manager, _base;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Backbone.Events);
      _.extend(this, Luca.Events);
      manager = this;
      (_base = Luca.CollectionManager).get || (_base.get = function(name) {
        var _base2;
        if (name == null) return manager;
        return (_base2 = Luca.CollectionManager).instances || (_base2.instances = {});
      });
      this.state = new Luca.Model();
      if (this.initialCollections) {
        this.state.set({
          loaded_collections_count: 0,
          collections_count: this.initialCollections.length
        });
        this.state.bind("change:loaded_collections_count", this.collectionCountDidChange);
        if (this.useProgressLoader) {
          this.loaderView || (this.loaderView = new Luca.components.CollectionLoaderView({
            manager: this,
            name: "collection_loader_view"
          }));
        }
        this.loadInitialCollections();
      }
      this;
    }

    CollectionManager.prototype.add = function(key, collection) {
      var _base;
      return (_base = this.currentScope())[key] || (_base[key] = collection);
    };

    CollectionManager.prototype.allCollections = function() {
      return _(this.currentScope()).values();
    };

    CollectionManager.prototype.create = function(key, collectionOptions, initialModels) {
      var CollectionClass, collection;
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      CollectionClass = collectionOptions.base;
      CollectionClass || (CollectionClass = this.guessCollectionClass(key));
      if (collectionOptions.private) collectionOptions.name = "";
      collection = new CollectionClass(initialModels, collectionOptions);
      this.add(key, collection);
      return collection;
    };

    CollectionManager.prototype.collectionNamespace = Luca.Collection.namespace;

    CollectionManager.prototype.currentScope = function() {
      var current_scope, _base;
      if (current_scope = this.getScope()) {
        return (_base = this.__collections)[current_scope] || (_base[current_scope] = {});
      } else {
        return this.__collections;
      }
    };

    CollectionManager.prototype.each = function(fn) {
      return _(this.all()).each(fn);
    };

    CollectionManager.prototype.get = function(key) {
      return this.currentScope()[key];
    };

    CollectionManager.prototype.getScope = function() {
      return;
    };

    CollectionManager.prototype.getOrCreate = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.get(key) || this.create(key, collectionOptions, initialModels, false);
    };

    CollectionManager.prototype.guessCollectionClass = function(key) {
      var classified, guess;
      classified = Luca.util.classify(key);
      guess = (this.collectionNamespace || (window || global))[classified];
      guess || (guess = (this.collectionNamespace || (window || global))["" + classified + "Collection"]);
      return guess;
    };

    CollectionManager.prototype.loadInitialCollections = function() {
      var collectionDidLoad,
        _this = this;
      collectionDidLoad = function(collection) {
        collection.unbind("reset");
        return _this.trigger("collection_loaded", collection.name);
      };
      return _(this.initialCollections).each(function(name) {
        var collection;
        collection = _this.getOrCreate(name);
        collection.bind("reset", function() {
          return collectionDidLoad(collection);
        });
        return collection.fetch();
      });
    };

    CollectionManager.prototype.collectionCountDidChange = function() {
      if (this.totalCollectionsCount() === this.loadedCollectionsCount()) {
        return this.trigger("all_collections_loaded");
      }
    };

    CollectionManager.prototype.totalCollectionsCount = function() {
      return this.state.get("collections_count");
    };

    CollectionManager.prototype.loadedCollectionsCount = function() {
      return this.state.get("loaded_collections_count");
    };

    CollectionManager.prototype.private = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.create(key, collectionOptions, initialModels, true);
    };

    return CollectionManager;

  })();

  Luca.CollectionManager.instances = {};

  Luca.CollectionManager.destroyAll = function() {
    return Luca.CollectionManager.instances = {};
  };

}