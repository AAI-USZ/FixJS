function (callback) {
                S.log("waterfall:adjust");
                var self = this,
                    items = self.get("container").all(".ks-waterfall");
                /* 正在加，直接开始这次调整，剩余的加和正在调整的一起处理 */
                /* 正在调整中，取消上次调整，开始这次调整 */
                if (self.isAdjusting()) {
                    self._adjuster.stop();
                    self._adjuster = 0;
                }
                /*计算容器宽度等信息*/
                recalculate.call(self);
                var num = items.length;

                function check() {
                    num--;
                    if (num <= 0) {
                        self.get("container").height(Math.max.apply(Math, self.get("curColHeights")));
                        self._adjuster = 0;
                        callback && callback.call(self);
                        self.fire('adjustComplete', {
                            items:items
                        });
                    }
                }

                if (!num) {
                    return callback && callback.call(self);
                }

                return self._adjuster = timedChunk(items, function (item) {
                    adjustItemAction(self, false, item, check);
                });
            }