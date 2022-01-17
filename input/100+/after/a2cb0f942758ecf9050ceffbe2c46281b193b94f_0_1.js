function Brick() {
        var self = this;
        self.pagelet = arguments[0] ? arguments[0].pagelet : null; //pagelet的引用
        Brick.superclass.constructor.apply(this, arguments);
        var context = self.pagelet ? self.pagelet : self;
        if (context.get('rendered')) {
            self.initialize();
            self._bindEvent();
        } else {
            context.on('rendered', function() {
                self.initialize();
                self._bindEvent();
            });
        }

        var tmpler = self.get('tmpler'),
            id = self.get('id');
        if (tmpler && !S.isEmptyObject(tmpler.bricks)) {
            S.each(tmpler.bricks, function(b, k) {
                tmpler.bricks[k].brick = self;
            });
        }
        if (!tmpler && !id) {
            id = self.get('el').attr('id') || self.constructor.name;
            self.set('id', id);
        }
        var renderer = self.constructor.RENDERER;
        if (renderer) {
            context.get('dataset').setRenderer(renderer, self, id);
        }
    }