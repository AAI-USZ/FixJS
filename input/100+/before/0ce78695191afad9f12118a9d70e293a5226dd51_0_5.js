function() {
    this.overlay = null;
    this.form = null;

    this.destroy = function() {
        CreateArgument.form.remove();
        CreateArgument.overlay.remove();
    }
    
    this.create = function() {
        this.overlay = $("<div class=\"overlay\">")
            .appendTo("body")
            .click(function(e) {
                if ( e.target.className == "overlay" ) {
                    CreateArgument.destroy();
                }
        });
                
        this.form = $("<div id=\"CreateArgument\" class=\"form\">").appendTo("body");

        $("<h3>"+Language.get("lang_CreateArgument",language)+"</h3>").appendTo(this.form);
        
        var table = $("<table>").appendTo(this.form);
        var tr = $("<tr>").appendTo(table);
        $("<td>&nbsp;</td>"
            + "<td width=\"100\">" + Language.get("lang_pro",language) +"</td>"
            + "<td width=\"100\">" + Language.get("lang_neutral",language) +"</td>"
            + "<td width=\"100\">" + Language.get("lang_contra",language) +"</td>").appendTo(tr);
        tr = $("<tr>").appendTo(table);
        $("<td>&nbsp;</td><td><input name=\"layer\" type=\"radio\" value=\"5\"></td>"
            + "<td><input name=\"layer\" type=\"radio\" value=\"7\"></td>"
            + "<td><input name=\"layer\" type=\"radio\" value=\"6\"></td>").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>" + Language.get("lang_author",language) + "</td>").appendTo(tr);
        $("<td colspan=\"3\"><input name=\"author\" type=\"text\"></td>").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>" + Language.get("lang_title",language) + "</td>").appendTo(tr);
        $("<td colspan=\"3\"><input name=\"title\" type=\"text\"></td>").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>"+Language.get("lang_description",language)+"</td>").appendTo(tr);
        $("<td colspan=\"3\"><textarea name=\"description\" rows=\"20\" cols=\"48\"></textarea></td>").appendTo(tr);
        
        tr = $("<tr>").appendTo(table);
        $("<td>&nbsp;</td>").appendTo(tr);
        var td = $("<td colspan=\"3\">").appendTo(tr);
        $("<button class=\"button\">" + Language.get("lang_createArgument",language) + "</button>").click(this.submit).appendTo(td);
        $("<button class=\"button\">" + Language.get("lang_cancel",language) + "</button>").click(this.destroy).appendTo(td);
    }
    
    this.submit = function() {
        Controller.submit(new function() {
            if ( $("#CreateArgument").find("input")[0].checked ) {
                this.layer = $("#CreateArgument").find("input")[0].value;
            } else if ( $("#CreateArgument").find("input")[1].checked ) {
                this.layer = $("#CreateArgument").find("input")[1].value;
            } else if ( $("#CreateArgument").find("input")[2].checked ) {
                this.layer = $("#CreateArgument").find("input")[2].value;
            }
            this.author = $("#CreateArgument").find("input")[3].value;
            this.title = $("#CreateArgument").find("input")[4].value;
            this.text = $("#CreateArgument").find("textarea")[0].value;
        },CreateArgument.destroy);
        return false;
    }
}