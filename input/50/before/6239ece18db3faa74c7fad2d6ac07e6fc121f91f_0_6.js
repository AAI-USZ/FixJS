function(list){
    this.base();
    this._list  = def.isArrayLike(list) ? list : [list];
    this._count = this._list.length;
}