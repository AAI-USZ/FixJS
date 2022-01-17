function parseOutput(data, o, oTitle)
{
    var xml = $(data);
    if (xml == null || xml.find("response") == null)
    {
        o.text("Temporarily unavaible");
        return;
    }

    var output = "";
    var cout = xml.find("response").find("compilation").find("stdout").text();
    var stdout = xml.find("response").find("runtime").find("stdout").text();
    var stderr = xml.find("response").find("runtime").find("stderr").text();
    var ctime = parseInt(xml.find("response").find("compilation").find("time").text());
    var rtime = parseInt(xml.find("response").find("runtime").find("time").text());
    var cstatus = parseInt(xml.find("response").find("compilation").find("status").text());
    var rstatus = parseInt(xml.find("response").find("runtime").find("status").text());
    var cerr = xml.find("response").find("compilation").find("err").text();
    var rerr = xml.find("response").find("runtime").find("err").text();

    if (cstatus != 0)
    {
        oTitle.text("Compilation output ("+cstatus+": "+cerr+")");
        if ($.browser.msie)
            o.html(cout.nl2br());
        else
            o.text(cout);
        
        return;
    }
    else
    {
        oTitle.text("Application output");// (compile "+ctime+"ms, run "+rtime+"ms)");
        if ( cout != "")
            output = 'Compilation output: \n' + cout + "\n";
        
        output += (stdout == "" && stderr == "" ? '-- No output --' : stdout);

        if (stderr != "") 
            output += stderr;

        if (rstatus != 0)
            oTitle.text("Application output ("+rstatus+": "+rerr+")");
    }

    if ($.browser.msie)
        o.html(output.nl2br());
    else
        o.text(output);
}