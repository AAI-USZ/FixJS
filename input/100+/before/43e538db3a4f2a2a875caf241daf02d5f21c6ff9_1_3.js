function (S, Node, Base) {

    var $ = Node.all,
        win = S.Env.host,
        RESIZE_DURATION = 50;

    /**
     * @class
     * Make Elements flow like waterfall.
     * @name Waterfall
     */
    function Waterfall() {
        Waterfall.superclass.constructor.apply(this, arguments);
        this._init();
    }


    function timedChunk(items, process, context, callback) {
        var todo = [].concat(S.makeArray(items)),
            stopper = {},
            timer;
        if (todo.length > 0) {
            timer = setTimeout(function () {
                var start = +new Date();
                do {
                    var item = todo.shift();
                    process.call(context, item);
                } while (todo.length > 0 && (+new Date() - start < 50));

                if (todo.length > 0) {
                    timer = setTimeout(arguments.callee, 25);
                } else {
                    callback && callback.call(context, items);
                }
            }, 25);
        } else {
            callback && S.later(callback, 0, false, context, [items]);
        }

        stopper.stop = function () {
            if (timer) {
                clearTimeout(timer);
                todo = [];
                items.each(function (item) {
                    item.stop();
                });
            }
        };

        return stopper;
    }


    Waterfall.ATTRS =
    /**
     * @lends Waterfall
     */
    {
        /**
         * Container which contains waterfall elements.
         * @type Node
         */
        container:{
            setter:function (v) {
                return $(v);
            }
        },

        /**
         * Array of height of current waterfall cols.
         * @protected
         * @type Number[]
         */
        curColHeights:{
            value:[]
        },

        /**
         * Horizontal alignment of waterfall items with container.
         * Enum: 'left','center','right'.
         * @type String
         * @since 1.3
         */
        align:{
            value:'center'
        },

        /**
         * Minimum col count of waterfall items.
         * Event window resize to 0.
         * Default: 1.
         * @type Number
         */
        minColCount:{
            value:1
        },

        /**
         * Effect config object when waterfall item is added to container.
         * Default: { effect:"fadeIn",duration:1 }
         * @type Object
         * @example
         * <code>
         *      {
         *          effect:'fadeIn', // or slideUp
         *          duration:1 // unit is second
         *      }
         * </code>
         */
        effect:{
            value:{
                effect:"fadeIn",
                duration:1
            }
        },

        /**
         * Column's width.
         * @type Number
         */
        colWidth:{},

        /**
         * Waterfall items grouped by col.
         * @private
         * @type (Node[])[]
         * @example
         * <code>
         *  [[node11,node12],[node21,node22]]
         * </code>
         */
        colItems:{
            value:[]
        },

        /**
         * Effect config object when waterfall item is adjusted on window resize.
         * Default: { easing:"",duration:1 }
         * @type Object
         * @example
         * <code>
         *      {
         *          easing:'', // easing type
         *          duration:1 // unit is second
         *      }
         * </code>
         */
        adjustEffect:{}
    };

    function doResize() {
        var self = this, containerRegion = self._containerRegion || {};
        // 宽度没变就没必要调整
        if (containerRegion && self.get("container").width() === containerRegion.width) {
            return
        }
        self.adjust();
    }

    function recalculate() {
        var self = this,
            container = self.get("container"),
            containerWidth = container.width(),
            curColHeights = self.get("curColHeights");
        // 当前列数
        curColHeights.length = Math.max(parseInt(containerWidth / self.get("colWidth")),
            self.get("minColCount"));
        // 当前容器宽度
        self._containerRegion = {
            width:containerWidth
        };
        S.each(curColHeights, function (v, i) {
            curColHeights[i] = 0;
        });
        self.set("colItems", []);
    }

    function adjustItemAction(self, add, itemRaw, callback) {
        var effect = self.get("effect"),
            item = $(itemRaw),
            align = self.get("align"),
            curColHeights = self.get("curColHeights"),
            container = self.get("container"),
            curColCount = curColHeights.length,
            col = 0,
            containerRegion = self._containerRegion,
            guard = Number.MAX_VALUE;

        if (!curColCount) {
            return undefined;
        }

        // 固定左边或右边
        if (item.hasClass("ks-waterfall-fixed-left")) {
            col = 0;
        } else if (item.hasClass("ks-waterfall-fixed-right")) {
            col = curColCount > 0 ? curColCount - 1 : 0;
        } else {
            // 否则找到最短的列
            for (var i = 0; i < curColCount; i++) {
                if (curColHeights[i] < guard) {
                    guard = curColHeights[i];
                    col = i;
                }
            }
        }

        // 元素保持间隔不变，居中
        var margin = align === 'left' ? 0 :
                Math.max(containerRegion.width - curColCount * self.get("colWidth"), 0),
            colProp;

        if (align === 'center') {
            margin /= 2;
        }

        colProp = {
            // 元素间固定间隔好点
            left:col * self.get("colWidth") + margin,
            top:curColHeights[col]
        };

        /*
         不在容器里，就加上
         */
        if (add) {
            // 初始需要动画，那么先把透明度换成 0
            item.css(colProp);
            if (effect && effect.effect) {
                // has layout to allow to compute height
                item.css("visibility", "hidden");
            }
            container.append(item);
            callback && callback();
        }
        // 否则调整，需要动画
        else {
            var adjustEffect = self.get("adjustEffect");
            if (adjustEffect) {
                item.animate(colProp, adjustEffect.duration,
                    adjustEffect.easing, callback);
            } else {
                item.css(colProp);
                callback && callback();
            }
        }

        // 加入到 dom 树才能取得高度
        curColHeights[col] += item.outerHeight(true);
        var colItems = self.get("colItems");
        colItems[col] = colItems[col] || [];
        colItems[col].push(item);
        item.attr("data-waterfall-col", col);

        return item;
    }

    function addItem(itemRaw) {
        var self = this,
        // update curColHeights first
        // because may slideDown to affect height
            item = adjustItemAction(self, true, itemRaw),
            effect = self.get("effect");
        // then animate
        if (effect && effect.effect) {
            // 先隐藏才能调用 fadeIn slideDown
            item.hide();
            item.css("visibility", "");
            item[effect.effect](
                effect.duration,
                0,
                effect.easing
            );
        }
    }

    S.extend(Waterfall, Base,
        /**
         * @lends Waterfall
         */
        {
            /**
             * Whether is adjusting waterfall items.
             * @returns Boolean
             */
            isAdjusting:function () {
                return !!this._adjuster;
            },

            /**
             * Whether is adding waterfall item.
             * @since 1.3
             * @returns Boolean
             */
            isAdding:function () {
                return !!this._adder;
            },

            _init:function () {
                var self = this;
                // 一开始就 adjust 一次，可以对已有静态数据处理
                doResize.call(self);
                self.__onResize = S.buffer(doResize, RESIZE_DURATION, self);
                $(win).on("resize", self.__onResize);
            },


            /**
             * Ajust the height of one specified item.
             * @param {NodeList} item Waterfall item to be adjusted.
             * @param {Object} cfg Config object.
             * @param {Function} cfg.callback Callback function after the item is adjusted.
             * @param {Function} cfg.process Adjust logic function.
             * If returns a number, it is used as item height after adjust.
             * else use item.outerHeight(true) as item height after adjust.
             * @param {Object} cfg.effect Same as {@link Waterfall#adjustEffect}
             * @param {Number} cfg.effect.duration
             * @param {String} cfg.effect.easing
             */
            adjustItem:function (item, cfg) {
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
            },

            /**
             * Remove a waterfall item.
             * @param {NodeList} item Waterfall item to be removed.
             * @param {Object} cfg Config object.
             * @param {Function} cfg.callback Callback function to be called after remove.
             * @param {Object} cfg.effect Same as {@link Waterfall#adjustEffect}
             * @param {Number} cfg.effect.duration
             * @param {String} cfg.effect.easing
             */
            removeItem:function (item, cfg) {
                cfg = cfg || {};
                var self = this,
                    callback = cfg.callback;
                self.adjustItem(item, S.mix(cfg, {
                    process:function () {
                        item.remove();
                        return 0;
                    },
                    callback:function () {
                        var col = parseInt(item.attr("data-waterfall-col")),
                            colItems = self.get("colItems")[col];
                        for (var i = 0; i < colItems.length; i++) {
                            if (colItems[i][0] == item[0]) {
                                colItems.splice(i, 1);
                                break;
                            }
                        }
                        callback && callback();
                    }
                }));
            },

            /**
             * Readjust existing waterfall item.
             * @param {Function} [callback] Callback function to be called after adjust.
             */
            adjust:function (callback) {
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
            },

            /**
             * Add array of waterfall items to current instance.
             * @param {NodeList[]} items Waterfall items to be added.
             * @param {Function} [callback] Callback function to be called after waterfall items are added.
             */
            addItems:function (items, callback) {
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
            },

            /**
             * Destroy current instance.
             */
            destroy:function () {
                $(win).detach("resize", this.__onResize);
            }
        });


    return Waterfall;

}