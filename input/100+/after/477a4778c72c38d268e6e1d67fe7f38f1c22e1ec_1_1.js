function () {
            if (!that.root) {
                return;
            }
            var accepted;
            // TODO: Temporary adjustment before trundlers are destroyed by FLUID-4705
            // In the final system "new strategies" should be able to declare whether any of them
            // require this path computed or not
            that.path = fluid.model.composePath(that.path, that.segs[that.index]);
            for (var i = 0; i < that.strategies.length; ++i) {
                var value = fluid.model.applyStrategy(that.strategies[i], that.root, that.segs[that.index], that.path);
                if (accepted === undefined) {
                    accepted = value;
                }
            }
            if (accepted === fluid.NO_VALUE) {
                accepted = undefined;
            }
            that.root = accepted;
            ++that.index;
        }