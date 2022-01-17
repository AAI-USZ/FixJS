function() {

    if (!this.host) {
        $('body').trigger('error', 'host required');
        return;
    }

    var container = '';
    if (!this.bag) {
        if (this.recipe) {
            container = 'recipes/' + encodeURIComponent(this.recipe);
        } else {
            $('body').trigger('error',
                    'no container data provided bag or recipe required');
            return;
        }
    } else {
        container = 'bags/' + encodeURIComponent(this.bag);
    }

    return this.host + '/' + container + '/tiddlers/' +
        encodeURIComponent(this.title);
}