function (itemOffset) {
            itemOffset = itemOffset + that.locate('chapterContent').offset().top;
            while (!(current_selection.from <= itemOffset && itemOffset <= current_selection.to)) {
                that.next();
            }
        }