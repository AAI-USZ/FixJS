function (e) {
                that.locate("searchQuery").change();
                if (cspace.util.keyCode(e) === $.ui.keyCode.ENTER) {
                    that.navigateToSearch();
                }
            }