function(value){
        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !baidu.support.htmlSerialize ) {
            wrapMap._default = [ 1, "X<div>", "</div>" ];
        };

        baidu.each(me,function(elem,index){
            
            if(result){
                return;
            };

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return result;

                break;

                case 'string':

                    //set all
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( baidu.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( baidu.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                //jQuery.cleanData( elem.getElementsByTagName( "*" ) );
                                //Todo 清除事件
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':

                    //set all
                    isSet = true;
                    var tangramDom = bd(elem);
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;

                default:
                break;
            };
        });

        return isSet?me:result;
    }