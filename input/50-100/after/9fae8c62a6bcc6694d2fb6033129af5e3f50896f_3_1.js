function(element){
    this._element = element;
    this._name = $.trim(element.find('a').html());
    var deleter = new DeleteIcon();
    deleter.setHandler(this.getDeleteHandler());
    deleter.setContent(gettext('Remove'));
    this._element.find('td:last').append(deleter.getElement());
    this._delete_icon = deleter;
}