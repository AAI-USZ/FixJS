function(list){
    this.base();
    this._list  = def.array.isLike(list) ? list : [list];
    this._count = this._list.length;
}