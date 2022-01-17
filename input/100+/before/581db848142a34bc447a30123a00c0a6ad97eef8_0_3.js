function () {
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
                    opcodes = null;
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
                }