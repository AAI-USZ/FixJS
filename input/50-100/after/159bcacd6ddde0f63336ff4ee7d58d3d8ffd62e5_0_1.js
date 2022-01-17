function (e) {
        // console.log('_afterHostRender');
        var paginator = this,
            bb = paginator._bb;
            host = paginator._host,
            index = paginator._cIndex,
            maxScrollY = paginator.cards[index].maxScrollY;

        // Set the max height base can scroll to
        host._maxScrollY = maxScrollY;

        // Add the paginator class
        bb.addClass(CLASS_PAGED);
    }