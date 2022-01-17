function (ctx) {
        if (ctx.parent && ctx.elem) {
            console.log("remove child : " + dump(ctx.parent, 1) + " $index: " + this.$index);
            var parentfq = 'contentNode.' + findParentNode('arrfq', this.$element[0], "");
            parentfq = parentfq.slice(0, -1);
            parentfq = parentfq.slice(0, parentfq.lastIndexOf('.'));


//            var elem = scope.$get(parentfq);

            // wir kopieren uns die items
            var items = scope.$get(parentfq).slice();
            scope.$set(parentfq, []);
            scope.$eval();

            angular.Array.remove(items, ctx.elem);
            scope.$set(parentfq, items);
            scope.$eval();

        }
    }