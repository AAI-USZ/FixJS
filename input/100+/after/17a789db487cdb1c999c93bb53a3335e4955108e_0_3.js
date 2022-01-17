function(_viewPortItem) {
        this.url.obj.set('fragment', '/'+_viewPortItem.get('id')).go();
    }