function (args) {
        "use strict";

        //diffview application contains three primary parts
        //1.  opcodes - performs the 'largest common subsequence'
        //    calculation to determine which lines are different.  I
        //    did not write this logic.  I have rewritten it for
        //    performance, but original logic is still intact.
        //2.  charcomp - performs the 'largest common subsequence' upon
        //    characters of two compared lines.
        //3.  The construction of the output into the 'node' array
        (function () {
            if (typeof args.baseTextLines !== "string") {
                args.baseTextLines = "Error: Cannot build diff view; baseTextLines is not defined.";
            }
            if (typeof args.newTextLines !== "string") {
                args.newTextLines = "Error: Cannot build diff view; newTextLines is not defined.";
            }
            if (args.inline !== true) {
                args.inline = false;
            }
            if (isNaN(Number(args.contextSize))) {
                args.contextSize = "";
            }
            if (typeof args.baseTextName !== "string") {
                args.baseTextName = "Base Source";
            }
            if (typeof args.newTextName !== "string") {
                args.newTextName = "New Source";
            }
            if (typeof args.tchar !== "string") {
                args.tchar = "";
            }
            if (isNaN(Number(args.tsize))) {
                if (args.tchar === "") {
                    args.tsize = 0;
                } else {
                    args.tsize = 1;
                }
            }

        }());
        //errorout is a count of differences
        var errorout = 0,

            //diffline is a count of lines that are not equal
            diffline = 0,

            //tab is a construct of a standard indentation for code
            tab = (function () {
                var a = Number(args.tsize),
                    b = 0,
                    c = [];
                if (args.tchar === "") {
                    return "";
                }
                for (b = 0; b < a; b += 1) {
                    c.push(args.tchar);
                }
                return c.join("");
            }()),
            inline = args.inline,

            //tranlates contextSize into a number, or -1
            context = (args.contextSize === "") ? -1 : Number(args.contextSize),

            //translates source code from a string to an array by
            //splitting on line breaks
            stringAsLines = function (str) {
                var lfpos = str.indexOf("\n"),
                    crpos = str.indexOf("\r"),
                    linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? "\n" : "\r",
                    lines = str.replace(/\&/g, "&amp;").replace(/\$#lt;/g, "%#lt;").replace(/\$#gt;/g, "%#gt;").replace(/</g, "$#lt;").replace(/>/g, "$#gt;");
                if (linebreak === "\n") {
                    str = str.replace(/\r/g, "");
                } else {
                    str = str.replace(/\n/g, "");
                }
                return lines.split(linebreak);
            },

            //array representation of base source
            bta = stringAsLines(args.baseTextLines),

            //array representation of new source
            nta = stringAsLines(args.newTextLines),

            //this name is a label in the output for the base source
            baseTextName = args.baseTextName,

            //this name is a label in the output for the new source
            newTextName = args.newTextName,

            //the core algorithm.  This logic is not mine even though I
            //have largely rewritten it for performance.  It determines
            //the largest common subsequence calculations between lines
            //of code
            opcodes = (function () {
                var junkdict = {},
                    isbjunk = function (key) {
                        if (junkdict.hasOwnProperty(key)) {
                            return junkdict[key];
                        }
                    },
                    a = [],
                    b = [],
                    reverse = false,
                    matching_blocks = [],
                    bxj = [],
                    opcodes = [],
                    answer = [],
                    get_matching_blocks = function () {
                        var c = 0,
                            d = 0,
                            alo = 0,
                            ahi = 0,
                            blo = 0,
                            bhi = 0,
                            qi = [],
                            i = 0,
                            j = 0,
                            k = 0,
                            x = [],
                            i1 = 0,
                            i2 = 0,
                            j1 = 0,
                            j2 = 0,
                            k1 = 0,
                            k2 = 0,
                            la = a.length,
                            lb = b.length,
                            queue = [
                                [0, la, 0, lb]],
                            non_adjacent = [],
                            ntuplecomp = function (x, y) {
                                var i = 0,
                                    mlen = Math.max(x.length, y.length);
                                for (i = 0; i < mlen; i += 1) {
                                    if (x[i] < y[i]) {
                                        return -1;
                                    }
                                    if (x[i] > y[i]) {
                                        return 1;
                                    }
                                }
                                return (x.length === y.length) ? 0 : ((x.length < y.length) ? -1 : 1);
                            },
                            find_longest_match = function (alo, ahi, blo, bhi) {
                                var c = 0,
                                    d = bxj.length,
                                    i = 0,
                                    j = 0,
                                    k = 0,
                                    l = [0, 0],
                                    besti = alo,
                                    bestj = blo,
                                    bestsize = 0;
                                for (i = alo; i < ahi; i += 1) {
                                    for (c = 0; c < d; c += 1) {
                                        if (bxj[c][1] === a[i] && (a[i] !== b[i] || i === ahi - 1 || a[i + 1] === b[i + 1])) {
                                            j = bxj[c][0];
                                            break;
                                        }
                                    }
                                    if (c !== d) {
                                        if (j >= blo) {
                                            if (j >= bhi) {
                                                break;
                                            }
                                            if (l[0] === j - 1) {
                                                k = l[1] + 1;
                                            } else {
                                                k = 1;
                                            }
                                            if (k > bestsize) {
                                                besti = i - k + 1;
                                                bestj = j - k + 1;
                                                bestsize = k;
                                            }
                                        }
                                        l = [j, k];
                                    }
                                }
                                while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
                                    besti -= 1;
                                    bestj -= 1;
                                    bestsize += 1;
                                }
                                while (besti + bestsize < ahi && bestj + bestsize < bhi && !isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
                                    bestsize += 1;
                                }
                                while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
                                    besti -= 1;
                                    bestj -= 1;
                                    bestsize += 1;
                                }
                                while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
                                    bestsize += 1;
                                }
                                return [besti, bestj, bestsize];
                            };
                        while (queue.length) {
                            qi = queue.pop();
                            alo = qi[0];
                            ahi = qi[1];
                            blo = qi[2];
                            bhi = qi[3];
                            x = find_longest_match(alo, ahi, blo, bhi);
                            i = x[0];
                            j = x[1];
                            k = x[2];
                            if (k > 0) {
                                matching_blocks.push(x);
                                if (alo < i && blo < j) {
                                    queue.push([alo, i, blo, j]);
                                }
                                if (i + k < ahi && j + k < bhi) {
                                    queue.push([i + k, ahi, j + k, bhi]);
                                }
                            }
                        }
                        matching_blocks.sort(ntuplecomp);
                        d = matching_blocks.length;
                        for (c = 0; c < d; c += 1) {
                            i2 = matching_blocks[c][0];
                            j2 = matching_blocks[c][1];
                            k2 = matching_blocks[c][2];
                            if (i1 + k1 === i2 && j1 + k1 === j2) {
                                k1 += k2;
                            } else {
                                if (k1) {
                                    non_adjacent.push([i1, j1, k1]);
                                }
                                i1 = i2;
                                j1 = j2;
                                k1 = k2;
                            }
                        }
                        if (k1) {
                            non_adjacent.push([i1, j1, k1]);
                        }
                        non_adjacent.push([la, lb, 0]);
                        return non_adjacent;
                    };
                (function () {
                    (function () {
                        if (bta.length > nta.length) {
                            reverse = true;
                            a = nta;
                            b = bta;
                        } else {
                            a = bta;
                            b = nta;
                        }
                    }());
                    (function () {
                        var i = 0,
                            c = 0,
                            elt = "",
                            n = b.length;
                        for (i = 0; i < n; i += 1) {
                            elt = b[i];
                            for (c = bxj.length - 1; c > -1; c -= 1) {
                                if (bxj[c][1] === elt) {
                                    break;
                                }
                            }
                            if (c > -1) {
                                if (n >= 200 && 100 > n) {
                                    bxj.splice(c, 1);
                                }
                            } else {
                                bxj.push([i, elt]);
                            }
                        }
                    }());
                    (function () {
                        var ai = 0,
                            bj = 0,
                            size = 0,
                            tag = "",
                            c = 0,
                            i = 0,
                            j = 0,
                            blocks = get_matching_blocks(),
                            d = blocks.length,
                            closerMatch = function (x, y, z) {
                                var diffspot = function (a, b) {
                                        var c = a.replace(/^(\s+)/, "").split(""),
                                            d = Math.min(c.length, b.length),
                                            e = 0;
                                        for (e = 0; e < d; e += 1) {
                                            if (c[e] !== b[e]) {
                                                return e;
                                            }
                                        }
                                        return e;
                                    },
                                    zz = z.replace(/^(\s+)/, "").split(""),
                                    test = diffspot(y, zz) - diffspot(x, zz);
                                if (test > 0) {
                                    return true;
                                }
                                return false;
                            };
                        for (c = 0; c < d; c += 1) {
                            ai = blocks[c][0];
                            bj = blocks[c][1];
                            size = blocks[c][2];
                            tag = "";
                            if (i < ai && j < bj) {
                                if (i - j !== ai - bj && j - bj < 3 && i - ai < 3) {
                                    if (reverse && i - ai > j - bj) {
                                        if (closerMatch(b[j], b[j + 1], a[i])) {
                                            answer.push(["delete", j, j + 1, i, i]);
                                            answer.push(["replace", j + 1, bj, i, ai]);
                                        } else {
                                            answer.push(["replace", j, bj, i, ai]);
                                        }
                                    } else if (!reverse && bj - j > ai - i) {
                                        if (closerMatch(b[j], b[j + 1], a[i])) {
                                            answer.push(["insert", i, i, j, j + 1]);
                                            answer.push(["replace", i, ai, j + 1, bj]);
                                        } else {
                                            answer.push(["replace", i, ai, j, bj]);
                                        }
                                    } else {
                                        tag = "replace";
                                    }
                                } else {
                                    tag = "replace";
                                }
                            } else if (i < ai) {
                                if (reverse) {
                                    tag = "insert";
                                } else {
                                    tag = "delete";
                                }
                            } else if (j < bj) {
                                if (reverse) {
                                    tag = "delete";
                                } else {
                                    tag = "insert";
                                }
                            }
                            if (tag !== "") {
                                if (reverse) {
                                    answer.push([tag, j, bj, i, ai]);
                                } else {
                                    answer.push([tag, i, ai, j, bj]);
                                }
                            }
                            i = ai + size;
                            j = bj + size;
                            if (size > 0) {
                                if (reverse) {
                                    answer.push(["equal", bj, j, ai, i]);
                                } else {
                                    answer.push(["equal", ai, i, bj, j]);
                                }
                            }
                        }
                    }());
                }());
                return answer;
            }());

        //after the opcodes generate the other two core pieces of logic
        //are quaranteened into an anonymous function.
        return (function () {
            var node = ["<table class='diff'><thead><tr>"],
                idx = 0,
                b = 0,
                be = 0,
                n = 0,
                ne = 0,
                rowcnt = 0,
                i = 0,
                jump = 0,
                tb = (tab === "") ? "" : new RegExp("^((" + tab.replace(/\\/g, "\\") + ")+)"),
                noTab = function (str) {
                    var a = 0,
                        b = str.length,
                        c = [];
                    for (a = 0; a < b; a += 1) {
                        c.push(str[a].replace(tb, ""));
                    }
                    return c;
                },
                btab = (tab === "") ? [] : noTab(bta),
                ntab = (tab === "") ? [] : noTab(nta),
                opleng = opcodes.length,
                change = "",
                btest = false,
                ntest = false,
                ctest = true,
                code = [],
                z = [],

                //this is the character comparison logic that performs
                //the 'largest common subsequence' between two lines of
                //code
                charcomp = function (c, d) {
                    var n = false,
                        k = 0,
                        p = 0,
                        r = 0,
                        ax = [],
                        bx = [],
                        zx = 0,

                        //ignore these next two assignments.  I just
                        //wanted to type them as a 'function'.  They
                        //will be defined later
                        entity = function () {
                            return;
                        },
                        compare = function () {
                            return;
                        },
                        emerge = function () {
                            errorout -= 1;
                            return "";
                        },

                        a = c.replace(/\'/g, "$#39;").replace(/\"/g, "$#34;").replace(/\&nbsp;/g, " ").replace(/\&#160;/g, " "),
                        b = d.replace(/\'/g, "$#39;").replace(/\"/g, "$#34;").replace(/\&nbsp;/g, " ").replace(/\&#160;/g, " ");

                    //if the two lines are identical then get out of
                    //this beast without doing any more work
                    if (a === b) {
                        return [c, d];
                    }

                    //if the only difference between two lines is
                    //indentation then show that and not a bunch of
                    //false positives
                    if (tb !== "" && a.length !== b.length && a.replace(tb, "") === b.replace(tb, "")) {
                        return (function () {
                            var ax = a.split(tab),
                                bx = b.split(tab),
                                i = 0,
                                j = ax.length,
                                k = bx.length,
                                p = 0;
                            for (i = 0; i < j; i += 1) {
                                if (ax[i].length === 0) {
                                    ax[i] = tab;
                                } else {
                                    break;
                                }
                            }
                            for (p = 0; p < k; p += 1) {
                                if (bx[p].length === 0) {
                                    bx[p] = tab;
                                } else {
                                    break;
                                }
                            }
                            if (j > k) {
                                r = j - k;
                                zx = i - r;
                                ax[zx] = "<em>" + ax[zx];
                                ax[zx + r] = "</em>" + ax[zx + r];
                                bx[p] = "<em></em>" + bx[p];
                            } else {
                                r = k - j;
                                zx = p - r;
                                ax[i] = "<em></em>" + ax[i];
                                bx[zx] = "<em>" + bx[zx];
                                bx[zx + r] = "</em>" + bx[zx + r];
                            }
                            c = ax.join("").replace(/\$#34;/g, "\"").replace(/\$#39;/g, "'");
                            d = bx.join("").replace(/\$#34;/g, "\"").replace(/\$#39;/g, "'");
                            return [c, d];
                        }());
                    }

                    //decrement errorout once per visit, because just
                    //being here increment errorout even though the
                    //assignment of "delete", "insert", or "replace"
                    //also increments errorout
                    errorout -= 1;
                    ax = a.split("");
                    bx = b.split("");
                    zx = Math.max(ax.length, bx.length);

                    //this beast ensures that character entities are in
                    //a single array index so as to eliminate certain
                    //false positive conditions.  These guys are
                    //multiple characters, but represent a single
                    //character
                    entity = function (z) {
                        var a = z.length,
                            b = [];
                        for (n = 0; n < a; n += 1) {
                            if (z[n] + z[n + 1] + z[n + 2] + z[n + 3] + z[n + 4] === "$#gt;") {
                                z[n] = "$#gt;";
                                z[n + 1] = "";
                                z[n + 2] = "";
                                z[n + 3] = "";
                                z[n + 4] = "";
                            } else if (z[n] + z[n + 1] + z[n + 2] + z[n + 3] + z[n + 4] === "$#lt;") {
                                z[n] = "$#lt;";
                                z[n + 1] = "";
                                z[n + 2] = "";
                                z[n + 3] = "";
                                z[n + 4] = "";
                            } else if (z[n] + z[n + 1] + z[n + 2] + z[n + 3] + z[n + 4] === "&amp;") {
                                z[n] = "&amp;";
                                z[n + 1] = "";
                                z[n + 2] = "";
                                z[n + 3] = "";
                                z[n + 4] = "";
                            } else if (z[n] + z[n + 1] + z[n + 2] + z[n + 3] + z[n + 4] === "$#34;") {
                                z[n] = "&#34;";
                                z[n + 1] = "";
                                z[n + 2] = "";
                                z[n + 3] = "";
                                z[n + 4] = "";
                            } else if (z[n] + z[n + 1] + z[n + 2] + z[n + 3] + z[n + 4] === "$#39;") {
                                z[n] = "&#39;";
                                z[n + 1] = "";
                                z[n + 2] = "";
                                z[n + 3] = "";
                                z[n + 4] = "";
                            }
                        }
                        for (n = 0; n < a; n += 1) {
                            if (z[n] !== "" && z[n] !== undefined) {
                                b.push(z[n]);
                            }
                        }
                        return b;
                    };
                    ax = entity(ax);
                    bx = entity(bx);
                    n = false;

                    //the complex algorithm that compares character
                    //differences
                    compare = function () {
                        var em = /<em>/g,
                            i = 0,
                            j = 0,
                            o = 0,
                            p = [],
                            q = false;

                        //build out static indexes for undefined areas
                        //and find where the differences start
                        for (i = k; i < zx; i += 1) {
                            if (ax[i] === bx[i]) {
                                r = i;
                            } else {
                                if (!n && ax[i] !== bx[i] && !em.test(ax[i]) && !em.test(bx[i]) && !em.test(ax[i - 1]) && !em.test(bx[i - 1])) {

                                    if (i === 0 || (typeof ax[i - 1] === "string" && typeof bx[i - 1] === "string")) {
                                        if (i === 0) {
                                            ax[i] = "<em>" + ax[i];
                                            bx[i] = "<em>" + bx[i];
                                        } else {
                                            ax[i - 1] = ax[i - 1] + "<em>";
                                            bx[i - 1] = bx[i - 1] + "<em>";
                                        }
                                        errorout += 1;
                                        n = true;
                                        break;
                                    } else if (typeof ax[i - 1] !== "string" && typeof bx[i - 1] === "string") {
                                        ax[i - 1] = "<em>";
                                        bx[i - 1] = bx[i] + "<em>";
                                        errorout += 1;
                                        n = true;
                                        break;
                                    } else if (typeof ax[i - 1] === "string" && typeof bx[i - 1] !== "string") {
                                        ax[i - 1] = ax[i] + "<em>";
                                        bx[i - 1] = "<em>";
                                        errorout += 1;
                                        n = true;
                                        break;
                                    }
                                } else if (ax[i] === undefined && (bx[i] === "" || bx[i] === " ")) {
                                    ax[i] = "";
                                } else if (bx[i] === undefined && (ax[i] === "" || ax[i] === " ")) {
                                    bx[i] = "";
                                }
                            }
                        }

                        //this is voodoo magic.
                        for (j = i + 1; j < zx; j += 1) {
                            if (typeof ax[j] === "string" && typeof bx[j] !== "string") {
                                bx[j] = "";
                            } else if (typeof ax[j] !== "string" && typeof bx[j] === "string") {
                                ax[j] = "";
                            } else if (n) {
                                for (o = j; o < zx; o += 1) {
                                    if (ax[j - 1] === "<em>" + bx[o] && em.test(bx[j - 1]) && (j - 2 < 0 || ax[j - 2] !== bx[o + 1])) {
                                        ax[j - 1] = ax[j - 1].replace(em, "");
                                        ax.splice(j - 1, 0, "<em></em>");
                                        bx[o - 1] = bx[o - 1] + "</em>";
                                        k = o;
                                        if (o - j > 0) {
                                            p = [];
                                            for (o; o > j; o -= 1) {
                                                p.push("");
                                            }
                                            ax = p.concat(ax);
                                        }
                                        n = false;
                                        break;
                                    } else if (bx[j - 1] === "<em>" + ax[o] && em.test(ax[j - 1]) && (j - 2 < 0 || bx[j - 2] !== ax[o + 1])) {
                                        bx[j - 1] = bx[j - 1].replace(em, "");
                                        bx.splice(j - 1, 0, "<em></em>");
                                        ax[o - 1] = ax[o - 1] + "</em>";
                                        k = o;
                                        if (o - j > 0) {
                                            p = [];
                                            for (o; o > j; o -= 1) {
                                                p.push("");
                                            }
                                            bx = p.concat(bx);
                                        }
                                        n = false;
                                        break;
                                    } else if (bx[j] === ax[o] && ((ax[o - 1] !== ")" && ax[o - 1] !== "}" && ax[o - 1] !== "]" && ax[o - 1] !== ">" && bx[j - 1] !== ")" && bx[j - 1] !== "}" && bx[j - 1] !== "]" && bx[j - 1] !== ">") || (o === zx - 1 || bx[j + 1] === ax[o + 1]))) {
                                        if (bx[j - 1] === "<em>" + ax[o - 1]) {
                                            bx[j - 1] = bx[j - 1].replace(/<em>/, "<em></em>");
                                            ax[o - 1] = ax[o - 1] + "</em>";
                                            k = j;
                                            n = false;
                                            break;
                                        }
                                        if (ax.length > bx.length && ax[o - 1].substr(4) === bx[j - 1]) {
                                            ax[o - 2] = ax[o - 2] + "</em>";
                                            bx[j - 2] = bx[j - 2] + "<em></em>";
                                            bx[j - 1] = bx[j - 1].replace(/<em>/, "");
                                        } else if (ax[o - 1] !== bx[j - 1] && !em.test(ax[o - 1])) {
                                            ax[o - 1] = ax[o - 1] + "</em>";
                                            if (typeof bx[j - 1] === "string") {
                                                bx[j - 1] = bx[j - 1] + "</em>";
                                            } else {
                                                bx[j - 1] = "</em>";
                                            }
                                        } else {
                                            if (o === 1) {
                                                ax[o - 1] = ax[o - 1] + "</em>";
                                            } else {
                                                ax[o - 1] = "</em>" + ax[o - 1];
                                            }
                                            if (j === 1) {
                                                bx[j - 1] = bx[j - 1] + "</em>";
                                            } else {
                                                bx[j - 1] = "</em>" + bx[j - 1];
                                            }
                                        }
                                        k = o;
                                        if (o - j > 0) {
                                            p = [];
                                            for (o; o > j; o -= 1) {
                                                p.push("");
                                            }
                                            bx = p.concat(bx);
                                        }
                                        n = false;
                                        break;
                                    } else if (ax[j] === bx[o] && ((bx[o - 1] !== ")" && bx[o - 1] !== "}" && bx[o - 1] !== "]" && bx[o - 1] !== ">" && ax[j - 1] !== ")" && ax[j - 1] !== "}" && ax[j - 1] !== "]" && ax[j - 1] !== ">") || (o === zx - 1 || ax[j + 1] === bx[o + 1]))) {
                                        if (ax[j - 1] === "<em>" + bx[o - 1]) {
                                            ax[j - 1] = ax[j - 1].replace(/<em>/, "<em></em>");
                                            bx[o - 1] = bx[o - 1] + "</em>";
                                            k = j;
                                            n = false;
                                            break;
                                        }
                                        if (bx.length > ax.length && bx[o - 1].substr(4) === ax[j - 1]) {
                                            bx[o - 2] = bx[o - 2] + "</em>";
                                            ax[j - 2] = ax[j - 2] + "<em></em>";
                                            ax[j - 1] = ax[j - 1].replace(/<em>/, "");
                                        } else if (bx[o - 1] !== ax[j - 1] && !em.test(bx[o - 1])) {
                                            bx[o - 1] = bx[o - 1] + "</em>";
                                            if (typeof ax[j - 1] === "string") {
                                                ax[j - 1] = ax[j - 1] + "</em>";
                                            } else {
                                                ax[j - 1] = "</em>";
                                            }
                                        } else {
                                            if (o === 1) {
                                                bx[o - 1] = bx[o - 1] + "</em>";
                                            } else {
                                                bx[o - 1] = "</em>" + bx[o - 1];
                                            }
                                            if (j === 1) {
                                                ax[j - 1] = ax[j - 1] + "</em>";
                                            } else {
                                                ax[j - 1] = "</em>" + ax[j - 1];
                                            }
                                        }
                                        k = o;
                                        if (o - j > 0) {
                                            p = [];
                                            for (o; o > j; o -= 1) {
                                                p.push("");
                                            }
                                            ax = p.concat(ax);
                                        }
                                        n = false;
                                        break;
                                    }
                                }

                                //This is just a fail safe to prevent
                                //unterminated "<em>" pairs from leaking
                                //into the output.  Hopefully, you never
                                //need this.
                                if (n) {
                                    for (o = j + 1; o < zx - 1; o += 1) {
                                        if (typeof ax[o] !== "string") {
                                            ax.push("");
                                        } else if (typeof bx[o] !== "string") {
                                            bx.push("");
                                        } else if (ax[o] === bx[o] && typeof ax[o - 1] === "string" && typeof bx[o - 1] === "string") {
                                            ax[o - 1] = ax[o - 1] + "</em>";
                                            bx[o - 1] = bx[o - 1] + "</em>";
                                            k = o;
                                            n = false;
                                            q = true;
                                            break;
                                        }
                                    }
                                    if (q) {
                                        q = false;
                                        break;
                                    }
                                }
                            }
                            zx = Math.max(ax.length, bx.length);
                        }
                    };

                    //if the compare algorithm has finished but not
                    //quite yet represents the entirety of input then
                    //have another go at it
                    for (p = 0; p < zx; p += 1) {
                        if (r + 1 !== zx) {
                            compare();
                        } else {
                            break;
                        }
                    }
                    c = ax.join("").replace(/\$#34;/g, "\"").replace(/\$#39;/g, "'").replace(/<\/em><em>/g, emerge);
                    d = bx.join("").replace(/\$#34;/g, "\"").replace(/\$#39;/g, "'").replace(/<\/em><em>/g, "");

                    //An extra found of precaution against unqualified
                    //output even though a more robust fail safe is in
                    //the compare algorithm
                    if (n) {
                        if (c.split("<em>").length > c.split("</em>").length) {
                            c += "</em>";
                        }
                        if (d.split("<em>").length > d.split("</em>").length) {
                            d += "</em>";
                        }
                    }

                    return [c, d];
                };

            if (inline) {
                node.push("<th class='texttitle' colspan='3'>");
                node.push(baseTextName);
                node.push(" vs. ");
                node.push(newTextName);
                node.push("</th></tr></thead><tbody>");
            } else {
                node.push("<th class='texttitle' colspan='2'>");
                node.push(baseTextName);
                node.push("</th><th class='texttitle' colspan='2'>");
                node.push(newTextName);
                node.push("</th></tr></thead><tbody>");
            }
            for (idx = 0; idx < opleng; idx += 1) {
                code = opcodes[idx];
                change = code[0];
                b = code[1];
                be = code[2];
                n = code[3];
                ne = code[4];
                rowcnt = Math.max(be - b, ne - n);
                ctest = true;
                for (i = 0; i < rowcnt; i += 1) {

                    //apply context collapsing for the output, if needed
                    if (!isNaN(context) && context > -1 && opcodes.length > 1 && ((idx > 0 && i === context) || (idx === 0 && i === 0)) && change === "equal") {
                        ctest = false;
                        jump = rowcnt - ((idx === 0 ? 1 : 2) * context);
                        if (jump > 1) {
                            node.push("<tr><th>...</th>");
                            if (!inline) {
                                node.push("<td class='skip'></td>");
                            }
                            node.push("<th>...</th><td class='skip'></td></tr>");
                            b += jump;
                            n += jump;
                            i += jump - 1;
                            if (idx + 1 === opcodes.length) {
                                break;
                            }
                        }
                    }

                    //count the lines of differences
                    if (change !== "equal") {
                        diffline += 1;
                    }
                    node.push("<tr>");

                    //this is a check against false positives incurred
                    //by increasing or reducing of nesting.  At this
                    //time it only checks one level deep.
                    if (tab !== "") {
                        if (!btest && bta[be] !== nta[ne] && typeof bta[b + 1] === "string" && typeof nta[n] === "string" && btab[b + 1] === ntab[n] && btab[b] !== ntab[n] && (typeof nta[n - 1] !== "string" || btab[b] !== ntab[n - 1])) {
                            btest = true;
                        } else if (!ntest && bta[be] !== nta[ne] && typeof nta[n + 1] === "string" && typeof bta[b] === "string" && ntab[n + 1] === btab[b] && ntab[n] !== btab[b] && (typeof bta[b - 1] !== "string" || ntab[n] !== btab[b - 1])) {
                            ntest = true;
                        }
                    }

                    //this is the final of the three primary components
                    //this is where the output is built
                    if (inline) {
                        if (ntest || change === "insert") {
                            node.push("<th></th><th>");
                            node.push(n + 1);
                            node.push("</th><td class='insert'>");
                            node.push(nta[n]);
                            node.push("</td></tr>");
                        } else if (btest || change === "delete") {
                            node.push("<th>");
                            node.push(b + 1);
                            node.push("</th><th></th><td class='delete'>");
                            node.push(bta[b]);
                            node.push("</td></tr>");
                        } else if (change === "replace") {
                            if (b < be && n < ne && bta[b] !== nta[n]) {
                                z = charcomp(bta[b], nta[n]);
                            }
                            if (b < be) {
                                node.push("<th>");
                                node.push(b + 1);
                                node.push("</th><th></th><td class='delete'>");
                                node.push(z[0]);
                                node.push("</td></tr>");
                            }
                            if (b < be && n < ne) {
                                node.push("<tr>");
                            }
                            if (n < ne) {
                                node.push("<th></th><th>");
                                node.push(n + 1);
                                node.push("</th><td class='insert'>");
                                node.push(z[1]);
                                node.push("</td></tr>");
                            }
                        } else if (b < be || n < ne) {
                            node.push("<th>");
                            node.push(b + 1);
                            node.push("</th><th>");
                            node.push(n + 1);
                            node.push("</th><td class='");
                            node.push(change);
                            node.push("'>");
                            node.push(bta[b]);
                            node.push("</td></tr>");
                        }
                        if (btest) {
                            b += 1;
                            btest = false;
                        } else if (ntest) {
                            n += 1;
                            ntest = false;
                        } else {
                            b += 1;
                            n += 1;
                        }
                    } else {
                        if (!btest && !ntest && typeof bta[b] === "string" && typeof nta[n] === "string") {
                            if (change === "replace" && b < be && n < ne && bta[b] !== nta[n]) {
                                z = charcomp(bta[b], nta[n]);
                            } else {
                                z = [];
                            }
                            if (b < be) {
                                node.push("<th>");
                                node.push(b + 1);
                                node.push("</th><td class='");
                                if (n >= ne) {
                                    node.push("delete");
                                } else {
                                    node.push(change);
                                }
                                node.push("'>");
                                if (z.length === 2) {
                                    node.push(z[0]);
                                } else {
                                    node.push(bta[b]);
                                }
                                node.push("</td>");
                            } else if (ctest) {
                                node.push("<th></th><td class='empty'></td>");
                            }
                            if (n < ne) {
                                node.push("<th>");
                                node.push(n + 1);
                                node.push("</th><td class='");
                                if (b >= be) {
                                    node.push("insert");
                                } else {
                                    node.push(change);
                                }
                                node.push("'>");
                                if (z.length === 2) {
                                    node.push(z[1]);
                                } else {
                                    node.push(nta[n]);
                                }
                                node.push("</td>");
                            } else if (ctest) {
                                node.push("<th></th><td class='empty'></td>");
                            }
                            if (b < be) {
                                b += 1;
                            }
                            if (n < ne) {
                                n += 1;
                            }
                        } else if (btest || (typeof bta[b] === "string" && typeof nta[n] !== "string")) {
                            node.push("<th>");
                            node.push(b + 1);
                            node.push("</th><td class='delete'>");
                            node.push(bta[b]);
                            node.push("</td>");
                            node.push("<th></th><td class='empty'></td>");
                            btest = false;
                            b += 1;
                        } else if (ntest || (typeof bta[b] !== "string" && typeof nta[n] === "string")) {
                            node.push("<th></th><td class='empty'></td>");
                            node.push("<th>");
                            node.push(n + 1);
                            node.push("</th><td class='insert'>");
                            node.push(nta[n]);
                            node.push("</td>");
                            ntest = false;
                            n += 1;
                        }
                        node.push("</tr>");
                    }                }
            }
            node.push("</tbody><tfoot><tr><th class='author' colspan='");
            if (inline) {
                node.push("3");
            } else {
                node.push("4");
            }
            node.push("'>Original diff view created by <a href='https://github.com/cemerick/jsdifflib'>jsdifflib</a>. Diff view rewritten by <a href='http://prettydiff.com/'>Austin Cheney</a>.</th></tr></tfoot></table>");
            return [node.join("").replace(/\$#gt;/g, "&gt;").replace(/\$#lt;/g, "&lt;").replace(/\%#lt;/g, "$#lt;").replace(/\%#gt;/g, "$#gt;"), errorout, diffline];
        }());
    };