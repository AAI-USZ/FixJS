function(){
    var element = this.makeElement('tr');
    element.html(this._content);
    this._element = element;
    this.decorate(element);
}