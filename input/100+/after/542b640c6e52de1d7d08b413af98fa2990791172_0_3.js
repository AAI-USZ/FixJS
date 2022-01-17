function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 25
break;
case 1:yy.depth++; return 22
break;
case 2:yy.depth == 0 ? this.begin('trail') : yy.depth--; return 24
break;
case 3:return 12
break;
case 4:this.popState(); return 28
break;
case 5:return 30
break;
case 6:return 29
break;
case 7:/* */
break;
case 8:this.begin('indented')
break;
case 9:this.begin('code'); return 5
break;
case 10:return 55
break;
case 11:yy.options[yy_.yytext] = true
break;
case 12:this.begin('INITIAL')
break;
case 13:this.begin('INITIAL')
break;
case 14:/* empty */
break;
case 15:return 18
break;
case 16:this.begin('INITIAL')
break;
case 17:this.begin('INITIAL')
break;
case 18:/* empty */
break;
case 19:this.begin('rules')
break;
case 20:yy.depth = 0; this.begin('action'); return 22
break;
case 21:this.begin('trail'); yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length-4);return 11
break;
case 22:yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length-4); return 11
break;
case 23:this.begin('rules'); return 11
break;
case 24:/* */
break;
case 25:/* */
break;
case 26:return 12
break;
case 27:yy_.yytext = yy_.yytext.replace(/\\"/g,'"');return 54
break;
case 28:yy_.yytext = yy_.yytext.replace(/\\'/g,"'");return 54
break;
case 29:return 32
break;
case 30:return 51
break;
case 31:return 37
break;
case 32:return 37
break;
case 33:return 37
break;
case 34:return 35
break;
case 35:return 36
break;
case 36:return 38
break;
case 37:return 29
break;
case 38:return 39
break;
case 39:return 46
break;
case 40:return 30
break;
case 41:return 47
break;
case 42:this.begin('conditions'); return 26
break;
case 43:return 41
break;
case 44:return 40
break;
case 45:return 52
break;
case 46:yy_.yytext = yy_.yytext.replace(/^\\/g,''); return 52
break;
case 47:return 47
break;
case 48:return 45
break;
case 49:yy.options = {}; this.begin('options')
break;
case 50:this.begin('start_condition');return 14
break;
case 51:this.begin('start_condition');return 16
break;
case 52:this.begin('rules'); return 5
break;
case 53:return 53
break;
case 54:return 50
break;
case 55:return 22
break;
case 56:return 24
break;
case 57:/* ignore bad characters */
break;
case 58:return 8
break;
case 59:return 9
break;
}
}