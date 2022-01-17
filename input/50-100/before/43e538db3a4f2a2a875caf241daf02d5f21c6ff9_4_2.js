function (items, callback) {
                var self = this;

                /* 正在调整中，直接这次加，和调整的节点一起处理 */
                /* 正在加，直接这次加，一起处理 */
                self._adder = timedChunk(items,
                    addItem,
                    self,
                    function () {
                        self.get("container").height(Math.max.apply(Math,
                            self.get("curColHeights")));
                        self._adder = 0;
                        callback && callback.call(self);
                        self.fire('addComplete', {
                            items:items
                        });
                    });

                return self._adder;
            }