function (e) {
        // console.log('paginator:_afterIndexChange');
        
        var paginator = this,
            host = this._host,
            index = e.newVal,
            maxScrollY = paginator.cards[index].maxScrollY;

        // Update the scrollY attribute with the current card's scrollY
        host.set('scrollY', paginator.cards[index].scrollY, {src: 'ui'});

        // Set the max height base can scroll to
        host._maxScrollY = maxScrollY;

        // Cache the new index value
        paginator._cIndex = index;

        if(e.src !== UI) {
            paginator.scrollToIndex(index);
        }
    }