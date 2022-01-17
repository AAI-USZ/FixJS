function(){
    var that = this;

    this.closeEmptyView();

    var ItemView = this.getItemView();
    this.collection.each(function(item, index){
      that.addItemView(item, ItemView, index);
    });
  }