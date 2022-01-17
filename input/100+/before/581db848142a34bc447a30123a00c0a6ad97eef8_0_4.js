function () {
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
                                            bx[j - 1] = bx[j - 1] + "</em>";
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
                                            ax[j - 1] = ax[j - 1] + "</em>";
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
                                    }                                }
                            }
                            zx = Math.max(ax.length, bx.length);
                        }
                    };
