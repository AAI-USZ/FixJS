function (that) {
        that.afterRenderHandler = function () {
            // Bind a click event on search button to trigger searchBox's navigateToSearch
            that.locate("searchButton").click(that.navigateToSearch);
            that.locate("searchQuery").keypress(function (e) {
                if (cspace.util.keyCode(e) === $.ui.keyCode.ENTER) {
                    that.navigateToSearch();
                }
            });
        };
    }