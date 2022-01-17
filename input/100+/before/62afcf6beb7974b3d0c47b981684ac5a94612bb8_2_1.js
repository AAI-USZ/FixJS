function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:
      var lambda = new C.Lambda({body: $$[$0-1]}, yy);
      return new C.List([lambda], yy);
    
break;
case 2: return new C.Null(yy); 
break;
case 3: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 4: this.$ = [$$[$0]]; 
break;
case 12: this.$ = new C.List($$[$0-1], yy); 
break;
case 13: this.$ = new C.Array($$[$0-1], yy); 
break;
case 14: this.$ = new C.Array([], yy); 
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
case 20: this.$ = [$$[$0]]; 
break;
case 21: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 23: this.$ = $$[$0]; this.$.quoted = true; 
break;
case 24: this.$ = $$[$0-1]; this.$.quasiquoted = true; 
break;
case 25: this.$ = $$[$0]; this.$.unquoted = true; 
break;
case 26: this.$ = $$[$0]; this.$.unquote_spliced = true; 
break;
case 27: this.$ = new C.Lambda({body: $$[$0-1], arity: Infinity}, yy); 
break;
case 32: this.$ = new C.Null(yy); 
break;
case 33: this.$ = new C.True(yy); 
break;
case 34: this.$ = new C.False(yy); 
break;
case 35: this.$ = new C.Regex({pattern: $$[$0-1], flags: $$[$0].substr(1)}, yy); 
break;
case 36: this.$ = new C.Number($$[$0], yy); 
break;
case 37: this.$ = new C.Number($$[$0], yy); 
break;
case 38:
      var basenum = $$[$0].split('#');
      this.$ = new C.Number({value: basenum[1], base: basenum[0]}, yy);
    
break;
case 39: this.$ = new C.String($$[$0], yy); 
break;
case 41: this.$ = new C.Keyword($$[$0].value, yy); 
break;
case 42:
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