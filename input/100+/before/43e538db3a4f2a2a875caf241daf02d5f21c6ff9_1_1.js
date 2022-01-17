function (item, cfg) {
                var self = this;
                cfg = cfg || {};

                if (self.isAdjusting()) {
                    return;
                }

                var originalOuterHeight = item.outerHeight(true),
                    outerHeight;

                if (cfg.process) {
                    outerHeight = cfg.process.call(self);
                }

                if (outerHeight === undefined) {
                    outerHeight = item.outerHeight(true);
                }

                var diff = outerHeight - originalOuterHeight,
                    curColHeights = self.get("curColHeights"),
                    col = parseInt(item.attr("data-waterfall-col")),
                    colItems = self.get("colItems")[col],
                    items = [],
                    original = Math.max.apply(Math, curColHeights),
                    now;

                for (var i = 0; i < colItems.length; i++) {
                    if (colItems[i][0] === item[0]) {
                        break;
                    }
                }

                i++;

                while (i < colItems.length) {
                    items.push(colItems[i]);
                    i++;
                }

                curColHeights[col] += diff;

                now = Math.max.apply(Math, curColHeights);

                if (now != original) {
                    self.get("container").height(now);
                }

                var effect = cfg.effect,
                    num = items.length;

                if (!num) {
                    return cfg.callback && cfg.callback.call(self);
                }

                function check() {
                    num--;
                    if (num <= 0) {
                        self._adjuster = 0;
                        cfg.callback && cfg.callback.call(self);
                    }
                }

                if (effect === undefined) {
                    effect = self.get("adjustEffect");
                }

                return self._adjuster = timedChunk(items, function (item) {
                    if (effect) {
                        item.animate({
                                top:parseInt(item.css("top")) + diff
                            },
                            effect.duration,
                            effect.easing,
                            check);
                    } else {
                        item.css("top", parseInt(item.css("top")) + diff);
                        check();
                    }
                });
            }