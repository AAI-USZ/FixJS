function(element){
    this._element = element;
    this._name = $.trim(element.find('a').html());
    var deleter = new DeleteIcon();
    deleter.setHandler(this.getDeleteHandler());
    deleter.setContent('x');
    this._element.find('.group-name').append(deleter.getElement());
    this._delete_icon = deleter;
}