function(data){
    this._data = data || this._data;
    this._element.html('');
    this._element.attr('class', 'comment');
    this._element.attr('id', 'comment-' + this._data['id']);

    var votes = this.makeElement('div');
    votes.addClass('comment-votes');

    var vote = new CommentVoteButton(this);
    if (this._data['upvoted_by_user']){
        vote.setVoted(true);
    }
    vote.setScore(this._data['score']);
    votes.append(vote.getElement());

    this._element.append(votes);

    this._comment_delete = $('<div class="comment-delete"></div>');
    if (this._deletable){
        this._delete_icon = new DeleteIcon(this._delete_prompt);
        this._delete_icon.setHandler(this.getDeleteHandler());
        this._comment_delete.append(this._delete_icon.getElement());
    }
    this._element.append(this._comment_delete);

    this._comment_body = $('<div class="comment-body"></div>');
    this._comment_body.html(this._data['html']);
    //this._comment_body.append(' &ndash; ');

    this._user_link = $('<a></a>').attr('class', 'author');
    this._user_link.attr('href', this._data['user_url']);
    this._user_link.html(this._data['user_display_name']);
    this._comment_body.append(this._user_link);

    this._comment_body.append(' (');
    this._comment_added_at = $('<abbr class="timeago"></abbr>');
    this._comment_added_at.html(this._data['comment_added_at']);
    this._comment_added_at.attr('title', this._data['comment_added_at']);
    this._comment_added_at.timeago();
    this._comment_body.append(this._comment_added_at);
    this._comment_body.append(')');

    if (this._editable){
        this._edit_link = new EditLink();
        this._edit_link.setHandler(this.getEditHandler())
        this._comment_body.append(this._edit_link.getElement());
    }
    this._element.append(this._comment_body);

    this._blank = false;
}