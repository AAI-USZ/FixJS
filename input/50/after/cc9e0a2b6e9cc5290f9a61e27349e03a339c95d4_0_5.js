function (url) {

        if ($.inArray(url, this.urls) == -1) {

            this.urls.push(url);

            this.refreshAutoComplete();

        }

    }