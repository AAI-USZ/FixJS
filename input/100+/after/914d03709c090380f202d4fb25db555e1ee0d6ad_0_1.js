function sprintf(fmt, args)
{
    var str = '';
    if (! Array.isArray(args))
    {
        args = Array.slice(arguments, 1);
    }

    /********************************************
     * Process the provided 'fmt' and 'args'
     *  %s  = string
     *  %d  = integer (decimal)
     *  %x  = integer (hexadecimal, 0x)
     *  %o  = integer (octal,       0)
     *  %f  = floating point
     *  %g  = floating point
     *  %j  = JSON
     */
    var matches = fmt.match(/(\%[sdxofgj])/g),
        pos     = 0;

    if (matches && (matches.length > 0))
    {
        for (var idex = 0, len = Math.min(matches.length, args.length);
                idex < len;
                    ++idex)
        {
            var match       = matches[idex],
                arg         = args[idex],
                posMatch    = fmt.indexOf(match, pos);
            if (posMatch > pos)
            {
                str += fmt.slice(pos, posMatch);
                pos  = posMatch;
            }

            var formatted   = '?';
            try {
                switch (match[1])
                {
                // String
                case 's':
                    formatted = (arg !== undefined && arg !== null
                                    ? arg : '');
                    break;

                // Integer
                case 'd':
                    formatted = (arg !== undefined && arg !== null
                                    ? parseInt(arg, 10) : formatted);
                    break;

                case 'x':
                    formatted = (arg !== undefined && arg !== null
                                    ? parseInt(arg, 16) : formatted);
                    break;

                case 'o':
                    formatted = (arg !== undefined && arg !== null
                                    ? parseInt(arg, 8) : formatted);
                    break;

                // Floating point
                case 'f':
                case 'g':
                    formatted = (arg !== undefined && arg !== null
                                    ? parseFloat(arg) : formatted);
                    break;

                // JSON
                case 'j':
                    formatted = (arg ? JSON.stringify(arg) : formatted);
                    break;
                }
            } catch(e) {
                formatted = "**Format Error: "+ e.message;
            }

            str += (formatted.toString ? formatted.toString() : '');
            pos += match.length;
        }
    }

    if (pos < fmt.length)
    {
        str += fmt.slice(pos);
    }

    return str;
}