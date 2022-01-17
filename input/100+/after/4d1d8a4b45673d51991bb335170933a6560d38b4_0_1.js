function() {
    this.overlay = null;
    this.form = null;

    this.destroy = function() {
        Create.form.remove();
        Create.overlay.remove();
    }
    
    this.create = function(defaultLayer,text) {
        this.overlay = $("<div class=\"overlay\">")
            .appendTo("body")
            .click(function(e) {
                if ( e.target.className == "overlay" ) {
                    Create.destroy();
                }
        });
        
        
        this.form = $("<div id=\"Create\" class=\"form\">").appendTo("body");

        $("<h3>Create " + text + "</h3>").appendTo(this.form);
        $("<input name=\"layer\" type=\"hidden\" value=\"" + defaultLayer + "\">").appendTo(this.form);
        
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
        $("<button>Create " + text + "</button>").click(this.submit).appendTo(tr);
    }
    
    this.submit = function() {
        Controller.submit(new function() {
            this.layer = $("#Create").find("input")[0].value;
            this.author = $("#Create").find("input")[1].value;
            this.title = $("#Create").find("input")[2].value;
            this.text = $("#Create").find("textarea")[0].value;
        },Create.destroy);
        return false;
    }
}