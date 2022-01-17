function () {
        var item = self.paper.image(
            src,
            w[0] - im.width / 2, w[1] - im.height + 25,
            im.width, im.height
        );
        item.data('x', x);
        item.data('y', y);
        
        for (var i = 0; i < self.itemSet.length; i++) {
            if (y <= self.itemSet[i].data('y')) {
                self.itemSet.splice(i, 0, item);
                break;
            }
        }
        if (i === self.itemSet.length) self.itemSet.push(item);
        
        self.itemSet.toFront();
        self.items[x + ',' + y] = item;
        
        if (typeof cb === 'function') cb(null, item);
    }