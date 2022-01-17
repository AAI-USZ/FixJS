function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 12
break;
case 1:this.popState(); return 23
break;
case 2:return 25
break;
case 3:return 24
break;
case 4:/* */
break;
case 5:this.begin('indented')
break;
case 6:this.begin('code'); return 5
break;
case 7:return 50
break;
case 8:yy.options[yy_.yytext] = true
break;
case 9:this.begin('INITIAL')
break;
case 10:this.begin('INITIAL')
break;
case 11:/* empty */
break;
case 12:return 18
break;
case 13:this.begin('INITIAL')
break;
case 14:this.begin('INITIAL')
break;
case 15:/* empty */
break;
case 16:this.begin('rules')
break;
case 17:this.begin('trail'); yy_.yytext = yy_.yytext.substr(1, yy_.yytext.length-2);return 11
break;
case 18:this.begin('trail'); yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length-4);return 11
break;
case 19:yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length-4); return 11
break;
case 20:this.begin('rules'); return 11
break;
case 21:/* */
break;
case 22:/* */
break;
case 23:return 12
break;
case 24:yy_.yytext = yy_.yytext.replace(/\\"/g,'"');return 49
break;
case 25:yy_.yytext = yy_.yytext.replace(/\\'/g,"'");return 49
break;
case 26:return 27
break;
case 27:return 46
break;
case 28:return 32
break;
case 29:return 32
break;
case 30:return 32
break;
case 31:return 30
break;
case 32:return 31
break;
case 33:return 33
break;
case 34:return 24
break;
case 35:return 34
break;
case 36:return 41
break;
case 37:return 25
break;
case 38:return 42
break;
case 39:this.begin('conditions'); return 21
break;
case 40:return 36
break;
case 41:return 35
break;
case 42:return 47
break;
case 43:yy_.yytext = yy_.yytext.replace(/^\\/g,''); return 47
break;
case 44:return 42
break;
case 45:return 40
break;
case 46:yy.options = {}; this.begin('options')
break;
case 47:this.begin('start_condition');return 14
break;
case 48:this.begin('start_condition');return 16
break;
case 49:this.begin('rules'); return 5
break;
case 50:return 48
break;
case 51:return 45
break;
case 52:return '{'
break;
case 53:return '}'
break;
case 54:/* ignore bad characters */
break;
case 55:return 8
break;
case 56:return 9
break;
}
}