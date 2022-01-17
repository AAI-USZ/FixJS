function parseOutput(data)
{
    output = "";
    var json = jQuery.parseJSON(data);
    if (json == null)
    {
        output = "<h5>Temporarily unavaible</h5>";
        return output;
    }

    /* 
    * Escape html/script/etc
    */
    var cout = $('<div/>').text(json["compilation"]["stdout"]).html();
    var stdout = $('<div/>').text(json["runtime"]["stdout"]).html();
    var stderr = $('<div/>').text(json["runtime"]["stderr"]).html();

    if (json["compilation"]["status"] != 0)
    {
        output = '<b>Compilation failure: </b><br /><div class="outputWindow">'+ cout + "</div>";
    }
    else
    {
        if ( cout != "")
        {
            output = '<b>Compilation output: </b><br />'
                + '<div class="outputWindow">' + cout + "</div><br />";
        }
        output += (stdout == "" && stderr == "" ? 
            '<div class="outputWindow">-- No output --</div>' : '<div class="outputWindow">'+stdout);

        if (stderr != "") 
        {
            output += stderr;
        }

        output += "</div>";
    }

    return output.nl2br();
}