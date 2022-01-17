function(){
    var name = this.get('name');
    var path = 'content.' + name;
    var value = this.getPath(path);
    this.set('value', this.getPath(path));
    var content = this.get('content');
    if(content){
      content.addObserver(this.get('name'), this, function(){
        console.log(this.getPath('content.name'));
      });
    }
  }