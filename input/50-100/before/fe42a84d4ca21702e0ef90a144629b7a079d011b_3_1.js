function(){
    var that = this;
    var ItemView = this.getItemView();
    this.closeEmptyView();
    this.collection.each(function(item, index){
      that.addItemView(item, ItemView, index);
    });
  }