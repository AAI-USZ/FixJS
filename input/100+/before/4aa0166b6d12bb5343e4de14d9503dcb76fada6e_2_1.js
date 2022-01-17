function parse(content, inputDirectory) {
    var result = {
            output: null,
            data:   content,
            minify: false,
            files:  [],
            error:  null
        },
        scripts = null,
        sources = null,
        match   = null,
        links   = null,
        rows    = null,
        markup  = "",
        action  = "",
        target  = "",
        block   = "",
        type    = "",
        row     = "",
        all     = "",
        count   = 0,
        len     = 0,
        i       = 0;

    while ((match = REGEXP_NOTATION().exec(result.data)) !== null && count++ < MATCH_LIMIT) {
        all    = match[0]; type   = match[1];
        action = match[2]; target = match[3];
        block  = match[4];
        markup = "";
        switch (action.toLowerCase()) {

            case NOTATION.REMOVE :
                markup = "";
                break;

            case NOTATION.INSERT :
                rows = splitLines(block);
                for (i = 0, len = rows.length; i < len; i++) {
                    row = utils.trim(rows[i]);
                    if (row != null) {
                        row = utils.resolve(inputDirectory, row);
                        if (utils.exist(row) === true) {
                            markup += utils.read(row) + FILE_SEPARATOR;
                        }
                    }
                };
                break;

            default :
                scripts = block.match(REGEXP_SCRIPT());
                links   = block.match(REGEXP_LINK());
                sources = [];

                if (scripts != null) {
                    for (i = 0, len = scripts.length; i < len; i++) {
                        sources.push(utils.resolve(inputDirectory, REGEXP_SCRIPT().exec(scripts[i])[1]));
                    };
                    markup = "<script type=\"text/javascript\" src=\"" + target + "\"></script>";
                }
                if (links != null) {
                    for (i = 0, len = links.length; i < len; i++) {
                        sources.push(utils.resolve(inputDirectory, REGEXP_SCRIPT().exec(links[i])[1]));
                    };
                    markup = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + target + "\">";
                }

                result.output = target;
                result.files  = sources;
                result.minify = action == NOTATION.MINIFY;
                break;
        }
        result.data = result.data.replace(all, markup);
    }

    return result;
}