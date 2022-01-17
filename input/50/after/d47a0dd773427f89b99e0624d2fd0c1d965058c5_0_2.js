function(id){
    if (!this.detailView){
      this.detailView = new DetailView({
        router: this,
        case_id: id
      });
    }
    return this.detailView;
  }