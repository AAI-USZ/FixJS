function make_num(num) {
                var str = num.toString(10), a = [ str.replace(/^0\./, ".").replace('e+', 'e') ], m;
                if (Math.floor(num) === num) {
                        if (num >= 0) {
                                a.push("0x" + num.toString(16).toLowerCase(), // probably pointless
                                       "0" + num.toString(8)); // same.
                        } else {
                                a.push("-0x" + (-num).toString(16).toLowerCase(), // probably pointless
                                       "-0" + (-num).toString(8)); // same.
                        }
                        if ((m = /^(.*?)(0+)$/.exec(num))) {
                                a.push(m[1] + "e" + m[2].length);
                        }
                } else if ((m = /^0?\.(0+)(.*)$/.exec(num))) {
                        a.push(m[2] + "e-" + (m[1].length + m[2].length),
                               str.substr(str.indexOf(".")));
                }
                return best_of(a);
        }