function() {
var root        = this;

root.app    = {
    View:       {},
    Model:      {},
    Database:   {
        id:             'collaborativeCuration',
        description:    'A database to store topics, items, and data '
                        + 'associated with the collaborative collection '
                        + 'and curation of related data as well as the final '
                        + 'creation of reports based upon the collected data.',
    },

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
        view        = new app.View.TopicsView({el: $curation});

    /* Generate / Retrieve topic data
    var now     = new Date(),
        topics  = [
            {"id":"topic-1",
             "order":0,
             "title":"Development",
             "items":   [
                {"id":"item-1",
                 "timestamp":1341225011904,
                 "content":"<a href='https://developer.mozilla.org/en-US/'>Mozilla Developer</a>",
                 "url":"https://developer.mozilla.org/en-US/",
                 "location":"",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":0,
                 "comments":[]},
                {"id":"item-2",
                 "timestamp":1341225011904,
                 "content":"<a href='https://developer.mozilla.org/en/JavaScript/Reference'>Javascript</a>",
                 "url":"https://developer.mozilla.org/en/JavaScript/Reference",
                 "location":"",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":1,
                 "comments":[]},
                {"id":"item-3",
                 "timestamp":1341226022904,
                 "content":"Other object in the global scope are either created by the user script or provided by the host application",
                 "url":"https://developer.mozilla.org/en/JavaScript/Reference",
                 "location":"#section_2",
                 "selector":"> p:first",
                 "topicId":"topic-1",
                 "order":2,
                 "comments":[]},
                {"id":"item-4",
                 "timestamp":1341228022904,
                 "content":"Operator precedence defines the order in which operators are evaluated.",
                 "url":"https://developer.mozilla.org/en/JavaScript/Reference",
                 "location":"#section_5",
                 "selector":"> dl > dd.8",
                 "topicId":"topic-1",
                 "order":3,
                 "comments":[]},
                {"id":"item-5",
                 "timestamp":1341225011904,
                 "content":"<a href='http://api.jquery.com/'>jQuery</a>",
                 "url":"http://api.jquery.com/",
                 "location":"",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":4,
                 "comments":[]},
                {"id":"item-6",
                 "timestamp":1341225011904,
                 "content":"<a href='http://documentcloud.github.com/backbone/#'>Backbone</a>",
                 "url":"http://documentcloud.github.com/backbone/",
                 "location":"#",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":5,
                 "comments":[]},
                {"id":"item-7",
                 "timestamp":1341225011904,
                 "content":"<a href='http://documentcloud.github.com/underscore/#'>Underscore</a>",
                 "url":"http://documentcloud.github.com/underscore/",
                 "location":"#",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":6,
                 "comments":[]},
                {"id":"item-8",
                 "timestamp":1341225011904,
                 "content":"<a href='http://nodejs.org/api/'>node.js</a>",
                 "url":"http://nodejs.org/api/",
                 "location":"",
                 "selector":"",
                 "topicId":"topic-1",
                 "order":7,
                 "comments":[]}
             ]
            },
            {"id":"topic-2",
             "order":1,
             "title":"Misc",
             "items":   [
                {"id":"item-9",
                 "timestamp":1341225011904,
                 "content":"<a href='https://google.com/'>google</a>",
                 "url":"https://google.com/",
                 "location":"",
                 "selector":"",
                 "topicId":"topic-2",
                 "order":0,
                 "comments":[]}
             ]
            }
        ];

    console.log("app: app.View.TopicsView() with %d topics", topics.length);
    view.setModel( topics );
    // */
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