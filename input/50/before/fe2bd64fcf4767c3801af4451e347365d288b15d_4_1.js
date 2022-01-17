function(){
    if (this._element === null){
        this.createDom();
    }
    return this._element;
}