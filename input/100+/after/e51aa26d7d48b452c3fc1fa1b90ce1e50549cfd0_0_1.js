function() {

    if (!this.host) {
        $(document).trigger('error', {
            tiddler: this,
            method: 'uri',
            msg: 'host required'});
        return;
    }

    var container = '';
    if (!this.bag) {
        if (this.recipe) {
            container = 'recipes/' + encodeURIComponent(this.recipe);
        } else {
            $(document).trigger('error', {
                tiddler: this,
                method: 'uri',
                msg: 'no container data provided, bag or recipe required'});
            return;
        }
    } else {
        container = 'bags/' + encodeURIComponent(this.bag);
    }

    return this.host + '/' + container + '/tiddlers/' +
        encodeURIComponent(this.title);
}