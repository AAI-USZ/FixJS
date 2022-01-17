function (meth, max, indent, curLnk) {
                var str = "<span class='idlMethod'>";
                if (meth.extendedAttributes) str += idn(indent) + "[<span class='extAttr'>" + meth.extendedAttributes + "</span>]\n";
                str += idn(indent);
                var len = 0;
                if (meth.isUnionType) len = meth.datatype.join(" or ").length + 2;
                else                len = meth.datatype.length;
                var pad = max - len;
                if (meth.nullable) pad = pad - 1;
                if (meth.array) pad = pad - (2 * meth.arrayCount);
                var nullable = meth.nullable ? "?" : "";
                var arr = arrsq(meth);
                str += "<span class='idlMethType'>" + datatype(meth.datatype) + arr + nullable + "</span> ";
                for (var i = 0; i < pad; i++) str += " ";
                var id = this.makeMethodID(curLnk, meth);
                // str += "<span class='idlMethName'><a href='#" + curLnk + meth.refId + "'>" + meth.id + "</a></span> (";
                str += "<span class='idlMethName'><a href='#" + id + "'>" + meth.id + "</a></span> (";
                str += meth.params.map(function (it) {
                                            var nullable = it.nullable ? "?" : "";
                                            var optional = it.optional ? "optional " : "";
                                            var arr = arrsq(it);
                                            var variadic = it.variadic ? "..." : "";
                                            var prm = "<span class='idlParam'>";
                                            if (it.extendedAttributes) prm += "[<span class='extAttr'>" + it.extendedAttributes + "</span>] ";
                                            prm += optional + "<span class='idlParamType'>" + datatype(it.datatype) + arr + nullable + variadic + "</span> " +
                                            "<span class='idlParamName'>" + it.id + "</span>" +
                                            "</span>";
                                            return prm;
                                        })
                                  .join(", ");
                str += ")";
                str += ";</span>\n";
                return str;
            }