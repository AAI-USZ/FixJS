function (e) {
        // console.log('paginator:_scrollEnded');
        
        var paginator = this,
            host = this._host,
            index = paginator._cIndex,
            scrollY = host.get('scrollY');
        
        // Do some cleanup
        delete paginator._gesture;

        paginator.cards[index].scrollY = scrollY;
// console.log('_scrollEnded: setting ' + index + ' to ' + scrollY);
        // paginator._optimize();
        // paginator._uiEnable();
    }