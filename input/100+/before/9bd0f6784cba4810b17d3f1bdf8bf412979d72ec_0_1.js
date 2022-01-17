function(grassCode) {
		if (arguments.length == 1 && new Object(grassCode) instanceof String) {
			return this._indentMaker.indent(
				[
					'(function() {\n',
					'\t"use strict";\n',
                                        '\tfunction stringToUTF8(string) {\n',
                                        '\t\tvar UTF8 = [];\n',
                                        '\t\tfor (var i = 0; i < string.length;) {\n',
                                        '\t\t\tvar highSurrogate = string.charCodeAt(i);\n',
                                        '\t\t\tvar lowSurrogate = string.charCodeAt(i + 1);\n',
                                        '\t\t\tvar codePoint;\n',
                                        '\t\t\tif (0xd800 <= highSurrogate && highSurrogate <= 0xdbff) {\n',
                                        '\t\t\t\tif (0xdc00 <= lowSurrogate && lowSurrogate <= 0xdfff) {\n',
                                        '\t\t\t\t\tcodePoint = (highSurrogate - 0xd800 << 10) + (lowSurrogate - 0xdc00) + 0x10000;\n',
                                        '\t\t\t\t\ti += 2;\n',
                                        '\t\t\t\t} else {\n',
                                        '\t\t\t\t\tthrow new Error("illegal string");\n',
                                        '\t\t\t\t}\n',
                                        '\t\t\t} else if (0xdc00 <= highSurrogate && highSurrogate <= 0xdfff) {\n',
                                        '\t\t\t\tthrow new Error("illegal string");\n',
                                        '\t\t\t} else {\n',
                                        '\t\t\t\tcodePoint = highSurrogate;\n',
                                        '\t\t\t\ti++;\n',
                                        '\t\t\t}\n',
                                        '\t\t\t\n',
                                        '\t\t\tif (0x0000 <= codePoint && codePoint <= 0x007f) {\n',
                                        '\t\t\t\tUTF8.push(codePoint);\n',
                                        '\t\t\t} else if (0x0080 <= codePoint && codePoint <= 0x07ff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 6) + 0xc0, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t} else if (0x0800 <= codePoint && codePoint <= 0xffff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 12) + 0xe0, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t} else if (0x10000 <= codePoint && codePoint <= 0x10ffff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 18) + 0xf0, (codePoint >>> 12 & 0x3f) + 0x80, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t}\n',
                                        '\t\t}\n',
                                        '\t\treturn UTF8;\n',
                                        '\t}\n',
					'\tfunction UTF8ToString(UTF8) {\n',
					'\t\tvar string = [];\n',
					'\t\tfor (var i = 0; i < UTF8.length;) {\n',
					'\t\t\ttry {\n',
					'\t\t\t\tvar UTF8CharCount;\n',
					'\t\t\t\tif (0x00 <= UTF8[i] && UTF8[i] <= 0x7f) {\n',
					'\t\t\t\t\tUTF8CharCount = 1;\n',
					'\t\t\t\t} else if (0xc2 <= UTF8[i] && UTF8[i] <= 0xdf) {\n',
					'\t\t\t\t\tUTF8CharCount = 2;\n',
					'\t\t\t\t} else if (0xe0 <= UTF8[i] && UTF8[i] <= 0xef) {\n',
					'\t\t\t\t\tUTF8CharCount = 3;\n',
					'\t\t\t\t} else if (0xf0 <= UTF8[i] && UTF8[i] <= 0xf7) {\n',
					'\t\t\t\t\tUTF8CharCount = 4;\n',
					'\t\t\t\t} else {\n',
					'\t\t\t\t\tthrow new Error("illegal byte sequence");\n',
					'\t\t\t\t}\n',
					'\t\t\t\tvar UTF8Char = UTF8.slice(i, i + UTF8CharCount);\n',
					'\t\t\t\tif (UTF8Char.length != UTF8CharCount) throw new Error("illegal byte sequence");\n',
					'\t\t\t\tif (!UTF8Char.slice(1).every(function(v) {return 0x80 <= v && v <= 0xbf})) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\n',
					'\t\t\t\tif (UTF8CharCount == 1) {\n',
					'\t\t\t\t\tvar codePoint = UTF8Char[0] & 0x7f;\n',
					'\t\t\t\t\tif (!(0x00 <= codePoint && codePoint <= 0x7f)) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\tstring.push(String.fromCharCode(codePoint));\n',
					'\t\t\t\t} else if (UTF8CharCount == 2) {\n',
					'\t\t\t\t\tvar codePoint = UTF8Char[0] << 6 & 0x7c0 | UTF8Char[1] << 0 & 0x3f;\n',
					'\t\t\t\t\tif (!(0x80 <= codePoint && codePoint <= 0x7ff)) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\tstring.push(String.fromCharCode(codePoint));\n',
					'\t\t\t\t} else if (UTF8CharCount == 3) {\n',
					'\t\t\t\t\tvar codePoint = UTF8Char[0] << 12 & 0xf000 | UTF8Char[1] << 6 & 0xfc0 | UTF8Char[2] << 0 & 0x3f;\n',
					'\t\t\t\t\tif (!(0x800 <= codePoint && codePoint <= 0xffff)) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\tif (0xd800 <= codePoint && codePoint <= 0xdfff) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\tstring.push(String.fromCharCode(codePoint));\n',
					'\t\t\t\t} else if (UTF8CharCount == 4) {\n',
					'\t\t\t\t\tvar codePoint = UTF8Char[0] << 18 & 0x1c0000 | UTF8Char[1] << 12 & 0x3f000 | UTF8Char[2] << 6 & 0xfc0 | UTF8Char[3] << 0 & 0x3f;\n',
					'\t\t\t\t\tif (!(0x10000 <= codePoint && codePoint <= 0x10ffff)) throw new Error("illegal byte sequence");\n',
					'\t\t\t\t\tstring.push(String.fromCharCode((codePoint - 0x10000 >>> 10) + 0xd800), String.fromCharCode((codePoint - 0x10000 & 0x3ff) + 0xdc00));\n',
					'\t\t\t\t}\n',
					'\t\t\t\ti += UTF8CharCount;\n',
					'\t\t\t} catch (e) {\n',
					'\t\t\t\tstring.push("\\ufffd");\n',
					'\t\t\t\ti++;\n',
					'\t\t\t}\n',
					'\t\t}\n',
					'\t\treturn string.join("");\n',
					'\t}\n',
					'\t\n',
					'\tvar stdin = [];\n',
					'\tvar isEOF = false;\n',
					'\tvar stdout = [];\n',
					'\tfunction T(x) {\n',
					'\t\treturn function(y) {\n',
					'\t\t\treturn x;\n',
					'\t\t};\n',
					'\t}\n',
					'\tfunction F(x) {\n',
					'\t\treturn function(y) {\n',
					'\t\t\treturn y;\n',
					'\t\t};\n',
					'\t}\n',
					'\tfunction In(x) {\n',
					'\t\tif (isEOF) return x;\n',
					'\t\tif (stdin.length > 0) return stdin.shift();\n',
					'\t\tvar inputAsString = prompt("", "");\n',
					'\t\tif (inputAsString == null || inputAsString == "") {\n',
					'\t\t\tisEOF = true;\n',
					'\t\t\treturn x;\n',
					'\t\t}\n',
					'\t\tArray.prototype.push.apply(stdin, stringToUTF8(inputAsString));\n',
					'\t\treturn stdin.shift();\n',
					'\t}\n',
					'\tvar characters = [];\n',
					'\tfor(var i = 0; i < 0x100; i++) {\n',
					'\t\t(function(i){\n',
					'\t\t\tcharacters[i] = function(x) {\n',
					'\t\t\t\tif(x.isCharFunc && characters[i].instance == x.instance) return T;\n',
					'\t\t\t\telse return F;\n',
					'\t\t\t};\n',
					'\t\t\tcharacters[i].isCharFunc = true;\n',
					'\t\t\tcharacters[i].instance = i;\n',
					'\t\t})(i);\n',
					'\t}\n',
					'\tvar w = characters[0x77];\n',
					'\tfunction Succ(x) {\n',
					'\t\tif (!x.isCharFunc) throw new Error("\'Succ\' called by non-char function");\n',
					'\t\treturn characters[(x.instance + 1) % 0x100];\n',
					'\t}\n',
					'\tfunction Out(x) {\n',
					'\t\tif (!x.isCharFunc) throw new Error("\'Out\' called by non-char function");\n',
					'\t\tstdout.push(x.instance);\n',
					'\t\treturn x;\n',
					'\t}\n',
					'\tvar stack = [Out, Succ, w, In];\n',
					'\t\n',
					new s.Context(new g.IndentMaker(this._indentMaker.indentSize, 1)).parse(grassCode),
					'\tstack[0](stack[0]);\n',
					'\tdocument.write(UTF8ToString(stdout));\n',
                                        '})();\n'
				]
				.join(""), 0);
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	}