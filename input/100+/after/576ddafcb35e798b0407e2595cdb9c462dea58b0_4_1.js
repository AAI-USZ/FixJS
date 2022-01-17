function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:
      $$[$0-1].unshift(new C.Raw("var eval = " + sym("__oppo_eval__").compile()));
      var lambda = new C.Lambda({body: $$[$0-1]}, yy);
      //return new C.List([lambda], yy);
      return lambda;
    
break;
case 2: return new C.Null(yy); 
break;
case 3: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 4: this.$ = [$$[$0]]; 
break;
case 12: this.$ = new C.List($$[$0-1], yy); 
break;
case 13: this.$ = call_by_name("array", $$[$0-1], yy); 
break;
case 14: this.$ = call_by_name("array", [], yy); 
break;
case 15: this.$ = new C.Object($$[$0-1], yy); 
break;
case 16: this.$ = new C.Object([], yy); 
break;
case 17: this.$ = [$$[$0]]; 
break;
case 18: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 19: this.$ = [$$[$0-1], $$[$0]]; 
break;
case 21: this.$ = $$[$0-2]; this.$.push(new C.Rest($$[$0], yy)); 
break;
case 22: this.$ = [new C.Rest($$[$01], yy)]; 
break;
case 23: this.$ = [$$[$0]]; 
break;
case 24: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 26: this.$ = call_by_name("quote", [$$[$0]]); 
break;
case 27: this.$ = call_by_name("quasiquote", [$$[$0]]); 
break;
case 28: this.$ = call_by_name("unquote", [$$[$0]]); 
break;
case 29: this.$ = call_by_name("unquote-splicing", [$$[$0]]); 
break;
case 30: this.$ = call_by_name("lambda", [$$[$0-1]]); 
break;
case 35: this.$ = new C.Null(yy); 
break;
case 36: this.$ = new C.True(yy); 
break;
case 37: this.$ = new C.False(yy); 
break;
case 38: this.$ = call_by_name("regex", [new C.String($$[$0-1], yy), new C.String($$[$0].substr(1), yy)], yy); 
break;
case 39: this.$ = new C.Number($$[$0], yy); 
break;
case 40: this.$ = new C.Number($$[$0], yy); 
break;
case 41:
      var basenum = $$[$0].split('#');
      this.$ = new C.Number({value: basenum[1], base: basenum[0]}, yy);
    
break;
case 42: this.$ = new C.String($$[$0], yy); 
break;
case 44: this.$ = call_by_name("keyword", [$$[$0]], yy); 
break;
case 45:
      if (/^nil$/i.test($$[$0]))
        this.$ = new C.Null(yy);
      else if (/^true$/i.test($$[$0]))
        this.$ = new C.True(yy);
      else if (/^false$/i.test($$[$0]))
        this.$ = new C.False(yy);
      else
        this.$ = new C.Symbol($$[$0], yy);
    
break;
}
}