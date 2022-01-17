function(comment, mode){
    this._comment = comment;
    this._type = mode;
    this._comment_widget = comment.getContainerWidget();
    this._text = comment.getText();
    comment.getElement().after(this.getElement());
    comment.getElement().hide();
    this._comment_widget.hideButton();
    if (this._type == 'add'){
        this._submit_btn.html(gettext('add comment'));
    }
    else {
        this._submit_btn.html(gettext('save comment'));
    }
    this.getElement().show();
    this.focus();
    putCursorAtEnd(this._textarea);
}