function(){
    if (this._comment_body){
        this._comment_body.remove();
    }
    if (this._comment_delete){
        this._comment_delete.remove();
    }
    if (this._user_link){
        this._user_link.remove();
    }
    if (this._comment_added_at){
        this._comment_added_at.remove();
    }
    if (this._delete_icon){
        this._delete_icon.dispose();
    }
    if (this._edit_link){
        this._edit_link.dispose();
    }
    this._data = null;
    Comment.superClass_.dispose.call(this);
}