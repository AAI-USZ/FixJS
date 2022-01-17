function nodeAnalyse( source ) {
        var COMMENT_BEGIN = '<!--';
        var COMMENT_END   = '-->';
        
        var i;
        var len;
        var str;
        var strLen;
        var commentText;
        var nodeType;
        var nodeContent;
        var node;
        var propList;
        var propLen;

        // text节点内容缓冲区，用于合并多text
        var textBuf = new ArrayBuffer;

        // node结果流
        var nodeStream = new ArrayBuffer;    
        
        // 对source以 <!-- 进行split
        var texts = source.split( COMMENT_BEGIN );
        if ( texts[ 0 ] === '' ) {
            texts.shift();
        }

        /**
         * 将缓冲区中的text节点内容写入
         *
         * @inner
         */
        function flushTextBuf() {
            nodeStream.push( {
                type: TYPE.TEXT,
                text: textBuf.join( '' )
            } );
            textBuf = new ArrayBuffer;
        }

        /**
         * 抛出标签不合法错误
         *
         * @inner
         */
        function throwInvalid( type, text ) {
            throw type + ' is invalid: ' + text;
        }

        /**
         * 注释作为普通注释文本写入流，不具有特殊含义
         *
         * @inner
         */
        function beCommentText( text ) {
            textBuf.push( COMMENT_BEGIN, text, COMMENT_END );
        }

        // 开始第一阶段解析，生成strStream
        for ( i = 0, len = texts.length; i < len; i++ ) {
            // 对 <!-- 进行split的结果
            // 进行 --> split
            // 如果split数组长度为2
            // 则0项为注释内容，1项为正常html内容
            str    = texts[ i ].split( COMMENT_END );
            strLen = str.length;

            if ( strLen == 2 || i > 0 ) {
                if ( strLen == 2 ) {
                    commentText = str[ 0 ];
                    if ( COMMENT_RULE.test( commentText ) ) {
                        // 将缓冲区中的text节点内容写入
                        flushTextBuf();
                        
                        // 节点类型分析
                        nodeType = RegExp.$2.toLowerCase();
                        nodeContent = RegExp.$3;
                        node = { type: TYPE[ nodeType.toUpperCase() ] };

                        if ( RegExp.$1 ) {
                            // 闭合节点解析
                            node.endTag = 1;
                            nodeStream.push( node );
                        } else {
                            switch ( nodeType ) {
                            case 'content':
                            case 'contentplaceholder':
                            case 'master':
                            case 'import':
                            case 'target':
                                if ( TAG_RULE.test( nodeContent ) ) {
                                    // 初始化id
                                    node.id = RegExp.$1;
                                
                                    // 初始化属性
                                    propList = RegExp.$2.split( /\s*,\s*/ );
                                    propLen = propList.length;
                                    while ( propLen-- ) {
                                        if ( PROP_RULE.test( propList[ propLen ] ) ) {
                                            node[ RegExp.$1 ] = RegExp.$2;
                                        }
                                    }
                                } else {
                                    throwInvalid( nodeType, commentText );
                                }

                                break;

                            case 'for':
                                if ( FOR_RULE.test( nodeContent ) ) {
                                    node.list = RegExp.$1;
                                    node.item = RegExp.$2;
                                } else {
                                    throwInvalid( nodeType, commentText );
                                }

                                break;

                            case 'if':
                            case 'elif':
                                if ( IF_RULE.test( RegExp.$3 ) ) {
                                    node.expr = condExpr.parse( RegExp.$1 );
                                } else {
                                    throwInvalid( nodeType, commentText );
                                }

                                break;

                            case 'else':
                                break;

                            default:
                                node = null;
                                beCommentText( commentText );
                            }

                            node && nodeStream.push( node );
                        }
                    } else {
                        // 不合规则的注释视为普通文本
                        beCommentText( commentText );
                    }

                    textBuf.push( str[ 1 ] );
                } else {
                    textBuf.push( str[ 0 ] );
                }
            }
        }
        
        
        flushTextBuf(); // 将缓冲区中的text节点内容写入
        return nodeStream.getRaw();
    }