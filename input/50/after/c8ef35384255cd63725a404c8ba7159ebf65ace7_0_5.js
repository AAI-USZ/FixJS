function () {
            if (that.toc.isFirst()) {
                return;
            }
            that.toc.setCurrentSelectionToIndex(that.toc.currentSelectPosition() - 1);
        }