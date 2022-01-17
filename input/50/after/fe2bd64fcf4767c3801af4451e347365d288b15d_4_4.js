function(){
    this._element = this.makeElement('span');
    this.decorate(this._element);
    if (this._content !== null){
        this.setContent(this._content);
    }
}