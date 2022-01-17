function() {
var root        = this;

root.app    = {
    view:       {},
    model:      {},

    /** @brief  The item currently being dragged
     *              (if initiated by a view in *this* app).
     */
    dragging:   null
};

// Once everything is loaded, initialze our primary view
$(document).ready(function() {
    //console.log("app.js: Document Ready.");

    // Establish our primary view
    var $curation   = $('#collaborative-curation'),
        view        = new app.view.TopicsView({el: $curation});
});

/****************************************************************************
 * Logging {
 *
 *  Override console.log() to send data for logging to the plugin.
 */

/** @brief  Perform printf-like formatting of the provided 'fmt' and 'args' and
 *          write the result to the console.
 *  @param  fmt     The printf format string;
 *  @param  args    Following arguments to fulfill 'fmt';
 */
root.console.log = function(fmt, args) {
    args = Array.slice(arguments);

    addon.postMessage({src:      'sidebar-content',
                       action:   'log',
                       str:      sprintf.apply(this, args)
                       //args:     args
    });
};

/** @brief  Perform printf-like formatting of the provided 'fmt' and 'args' and
 *          return the resulting string.
 *  @param  fmt     The printf format string;
 *  @param  args    Following arguments to fulfill 'fmt';
 *
 *  @return The generated string.
 */
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
                    formatted = (arg ? arg : '');
                    break;

                // Integer
                case 'd':
                    formatted = (arg ? parseInt(arg, 10) : formatted);
                    break;

                case 'x':
                    formatted = (arg ? parseInt(arg, 16) : formatted);
                    break;

                case 'o':
                    formatted = (arg ? parseInt(arg, 8) : formatted);
                    break;

                // Floating point
                case 'f':
                case 'g':
                    formatted = (arg ? parseFloat(arg) : formatted);
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

/* Logging }
 ****************************************************************************
 * Date Formatting utilities {
 *
 *  Called from the '#curation-topic' template applied in render().
 *  The template itself is defined in data/view/topics/index.html
 *
 */
function padNum(num, len)
{
    len = len || 2;
    num = ''+ num;

    return '00000000'.substr(0, len - num.length) + num;
}

// app-level utilities
app.ts2timeStr = function(ts) {
    var date        = new Date(ts),
        hour        = date.getHours(),
        meridian    = 'a';

    if      (hour >   12)   { meridian = 'p'; hour -= 12; }
    else if (hour === 12)   { meridian = 'p'; }

    return hour +':'+ padNum(date.getMinutes()) + meridian;
};
app.ts2dateStr = function(ts) {
    var date    = new Date(ts),
        dateStr = date.getFullYear()            +'.'
                + padNum(date.getMonth() + 1)   +'.'
                + padNum(date.getDate());

    return dateStr;
};
/* Date formatting utilities }
 ****************************************************************************/

}