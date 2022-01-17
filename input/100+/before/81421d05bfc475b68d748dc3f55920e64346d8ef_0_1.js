function (e) {
            if (e.view) {
                data[e.currentPage].tabView.fireEvent('click');
            }
        }