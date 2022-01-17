function() {
            var box = win.getBox(),
                width = box.w,
                height = (box.h > this.maxHeight) ? this.maxHeight : box.h;

            return Math.floor((width > height ? height : width) / 5);
        }