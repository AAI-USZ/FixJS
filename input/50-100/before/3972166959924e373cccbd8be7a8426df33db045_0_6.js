function (row, idx) {
            row.destroy();
            childViews.removeObject(row);
            delete self.rowsCache[idx];
        }