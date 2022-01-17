function (data) {
            $(function () {
                sagecell.body = data;
                load({"src": sagecell.URLs.root + "static/all.min.js"})
            });
        }