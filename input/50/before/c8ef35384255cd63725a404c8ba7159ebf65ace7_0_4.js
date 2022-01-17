function () {
            if (that.toc.isLast()) {
                return;
            }
            that.toc.setCurrentSelection(that.toc.currentSelectPosition() + 1);
        }