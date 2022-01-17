function (obj) {
                if (obj.type == "module") {
                    if (obj.id == "outermost") {
                        if (obj.children.length > 1) this.msg.pub("error", "We currently only support one structural level per IDL fragment");
                        return this.writeAsHTML(obj.children[0]);
                    }
                    else {
                        this.msg.pub("warn", "No HTML can be generated for module definitions.");
                        return $("<span></span>");
                    }
                }
                else if (obj.type == "typedef") {
                    var cnt;
                    if (obj.description && obj.description.text()) cnt = [obj.description];
                    else {
                        // yuck -- should use a single model...
                        var tdt = sn.element("span", { "class": "idlTypedefType" }, null);
                        tdt.innerHTML = datatype(obj.datatype);
                        cnt = [ sn.text("Throughout this specification, the identifier "),
                                sn.element("span", { "class": "idlTypedefID" }, null, obj.id),
                                sn.text(" is used to refer to the "),
                                sn.text(obj.array ? (obj.arrayCount > 1 ? obj.arrayCount + "-" : "") + "array of " : ""),
                                tdt,
                                sn.text(obj.nullable ? " (nullable)" : ""),
                                sn.text(" type.")];
                    }
                    return sn.element("div", { "class": "idlTypedefDesc" }, null, cnt);
                }
                else if (obj.type == "implements") {
                    var cnt;
                    if (obj.description && obj.description.text()) cnt = [obj.description];
                    else {
                        cnt = [ sn.text("All instances of the "),
                                sn.element("code", {}, null, [sn.element("a", {}, null, obj.id)]),
                                sn.text(" type are defined to also implement the "),
                                sn.element("a", {}, null, obj.datatype),
                                sn.text(" interface.")];
                        cnt = [sn.element("p", {}, null, cnt)];
                    }
                    return sn.element("div", { "class": "idlImplementsDesc" }, null, cnt);
                }

                else if (obj.type == "exception") {
                    var df = sn.documentFragment();
                    var curLnk = "widl-" + obj.refId + "-";
                    var types = ["field", "constant"];
                    var filterFunc = function (it) { return it.type === type; }
                    ,   sortFunc = function (a, b) {
                            if (a.id < b.id) return -1;
                            if (a.id > b.id) return 1;
                            return 0;
                    }
                    ;
                    for (var i = 0; i < types.length; i++) {
                        var type = types[i];
                        var things = obj.children.filter(filterFunc);
                        if (things.length === 0) continue;
                        if (!this.noIDLSorting) {
                            things.sort(sortFunc);
                        }

                        var sec = sn.element("section", {}, df);
                        var secTitle = type;
                        secTitle = secTitle.substr(0, 1).toUpperCase() + secTitle.substr(1) + "s";
                        sn.element("h2", {}, sec, secTitle);
                        var dl = sn.element("dl", { "class": type + "s" }, sec);
                        for (var j = 0; j < things.length; j++) {
                            var it = things[j];
                            var dt = sn.element("dt", { id: curLnk + it.refId }, dl);
                            sn.element("code", {}, dt, it.id);
                            var desc = sn.element("dd", {}, dl, [it.description]);
                            if (type == "field") {
                                sn.text(" of type ", dt);
                                if (it.array) {
                                    for (var k = 0, n = it.arrayCount; k < n; k++) sn.text("array of ", dt);
                                }
                                var span = sn.element("span", { "class": "idlFieldType" }, dt);
                                var matched = /^sequence<(.+)>$/.exec(it.datatype);
                                if (matched) {
                                    sn.text("sequence<", span);
                                    sn.element("a", {}, span, matched[1]);
                                    sn.text(">", span);
                                }
                                else {
                                    sn.element("a", {}, span, it.datatype);
                                }
                                if (it.nullable) sn.text(", nullable", dt);
                            }
                            else if (type == "constant") {
                                sn.text(" of type ", dt);
                                sn.element("span", { "class": "idlConstType" }, dt, [sn.element("a", {}, null, it.datatype)]);
                                if (it.nullable) sn.text(", nullable", dt);
                            }
                        }
                    }
                    return df;
                }

                else if (obj.type == "dictionary") {
                    var df = sn.documentFragment();
                    var curLnk = "widl-" + obj.refId + "-";
                    var things = obj.children;
                    var cnt;
                    if (things.length === 0) return df;
                    if (!this.noIDLSorting) {
                        things.sort(function (a, b) {
                            if (a.id < b.id) return -1;
                            if (a.id > b.id) return 1;
                              return 0;
                        });
                    }

                    var sec = sn.element("section", {}, df);
                    cnt = [sn.text("Dictionary "),
                           sn.element("a", { "class": "idlType" }, null, obj.id),
                           sn.text(" Members")];
                    sn.element("h2", {}, sec, cnt);
                    var dl = sn.element("dl", { "class": "dictionary-members" }, sec);
                    for (var j = 0; j < things.length; j++) {
                        var it = things[j];
                        var dt = sn.element("dt", { id: curLnk + it.refId }, dl);
                        sn.element("code", {}, dt, it.id);
                        var desc = sn.element("dd", {}, dl, [it.description]);
                        sn.text(" of type ", dt);
                        if (it.array) {
                            for (var i = 0, n = it.arrayCount; i < n; i++) sn.text("array of ", dt);
                        }
                        var span = sn.element("span", { "class": "idlMemberType" }, dt);
                        var matched = /^sequence<(.+)>$/.exec(it.datatype);
                        if (matched) {
                            sn.text("sequence<", span);
                            sn.element("a", {}, span, matched[1]);
                            sn.text(">", span);
                        }
                        else {
                            sn.element("a", {}, span, it.datatype);
                        }
                        if (it.nullable) sn.text(", nullable", dt);
                        if (it.defaultValue) {
                            sn.text(", defaulting to ", dt);
                            sn.element("code", {}, dt, [sn.text(it.defaultValue)]);
                        }
                    }
                    return df;
                }

                else if (obj.type == "callback") {
                    var df = sn.documentFragment();
                    var curLnk = "widl-" + obj.refId + "-";
                    var things = obj.children;
                    var cnt;
                    if (things.length === 0) return df;

                    var sec = sn.element("section", {}, df);
                    cnt = [sn.text("Callback "),
                           sn.element("a", { "class": "idlType" }, null, obj.id),
                           sn.text(" Parameters")];
                    sn.element("h2", {}, sec, cnt);
                    var dl = sn.element("dl", { "class": "callback-members" }, sec);
                    for (var j = 0; j < things.length; j++) {
                        var it = things[j];
                        var dt = sn.element("dt", { id: curLnk + it.refId }, dl);
                        sn.element("code", {}, dt, it.id);
                        var desc = sn.element("dd", {}, dl, [it.description]);
                        sn.text(" of type ", dt);
                        if (it.array) {
                            for (var i = 0, n = it.arrayCount; i < n; i++) sn.text("array of ", dt);
                        }
                        var span = sn.element("span", { "class": "idlMemberType" }, dt);
                        var matched = /^sequence<(.+)>$/.exec(it.datatype);
                        if (matched) {
                            sn.text("sequence<", span);
                            sn.element("a", {}, span, matched[1]);
                            sn.text(">", span);
                        }
                        else {
                            sn.element("a", {}, span, it.datatype);
                        }
                        if (it.nullable) sn.text(", nullable", dt);
                        if (it.defaultValue) {
                            sn.text(", defaulting to ", dt);
                            sn.element("code", {}, dt, [sn.text(it.defaultValue)]);
                        }
                    }
                    return df;
                }

                else if (obj.type == "enum") {
                    var df = sn.documentFragment();
                    var curLnk = "widl-" + obj.refId + "-";
                    var things = obj.children;
                    if (things.length === 0) return df;

                    var sec = sn.element("table", { "class": "simple" }, df);
                    sn.element("tr", {}, sec, [sn.element("th", { colspan: 2 }, null, [sn.text("Enumeration description")])]);
                    for (var j = 0; j < things.length; j++) {
                        var it = things[j];
                        var tr = sn.element("tr", {}, sec)
                        ,   td1 = sn.element("td", {}, tr)
                        ;
                        sn.element("code", {}, td1, it.id);
                        sn.element("td", {}, tr, [it.description]);
                    }
                    return df;
                }

                else if (obj.type == "interface") {
                    var df = sn.documentFragment();
                    var curLnk = "widl-" + obj.refId + "-";
                    var types = ["attribute", "method", "constant"];
                    var filterFunc = function (it) { return it.type == type; }
                    ,   sortFunc = function (a, b) {
                            if (a.id < b.id) return -1;
                            if (a.id > b.id) return 1;
                            return 0;
                        }
                    ;
                    for (var i = 0; i < types.length; i++) {
                        var type = types[i];
                        var things = obj.children.filter(filterFunc);
                        if (things.length === 0) continue;
                        if (!this.noIDLSorting) {
                            things.sort(sortFunc);
                        }

                        var sec = sn.element("section", {}, df);
                        var secTitle = type;
                        secTitle = secTitle.substr(0, 1).toUpperCase() + secTitle.substr(1) + "s";
                        sn.element("h2", {}, sec, secTitle);
                        var dl = sn.element("dl", { "class": type + "s" }, sec);
                        for (var j = 0; j < things.length; j++) {
                            var it = things[j];
                            var id = (type == "method") ? this.makeMethodID(curLnk, it) : sn.idThatDoesNotExist(curLnk + it.refId);
                            var dt = sn.element("dt", { id: id }, dl);
                            sn.element("code", {}, dt, it.id);
                            var desc = sn.element("dd", {}, dl, [it.description]);
                            if (type == "method") {
                                if (it.params.length) {
                                    var table = sn.element("table", { "class": "parameters" }, desc);
                                    var tr = sn.element("tr", {}, table);
                                    ["Parameter", "Type", "Nullable", "Optional", "Description"].forEach(function (tit) { sn.element("th", {}, tr, tit); });
                                    for (var k = 0; k < it.params.length; k++) {
                                        var prm = it.params[k];
                                        var tr = sn.element("tr", {}, table);
                                        sn.element("td", { "class": "prmName" }, tr, prm.id);
                                        var tyTD = sn.element("td", { "class": "prmType" }, tr);
                                        var matched = /^sequence<(.+)>$/.exec(prm.datatype);
                                        if (matched) {
                                            sn.element("code", {}, tyTD, [  sn.text("sequence<"),
                                                                            sn.element("a", {}, null, matched[1]),
                                                                            sn.text(">")]);
                                        }
                                        else {
                                            var cnt = [sn.element("a", {}, null, prm.datatype)];
                                            if (prm.array) cnt.push(arrsq(prm));
                                            sn.element("code", {}, tyTD, cnt);
                                        }
                                        if (prm.nullable) sn.element("td", { "class": "prmNullTrue" }, tr, "\u2714");
                                        else              sn.element("td", { "class": "prmNullFalse" }, tr, "\u2718");
                                        if (prm.optional) sn.element("td", { "class": "prmOptTrue" }, tr, "\u2714");
                                        else              sn.element("td", { "class": "prmOptFalse" }, tr, "\u2718");
                                        var cnt = prm.description ? [prm.description] : "";
                                        sn.element("td", { "class": "prmDesc" }, tr, cnt);
                                    }
                                }
                                else {
                                    sn.element("div", {}, desc, [sn.element("em", {}, null, "No parameters.")]);
                                }
                                var reDiv = sn.element("div", {}, desc);
                                sn.element("em", {}, reDiv, "Return type: ");
                                var matched = /^sequence<(.+)>$/.exec(it.datatype);
                                if (matched) {
                                    sn.element("code", {}, reDiv, [ sn.text("sequence<"),
                                                                    sn.element("a", {}, null, matched[1]),
                                                                    sn.text(">")]);
                                }
                                else {
                                    var cnt = [sn.element("a", {}, null, it.datatype)];
                                    if (it.array) cnt.push(arrsq(it));
                                    sn.element("code", {}, reDiv, cnt);
                                }
                                if (it.nullable) sn.text(", nullable", reDiv);
                            }
                            else if (type == "attribute") {
                                sn.text(" of type ", dt);
                                if (it.array) {
                                    for (var i = 0, n = it.arrayCount; i < n; i++) sn.text("array of ", dt);
                                }
                                var span = sn.element("span", { "class": "idlAttrType" }, dt);
                                var matched = /^sequence<(.+)>$/.exec(it.datatype);
                                if (matched) {
                                    sn.text("sequence<", span);
                                    sn.element("a", {}, span, matched[1]);
                                    sn.text(">", span);
                                }
                                else {
                                    sn.element("a", {}, span, it.datatype);
                                }
                                if (it.readonly) sn.text(", readonly", dt);
                                if (it.nullable) sn.text(", nullable", dt);
                            }
                            else if (type == "constant") {
                                sn.text(" of type ", dt);
                                sn.element("span", { "class": "idlConstType" }, dt, [sn.element("a", {}, null, it.datatype)]);
                                if (it.nullable) sn.text(", nullable", dt);
                            }
                        }
                    }
                    if (typeof obj.merge !== "undefined" && obj.merge.length > 0) {
                        // hackish: delay the execution until the DOM has been initialized, then merge
                        setTimeout(function () {
                            for (var i = 0; i < obj.merge.length; i++) {
                                var idlInterface = document.querySelector("#idl-def-" + obj.refId),
                                    idlDictionary = document.querySelector("#idl-def-" + obj.merge[i]);
                                idlDictionary.parentNode.parentNode.removeChild(idlDictionary.parentNode);
                                idlInterface.appendChild(document.createElement("br"));
                                idlInterface.appendChild(idlDictionary);
                            }
                        }, 0);
                    }
                    return df;
                }
            }