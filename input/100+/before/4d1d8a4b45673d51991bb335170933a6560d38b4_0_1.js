function() {
    this.overlay = null;
    this.form = null;
    this.defaultLayer = 3;

    this.destroy = function() {
        CreateIssue.form.remove();
        CreateIssue.overlay.remove();
    }
    
    this.create = function() {
        this.overlay = $("<div class=\"overlay\">")
            .appendTo("body")
            .click(function(e) {
                if ( e.target.className == "overlay" ) {
                    CreateIssue.destroy();
                }
        });
        
        
        this.form = $("<div id=\"CreateIssue\" class=\"form\">").appendTo("body");

        $("<h3>Create Issue</h3>").appendTo(this.form);
        $("<input name=\"layer\" type=\"hidden\" value=\"" + CreateIssue.defaultLayer + "\">").appendTo(this.form);
        
        var table = $("<table>").appendTo(this.form);
        var tr = $("<tr>").appendTo(table);
        $("<td>Author</td>").appendTo(tr);
        $("<input name=\"author\" type=\"text\">").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>Title</td>").appendTo(tr);
        $("<input name=\"title\" type=\"text\">").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>Description</td>").appendTo(tr);
        $("<textarea name=\"description\" rows=\"20\" cols=\"50\">").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>&nbsp;</td>").appendTo(tr);
        $("<button>Create Issue</button>").click(this.submit).appendTo(tr);
    }
    
    this.submit = function() {
        Controller.submit(new function() {
            this.layer = $("#CreateIssue").find("input")[0].value;
            this.author = $("#CreateIssue").find("input")[1].value;
            this.title = $("#CreateIssue").find("input")[2].value;
            this.text = $("#CreateIssue").find("textarea")[0].value;
        },CreateIssue.destroy);
        return false;
    }
}