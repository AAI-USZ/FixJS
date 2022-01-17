function lazyLoadUrlMappings(propName)
{
    delete this.pathTransformations;
    delete this.checkHeaderRe;

    var lines = readEntireFile(userFile("urlMappings.txt")).split(/[\n\r]+/);
    var sp = "=>";

    function safeRegexp(source)
    {
        try
        {
            return RegExp(source, 'i');
        }
        catch(e)
        {
        }
    }

    this.pathTransformations = [];
    this.checkHeaderRe = null;
    for (var i in lines)
    {
        var line = lines[i].split('=>');

        if (!line[1] || !line[0])
            continue;

        var start = line[0].trim()
        var end = line[1].trim();

        if (start[0] == '/' && start[1] == '/')
            continue;

        if (start == "X-Local-File-Path")
        {
            this.checkHeaderRe = safeRegexp(end);
            continue;
        }
        var t = {
            regexp: safeRegexp(start, i),
            filePath: end
        }
        if (t.regexp && t.filePath)
            this.pathTransformations.push(t)
    }

    if (!this.checkHeaderRe)
        this.checkHeaderRe = /^https?:\/\/(localhost)(\/|:|$)/i;

    return this[propName];
}