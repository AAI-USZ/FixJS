function(){
    var element = this.makeElement('li');
    element.html(this._content);
    this._element = element;
    this.decorate(element);
}