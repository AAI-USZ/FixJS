function () {
            var self = this, view;
            if (!self.get("rendered")) {
                // 防止初始设置 false，导致触发 hide 事件
                // show 里面的初始一定是 true，触发 show 事件
                // 2012-03-28 : 用 set 而不是 __set :
                // - 如果 show 前调用了 hide 和 create，view 已经根据 false 建立起来了
                // - 也要设置 view
                // self.set("visible", true);
                // 2012-06-07 ，不能 set
                // 初始监听 visible ，得不到 el

                // 2012-06-12
                // 复位 undefined，防止之前设置过
                self.__set("visible", undefined);
                if (view = self.get("view")) {
                    view.__set("visible", undefined);
                }
                self.render();
            }
            self.set("visible", true);
            return self;
        }