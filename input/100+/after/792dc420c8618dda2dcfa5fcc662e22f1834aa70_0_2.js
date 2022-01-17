function (z) {

                    //The n() function is only a container.  It sets the
                    //values of k, l, m.  If not a comment k = i - 1,
                    //and if not a comment l = k - i, and if not a
                    //comment m = l - 1.
                    var k = 0,
                        l = 0,
                        m = 0,

                        //This is executed if the prior non-comment
                        //item is not any form of content and is
                        //indented.
                        p = function () {
                            var j = 0,
                                v = 1,
                                u = -1;
                            for (j = k; j > 0; j -= 1) {
                                if (cinfo[j] === "start") {
                                    u -= 1;
                                    if (level[j] === "x") {
                                        v += 1;
                                    }
                                } else if (cinfo[j] === "end") {
                                    u += 1;
                                    v -= 1;
                                }
                                if (level[j] === 0) {
                                    k = 0;
                                    for (l = i - 1; l > j; l -= 1) {
                                        if (cinfo[l] === "start") {
                                            k += 1;
                                        } else if (cinfo[l] === "end") {
                                            k -= 1;
                                        }
                                    }
                                    if (k > 0) {
                                        if (level[j + 1] === "x") {
                                            return level.push(((u) * -1) - 1);
                                        }
                                        if (cinfo[j] !== "external" && (args.comments !== "noindent" || (args.comments === "noindent" && cinfo[j] !== "comment"))) {
                                            return level.push((u + 1) * -1);
                                        }
                                    } else {
                                        for (k = i - 1; k > 0; k -= 1) {
                                            if (level[k] !== "x") {
                                                return level.push(level[k]);
                                            }
                                        }
                                    }
                                }
                                if (level[j] !== "x" && level[i - 1] !== "x") {
                                    if (cinfo[j] === "start" || cinfo[j] === "end") {
                                        return level.push(level[j] + v);
                                    }
                                    return level.push(level[j] + v - 1);
                                }
                                if (u === -1 && level[j] === "x") {
                                    break;
                                } else if (u === 1 && level[j] !== "x" && cinfo[j] !== "mixed_start" && cinfo[j] !== "content") {
                                    if (cinfo[j - 1] === "mixed_end" || (level[i - 1] === "x" && cinfo[i - 1] === "end" && cinfo[j] !== "end")) {
                                        return level.push(level[j] - u - 1);
                                    }
                                    return level.push(level[j] - u);
                                }
                                if (u === 0 && level[j] !== "x") {
                                    return c("start");
                                }
                            }
                            return c("start");
                        };

                    (function () {
                        var j = 0;
                        if (z === 1) {
                            k = 0;
                            l = 0;
                            m = 0;
                        } else {
                            for (j = z - 1; j > 0; j -= 1) {
                                if (cinfo[j] !== "comment") {
                                    k = j;
                                    break;
                                }
                            }
                            if (k === 1) {
                                l = 0;
                                m = 0;
                            } else {
                                for (j = k - 1; j > 0; j -= 1) {
                                    if (cinfo[j] !== "comment") {
                                        l = j;
                                        break;
                                    }
                                }
                                if (l === 1) {
                                    m = 0;
                                } else {
                                    for (j = l - 1; j > 0; j -= 1) {
                                        if (cinfo[j] !== "comment") {
                                            m = j;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }());

                    //A one time fail safe to prevent a referential
                    //anomoly.
                    if (i - 1 === 0 && cinfo[0] === "start") {
                        return level.push(1);
                    }

                    //For a tag to become void of whitespace cushioning.
                    if (cinfo[k] === "mixed_start" || cinfo[k] === "content" || cinfo[i - 1] === "mixed_start" || cinfo[i - 1] === "content" || (cinfo[i] === "singleton" && (cinfo[i - 1] === "start" || cinfo[i - 1] === "singleton" || cinfo[i - 1] === "end") && build[i].charAt(0) !== " ")) {
                        return level.push("x");
                    }

                    //Simple regular tabbing
                    if ((cinfo[i - 1] === "comment" && level[i - 1] === 0) || ((cinfo[m] === "mixed_start" || cinfo[m] === "content") && cinfo[l] === "end" && (cinfo[k] === "mixed_end" || cinfo[k] === "mixed_both"))) {
                        return c("start");
                    }

                    //if the prior item is an indented comment then go
                    //with it
                    if (cinfo[i - 1] === "comment" && level[i - 1] !== "x") {
                        return level.push(level[i - 1]);
                    }
                    if ((cinfo[k] === "start" && level[k] === "x") || (cinfo[k] !== "mixed_end" && cinfo[k] !== "mixed_both" && level[k] === "x")) {
                        if (level[i - 1] === "x" && build[i].charAt(0) !== " " && cinfo[i - 1] !== "start" && build[i - 1].charAt(build[i - 1].length - 1) !== " ") {
                            if ((cinfo[i - 1] === "end" && cinfo[i - 2] === "end") || (cinfo[i - 1] === "end" && cinfo[i] !== "end" && cinfo[i + 1] !== "mixed_start" && cinfo[i + 1] !== "content")) {
                                return c("start");
                            }
                            return level.push("x");

                        }
                        return p();

                    }
                    if (cinfo[k] === "end" && level[k] !== "x" && (cinfo[k - 1] !== "start" || (cinfo[k - 1] === "start" && level[k - 1] !== "x"))) {
                        if (level[k] < 0) {
                            return c("start");
                        }
                        return level.push(level[k]);

                    }
                    if (cinfo[m] !== "mixed_start" && cinfo[m] !== "content" && (cinfo[k] === "mixed_end" || cinfo[k] === "mixed_both")) {
                        return (function () {
                            var a = 0,
                                l = 0,
                                p = 0,
                                m = 0;
                            for (a = k; a > 0; a -= 1) {
                                if (cinfo[a] === "end") {
                                    l += 1;
                                }
                                if (cinfo[a] === "start") {
                                    p += 1;
                                }
                                if (level[a] === 0 && a !== 0) {
                                    m = a;
                                }
                                if (cinfo[k] === "mixed_both" && level[a] !== "x") {
                                    return level.push(level[a]);
                                }
                                if (cinfo[a] !== "comment" && cinfo[a] !== "content" && cinfo[a] !== "external" && cinfo[a] !== "mixed_end" && level[a] !== "x") {
                                    if (cinfo[a] === "start" && level[a] !== "x") {
                                        if (cinfo[i - 1] !== "end") {
                                            return level.push(level[a] + (p - l));
                                        }
                                        if ((level[a] === level[a - 1] && cinfo[a - 1] !== "end" && level[a + 1] !== "x") || (cinfo[i - 2] === "start" && level[i - 2] !== "x" && level[i - 1] === "x")) {
                                            return level.push(level[a] + 1);
                                        }
                                        if (p <= 1) {
                                            return level.push(level[a]);
                                        }
                                    } else if (l > 0) {
                                        if (p > 1) {
                                            if (m !== 0) {
                                                return c("start");
                                            }
                                            return level.push(level[a] + 1);

                                        }
                                        return level.push(level[a] - l + 1);

                                    }
                                    return level.push(level[a] + p);

                                }
                            }
                            return c("start");
                        }());
                    }
                    if (cinfo[k] === "start" && level[k] !== "x") {
                        //This looks for the most previous level
                        //that is not set for the noted cinfo
                        //values.  Once that value is found it is
                        //increased plus 1 and added to the level
                        //array.
                        return (function () {
                            var a = 0;
                            for (a = i - 1; a > -1; a -= 1) {
                                if (cinfo[a] !== "comment" && cinfo[a] !== "content" && cinfo[a] !== "external" && cinfo[a] !== "mixed_end") {
                                    if (cinfo[i + 1] && build[i].charAt(0) !== " " && (cinfo[i + 1] === "mixed_end" || cinfo[i + 1] === "content" || (build[i + 1].charAt(0) !== " " && cinfo[i + 1] === "singleton"))) {
                                        return level.push("x");
                                    }
                                    return level.push(level[a] + 1);

                                }
                            }
                            return level.push(0);
                        }());
                    }
                    if (build[i].charAt(0) !== " " && (cinfo[i - 1] === "singleton" || cinfo[i - 1] === "content" || cinfo[i - 1] === "mixed_start")) {
                        return level.push("x");
                    }
                    return c("start");

                }