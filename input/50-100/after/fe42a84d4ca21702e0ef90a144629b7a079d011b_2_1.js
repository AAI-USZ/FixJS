function(){
    var that = this;
    var promises = [];

    this.closeEmptyView();

    var ItemView = this.getItemView();
    this.collection.each(function(item, index){
      var promise = that.addItemView(item, ItemView, index);
      promises.push(promise);
    });

    return promises;
  }