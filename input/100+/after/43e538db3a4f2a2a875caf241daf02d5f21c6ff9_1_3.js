function timedChunk(items, process, context, callback) {

        var stopper = {}, timer,todo;

        function start() {

            todo = [].concat(S.makeArray(items));

            if (todo.length > 0) {
                // 2012-07-10
                // 第一次不延迟，防止
                // adjust -> recalculate -> addItem -> adjustItemAction
                // 打乱了固定在左上角的元素
                (function () {
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
                })();
            } else {
                callback && callback.call(context, items);
            }
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

        // 启动函数，防止同步时立刻被清掉了
        stopper.start = start;

        return stopper;
    }