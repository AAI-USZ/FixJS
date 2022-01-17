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