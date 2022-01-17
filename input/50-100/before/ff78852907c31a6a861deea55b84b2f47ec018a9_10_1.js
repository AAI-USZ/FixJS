function _TagDefinition(title, etc) {
    etc = etc || {};
    
    this.title = dictionary.normalise(title);
    
    for (var p in etc) {
        if ( hasOwnProperty.call(etc, p) ) {
            this[p] = etc[p];
        }
    }
}