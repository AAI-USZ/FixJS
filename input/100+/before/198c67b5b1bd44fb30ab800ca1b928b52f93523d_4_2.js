function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"EOF":4,"program":5,"t":6,"NEWLINE":7,"line":8,"statement":9,"expression":10,"RETURN":11,"primary":12,"block":13,"if":14,"while":15,"for":16,"assign":17,"operation":18,"call":19,"function":20,"LPAREN":21,"RPAREN":22,"IF":23,"THEN":24,"END":25,"ELSE":26,"WHILE":27,"DO":28,"FOR":29,"ident":30,"IN":31,"identifier":32,"ASSIGN":33,"COMP":34,"MATH":35,"LOGIC":36,"arguments":37,"DEF":38,"COMMA":39,"literal":40,"IDENT":41,"NUMBER":42,"STRING":43,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",7:"NEWLINE",11:"RETURN",21:"LPAREN",22:"RPAREN",23:"IF",24:"THEN",25:"END",26:"ELSE",27:"WHILE",28:"DO",29:"FOR",30:"ident",31:"IN",33:"ASSIGN",34:"COMP",35:"MATH",36:"LOGIC",38:"DEF",39:"COMMA",41:"IDENT",42:"NUMBER",43:"STRING"},
productions_: [0,[3,1],[3,2],[6,1],[5,1],[5,3],[5,2],[8,1],[8,1],[9,2],[13,3],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,3],[14,5],[14,7],[15,5],[16,7],[17,3],[18,3],[18,3],[18,3],[19,4],[20,7],[37,0],[37,1],[37,3],[12,1],[12,1],[32,1],[40,1],[40,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return [];
break;
case 2:return $$[$0-1];
break;
case 3:this.$ = $$[$0]
break;
case 4:this.$ = [$$[$0]]
break;
case 5:this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 6:this.$ = $$[$0-1]
break;
case 7:this.$ = $$[$0]
break;
case 8:this.$ = $$[$0]
break;
case 9:this.$ = ['Return', $$[$0]]
break;
case 10:this.$ = ['Block', $$[$0-1]]
break;
case 11:this.$ = $$[$0];
break;
case 12:this.$ = $$[$0];
break;
case 13:this.$ = $$[$0];
break;
case 14:this.$ = $$[$0]
break;
case 15:this.$ = $$[$0]
break;
case 16:this.$ = $$[$0]
break;
case 17:this.$ = $$[$0]
break;
case 18:this.$ = $$[$0]
break;
case 19:this.$ = $$[$0-1]
break;
case 20:this.$ = ['If', $$[$0-3], $$[$0-1]]
break;
case 21:this.$ = ['If', $$[$0-5], $$[$0-3], $$[$0-1]]
break;
case 22:this.$ = ['While', $$[$0-3], $$[$0-1]]
break;
case 23:['For', $$[$0-5], $$[$0-3], $$[$0-1]]
break;
case 24:this.$ = ['Assign', $$[$0-2], $$[$0]]
break;
case 25:this.$ = ['Comp', $$[$0-1], $$[$0-2], $$[$0]]
break;
case 26:this.$ = ['Math', $$[$0-1], $$[$0-2], $$[$0]]
break;
case 27:this.$ = ['Logic', $$[$0-1], $$[$0-2], $$[$0]]
break;
case 28:this.$ = ['Call', $$[$0-3], $$[$0-1]]
break;
case 29:this.$ = ['Function', $$[$0-5], $$[$0-3], $$[$0-1]]
break;
case 30:this.$ = ['Arguments', []]
break;
case 31:this.$ = ['Arguments', [$$[$0]]]
break;
case 32:this.$ = $$[$0-2]; $$[$0-2][1].push($$[$0]);
break;
case 33:this.$ = $$[$0]
break;
case 34:this.$ = $$[$0]
break;
case 35:this.$ = ['Identifier', $$[$0]]
break;
case 36:this.$ = ['Number', $$[$0]]
break;
case 37:this.$ = ['String', $$[$0]]
break;
}
},
table: [{3:1,4:[1,2],5:3,8:4,9:5,10:6,11:[1,7],12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{1:[3]},{1:[2,1]},{4:[1,26],6:27,7:[1,28]},{4:[2,4],7:[2,4]},{4:[2,7],7:[2,7]},{4:[2,8],7:[2,8]},{12:29,32:30,40:22,41:[1,23],42:[1,24],43:[1,25]},{4:[2,11],7:[2,11],22:[2,11],24:[2,11],28:[2,11]},{4:[2,12],7:[2,12],22:[2,12],24:[2,12],28:[2,12]},{4:[2,13],7:[2,13],22:[2,13],24:[2,13],28:[2,13]},{4:[2,14],7:[2,14],22:[2,14],24:[2,14],28:[2,14]},{4:[2,15],7:[2,15],22:[2,15],24:[2,15],28:[2,15]},{4:[2,16],7:[2,16],22:[2,16],24:[2,16],28:[2,16]},{4:[2,17],7:[2,17],22:[2,17],24:[2,17],28:[2,17]},{4:[2,18],7:[2,18],22:[2,18],24:[2,18],28:[2,18],34:[1,31],35:[1,32],36:[1,33]},{10:34,12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{10:35,12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{10:36,12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{30:[1,37]},{4:[2,33],7:[2,33],21:[1,39],22:[2,33],24:[2,33],28:[2,33],33:[1,38],34:[2,33],35:[2,33],36:[2,33]},{32:40,41:[1,23]},{4:[2,34],7:[2,34],22:[2,34],24:[2,34],28:[2,34],34:[2,34],35:[2,34],36:[2,34],39:[2,34]},{4:[2,35],7:[2,35],21:[2,35],22:[2,35],24:[2,35],28:[2,35],33:[2,35],34:[2,35],35:[2,35],36:[2,35],39:[2,35]},{4:[2,36],7:[2,36],22:[2,36],24:[2,36],28:[2,36],34:[2,36],35:[2,36],36:[2,36],39:[2,36]},{4:[2,37],7:[2,37],22:[2,37],24:[2,37],28:[2,37],34:[2,37],35:[2,37],36:[2,37],39:[2,37]},{1:[2,2]},{4:[2,6],7:[2,6],8:41,9:5,10:6,11:[1,7],12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{4:[2,3],7:[2,3],11:[2,3],21:[2,3],23:[2,3],25:[2,3],26:[2,3],27:[2,3],29:[2,3],38:[2,3],41:[2,3],42:[2,3],43:[2,3]},{4:[2,9],7:[2,9]},{4:[2,33],7:[2,33],22:[2,33],24:[2,33],28:[2,33],39:[2,33]},{12:42,32:30,40:22,41:[1,23],42:[1,24],43:[1,25]},{12:43,32:30,40:22,41:[1,23],42:[1,24],43:[1,25]},{12:44,32:30,40:22,41:[1,23],42:[1,24],43:[1,25]},{22:[1,45]},{24:[1,46]},{28:[1,47]},{31:[1,48]},{10:49,12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{12:51,22:[2,30],32:30,37:50,39:[2,30],40:22,41:[1,23],42:[1,24],43:[1,25]},{21:[1,52]},{4:[2,5],7:[2,5]},{4:[2,25],7:[2,25],22:[2,25],24:[2,25],28:[2,25]},{4:[2,26],7:[2,26],22:[2,26],24:[2,26],28:[2,26]},{4:[2,27],7:[2,27],22:[2,27],24:[2,27],28:[2,27]},{4:[2,19],7:[2,19],22:[2,19],24:[2,19],28:[2,19]},{6:54,7:[1,28],13:53},{6:54,7:[1,28],13:55},{10:56,12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{4:[2,24],7:[2,24],22:[2,24],24:[2,24],28:[2,24]},{22:[1,57],39:[1,58]},{22:[2,31],39:[2,31]},{12:51,22:[2,30],32:30,37:59,39:[2,30],40:22,41:[1,23],42:[1,24],43:[1,25]},{25:[1,60],26:[1,61]},{5:62,8:4,9:5,10:6,11:[1,7],12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{25:[1,63]},{28:[1,64]},{4:[2,28],7:[2,28],22:[2,28],24:[2,28],28:[2,28]},{12:65,32:30,40:22,41:[1,23],42:[1,24],43:[1,25]},{22:[1,66],39:[1,58]},{4:[2,20],7:[2,20],22:[2,20],24:[2,20],28:[2,20]},{6:54,7:[1,28],13:67},{6:68,7:[1,28]},{4:[2,22],7:[2,22],22:[2,22],24:[2,22],28:[2,22]},{6:54,7:[1,28],13:69},{22:[2,32],39:[2,32]},{6:54,7:[1,28],13:70},{25:[1,71]},{7:[2,6],8:41,9:5,10:6,11:[1,7],12:15,14:8,15:9,16:10,17:11,18:12,19:13,20:14,21:[1,16],23:[1,17],25:[2,10],26:[2,10],27:[1,18],29:[1,19],32:20,38:[1,21],40:22,41:[1,23],42:[1,24],43:[1,25]},{25:[1,72]},{25:[1,73]},{4:[2,21],7:[2,21],22:[2,21],24:[2,21],28:[2,21]},{4:[2,23],7:[2,23],22:[2,23],24:[2,23],28:[2,23]},{4:[2,29],7:[2,29],22:[2,29],24:[2,29],28:[2,29]}],
defaultActions: {2:[2,1],26:[2,2]},
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