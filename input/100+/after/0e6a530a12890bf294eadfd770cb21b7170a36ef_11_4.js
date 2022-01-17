function(FBTrace, Options, Deprecated, Xpcom) {

// ********************************************************************************************* //
// Constants

var Ci = Components.interfaces;
var Cc = Components.classes;
var Cu = Components.utils;

const reNotWhitespace = /[^\s]/;


var Str = {};

// ************************************************************************************************
// Whitespace and Entity conversions

var entityConversionLists = Str.entityConversionLists =
{
    normal : {
        whitespace : {
            "\t" : "\u200c\u2192",
            "\n" : "\u200c\u00b6",
            "\r" : "\u200c\u00ac",
            " "  : "\u200c\u00b7"
        }
    },
    reverse : {
        whitespace : {
            "&Tab;" : "\t",
            "&NewLine;" : "\n",
            "\u200c\u2192" : "\t",
            "\u200c\u00b6" : "\n",
            "\u200c\u00ac" : "\r",
            "\u200c\u00b7" : " "
        }
    }
};

var normal = entityConversionLists.normal,
    reverse = entityConversionLists.reverse;

function addEntityMapToList(ccode, entity)
{
    var lists = Array.slice(arguments, 2),
        len = lists.length,
        ch = String.fromCharCode(ccode);

    for (var i = 0; i < len; i++)
    {
        var list = lists[i];
        normal[list]=normal[list] || {};
        normal[list][ch] = "&" + entity + ";";
        reverse[list]=reverse[list] || {};
        reverse[list]["&" + entity + ";"] = ch;
    }
}

var e = addEntityMapToList,
    white = "whitespace",
    text = "text",
    attr = "attributes",
    css = "css",
    editor = "editor";

e(0x0000, "#0", text, attr, css, editor);
e(0x0022, "quot", attr, css);
e(0x0026, "amp", attr, text, css);
e(0x0027, "apos", css);
e(0x003c, "lt", attr, text, css);
e(0x003e, "gt", attr, text, css);
e(0xa9, "copy", text, editor);
e(0xae, "reg", text, editor);
e(0x2122, "trade", text, editor);

// See http://en.wikipedia.org/wiki/Dash
e(0x2012, "#8210", attr, text, editor); // figure dash
e(0x2013, "ndash", attr, text, editor); // en dash
e(0x2014, "mdash", attr, text, editor); // em dash
e(0x2015, "#8213", attr, text, editor); // horizontal bar

// See http://www.cs.tut.fi/~jkorpela/chars/spaces.html
e(0x00a0, "nbsp", attr, text, white, editor);
e(0x2002, "ensp", attr, text, white, editor);
e(0x2003, "emsp", attr, text, white, editor);
e(0x2004, "emsp13", attr, text, white, editor);
e(0x2005, "emsp14", attr, text, white, editor);
e(0x2007, "numsp", attr, text, white, editor);
e(0x2008, "puncsp", attr, text, white, editor);
e(0x2009, "thinsp", attr, text, white, editor);
e(0x200a, "hairsp", attr, text, white, editor);
e(0x200b, "#8203", attr, text, white, editor); // zero-width space (ZWSP)
e(0x200c, "zwnj", attr, text, white, editor);

e(0x202f, "#8239", attr, text, white, editor); // NARROW NO-BREAK SPACE
e(0x205f, "#8287", attr, text, white, editor); // MEDIUM MATHEMATICAL SPACE
e(0x3000, "#12288", attr, text, white, editor); // IDEOGRAPHIC SPACE
e(0xfeff, "#65279", attr, text, white, editor); // ZERO WIDTH NO-BREAK SPACE

e(0x200d, "zwj", attr, text, white, editor);
e(0x200e, "lrm", attr, text, white, editor);
e(0x200f, "rlm", attr, text, white, editor);

//************************************************************************************************
// Entity escaping

var entityConversionRegexes =
{
    normal : {},
    reverse : {}
};

var escapeEntitiesRegEx =
{
    normal : function(list)
    {
        var chars = [];
        for (var ch in list)
            chars.push(ch);
        return new RegExp("([" + chars.join("") + "])", "gm");
    },
    reverse : function(list)
    {
        var chars = [];
        for (var ch in list)
            chars.push(ch);
        return new RegExp("(" + chars.join("|") + ")", "gm");
    }
};

function getEscapeRegexp(direction, lists)
{
    var name = "";
    var re;
    var groups = [].concat(lists);
    for (i = 0; i < groups.length; i++)
        name += groups[i].group;
    re = entityConversionRegexes[direction][name];
    if (!re)
    {
        var list = {};
        if (groups.length > 1)
        {
            for ( var i = 0; i < groups.length; i++)
            {
                var aList = entityConversionLists[direction][groups[i].group];
                for ( var item in aList)
                    list[item] = aList[item];
            }
        }
        else if (groups.length==1)
        {
            list = entityConversionLists[direction][groups[0].group]; // faster for special case
        }
        else
        {
            list = {}; // perhaps should print out an error here?
        }
        re = entityConversionRegexes[direction][name] = escapeEntitiesRegEx[direction](list);
    }
    return re;
}

function createSimpleEscape(name, direction)
{
    return function(value)
    {
        var list = entityConversionLists[direction][name];
        return String(value).replace(
                getEscapeRegexp(direction, {
                    group : name,
                    list : list
                }),
                function(ch)
                {
                    return list[ch];
                }
            );
    }
}

function escapeEntityAsName(char)
{
    var entityConverter = Xpcom.CCSV("@mozilla.org/intl/entityconverter;1", "nsIEntityConverter");
    try
    {
        return entityConverter.ConvertToEntity(char, entityConverter.entityW3C);
    }
    catch(e)
    {
        return char;
    }
}

function escapeEntityAsUnicode(char)
{
    var charCode = char.charCodeAt(0);

    if (charCode == 34)
        return "&quot;";
    else if (charCode == 38)
        return "&amp;";
    else if (charCode < 32 || charCode >= 127)
        return "&#" + charCode + ";";

    return char;
}

function escapeGroupsForEntities(str, lists, type)
{
    var results = [];
    var noEntityString = "";
    var textListIndex = -1;

    if (!type)
        type = "names";

    for (var i = 0, listsLen = lists.length; i < listsLen; i++)
    {
        if (lists[i].group == "text")
        {
            textListIndex = i;
            break;
        }
    }

    for (var i = 0, strLen = str.length; i < strLen; i++)
    {
        var result = str.charAt(i);

        // If there's "text" in the list groups, use a different
        // method for converting the characters
        if (textListIndex != -1)
        {
            if (type == "unicode")
                result = escapeEntityAsUnicode(str.charAt(i));
            else if (type == "names")
                result = escapeEntityAsName(str.charAt(i));
        }

        if (result != str.charAt(i))
        {
            if (noEntityString != "")
            {
                results.push({
                    "str": noEntityString,
                    "class": "",
                    "extra": ""
                });
                noEntityString = "";
            }

            results.push({
                "str": result,
                "class": lists[textListIndex].class,
                "extra": lists[textListIndex].extra[result] ? lists[textListIndex].class
                        + lists[textListIndex].extra[result] : ""
            });
        }
        else
        {
            var listEntity;
            for (var j = 0, listsLen = lists.length; j < listsLen; j++)
            {
                var list = lists[j];
                if (list.group != "text")
                {
                    listEntity = entityConversionLists.normal[list.group][result];
                    if (listEntity)
                    {
                        result = listEntity;

                        if (noEntityString != "")
                        {
                            results.push({
                                "str": noEntityString,
                                "class": "",
                                "extra": ""
                            });
                            noEntityString = "";
                        }

                        results.push({
                            "str": result,
                            "class": list.class,
                            "extra": list.extra[result] ? list.class + list.extra[result] : ""
                        });
                        break;
                    }
                }
            }

            if (result == str.charAt(i))
            {
                noEntityString += result;
            }
        }
    }

    if (noEntityString != "")
    {
        results.push({
            "str": noEntityString,
            "class": "",
            "extra": ""
        });
    }

    return results;
}

Str.escapeGroupsForEntities = escapeGroupsForEntities;

function unescapeEntities(str, lists)
{
    var re = getEscapeRegexp("reverse", lists),
        split = String(str).split(re),
        len = split.length,
        results = [],
        cur, r, i, ri = 0, l, list;

    if (!len)
        return str;

    lists = [].concat(lists);
    for (i = 0; i < len; i++)
    {
        cur = split[i];
        if (cur == '')
            continue;

        for (l = 0; l < lists.length; l++)
        {
            list = lists[l];
            r = entityConversionLists.reverse[list.group][cur];
            if (r)
            {
                results[ri] = r;
                break;
            }
        }

        if (!r)
            results[ri] = cur;
        ri++;
    }
    return results.join('') || '';
}

// ************************************************************************************************
// String escaping

var escapeForTextNode = Str.escapeForTextNode = createSimpleEscape("text", "normal");
var escapeForHtmlEditor = Str.escapeForHtmlEditor = createSimpleEscape("editor", "normal");
var escapeForElementAttribute = Str.escapeForElementAttribute = createSimpleEscape("attributes", "normal");
var escapeForCss = Str.escapeForCss = createSimpleEscape("css", "normal");

// deprecated compatibility functions
Str.deprecateEscapeHTML = createSimpleEscape("text", "normal");
Str.deprecatedUnescapeHTML = createSimpleEscape("text", "reverse");

Str.escapeHTML = Deprecated.deprecated("use appropriate escapeFor... function",
    Str.deprecateEscapeHTML);
Str.unescapeHTML = Deprecated.deprecated("use appropriate unescapeFor... function",
    Str.deprecatedUnescapeHTML);

var escapeForSourceLine = Str.escapeForSourceLine = createSimpleEscape("text", "normal");

var unescapeWhitespace = createSimpleEscape("whitespace", "reverse");

Str.unescapeForTextNode = function(str)
{
    if (Options.get("showTextNodesWithWhitespace"))
        str = unescapeWhitespace(str);

    if (Options.get("entityDisplay") == "names")
        str = escapeForElementAttribute(str);

    return str;
}

Str.unescapeForURL = createSimpleEscape('text', 'reverse');

Str.escapeNewLines = function(value)
{
    return value.replace(/\r/gm, "\\r").replace(/\n/gm, "\\n");
};

Str.stripNewLines = function(value)
{
    return typeof(value) == "string" ? value.replace(/[\r\n]/gm, " ") : value;
};

Str.escapeSingleQuoteJS = function(value)
{
    return value.replace("\\", "\\\\", "g").replace(/\r/gm, "\\r")
                .replace(/\n/gm, "\\n").replace("'", "\\'", "g");
};

Str.reverseString = function(value)
{
    return value.split("").reverse().join("");
};

Str.escapeJS = function(value)
{
    return value.replace("\\", "\\\\", "g").replace(/\r/gm, "\\r")
        .replace(/\n/gm, "\\n").replace('"', '\\"', "g");
};

Str.cropString = function(text, limit, alterText)
{
    if (!alterText)
        alterText = "...";

    // Make sure it's a string.
    text = text + "";

    // Use default limit if necessary.
    if (!limit)
        limit = Options.get("stringCropLength");

    // Crop the string only if a limit is actually specified.
    if (limit <= 0)
        return text;

    var halfLimit = (limit / 2);
    halfLimit -= 2; // adjustment for alterText's increase in size

    if (text.length > limit)
        return text.substr(0, halfLimit) + alterText + text.substr(text.length-halfLimit);

    return text;
};

Str.cropStringEx = function(text, limit, alterText, pivot)
{
    if (!alterText)
        alterText = "...";

    // Make sure it's a string.
    text = text + "";

    // Use default limit if necessary.
    if (!limit)
        limit = Options.get("stringCropLength");

    // Crop the string only if a limit is actually specified.
    if (limit <= 0)
        return text;

    if (text.length < limit)
        return text;

    if (typeof(pivot) == "undefined")
        pivot = text.length / 2;

    var halfLimit = (limit / 2);

    // Adjust the pivot to the real center in case it's at an edge.
    if (pivot < halfLimit)
        pivot = halfLimit;

    if (pivot > text.length - halfLimit)
        pivot = text.length - halfLimit;

    // Get substring around the pivot
    var begin = Math.max(0, pivot - halfLimit);
    var end = Math.min(text.length - 1, pivot + halfLimit);
    var result = text.substring(begin, end);

    // Add alterText to the beginning or end of the result as necessary.
    if (begin > 0)
        result = alterText + result;

    if (end < text.length - 1)
        result += alterText;

    return result;
};

Str.lineBreak = function()
{
    if (navigator.appVersion.indexOf("Win") != -1)
        return "\r\n";

    if (navigator.appVersion.indexOf("Mac") != -1)
        return "\r";

    return "\n";
};

Str.cropMultipleLines = function(text, limit)
{
    return this.escapeNewLines(this.cropString(text, limit));
};

Str.isWhitespace = function(text)
{
    return !reNotWhitespace.exec(text);
};

Str.splitLines = function(text)
{
    if (!text)
        return [];

    const reSplitLines2 = /.*(:?\r\n|\n|\r)?/mg;
    var lines;
    if (text.match)
    {
        lines = text.match(reSplitLines2);
    }
    else
    {
        var str = text+"";
        lines = str.match(reSplitLines2);
    }
    lines.pop();
    return lines;
};

Str.trim = function(text)
{
    return text.replace(/^\s*|\s*$/g, "");
}

Str.trimLeft = function(text)
{
    return text.replace(/^\s+/, "");
}

Str.trimRight = function(text)
{
    return text.replace(/\s+$/, "");
}

Str.hasPrefix = function(hay, needle)
{
    // This is the fastest way of testing for prefixes - (hay.indexOf(needle) === 0)
    // can be O(|hay|) in the worst case, and (hay.substr(0, needle.length) === needle)
    // unnecessarily creates a new string and might be O(|needle|) in some JavaScript
    // implementations. See the discussion in issue 3071.
    return hay.lastIndexOf(needle, 0) === 0;
};

Str.wrapText = function(text, noEscapeHTML)
{
    var reNonAlphaNumeric = /[^A-Za-z_$0-9'"-]/;

    var html = [];
    var wrapWidth = Options.get("textWrapWidth");

    // Split long text into lines and put every line into a <code> element (only in case
    // if noEscapeHTML is false). This is useful for automatic scrolling when searching
    // within response body (in order to scroll we need an element).
    // Don't use <pre> elements since this adds additional new line endings when copying
    // selected source code using Firefox->Edit->Copy (Ctrl+C) (issue 2093).
    var lines = Str.splitLines(text);
    for (var i = 0; i < lines.length; ++i)
    {
        var line = lines[i];

        if (wrapWidth > 0)
        {
            while (line.length > wrapWidth)
            {
                var m = reNonAlphaNumeric.exec(line.substr(wrapWidth, 100));
                var wrapIndex = wrapWidth + (m ? m.index : 0);
                var subLine = line.substr(0, wrapIndex);
                line = line.substr(wrapIndex);

                if (!noEscapeHTML) html.push("<code class=\"wrappedText focusRow\" role=\"listitem\">");
                html.push(noEscapeHTML ? subLine : escapeForTextNode(subLine));
                if (!noEscapeHTML) html.push("</code>");
            }
        }

        if (!noEscapeHTML) html.push("<code class=\"wrappedText focusRow\" role=\"listitem\">");
        html.push(noEscapeHTML ? line : escapeForTextNode(line));
        if (!noEscapeHTML) html.push("</code>");
    }

    return html;
}

Str.insertWrappedText = function(text, textBox, noEscapeHTML)
{
    var html = Str.wrapText(text, noEscapeHTML);
    textBox.innerHTML = "<pre role=\"list\">" + html.join("") + "</pre>";
}

// ************************************************************************************************
// Indent

const reIndent = /^(\s+)/;

function getIndent(line)
{
    var m = reIndent.exec(line);
    return m ? m[0].length : 0;
}

Str.cleanIndentation = function(text)
{
    var lines = Str.splitLines(text);

    var minIndent = -1;
    for (var i = 0; i < lines.length; ++i)
    {
        var line = lines[i];
        var indent = getIndent(line);
        if (minIndent == -1 && line && !Str.isWhitespace(line))
            minIndent = indent;
        if (indent >= minIndent)
            lines[i] = line.substr(minIndent);
    }
    return lines.join("");
}

// ************************************************************************************************
// Formatting

Str.formatNumber = function(number)
{
    number += "";
    var x = number.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    return x1 + x2;
}

Str.formatSize = function(bytes)
{
    var negative = (bytes < 0);
    bytes = Math.abs(bytes);

    // xxxHonza, XXXjjb: Why Firebug.sizePrecision is not set in Chromebug?
    var sizePrecision = Options.get("sizePrecision");
    if (typeof(sizePrecision) == "undefined")
    {
        Options.set("sizePrecision", 2);
        sizePrecision = 2;
    }

    // Get size precision (number of decimal places from the preferences)
    // and make sure it's within limits.
    sizePrecision = (sizePrecision > 2) ? 2 : sizePrecision;
    sizePrecision = (sizePrecision < -1) ? -1 : sizePrecision;

    var result;

    if (sizePrecision == -1)
        result = bytes + " B";

    var a = Math.pow(10, sizePrecision);

    if (bytes == -1 || bytes == undefined)
        return "?";
    else if (bytes == 0)
        return "0";
    else if (bytes < 1024)
        result = bytes + " B";
    else if (bytes < (1024*1024))
        result = Math.round((bytes/1024)*a)/a + " KB";
    else
        result = Math.round((bytes/(1024*1024))*a)/a + " MB";

    return negative ? "-" + result : result;
}

Str.formatTime = function(elapsed)
{
    if (elapsed == -1)
        return "";
    else if (elapsed == 0)
        return "0";
    else if (elapsed < 1000)
        return elapsed + "ms";
    else if (elapsed < 60000)
        return (Math.round(elapsed/10) / 100) + "s";
    else
    {
        var min = Math.floor(elapsed/60000);
        var sec = (elapsed % 60000);
        return min + "m " + (Math.round((elapsed/1000)%60)) + "s";
    }
}

//********************************************************************************************* //
//Conversions

Str.convertToUnicode = function(text, charset)
{
    if (!text)
        return "";

    try
    {
        var conv = Cc["@mozilla.org/intl/scriptableunicodeconverter"].getService(
            Ci.nsIScriptableUnicodeConverter);
        conv.charset = charset ? charset : "UTF-8";
        return conv.ConvertToUnicode(text);
    }
    catch (exc)
    {
        if (FBTrace.DBG_ERRORS)
        {
            FBTrace.sysout("Str.convertToUnicode: fails: for charset "+charset+" conv.charset:"+
                conv.charset+" exc: "+exc, exc);
        }

        // the exception is worthless, make up a new one
        throw new Error("Firebug failed to convert to unicode using charset: "+conv.charset+
            " in @mozilla.org/intl/scriptableunicodeconverter");
    }
};

Str.convertFromUnicode = function(text, charset)
{
    if (!text)
        return "";

    try
    {
        var conv = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(
            Ci.nsIScriptableUnicodeConverter);
        conv.charset = charset ? charset : "UTF-8";
        return conv.ConvertFromUnicode(text);
    }
    catch (exc)
    {
        if (FBTrace.DBG_ERRORS)
        {
            FBTrace.sysout("Str.convertFromUnicode: fails: for charset "+charset+" conv.charset:"+
                conv.charset+" exc: "+exc, exc);
        }
    }
};

// ********************************************************************************************* //

Str.safeToString = function(ob)
{
    try
    {
        if (!ob)
        {
            if (ob == undefined)
                return "undefined";
            if (ob == null)
                return "null";
            if (ob == false)
                return "false";
            return "";
        }
        if (ob && (typeof (ob["toString"]) == "function") )
            return ob.toString();
        if (ob && typeof (ob["toSource"]) == "function")
            return ob.toSource();
       /* https://bugzilla.mozilla.org/show_bug.cgi?id=522590 */
        var str = "[";
        for (var p in ob)
            str += p + ",";
        return str + "]";

    }
    catch (exc)
    {
        if (FBTrace.DBG_ERRORS)
            FBTrace.sysout("Str.safeToString FAILS "+exc, exc);
    }
    return "[unsupported: no toString() function in type "+typeof(ob)+"]";
};

// ********************************************************************************************* //

return Str;

// ********************************************************************************************* //
}