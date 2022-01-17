function (S, DOM, undefined) {

    var doc = S.Env.host.document,
        documentElement = doc.documentElement,
        CONTAIN_MASK = 16,
        __contains =
            documentElement.compareDocumentPosition ?
                function (a, b) {
                    return !!(a.compareDocumentPosition(b) & CONTAIN_MASK);
                } :
                documentElement.contains ?
                    function (a, b) {
                        if (a.nodeType == DOM.DOCUMENT_NODE) {
                            a = a.documentElement;
                        }
                        // !a.contains => a===document || text
                        // 注意原生 contains 判断时 a===b 也返回 true
                        b = b.parentNode;

                        if (a == b) {
                            return true;
                        }

                        if (b && b.nodeType == DOM.ELEMENT_NODE) {
                            return a.contains && a.contains(b);
                        } else {
                            return false;
                        }
                    } : 0;


    S.mix(DOM,
        /**
         * @lends DOM
         */
        {

            /**
             * Get the first element that matches the filter,
             * beginning at the first element of matched elements and progressing up through the DOM tree.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} filter Selector string or filter function
             * @param {HTMLElement|String|Document|HTMLElement[]} [context] Search bound element
             * @returns {HTMLElement}
             */
            closest:function (selector, filter, context, allowTextNode) {
                return nth(selector, filter, 'parentNode', function (elem) {
                    return elem.nodeType != DOM.DOCUMENT_FRAGMENT_NODE;
                }, context, true, allowTextNode);
            },

            /**
             * Get the parent of the first element in the current set of matched elements, optionally filtered by a selector.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @param {HTMLElement|String|Document|HTMLElement[]} [context] Search bound element
             * @returns {HTMLElement}
             */
            parent:function (selector, filter, context) {
                return nth(selector, filter, 'parentNode', function (elem) {
                    return elem.nodeType != DOM.DOCUMENT_FRAGMENT_NODE;
                }, context, undefined);
            },

            /**
             * Get the first child of the first element in the set of matched elements.
             * If a filter is provided, it retrieves the next child only if it matches that filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement}
             */
            first:function (selector, filter, allowTextNode) {
                var elem = DOM.get(selector);
                return nth(elem && elem.firstChild, filter, 'nextSibling',
                    undefined, undefined, true, allowTextNode);
            },

            /**
             * Get the last child of the first element in the set of matched elements.
             * If a filter is provided, it retrieves the previous child only if it matches that filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement}
             */
            last:function (selector, filter, allowTextNode) {
                var elem = DOM.get(selector);
                return nth(elem && elem.lastChild, filter, 'previousSibling',
                    undefined, undefined, true, allowTextNode);
            },

            /**
             * Get the immediately following sibling of the first element in the set of matched elements.
             * If a filter is provided, it retrieves the next child only if it matches that filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement}
             */
            next:function (selector, filter, allowTextNode) {
                return nth(selector, filter, 'nextSibling', undefined,
                    undefined, undefined, allowTextNode);
            },

            /**
             * Get the immediately preceding  sibling of the first element in the set of matched elements.
             * If a filter is provided, it retrieves the previous child only if it matches that filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement}
             */
            prev:function (selector, filter, allowTextNode) {
                return nth(selector, filter, 'previousSibling',
                    undefined, undefined, undefined, allowTextNode);
            },

            /**
             * Get the siblings of the first element in the set of matched elements, optionally filtered by a filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement[]}
             */
            siblings:function (selector, filter, allowTextNode) {
                return getSiblings(selector, filter, true, allowTextNode);
            },

            /**
             * Get the children of the first element in the set of matched elements, optionally filtered by a filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {HTMLElement[]}
             */
            children:function (selector, filter) {
                return getSiblings(selector, filter, undefined);
            },

            /**
             * Get the childNodes of the first element in the set of matched elements (includes text and comment nodes),
             * optionally filtered by a filter.
             * @param {HTMLElement[]|String|HTMLElement} selector Matched elements
             * @param {String|Function} [filter] Selector string or filter function
             * @returns {Node[]}
             */
            contents:function (selector, filter) {
                return getSiblings(selector, filter, undefined, 1);
            },

            /**
             * Check to see if a DOM node is within another DOM node.
             * @param {HTMLElement|String|Element} container The DOM element that may contain the other element.
             * @param {HTMLElement|String|Element} contained The DOM element that may be contained by the other element.
             * @returns {Boolean}
             */
            contains:function (container, contained) {
                container = DOM.get(container);
                contained = DOM.get(contained);
                if (container && contained) {
                    return __contains(container, contained);
                }
                return false;
            },

            /**
             * Check to see if a DOM node is equal with another DOM node.
             * @param {HTMLElement|String|Element} n1
             * @param {HTMLElement|String|Element} n2
             * @returns {Boolean}
             */
            equals:function (n1, n2) {
                n1 = DOM.query(n1);
                n2 = DOM.query(n2);
                if (n1.length != n2.length) {
                    return false;
                }
                for (var i = n1.length; i >= 0; i--) {
                    if (n1[i] != n2[i]) {
                        return false;
                    }
                }
                return true;
            }
        });

    // 获取元素 elem 在 direction 方向上满足 filter 的第一个元素
    // filter 可为 number, selector, fn array ，为数组时返回多个
    // direction 可为 parentNode, nextSibling, previousSibling
    // context : 到某个阶段不再查找直接返回
    function nth(elem, filter, direction, extraFilter, context, includeSef, allowTextNode) {
        if (!(elem = DOM.get(elem))) {
            return null;
        }
        if (filter === 0) {
            return elem;
        }
        if (!includeSef) {
            elem = elem[direction];
        }
        if (!elem) {
            return null;
        }
        context = (context && DOM.get(context)) || null;

        if (filter === undefined) {
            // 默认取 1
            filter = 1;
        }
        var ret = [],
            isArray = S.isArray(filter),
            fi,
            flen;

        if (S.isNumber(filter)) {
            fi = 0;
            flen = filter;
            filter = function () {
                return ++fi === flen;
            };
        }

        // 概念统一，都是 context 上下文，只过滤子孙节点，自己不管
        while (elem && elem != context) {
            if ((
                elem.nodeType == DOM.ELEMENT_NODE ||
                    elem.nodeType == DOM.TEXT_NODE && allowTextNode
                ) &&
                testFilter(elem, filter) &&
                (!extraFilter || extraFilter(elem))) {
                ret.push(elem);
                if (!isArray) {
                    break;
                }
            }
            elem = elem[direction];
        }

        return isArray ? ret : ret[0] || null;
    }

    function testFilter(elem, filter) {
        if (!filter) {
            return true;
        }
        if (S.isArray(filter)) {
            for (var i = 0; i < filter.length; i++) {
                if (DOM.test(elem, filter[i])) {
                    return true;
                }
            }
        } else if (DOM.test(elem, filter)) {
            return true;
        }
        return false;
    }

    // 获取元素 elem 的 siblings, 不包括自身
    function getSiblings(selector, filter, parent, allowText) {
        var ret = [],
            elem = DOM.get(selector),
            parentNode = elem;

        if (elem && parent) {
            parentNode = elem.parentNode;
        }

        if (parentNode) {
            ret = S.makeArray(parentNode.childNodes);
            if (!allowText) {
                ret = DOM.filter(ret, function (el) {
                    return el.nodeType == 1;
                });
            }
            if (filter) {
                ret = DOM.filter(ret, filter);
            }
        }

        return ret;
    }

    return DOM;
}