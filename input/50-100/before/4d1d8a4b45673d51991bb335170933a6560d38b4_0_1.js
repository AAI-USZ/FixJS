function() {
            this.layer = $("#CreateIssue").find("input")[0].value;
            this.author = $("#CreateIssue").find("input")[1].value;
            this.title = $("#CreateIssue").find("input")[2].value;
            this.text = $("#CreateIssue").find("textarea")[0].value;
        }