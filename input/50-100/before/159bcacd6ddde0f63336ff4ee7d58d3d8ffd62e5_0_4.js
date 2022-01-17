function (e) {
        // console.log('paginator:_afterIndexChange');
        
        var paginator = this,
            host = this._host,
            index = e.newVal;

        // console.log('set scrollY to ', paginator.cards[newVal].scrollY);
        host.set('scrollY', paginator.cards[index].scrollY, {src: 'ui'});

        // Cache the new index value
        paginator._cIndex = index;

        if(e.src !== UI) {
            paginator.scrollToIndex(index);
        }
    }