function () {
            var lastChild = that.locate('chapterContent').children().last();
            // calculating height of content
            return lastChild.offset().top + lastChild.height() - that.locate('chapterContent').offset().top;
        }