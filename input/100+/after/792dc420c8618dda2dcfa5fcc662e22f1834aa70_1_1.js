function () {
                            var a = 0,
                                b = 0,
                                c = args.source.length,
                                d = [],
                                e = 0,
                                h = -1,
                                i = 0,
                                j = 0,
                                k = -1,
                                l = 0,
                                m = 0,
                                n = false,
                                o = false,
                                p = 0,
                                q = [">"],
                                r = false;
                            for (a = 0; a < c; a += 1) {
                                if (x.substr(a, 7).toLowerCase() === "<script") {
                                    for (b = a + 7; b < c; b += 1) {
                                        if (x.charAt(b) + x.charAt(b + 1) + x.charAt(b + 2).toLowerCase() + x.charAt(b + 3).toLowerCase() + x.charAt(b + 4).toLowerCase() + x.charAt(b + 5).toLowerCase() + x.charAt(b + 6).toLowerCase() + x.charAt(b + 7).toLowerCase() + x.charAt(b + 8) === "</script>") {
                                            if (/></.test(x.substr(a, b))) {
                                                h += 2;
                                            } else {
                                                h += 3;
                                            }
                                            a = b + 8;
                                            break;
                                        }
                                    }
                                } else if (x.substr(a, 6).toLowerCase() === "<style") {
                                    for (b = a + 6; b < c; b += 1) {
                                        if (x.charAt(b) + x.charAt(b + 1) + x.charAt(b + 2).toLowerCase() + x.charAt(b + 3).toLowerCase() + x.charAt(b + 4).toLowerCase() + x.charAt(b + 5).toLowerCase() + x.charAt(b + 6).toLowerCase() + x.charAt(b + 7) === "</style>") {
                                            if (/></.test(x.substr(a, b))) {
                                                h += 2;
                                            } else {
                                                h += 3;
                                            }
                                            a = b + 7;
                                            break;
                                        }
                                    }
                                } else if (x.substr(a, 5) === "<?php") {
                                    for (b = a + 5; b < c; b += 1) {
                                        if (x.charAt(b - 1) === "?" && x.charAt(b) === ">") {
                                            a = b;
                                            h += 1;
                                            break;
                                        }
                                    }
                                } else if (x.charAt(a) === "<" && x.charAt(a + 1) === "%") {
                                    for (b = a + 2; b < c; b += 1) {
                                        if (x.charAt(b - 1) === "%" && x.charAt(b) === ">") {
                                            a = b;
                                            h += 1;
                                            break;
                                        }
                                    }
								} else if (x.charAt(a) === "<" && x.charAt(a + 1) === "!" && x.charAt(a + 2) === "[") {
                                    for (b = a + 2; b < c; b += 1) {
                                        if (x.charAt(b - 1) === "]" && x.charAt(b) === ">") {
                                            a = b;
                                            h += 1;
                                            break;
                                        }
                                    }
								} else if (x.charAt(a) === "<" && x.charAt(a + 1) === "!" && /[A-Z]|\[/.test(x.charAt(a + 2))) {
                                    for (b = a + 3; b < c; b += 1) {
                                        if (x.charAt(b) === ">" && q[q.length - 1] === ">" && q.length === 1) {
                                            h += 1;
                                            if (r) {
                                                d.push([a, b, h, a]);
                                            }
                                            r = false;
                                            a = b;
                                            q = [">"];
                                            break;
                                        } else if (x.charAt(b) === "<") {
                                            q.push(">");
                                            r = true;
                                        } else if (x.charAt(b) === ">" && q.length > 1) {
                                            q.pop();
                                            r = true;
                                        } else if (x.charAt(b) === "[") {
                                            q.push("]");
                                        } else if (x.charAt(b) === "]") {
                                            q.pop();
                                        } else if (x.charAt(b) === "\"") {
                                            if (q[q.length - 1] === "\"") {
                                                q.pop();
                                            } else {
                                                q.push("\"");
                                            }
                                        } else if (x.charAt(b) === "'") {
                                            if (q[q.length - 1] === "'") {
                                                q.pop();
                                            } else {
                                                q.push("'");
                                            }
                                        }
                                    }
                                } else if (x.charAt(a) === x.charAt(a + 1) && (x.charAt(a) === "\"" || x.charAt(a) === "'")) {
                                    a += 1;
                                } else if (x.charAt(a - 1) === "=" && (x.charAt(a) === "\"" || x.charAt(a) === "'")) {
                                    o = false;
                                    for (m = a - 1; m > 0; m -= 1) {
                                        if ((x.charAt(m) === "\"" && x.charAt(a) === "\"") || (x.charAt(m) === "'" && x.charAt(a) === "'") || x.charAt(m) === "<") {
                                            break;
                                        } else if (x.charAt(m) === ">") {
                                            o = true;
                                            break;
                                        }
                                    }
                                    if (!o) {
                                        n = false;
                                        for (b = a + 1; b < c; b += 1) {
                                            if (x.substr(b, 7).toLowerCase() === "<script") {
                                                for (p = b + 7; p < c; p += 1) {
                                                    if (x.charAt(p) + x.charAt(p + 1) + x.charAt(p + 2).toLowerCase() + x.charAt(p + 3).toLowerCase() + x.charAt(p + 4).toLowerCase() + x.charAt(p + 5).toLowerCase() + x.charAt(p + 6).toLowerCase() + x.charAt(p + 7).toLowerCase() + x.charAt(p + 8) === "</script>") {
                                                        b = p + 8;
                                                        break;
                                                    }
                                                }
                                            } else if (x.substr(b, 6).toLowerCase() === "<style") {
                                                for (p = b + 6; p < c; p += 1) {
                                                    if (x.charAt(p) + x.charAt(p + 1) + x.charAt(p + 2).toLowerCase() + x.charAt(p + 3).toLowerCase() + x.charAt(p + 4).toLowerCase() + x.charAt(p + 5).toLowerCase() + x.charAt(p + 6).toLowerCase() + x.charAt(p + 7) === "</style>") {
                                                        b = p + 7;
                                                        break;
                                                    }
                                                }
                                            } else if (x.substr(b, 5) === "<?php") {
                                                for (p = b + 5; p < c; p += 1) {
                                                    if (x.charAt(p - 1) === "?" && x.charAt(p) === ">") {
                                                        b = p;
                                                        break;
                                                    }
                                                }
                                            } else if (x.charAt(b) === "<" && x.charAt(b + 1) === "%") {
                                                for (p = b + 5; p < c; p += 1) {
                                                    if (x.charAt(p - 1) === "%" && x.charAt(p) === ">") {
                                                        b = p;
                                                        break;
                                                    }
                                                }
                                            } else if (x.charAt(b) === ">" || x.charAt(b) === "<") {
                                                n = true;
                                            } else if ((x.charAt(b - 1) !== "\\" && ((x.charAt(a) === "\"" && x.charAt(b) === "\"") || (x.charAt(a) === "'" && x.charAt(b) === "'"))) || b === c - 1) {
                                                if (k !== h && l === 1) {
                                                    l = 0;
                                                    h -= 1;
                                                    k -= 1;
                                                } else if (k === h) {
                                                    for (e = i + 1; e > a; e += 1) {
                                                        if (!/\s/.test(x.charAt(e))) {
                                                            break;
                                                        }
                                                    }
                                                    j = e;
                                                    if (i < a && l !== 1) {
                                                        l = 1;
                                                        h += 1;
                                                        k += 1;
                                                    }
                                                }
                                                if (n) {
                                                    d.push([a, b, h, j]);
                                                }
                                                a = b;
                                                break;
                                            }
                                        }
                                    }
                                } else if (x.charAt(a) === "<") {
                                    if (x.charAt(a + 1) === "!" && x.charAt(a + 2) === "-" && x.charAt(a + 3) === "-") {
                                        for (b = a + 4; b < x.length; b += 1) {
                                            if (x.charAt(b) === "-" && x.charAt(b + 1) === "-" && x.charAt(b + 2) === ">") {
                                                break;
                                            }
                                        }
                                        h += 1;
                                        a = b + 2;
                                    } else {
                                        h += 1;
                                        j = a;
                                    }
                                } else if (x.charAt(a + 1) === "<" && x.charAt(a) !== ">") {
                                    for (b = a; b > 0; b -= 1) {
                                        if (!/\s/.test(x.charAt(b)) && x.charAt(b) !== ">") {
                                            h += 1;
                                            k += 1;
                                            j = a;
                                            break;
                                        } else if (x.charAt(b) === ">") {
                                            if (h !== k) {
                                                k += 1;
                                                i = a;
                                            }
                                            break;
                                        }
                                    }
                                } else if (x.charAt(a) === ">") {
                                    k += 1;
                                    i = a;
                                }
                            }
                            return d;
                        }