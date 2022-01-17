function( node ) {
				var open = QUnit.jsDump.HTML ? '&lt;' : '<',
					close = QUnit.jsDump.HTML ? '&gt;' : '>';

				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;

				for ( var a in QUnit.jsDump.DOMAttrs ) {
					var val = node[QUnit.jsDump.DOMAttrs[a]];
					if ( val ) {
						ret += ' ' + a + '=' + QUnit.jsDump.parse( val, 'attribute' );
					}
				}
				return ret + close + open + '/' + tag + close;
			}