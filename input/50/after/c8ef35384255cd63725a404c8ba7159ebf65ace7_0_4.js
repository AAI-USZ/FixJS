function () {
            if (that.toc.isLast()) {
                return;
            }
            that.toc.setCurrentSelectionToIndex(that.toc.currentSelectPosition() + 1);
        }