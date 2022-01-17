function ( source ) {
                source = baidu.string.trim( source );
                var arr;
                var str;
                var expr;
                var src = source;
                var stream = [];

                // 分析表达式token流
                while ( source ) {
                    // 匹配一个含义块
                    arr = CONDEXPR_RULE.exec( source );
                    if ( !arr ) {
                        throw "conditional expression invalid: " + src;
                    }

                    // 更新未解析的源
                    source = source.slice( arr[ 0 ].length );
                    str    = arr[ 1 ];

                    if ( str.indexOf( '$' ) == 0 ) {
                        stream.push( {
                            type : EXPR_T.variable,
                            text : str.slice( 2, str.length - 1 )
                        } );
                    } else if ( /^[0-9-]/.test( str ) ) {
                        stream.push( {
                            type : EXPR_T.number,
                            text : str
                        } );
                    } else {

                        switch ( str ) {
                        case "'":
                        case '"':
                            var strBuf = [str];
                            var cha;
                            var index = 0;

                            while ( 1 ) {
                                cha = source.charAt( index++ );
                                if ( cha == str ) {
                                    strBuf.push( str );
                                    source = source.slice( index );
                                    break;
                                }

                                strBuf.push( cha );
                            }
                            stream.push( { 
                                type : EXPR_T.string, 
                                text : strBuf.join( '' ) 
                            } );
                            break;
                        default:
                            stream.push( {
                                type : EXPR_T.punc,
                                text : str
                            } );
                            break;
                        }
                    }
                }

                // 分析表达式结构
                expr = orExpr( new NodeIterator( stream ) );
                return expr;
            }