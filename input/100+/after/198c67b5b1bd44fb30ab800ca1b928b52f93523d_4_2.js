function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"EOF":4,"program":5,"t":6,"NEWLINE":7,"line":8,"statement":9,"expression":10,"RETURN":11,"primary":12,"block":13,"if":14,"while":15,"for":16,"assign":17,"operation":18,"call":19,"function":20,"class":21,"LPAREN":22,"RPAREN":23,"IF":24,"THEN":25,"END":26,"ELSE":27,"WHILE":28,"DO":29,"FOR":30,"ident":31,"IN":32,"identifier":33,"ASSIGN":34,"COMP":35,"MATH":36,"LOGIC":37,"arguments":38,"DEF":39,"CLASS":40,"constant":41,"COMMA":42,"literal":43,"IDENT":44,"NUMBER":45,"STRING":46,"CONST":47,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",7:"NEWLINE",11:"RETURN",22:"LPAREN",23:"RPAREN",24:"IF",25:"THEN",26:"END",27:"ELSE",28:"WHILE",29:"DO",30:"FOR",31:"ident",32:"IN",34:"ASSIGN",35:"COMP",36:"MATH",37:"LOGIC",39:"DEF",40:"CLASS",42:"COMMA",44:"IDENT",45:"NUMBER",46:"STRING",47:"CONST"},
productions_: [0,[3,1],[3,2],[6,1],[5,1],[5,3],[5,2],[8,1],[8,1],[9,2],[13,3],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,3],[14,5],[14,7],[15,5],[16,7],[17,3],[18,3],[18,3],[18,3],[19,4],[20,7],[21,4],[38,0],[38,1],[38,3],[12,1],[12,1],[33,1],[43,1],[43,1],[41,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return [];
break;
case 2:return $$[$0-1];
break;
case 3:this.$ = $$[$0];
break;
case 4:this.$ = [$$[$0]];
break;
case 5:this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
break;
case 6:this.$ = $$[$0-1];
break;
case 7:this.$ = $$[$0];
break;
case 8:this.$ = $$[$0];
break;
case 9:this.$ = new yy.Return($$[$0]);
break;
case 10:this.$ = new yy.Block($$[$0-1]);
break;
case 11:this.$ = $$[$0];
break;
case 12:this.$ = $$[$0];
break;
case 13:this.$ = $$[$0];
break;
case 14:this.$ = $$[$0];
break;
case 15:this.$ = $$[$0];
break;
case 16:this.$ = $$[$0];
break;
case 17:this.$ = $$[$0];
break;
case 18:this.$ = $$[$0];
break;
case 19:this.$ = $$[$0];
break;
case 20:this.$ = $$[$0-1];
break;
case 21:this.$ = new yy.If($$[$0-3], $$[$0-1], null);
break;
case 22:this.$ = new yy.If($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 23:this.$ = new yy.While($$[$0-3], $$[$0-1]);
break;
case 24:this.$ = new yy.For($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 25:this.$ = new yy.Assign($$[$0-2], $$[$0]);
break;
case 26:this.$ = new yy.Operator($$[$0-1], $$[$0-2], $$[$0]);
break;
case 27:this.$ = new yy.Operator($$[$0-1], $$[$0-2], $$[$0]);
break;
case 28:this.$ = new yy.Operator($$[$0-1], $$[$0-2], $$[$0]);
break;
case 29:this.$ = new yy.Call($$[$0-3], null, $$[$0-1]);
break;
case 30:this.$ = new yy.Function($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 31:this.$ = new yy.Class($$[$0-2], $$[$0-1]);
break;
case 32:this.$ = [];
break;
case 33:this.$ = [$$[$0]];
break;
case 34:this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
break;
case 35:this.$ = $$[$0];
break;
case 36:this.$ = $$[$0];
break;
case 37:this.$ = new yy.Identifier($$[$0]);
break;
case 38:this.$ = new yy.Number($$[$0]);
break;
case 39:this.$ = new yy.String($$[$0]);
break;
case 40:this.$ = new yy.Const($$[$0])
break;
}
},
table: [{3:1,4:[1,2],5:3,8:4,9:5,10:6,11:[1,7],12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{1:[3]},{1:[2,1]},{4:[1,28],6:29,7:[1,30]},{4:[2,4],7:[2,4]},{4:[2,7],7:[2,7]},{4:[2,8],7:[2,8]},{12:31,33:32,43:24,44:[1,25],45:[1,26],46:[1,27]},{4:[2,11],7:[2,11],23:[2,11],25:[2,11],29:[2,11]},{4:[2,12],7:[2,12],23:[2,12],25:[2,12],29:[2,12]},{4:[2,13],7:[2,13],23:[2,13],25:[2,13],29:[2,13]},{4:[2,14],7:[2,14],23:[2,14],25:[2,14],29:[2,14]},{4:[2,15],7:[2,15],23:[2,15],25:[2,15],29:[2,15]},{4:[2,16],7:[2,16],23:[2,16],25:[2,16],29:[2,16]},{4:[2,17],7:[2,17],23:[2,17],25:[2,17],29:[2,17]},{4:[2,18],7:[2,18],23:[2,18],25:[2,18],29:[2,18]},{4:[2,19],7:[2,19],23:[2,19],25:[2,19],29:[2,19],35:[1,33],36:[1,34],37:[1,35]},{10:36,12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{10:37,12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{10:38,12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{31:[1,39]},{4:[2,35],7:[2,35],22:[1,41],23:[2,35],25:[2,35],29:[2,35],34:[1,40],35:[2,35],36:[2,35],37:[2,35]},{33:42,44:[1,25]},{41:43,47:[1,44]},{4:[2,36],7:[2,36],23:[2,36],25:[2,36],29:[2,36],35:[2,36],36:[2,36],37:[2,36],42:[2,36]},{4:[2,37],7:[2,37],22:[2,37],23:[2,37],25:[2,37],29:[2,37],34:[2,37],35:[2,37],36:[2,37],37:[2,37],42:[2,37]},{4:[2,38],7:[2,38],23:[2,38],25:[2,38],29:[2,38],35:[2,38],36:[2,38],37:[2,38],42:[2,38]},{4:[2,39],7:[2,39],23:[2,39],25:[2,39],29:[2,39],35:[2,39],36:[2,39],37:[2,39],42:[2,39]},{1:[2,2]},{4:[2,6],7:[2,6],8:45,9:5,10:6,11:[1,7],12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{4:[2,3],7:[2,3],11:[2,3],22:[2,3],24:[2,3],26:[2,3],27:[2,3],28:[2,3],30:[2,3],39:[2,3],40:[2,3],44:[2,3],45:[2,3],46:[2,3]},{4:[2,9],7:[2,9]},{4:[2,35],7:[2,35],23:[2,35],25:[2,35],29:[2,35],42:[2,35]},{12:46,33:32,43:24,44:[1,25],45:[1,26],46:[1,27]},{12:47,33:32,43:24,44:[1,25],45:[1,26],46:[1,27]},{12:48,33:32,43:24,44:[1,25],45:[1,26],46:[1,27]},{23:[1,49]},{25:[1,50]},{29:[1,51]},{32:[1,52]},{10:53,12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{12:55,23:[2,32],33:32,38:54,42:[2,32],43:24,44:[1,25],45:[1,26],46:[1,27]},{22:[1,56]},{6:58,7:[1,30],13:57},{7:[2,40]},{4:[2,5],7:[2,5]},{4:[2,26],7:[2,26],23:[2,26],25:[2,26],29:[2,26]},{4:[2,27],7:[2,27],23:[2,27],25:[2,27],29:[2,27]},{4:[2,28],7:[2,28],23:[2,28],25:[2,28],29:[2,28]},{4:[2,20],7:[2,20],23:[2,20],25:[2,20],29:[2,20]},{6:58,7:[1,30],13:59},{6:58,7:[1,30],13:60},{10:61,12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{4:[2,25],7:[2,25],23:[2,25],25:[2,25],29:[2,25]},{23:[1,62],42:[1,63]},{23:[2,33],42:[2,33]},{12:55,23:[2,32],33:32,38:64,42:[2,32],43:24,44:[1,25],45:[1,26],46:[1,27]},{26:[1,65]},{5:66,8:4,9:5,10:6,11:[1,7],12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{26:[1,67],27:[1,68]},{26:[1,69]},{29:[1,70]},{4:[2,29],7:[2,29],23:[2,29],25:[2,29],29:[2,29]},{12:71,33:32,43:24,44:[1,25],45:[1,26],46:[1,27]},{23:[1,72],42:[1,63]},{4:[2,31],7:[2,31],23:[2,31],25:[2,31],29:[2,31]},{6:73,7:[1,30]},{4:[2,21],7:[2,21],23:[2,21],25:[2,21],29:[2,21]},{6:58,7:[1,30],13:74},{4:[2,23],7:[2,23],23:[2,23],25:[2,23],29:[2,23]},{6:58,7:[1,30],13:75},{23:[2,34],42:[2,34]},{6:58,7:[1,30],13:76},{7:[2,6],8:45,9:5,10:6,11:[1,7],12:16,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:15,22:[1,17],24:[1,18],26:[2,10],27:[2,10],28:[1,19],30:[1,20],33:21,39:[1,22],40:[1,23],43:24,44:[1,25],45:[1,26],46:[1,27]},{26:[1,77]},{26:[1,78]},{26:[1,79]},{4:[2,22],7:[2,22],23:[2,22],25:[2,22],29:[2,22]},{4:[2,24],7:[2,24],23:[2,24],25:[2,24],29:[2,24]},{4:[2,30],7:[2,30],23:[2,30],25:[2,30],29:[2,30]}],
defaultActions: {2:[2,1],28:[2,2],44:[2,40]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                var errStr = "";
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
undefined
return parser;
}