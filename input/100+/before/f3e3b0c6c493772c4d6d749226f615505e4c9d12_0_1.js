function (ctx) {
        if (ctx.parent && ctx.elem) {
            console.log("remove child : " + dump(ctx.parent, 1) + " $index: " + this.$index);

            // wir kopieren uns die items
            var items = scope.$get(ctx.parent).slice();
            scope.$set(ctx.parent, []);
            scope.$eval();

            angular.Array.remove(items, ctx.elem);
            scope.$set(ctx.parent, items);
            scope.$eval();

        }
    }