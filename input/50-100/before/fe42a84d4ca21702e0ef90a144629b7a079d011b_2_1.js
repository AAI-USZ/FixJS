function(){
    var that = this;
    var promises = [];
    var ItemView = this.getItemView();

    this.closeEmptyView();
    this.collection.each(function(item, index){
      var promise = that.addItemView(item, ItemView, index);
      promises.push(promise);
    });

    return promises;
  }