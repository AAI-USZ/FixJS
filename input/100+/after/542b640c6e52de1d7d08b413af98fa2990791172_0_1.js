function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = {rules: $$[$0-1]};
          if ($$[$0-3][0]) this.$.macros = $$[$0-3][0];
          if ($$[$0-3][1]) this.$.startConditions = $$[$0-3][1];
          if ($$[$0]) this.$.moduleInclude = $$[$0];
          if (yy.options) this.$.options = yy.options;
          if (yy.actionInclude) this.$.actionInclude = yy.actionInclude;
          delete yy.options;
          delete yy.actionInclude;
          return this.$; 
break;
case 2: this.$ = null; 
break;
case 3: this.$ = null; 
break;
case 4: this.$ = $$[$0-1]; 
break;
case 5:
          this.$ = $$[$0];
          if ('length' in $$[$0-1]) {
            this.$[0] = this.$[0] || {};
            this.$[0][$$[$0-1][0]] = $$[$0-1][1];
          } else {
            this.$[1] = this.$[1] || {};
            for (var name in $$[$0-1]) {
              this.$[1][name] = $$[$0-1][name];
            }
          }
        
break;
case 6: yy.actionInclude += $$[$0-1]; this.$ = $$[$0]; 
break;
case 7: yy.actionInclude = ''; this.$ = [null,null]; 
break;
case 8: this.$ = [$$[$0-1], $$[$0]]; 
break;
case 9: this.$ = $$[$0]; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = {}; this.$[$$[$0]] = 0; 
break;
case 12: this.$ = $$[$0-1]; this.$[$$[$0]] = 0; 
break;
case 13: this.$ = {}; this.$[$$[$0]] = 1; 
break;
case 14: this.$ = $$[$0-1]; this.$[$$[$0]] = 1; 
break;
case 15: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 16: this.$ = [$$[$0]]; 
break;
case 17: this.$ = $$[$0-2] ? [$$[$0-2], $$[$0-1], $$[$0]] : [$$[$0-1],$$[$0]]; 
break;
case 18:this.$ = $$[$0-1];
break;
case 19:this.$ = $$[$0];
break;
case 20:this.$ = '';
break;
case 21:this.$ = yytext;
break;
case 22:this.$ = $$[$0-4]+$$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0];
break;
case 23:this.$ = $$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0];
break;
case 24: this.$ = $$[$0-1]; 
break;
case 25: this.$ = ['*']; 
break;
case 27: this.$ = [$$[$0]]; 
break;
case 28: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 29: this.$ = $$[$0];
          if (!(yy.options && yy.options.flex) && this.$.match(/[\w\d]$/) && !this.$.match(/\\(b|c[A-Z]|x[0-9A-F]{2}|u[a-fA-F0-9]{4}|[0-7]{1,3})$/))
              this.$ += "\\b";
        
break;
case 30: this.$ = $$[$0-2]+'|'+$$[$0]; 
break;
case 31: this.$ = $$[$0-1]+'|'; 
break;
case 33: this.$ = '' 
break;
case 34: this.$ = $$[$0-1]+$$[$0]; 
break;
case 36: this.$ = '('+$$[$0-1]+')'; 
break;
case 37: this.$ = $$[$0-2]+$$[$0-1]+')'; 
break;
case 38: this.$ = $$[$0-1]+'+'; 
break;
case 39: this.$ = $$[$0-1]+'*'; 
break;
case 40: this.$ = $$[$0-1]+'?'; 
break;
case 41: this.$ = '(?='+$$[$0]+')'; 
break;
case 42: this.$ = '(?!'+$$[$0]+')'; 
break;
case 44: this.$ = $$[$0-1]+$$[$0]; 
break;
case 46: this.$ = '.'; 
break;
case 47: this.$ = '^'; 
break;
case 48: this.$ = '$'; 
break;
case 52: this.$ = yytext; 
break;
case 53: this.$ = yytext; 
break;
case 54: this.$ = yytext; 
break;
case 55: this.$ = yy.prepareString(yytext.substr(1, yytext.length-2)); 
break;
}
}