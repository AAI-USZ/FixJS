function anonymous(yytext,yyleng,yylineno,yy,yystate,$$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:this.$ = yy.Chain(yy.L(yylineno, yy.Var($$[$0])));
break;
case 2:
case 3:this.$ = yy.Chain($$[$0]);
break;
case 4:
case 5:this.$ = yy.Chain(yy.L(yylineno, yy.Literal($$[$0])));
break;
case 6:
case 7:this.$ = $$[$0-2].add(yy.Index($$[$0], $$[$0-1], true));
break;
case 8:this.$ = $$[$0-4].add(yy.Call($$[$0-2]));
break;
case 9:this.$ = yy.Chain(yy.Existence($$[$0-1].unwrap()));
break;
case 10:this.$ = yy.Chain(yy.Call['let']($$[$0-3], $$[$0]));
break;
case 11:this.$ = yy.Chain(yy.Call.block(yy.Fun([], $$[$0]), [$$[$0-1]], '.call'));
break;
case 12:this.$ = yy.Chain($$[$0-1][0].makeComprehension($$[$0-2], $$[$0-1].slice(1)));
break;
case 13:this.$ = yy.Chain($$[$0-1][0].addObjComp().makeComprehension(yy.L(yylineno, yy.Arr($$[$0-4])), $$[$0-1].slice(1)));
break;
case 14:this.$ = yy.Chain(yy.Binary($$[$0-1]));
break;
case 15:this.$ = yy.Chain(yy.Binary($$[$0-2], void 8, $$[$0-1]));
break;
case 16:this.$ = yy.Chain(yy.Binary($$[$0-1], $$[$0-2]));
break;
case 17:this.$ = yy.Chain('!' === $$[$0-1].charAt(0)
        ? yy.Binary($$[$0-1].slice(1)).invertIt()
        : yy.Binary($$[$0-1]));
break;
case 18:this.$ = yy.Chain('!' === $$[$0-2].charAt(0)
        ? yy.Binary($$[$0-2].slice(1), void 8, $$[$0-1]).invertIt()
        : yy.Binary($$[$0-2], void 8, $$[$0-1]));
break;
case 19:this.$ = yy.Chain('!' === $$[$0-1].charAt(0)
        ? yy.Binary($$[$0-1].slice(1), $$[$0-2]).invertIt()
        : yy.Binary($$[$0-1], $$[$0-2]));
break;
case 20:this.$ = yy.Chain(yy.Binary($$[$0-1]));
break;
case 21:this.$ = yy.Chain(yy.Binary($$[$0-5], void 8, $$[$0-3]));
break;
case 22:this.$ = yy.Chain(yy.Binary($$[$0-1]));
break;
case 23:this.$ = yy.Chain(yy.Binary($$[$0-1], $$[$0-4]));
break;
case 24:
case 25:this.$ = yy.Chain(yy.Unary($$[$0-1]));
break;
case 26:this.$ = yy.Chain($$[$0-2]);
break;
case 27:this.$ = yy.Chain($$[$0-2].add(yy.Call([$$[$0-4]])));
break;
case 28:this.$ = yy.Chain(yy.Chain(yy.Var('__flip')).add(yy.Call([$$[$0-3]]))).flipIt().add(yy.Call([$$[$0-1]]));
break;
case 29:this.$ = yy.Chain(new yy.For({
        from: $$[$0-3],
        op: $$[$0-2],
        to: $$[$0-1]
      }));
break;
case 30:this.$ = yy.Chain(new yy.For({
        from: $$[$0-5],
        op: $$[$0-4],
        to: $$[$0-3],
        step: $$[$0-1]
      }));
break;
case 31:this.$ = yy.Chain(yy.Slice({
        type: $$[$0-2],
        target: $$[$0-6],
        from: $$[$0-3],
        to: $$[$0-1]
      }));
break;
case 32:this.$ = yy.Chain(yy.Slice({
        type: $$[$0-1],
        target: $$[$0-5],
        from: $$[$0-2]
      }));
break;
case 33:this.$ = yy.Chain(yy.Slice({
        type: $$[$0-2],
        target: $$[$0-5],
        to: $$[$0-1]
      }));
break;
case 34:this.$ = yy.Chain(yy.Slice({
        type: $$[$0-1],
        target: $$[$0-4]
      }));
break;
case 35:this.$ = yy.L(yylineno, yy.Arr($$[$0-2]));
break;
case 36:this.$ = yy.L(yylineno, yy.Obj($$[$0-2]));
break;
case 37:this.$ = yy.L(yylineno, yy.Arr($$[$0-3])).named($$[$0]);
break;
case 38:this.$ = yy.L(yylineno, yy.Obj($$[$0-3])).named($$[$0]);
break;
case 41:this.$ = yy.L(yylineno, yy.Key($$[$0]));
break;
case 42:this.$ = yy.L(yylineno, yy.Literal($$[$0]));
break;
case 43:this.$ = [];
break;
case 44:this.$ = [$$[$0]];
break;
case 45:this.$ = $$[$0-2].concat($$[$0]);
break;
case 46:this.$ = $$[$0-3].concat($$[$0]);
break;
case 47:this.$ = $$[$0-5].concat($$[$0-2]);
break;
case 49:this.$ = yy.Splat($$[$0]);
break;
case 50:this.$ = yy.Splat(yy.L(yylineno, yy.Arr()), true);
break;
case 53:this.$ = yy.Block();
break;
case 54:this.$ = yy.Block($$[$0]);
break;
case 55:this.$ = $$[$0-2].add($$[$0]);
break;
case 58:this.$ = yy.Call.back($$[$0-4], $$[$0], $$[$0-1].charAt(1) === '~', $$[$0-1].length === 3);
break;
case 59:this.$ = yy.Decl[$$[$0-1]]($$[$0]);
break;
case 60:this.$ = yy.Decl[$$[$0-4]]($$[$0-2]);
break;
case 61:this.$ = yy.L(yylineno, yy.JS($$[$0], true, true));
break;
case 62:this.$ = yy.L(yylineno, yy.Throw(yy.JS("Error('unimplemented')")));
break;
case 63:this.$ = $$[$0-1].chomp();
break;
case 64:this.$ = yy.Import(yy.Unary('^^', $$[$0-2], {
        prec: 'yy.UNARY'
      }), $$[$0], false);
break;
case 65:this.$ = yy.Import(yy.Unary('^^', $$[$0-2], {
        prec: 'yy.UNARY'
      }), $$[$0].unwrap(), false);
break;
case 66:this.$ = $$[$0-2].add(yy.Call([$$[$0-4], $$[$0]]));
break;
case 67:this.$ = $$[$0].unwrap();
break;
case 68:this.$ = yy.Assign($$[$0-2].unwrap(), $$[$0], $$[$0-1]);
break;
case 69:this.$ = yy.Assign($$[$0-5].unwrap(), yy.Arr.maybe($$[$0-2]), $$[$0-4]);
break;
case 70:this.$ = yy.Import($$[$0-2], $$[$0], $$[$0-1] === '<<<<');
break;
case 71:this.$ = yy.Import($$[$0-5], yy.Arr.maybe($$[$0-2]), $$[$0-4] === '<<<<');
break;
case 72:this.$ = yy.Unary($$[$0-1], $$[$0].unwrap());
break;
case 73:this.$ = yy.Unary($$[$0], $$[$0-1].unwrap(), true);
break;
case 74:
case 75:
case 76:this.$ = yy.Assign($$[$0].unwrap(), [$$[$0-2]], $$[$0-1]);
break;
case 77:
case 78:
case 79:this.$ = yy.Unary($$[$0-1], $$[$0]);
break;
case 80:this.$ = yy.Unary($$[$0-4], yy.Arr.maybe($$[$0-2]));
break;
case 81:
case 82:
case 83:
case 84:
case 85:
case 86:
case 87:
case 88:
case 89:this.$ = yy.Binary($$[$0-1], $$[$0-2], $$[$0]);
break;
case 90:this.$ = '!' === $$[$0-1].charAt(0)
        ? yy.Binary($$[$0-1].slice(1), $$[$0-2], $$[$0]).invert()
        : yy.Binary($$[$0-1], $$[$0-2], $$[$0]);
break;
case 91:this.$ = yy.Block($$[$0-2]).pipe($$[$0], $$[$0-1]);
break;
case 92:this.$ = yy.Block($$[$0-2]).pipe([$$[$0]], $$[$0-1]);
break;
case 93:this.$ = yy.Existence($$[$0-1].unwrap(), true);
break;
case 94:this.$ = yy.L(yylineno, yy.Fun($$[$0-4], $$[$0], $$[$0-1].charAt(0) === '~', $$[$0-1].length === 3));
break;
case 95:this.$ = yy.L(yylineno, yy.Fun($$[$0-3], $$[$0]).named($$[$0-5]));
break;
case 97:this.$ = $$[$0-2].addElse($$[$0]);
break;
case 98:this.$ = yy.If($$[$0], $$[$0-2], $$[$0-1] === 'unless');
break;
case 99:this.$ = $$[$0-1].addBody($$[$0]);
break;
case 100:this.$ = $$[$0-3].addBody($$[$0-2]).addElse($$[$0]);
break;
case 101:this.$ = new yy.While($$[$0], $$[$0-1] === 'until', true).addBody($$[$0-2]);
break;
case 102:this.$ = yy.Jump[$$[$0-1]]($$[$0]);
break;
case 103:this.$ = yy.Jump[$$[$0-4]](yy.Arr.maybe($$[$0-2]));
break;
case 104:this.$ = yy.L(yylineno, yy.Jump[$$[$0]]());
break;
case 105:this.$ = yy.L(yylineno, new yy.Jump($$[$0]));
break;
case 106:this.$ = yy.L(yylineno, new yy.Jump($$[$0-1], $$[$0]));
break;
case 107:this.$ = new yy.Switch($$[$0-1], $$[$0]);
break;
case 108:
case 109:this.$ = new yy.Switch($$[$0-3], $$[$0-2], $$[$0]);
break;
case 110:this.$ = new yy.Switch(null, $$[$0]);
break;
case 111:
case 112:this.$ = new yy.Switch(null, $$[$0-2], $$[$0]);
break;
case 113:this.$ = new yy.Switch(null, [], $$[$0]);
break;
case 114:this.$ = new yy.Try($$[$0]);
break;
case 115:this.$ = new yy.Try($$[$0-2], $$[$0-1], $$[$0]);
break;
case 116:this.$ = new yy.Try($$[$0-4], $$[$0-3], $$[$0-2], $$[$0]);
break;
case 117:this.$ = new yy.Try($$[$0-2], null, null, $$[$0]);
break;
case 118:this.$ = new yy.Class({
        title: $$[$0-3].unwrap(),
        sup: $$[$0-2],
        mixins: $$[$0-1],
        body: $$[$0]
      });
break;
case 119:this.$ = new yy.Class({
        sup: $$[$0-2],
        mixins: $$[$0-1],
        body: $$[$0]
      });
break;
case 120:this.$ = yy.Util.Extends($$[$0-2].unwrap(), $$[$0]);
break;
case 121:
case 122:this.$ = new yy.Label($$[$0-1], $$[$0]);
break;
case 123:this.$ = [$$[$0]];
break;
case 124:this.$ = $$[$0-2].concat($$[$0]);
break;
case 126:this.$ = yy.Prop(yy.L(yylineno, yy.Key($$[$0], $$[$0] != 'arguments' && $$[$0] != 'eval')), yy.L(yylineno, yy.Literal($$[$0])));
break;
case 127:this.$ = yy.Prop($$[$0], yy.Chain($$[$0-2], [yy.Index($$[$0], $$[$0-1])]));
break;
case 128:this.$ = yy.Prop($$[$0], yy.Chain(yy.L(yylineno, yy.Literal($$[$0-2])), [yy.Index($$[$0], $$[$0-1])]));
break;
case 129:this.$ = yy.Prop(yy.L(yylineno, yy.Key($$[$0])), yy.L(yylineno, yy.Obj($$[$0-3]).named($$[$0])));
break;
case 130:this.$ = yy.Prop(yy.L(yylineno, yy.Key($$[$0])), yy.L(yylineno, yy.Arr($$[$0-3]).named($$[$0])));
break;
case 131:this.$ = yy.Prop($$[$0-2], $$[$0]);
break;
case 132:this.$ = yy.Prop($$[$0-5], yy.Arr.maybe($$[$0-2]));
break;
case 134:this.$ = yy.Binary($$[$0-1], $$[$0-2], $$[$0]);
break;
case 135:this.$ = yy.Binary($$[$0-1], $$[$0-2], $$[$0], true);
break;
case 136:this.$ = yy.Prop($$[$0].maybeKey(), yy.L(yylineno, yy.Literal($$[$0-1] === '+')));
break;
case 137:this.$ = yy.Prop(yy.L(yylineno, yy.Key($$[$0], true)), yy.L(yylineno, yy.Literal($$[$0-1] === '+')));
break;
case 138:this.$ = yy.Splat($$[$0]);
break;
case 139:this.$ = yy.L(yylineno, yy.JS($$[$0], true, true));
break;
case 140:this.$ = [];
break;
case 141:this.$ = [$$[$0]];
break;
case 142:this.$ = $$[$0-2].concat($$[$0]);
break;
case 143:this.$ = $$[$0-3].concat($$[$0]);
break;
case 144:this.$ = $$[$0-2];
break;
case 145:this.$ = yy.Parens($$[$0-1].chomp().unwrap(), false, $$[$0-2] === '"');
break;
case 148:this.$ = $$[$0-2].add($$[$0]);
break;
case 149:this.$ = yy.If($$[$0-1], $$[$0], $$[$0-2] === 'unless');
break;
case 150:this.$ = $$[$0-4].addElse(yy.If($$[$0-1], $$[$0], $$[$0-2] === 'unless'));
break;
case 151:this.$ = new yy.For({
        item: $$[$0-2].unwrap(),
        index: $$[$0-1],
        source: $$[$0]
      });
break;
case 152:this.$ = new yy.For({
        item: $$[$0-4].unwrap(),
        index: $$[$0-3],
        source: $$[$0-2],
        guard: $$[$0]
      });
break;
case 153:this.$ = new yy.For({
        item: $$[$0-4].unwrap(),
        index: $$[$0-3],
        source: $$[$0-2],
        step: $$[$0]
      });
break;
case 154:this.$ = new yy.For({
        item: $$[$0-6].unwrap(),
        index: $$[$0-5],
        source: $$[$0-4],
        step: $$[$0-2],
        guard: $$[$0]
      });
break;
case 155:this.$ = new yy.For({
        object: true,
        index: $$[$0-2],
        source: $$[$0]
      });
break;
case 156:this.$ = new yy.For({
        object: true,
        index: $$[$0-4],
        source: $$[$0-2],
        guard: $$[$0]
      });
break;
case 157:this.$ = new yy.For({
        object: true,
        index: $$[$0-4],
        item: $$[$0-2].unwrap(),
        source: $$[$0]
      });
break;
case 158:this.$ = new yy.For({
        object: true,
        index: $$[$0-6],
        item: $$[$0-4].unwrap(),
        source: $$[$0-2],
        guard: $$[$0]
      });
break;
case 159:this.$ = new yy.For({
        object: true,
        own: true,
        index: $$[$0-2],
        source: $$[$0]
      });
break;
case 160:this.$ = new yy.For({
        object: true,
        own: true,
        index: $$[$0-4],
        source: $$[$0-2],
        guard: $$[$01]
      });
break;
case 161:this.$ = new yy.For({
        object: true,
        own: true,
        index: $$[$0-4],
        item: $$[$0-2].unwrap(),
        source: $$[$0]
      });
break;
case 162:this.$ = new yy.For({
        object: true,
        own: true,
        index: $$[$0-6],
        item: $$[$0-4].unwrap(),
        source: $$[$0-2],
        guard: $$[$0-1]
      });
break;
case 163:this.$ = new yy.For({
        index: $$[$0-4],
        from: $$[$0-2],
        op: $$[$0-1],
        to: $$[$0]
      });
break;
case 164:this.$ = new yy.For({
        index: $$[$0-6],
        from: $$[$0-4],
        op: $$[$0-3],
        to: $$[$0-2],
        guard: $$[$0]
      });
break;
case 165:this.$ = new yy.For({
        index: $$[$0-6],
        from: $$[$0-4],
        op: $$[$0-3],
        to: $$[$0-2],
        step: $$[$0]
      });
break;
case 166:this.$ = new yy.For({
        index: $$[$0-8],
        from: $$[$0-6],
        op: $$[$0-5],
        to: $$[$0-4],
        step: $$[$0-2],
        guard: $$[$0]
      });
break;
case 167:this.$ = new yy.For({
        index: $$[$0-8],
        from: $$[$0-6],
        op: $$[$0-5],
        to: $$[$0-4],
        guard: $$[$0-2],
        step: $$[$0]
      });
break;
case 168:this.$ = new yy.While($$[$0], $$[$0-1] === 'until');
break;
case 169:this.$ = new yy.While($$[$0-2], $$[$0-3] === 'until').addGuard($$[$0]);
break;
case 170:this.$ = new yy.While($$[$0-2], $$[$0-3] === 'until', $$[$0]);
break;
case 171:this.$ = new yy.While($$[$0-4], $$[$0-5] === 'until', $$[$0-2]).addGuard($$[$0]);
break;
case 172:this.$ = [$$[$0]];
break;
case 173:this.$ = $$[$0-1].concat($$[$0]);
break;
case 174:this.$ = [new yy.Case($$[$0-1], $$[$0])];
break;
case 175:this.$ = $$[$0-3].concat(new yy.Case($$[$0-1], $$[$0]));
break;
case 176:this.$ = $$[$0];
break;
case 177:this.$ = null;
break;
case 178:this.$ = $$[$0];
break;
case 179:this.$ = null;
break;
case 180:return this.$
}
}