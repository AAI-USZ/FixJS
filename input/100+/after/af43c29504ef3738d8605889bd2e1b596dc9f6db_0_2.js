function createView(options) {

            var v = [];

            for(var i=0;i<options.left.length;i++) {
                var view = createPropertyView(options.left[i]);
                $("#view_content_left").append(view.getBox());
                bindEvents(view);
                v.push(view);
            }
            for(var i=0;i<options.right.length;i++) {
                var view = createPropertyView(options.right[i]);
                $("#view_content_right").append(view.getBox());
                bindEvents(view);
                v.push(view);
            }

            return v;
        }