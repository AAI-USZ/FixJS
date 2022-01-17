function(){
    var name = this.get('name');
    var path = 'content.' + name;
    var value = this.getPath(path);
    this.set('value', this.getPath(path));
  }