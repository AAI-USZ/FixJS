function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

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
}