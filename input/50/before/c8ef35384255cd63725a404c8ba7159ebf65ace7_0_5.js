function () {
            if (that.toc.isFirst()) {
                return;
            }
            that.toc.setCurrentSelection(that.toc.currentSelectPosition() - 1);
        }