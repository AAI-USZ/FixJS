function ast_squeeze(ast, options) {
        options = defaults(options, {
                make_seqs   : true,
                dead_code   : true,
                no_warnings : false,
                keep_comps  : true
        });

        var w = ast_walker(), walk = w.walk;

        function negate(c) {
                var not_c = [ "unary-prefix", "!", c ];
                switch (c[0]) {
                    case "unary-prefix":
                        return c[1] == "!" && boolean_expr(c[2]) ? c[2] : not_c;
                    case "seq":
                        c = slice(c);
                        c[c.length - 1] = negate(c[c.length - 1]);
                        return c;
                    case "conditional":
                        return best_of(not_c, [ "conditional", c[1], negate(c[2]), negate(c[3]) ]);
                    case "binary":
                        var op = c[1], left = c[2], right = c[3];
                        if (!options.keep_comps) switch (op) {
                            case "<="  : return [ "binary", ">", left, right ];
                            case "<"   : return [ "binary", ">=", left, right ];
                            case ">="  : return [ "binary", "<", left, right ];
                            case ">"   : return [ "binary", "<=", left, right ];
                        }
                        switch (op) {
                            case "=="  : return [ "binary", "!=", left, right ];
                            case "!="  : return [ "binary", "==", left, right ];
                            case "===" : return [ "binary", "!==", left, right ];
                            case "!==" : return [ "binary", "===", left, right ];
                            case "&&"  : return best_of(not_c, [ "binary", "||", negate(left), negate(right) ]);
                            case "||"  : return best_of(not_c, [ "binary", "&&", negate(left), negate(right) ]);
                        }
                        break;
                }
                return not_c;
        };

        function make_conditional(c, t, e) {
                var make_real_conditional = function() {
                        if (c[0] == "unary-prefix" && c[1] == "!") {
                                return e ? [ "conditional", c[2], e, t ] : [ "binary", "||", c[2], t ];
                        } else {
                                return e ? best_of(
                                        [ "conditional", c, t, e ],
                                        [ "conditional", negate(c), e, t ]
                                ) : [ "binary", "&&", c, t ];
                        }
                };
                // shortcut the conditional if the expression has a constant value
                return when_constant(c, function(ast, val){
                        warn_unreachable(val ? e : t);
                        return          (val ? t : e);
                }, make_real_conditional);
        };

        function rmblock(block) {
                if (block != null && block[0] == "block" && block[1]) {
                        if (block[1].length == 1)
                                block = block[1][0];
                        else if (block[1].length == 0)
                                block = [ "block" ];
                }
                return block;
        };

        function _lambda(name, args, body) {
                return [ this[0], name, args, tighten(body, "lambda") ];
        };

        // this function does a few things:
        // 1. discard useless blocks
        // 2. join consecutive var declarations
        // 3. remove obviously dead code
        // 4. transform consecutive statements using the comma operator
        // 5. if block_type == "lambda" and it detects constructs like if(foo) return ... - rewrite like if (!foo) { ... }
        function tighten(statements, block_type) {
                statements = MAP(statements, walk);

                statements = statements.reduce(function(a, stat){
                        if (stat[0] == "block") {
                                if (stat[1]) {
                                        a.push.apply(a, stat[1]);
                                }
                        } else {
                                a.push(stat);
                        }
                        return a;
                }, []);

                statements = (function(a, prev){
                        statements.forEach(function(cur){
                                if (prev && ((cur[0] == "var" && prev[0] == "var") ||
                                             (cur[0] == "const" && prev[0] == "const"))) {
                                        prev[1] = prev[1].concat(cur[1]);
                                } else {
                                        a.push(cur);
                                        prev = cur;
                                }
                        });
                        return a;
                })([]);

                if (options.dead_code) statements = (function(a, has_quit){
                        statements.forEach(function(st){
                                if (has_quit) {
                                        if (st[0] == "function" || st[0] == "defun") {
                                                a.push(st);
                                        }
                                        else if (st[0] == "var" || st[0] == "const") {
                                                if (!options.no_warnings)
                                                        warn("Variables declared in unreachable code");
                                                st[1] = MAP(st[1], function(def){
                                                        if (def[1] && !options.no_warnings)
                                                                warn_unreachable([ "assign", true, [ "name", def[0] ], def[1] ]);
                                                        return [ def[0] ];
                                                });
                                                a.push(st);
                                        }
                                        else if (!options.no_warnings)
                                                warn_unreachable(st);
                                }
                                else {
                                        a.push(st);
                                        if (member(st[0], [ "return", "throw", "break", "continue" ]))
                                                has_quit = true;
                                }
                        });
                        return a;
                })([]);

                if (options.make_seqs) statements = (function(a, prev) {
                        statements.forEach(function(cur){
                                if (prev && prev[0] == "stat" && cur[0] == "stat") {
                                        prev[1] = [ "seq", prev[1], cur[1] ];
                                } else {
                                        a.push(cur);
                                        prev = cur;
                                }
                        });
                        if (a.length >= 2
                            && a[a.length-2][0] == "stat"
                            && (a[a.length-1][0] == "return" || a[a.length-1][0] == "throw")
                            && a[a.length-1][1])
                        {
                                a.splice(a.length - 2, 2,
                                         [ a[a.length-1][0],
                                           [ "seq", a[a.length-2][1], a[a.length-1][1] ]]);
                        }
                        return a;
                })([]);

                // this increases jQuery by 1K.  Probably not such a good idea after all..
                // part of this is done in prepare_ifs anyway.
                // if (block_type == "lambda") statements = (function(i, a, stat){
                //         while (i < statements.length) {
                //                 stat = statements[i++];
                //                 if (stat[0] == "if" && !stat[3]) {
                //                         if (stat[2][0] == "return" && stat[2][1] == null) {
                //                                 a.push(make_if(negate(stat[1]), [ "block", statements.slice(i) ]));
                //                                 break;
                //                         }
                //                         var last = last_stat(stat[2]);
                //                         if (last[0] == "return" && last[1] == null) {
                //                                 a.push(make_if(stat[1], [ "block", stat[2][1].slice(0, -1) ], [ "block", statements.slice(i) ]));
                //                                 break;
                //                         }
                //                 }
                //                 a.push(stat);
                //         }
                //         return a;
                // })(0, []);

                return statements;
        };

        function make_if(c, t, e) {
                return when_constant(c, function(ast, val){
                        if (val) {
                                t = walk(t);
                                warn_unreachable(e);
                                return t || [ "block" ];
                        } else {
                                e = walk(e);
                                warn_unreachable(t);
                                return e || [ "block" ];
                        }
                }, function() {
                        return make_real_if(c, t, e);
                });
        };

        function abort_else(c, t, e) {
                var ret = [ [ "if", negate(c), e ] ];
                if (t[0] == "block") {
                        if (t[1]) ret = ret.concat(t[1]);
                } else {
                        ret.push(t);
                }
                return walk([ "block", ret ]);
        };

        function make_real_if(c, t, e) {
                c = walk(c);
                t = walk(t);
                e = walk(e);

                if (empty(t)) {
                        c = negate(c);
                        t = e;
                        e = null;
                } else if (empty(e)) {
                        e = null;
                } else {
                        // if we have both else and then, maybe it makes sense to switch them?
                        (function(){
                                var a = gen_code(c);
                                var n = negate(c);
                                var b = gen_code(n);
                                if (b.length < a.length) {
                                        var tmp = t;
                                        t = e;
                                        e = tmp;
                                        c = n;
                                }
                        })();
                }
                if (empty(e) && empty(t))
                        return [ "stat", c ];
                var ret = [ "if", c, t, e ];
                if (t[0] == "if" && empty(t[3]) && empty(e)) {
                        ret = best_of(ret, walk([ "if", [ "binary", "&&", c, t[1] ], t[2] ]));
                }
                else if (t[0] == "stat") {
                        if (e) {
                                if (e[0] == "stat")
                                        ret = best_of(ret, [ "stat", make_conditional(c, t[1], e[1]) ]);
                                else if (aborts(e))
                                        ret = abort_else(c, t, e);
                        }
                        else {
                                ret = best_of(ret, [ "stat", make_conditional(c, t[1]) ]);
                        }
                }
                else if (e && t[0] == e[0] && (t[0] == "return" || t[0] == "throw") && t[1] && e[1]) {
                        ret = best_of(ret, [ t[0], make_conditional(c, t[1], e[1] ) ]);
                }
                else if (e && aborts(t)) {
                        ret = [ [ "if", c, t ] ];
                        if (e[0] == "block") {
                                if (e[1]) ret = ret.concat(e[1]);
                        }
                        else {
                                ret.push(e);
                        }
                        ret = walk([ "block", ret ]);
                }
                else if (t && aborts(e)) {
                        ret = abort_else(c, t, e);
                }
                return ret;
        };

        function _do_while(cond, body) {
                return when_constant(cond, function(cond, val){
                        if (!val) {
                                warn_unreachable(body);
                                return [ "block" ];
                        } else {
                                return [ "for", null, null, null, walk(body) ];
                        }
                });
        };

        return w.with_walkers({
                "sub": function(expr, subscript) {
                        if (subscript[0] == "string") {
                                var name = subscript[1];
                                if (is_identifier(name))
                                        return [ "dot", walk(expr), name ];
                                else if (/^[1-9][0-9]*$/.test(name) || name === "0")
                                        return [ "sub", walk(expr), [ "num", parseInt(name, 10) ] ];
                        }
                },
                "if": make_if,
                "toplevel": function(body) {
                        return [ "toplevel", tighten(body) ];
                },
                "switch": function(expr, body) {
                        var last = body.length - 1;
                        return [ "switch", walk(expr), MAP(body, function(branch, i){
                                var block = tighten(branch[1]);
                                if (i == last && block.length > 0) {
                                        var node = block[block.length - 1];
                                        if (node[0] == "break" && !node[1])
                                                block.pop();
                                }
                                return [ branch[0] ? walk(branch[0]) : null, block ];
                        }) ];
                },
                "function": _lambda,
                "defun": _lambda,
                "block": function(body) {
                        if (body) return rmblock([ "block", tighten(body) ]);
                },
                "binary": function(op, left, right) {
                        return when_constant([ "binary", op, walk(left), walk(right) ], function yes(c){
                                return best_of(walk(c), this);
                        }, function no() {
                                return function(){
                                        if(op != "==" && op != "!=") return;
                                        var l = walk(left), r = walk(right);
                                        if(l && l[0] == "unary-prefix" && l[1] == "!" && l[2][0] == "num")
                                                left = ['num', +!l[2][1]];
                                        else if (r && r[0] == "unary-prefix" && r[1] == "!" && r[2][0] == "num")
                                                right = ['num', +!r[2][1]];
                                        return ["binary", op, left, right];
                                }() || this;
                        });
                },
                "conditional": function(c, t, e) {
                        return make_conditional(walk(c), walk(t), walk(e));
                },
                "try": function(t, c, f) {
                        return [
                                "try",
                                tighten(t),
                                c != null ? [ c[0], tighten(c[1]) ] : null,
                                f != null ? tighten(f) : null
                        ];
                },
                "unary-prefix": function(op, expr) {
                        expr = walk(expr);
                        var ret = [ "unary-prefix", op, expr ];
                        if (op == "!")
                                ret = best_of(ret, negate(expr));
                        return when_constant(ret, function(ast, val){
                                return walk(ast); // it's either true or false, so minifies to !0 or !1
                        }, function() { return ret });
                },
                "name": function(name) {
                        switch (name) {
                            case "true": return [ "unary-prefix", "!", [ "num", 0 ]];
                            case "false": return [ "unary-prefix", "!", [ "num", 1 ]];
                        }
                },
                "while": _do_while,
                "assign": function(op, lvalue, rvalue) {
                        lvalue = walk(lvalue);
                        rvalue = walk(rvalue);
                        var okOps = [ '+', '-', '/', '*', '%', '>>', '<<', '>>>', '|', '^', '&' ];
                        if (op === true && lvalue[0] === "name" && rvalue[0] === "binary" &&
                            ~okOps.indexOf(rvalue[1]) && rvalue[2][0] === "name" &&
                            rvalue[2][1] === lvalue[1]) {
                                return [ this[0], rvalue[1], lvalue, rvalue[3] ]
                        }
                        return [ this[0], op, lvalue, rvalue ];
                }
        }, function() {
                for (var i = 0; i < 2; ++i) {
                        ast = prepare_ifs(ast);
                        ast = walk(ast);
                }
                return ast;
        });
}