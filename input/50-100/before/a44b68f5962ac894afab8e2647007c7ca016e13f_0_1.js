function (e) {
        // console.log('paginator:_scrollEnded');
        
        var paginator = this,
            host = this._host,
            index = paginator.get(INDEX);

        paginator.cards[index].scrollY = host.get('scrollY');

        paginator._optimize();
        paginator._uiEnable();
    }