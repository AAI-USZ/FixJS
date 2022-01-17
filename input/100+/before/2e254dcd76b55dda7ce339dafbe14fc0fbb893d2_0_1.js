function parse_realm_status(result, div_id )
    {
        var count = result.length;
        var finished = '';
        for (i = 0; count > i; i++)
        {
            block = $( div_id ).html();
            block = block.replace(/\@id/i, result[i].id);
            block = block.replace(/\@name/i, result[i].name);
            block = block.replace(/\@type/i, result[i].type);
            block = block.replace(/\@status/i, result[i].status);
            block = block.replace(/\@online/i, result[i].online);
            block = block.replace(/\@alliance/i, result[i].alliance);
            block = block.replace(/\@horde/i, result[i].horde);
            block = block.replace(/\@uptime/i, result[i].uptime);
            finished += block;
        }
        return finished;
    }