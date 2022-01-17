function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = ["TOFFEE_ZONE", $$[$0-1]]; return this.$;
break;
case 2: this.$ = [$$[$0]]; 
break;
case 3: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2],$$[$0-1]); 
break;
case 4: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-1]); 
break;
case 5: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); 
break;
case 6: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-1]); 
break;
case 7: this.$ = []; 
break;
case 9: this.$ = ["COFFEE_ZONE", $$[$0-1]]; 
break;
case 10: this.$ = [$$[$0]]; 
break;
case 11: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2],$$[$0-1]); 
break;
case 12: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-1]); 
break;
case 13: this.$ = []; 
break;
case 14: this.$ = ["TOFFEE_ZONE", $$[$0-1]]; 
break;
case 15: this.$ = ["INDENTED_TOFFEE_ZONE", $$[$0-1]]; 
break;
case 16: this.$ = ["TOFFEE", $$[$0][0], $$[$0][1] ]; 
break;
case 17: this.$ = ["COFFEE", $$[$0][0], $$[$0][1] ]; 
break;
case 18: var ln = yylineno + 1 - $$[$0].split("\n").length + 1; 
                                           this.$ = [$$[$0], ln]; 
                                         
break;
case 19: var c = $$[$0-1][0] + $$[$0]; 
                                           var ln = yylineno + 1 - c.split("\n").length + 1; 
                                           this.$ = [c, ln]; 
                                         
break;
}
}