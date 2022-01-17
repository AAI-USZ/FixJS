function(text) {
    var old_text = this._error_alert.html();
    this._error_alert.html(text);
    if (old_text == '') {
        this._error_alert.hide();
        this._error_alert.fadeIn(100);
    }
    this._element.css('margin-top', '0');//todo: remove this hack
}