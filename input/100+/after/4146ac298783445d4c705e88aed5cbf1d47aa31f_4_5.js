function queryOneSelector(selector, roots, globalResult, globalResultAsSparseArray, preResult, onlyOne/*, resultKeys*/) {
  var /** @type {Array.<string>} */selectorArr = selector.match(RE__queryOneSelector__selectorMatch);
  //if(selector === "," || !selectorArr)_throwDOMException("SYNTAX_ERR");

  var result = globalResult || [];

  var /** @type {boolean} */isMatchesSelector = !!preResult
    , /** @type {Node} */root = isMatchesSelector && (roots = {}) || (!roots ? document : 
                                "length" in roots ? //fast and unsafe isArray
                                  roots[0] :
                                  roots)
    , /** @type {Node} */nextRoot
    , /** @type {number} */rootIndex = 0
    , /** @type {(Node|undefined)} */child
    , /** @type {string} */child_nodeName
    , /** @type {number} */childrenIndex
    , /** @type {Node} */brother
    , /** @type {number} */combinatorType = selectorCombinatorTypeMap[selectorArr[1] || ""] || 0
    , /** @type {boolean} */combinatorTypeMoreThen_2 = combinatorType > 2
    , /** @type {(string|undefined)} */tag = selectorArr[2]
    , /** @type {boolean} */needCheck_tag = !!tag
    , /** @type {(string|undefined)} */id = selectorArr[3]
    , /** @type {boolean} */needCheck_id = !!id
    , /** @type {(string|Array.<string>|undefined)} */classes = selectorArr[4]
    , /** @type {boolean} */needCheck_classes = !!classes
    , /** @type {boolean} */needCheck_nodeType = tag === "*"
    , /** @type {number} */kr
    , /** @type {number} */indexIn_resultKeys
    , /** @type {boolean} */match
    , /** @type {boolean} */canWeReturnUnsafeArray
    , /** @type {Array.<string>} */css3Attr_add
    , /** @type {Array.<string>} */css3Pseudo_add
    , /** @type {number} */css3PseudoOperatorType
    , /** @type {string} */nodeAttrCurrent_value
    , /** @type {string} */nodeAttrExpected_value
    , /** @type {(RegExp|string)} */klas
    //,  {(string|Array.<string>|boolean)} css3AttrAndcss3Pseudo
    , /** @type {(string|Array.<string>)} */ css3Attr
    , /** @type {(string|Array.<string>)} */ css3Pseudo
    , /** @type {Array} */elementsById_Cache
    , a, b, c, u
    , A, B, C
  ;

  if(needCheck_tag) {
    tag = (needCheck_nodeType ? void 0 : tag.replace("|", ":").toUpperCase());
  }
  
  if(needCheck_classes) {
    classes = classes.replace(RE__querySelector__dottes, " ");
    klas = new RegExp(classes.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));
  }

  if(isMatchesSelector)combinatorType = 0;

  if(css3Attr = selectorArr[5]) {
    css3Attr = _String_split.call(css3Attr, "][");
    kr = -1;
    while(css3Attr_add = css3Attr[++kr]) {
      css3Attr_add = css3Attr[kr] = css3Attr_add.match(RE__queryOneSelector__attrMatcher);
      
      selectorAttrOperatorsMap

      b = css3Attr_add[1];
      if((a = b.charAt(0)) === "\'" || a === "\""  && b.substr(-1) === a) {//Note: original IE substr not allowed negative value as first param
        b = css3Attr_add[1] = _String_substr.call(b, 1, b.length - 2);
      }

      css3Attr_add[2] = selectorAttrOperatorsMap[css3Attr_add[2]];

      b = css3Attr_add[3];
      if(b) {
	      if(b.substr(-2) == " i") {
	        //http://css4-selectors.com/selector/css4/attribute-case-sensitivity/
	        b = b.substr(0, b.length - 2);
	        css3Attr_add[4] = true;
	      }

	      if((a = b.charAt(0)) === "\'" || a === "\""  && b.substr(-1) === a) {
	        css3Attr_add[3] = _String_substr.call(b, 1, b.length - 2);
	      }
	  }
    }
    b = a = void 0;
  }

  if(css3Pseudo = selectorArr[6]) {
    css3Pseudo = css3Pseudo.match(RE__queryOneSelector__pseudoMatcher);
    css3PseudoOperatorType = selectorPseudosMap[css3Pseudo[1]];
    if(css3PseudoOperatorType < 2 && css3Pseudo[2]) {// 'nth-child':0 and 'nth-last-child':1
      if(!/\D/.test(css3Pseudo[2]))css3Pseudo_add = [null, 0, '%', css3Pseudo[2]];
      else if(css3Pseudo[2] === 'even')css3Pseudo_add = [null, 2];
      else if(css3Pseudo[2] === 'odd')css3Pseudo_add = [null, 2, '%', 1];
      else css3Pseudo_add = css3Pseudo[2].match(RE__queryOneSelector__pseudoNthChildMatcher);
      A = css3PseudoOperatorType ? "nodeIndexLast" : "nodeIndex";
      B = css3PseudoOperatorType ? "lastChild" : "firstChild";
      C = css3PseudoOperatorType ? "previousSibling" : "nextSibling";
    }
  }
  
  selectorArr = selector = void 0; 

  //prepear
  if(combinatorType == 1) {
    if(!needCheck_id) {
      needCheck_tag = false;
    }
    else {
        preResult = document.getElementsByName(id);
        elementsById_Cache = [];
        kr = -1;
        while(child = preResult[++kr]) {
          if(child.id == id) {
            elementsById_Cache.push(child);
          }
        };

      preResult = needCheck_id = void 0;
    }
  }

  canWeReturnUnsafeArray = (!("length" in roots) || roots.length === 1) && !globalResultAsSparseArray && !css3Attr && !css3Pseudo && !needCheck_tag && !needCheck_classes && !needCheck_id;

  do {
    child = void 0;
    switch(combinatorType) {
      case 1://" " or ""
        //if("all" in root && !root.all.length)continue;
        if(!id) {//tagName or/and class
          if(tag === "BODY" && root.nodeType === 9) {
            preResult = [root.body];
            needCheck_classes = !!classes;
            canWeReturnUnsafeArray = canWeReturnUnsafeArray && !needCheck_classes;
          }
          else {
            preResult = root.getElementsByTagName(tag || "*");
          }
        }
        else {//id
          preResult = [];
          if(elementsById_Cache.length) {
            kr = -1;
            while(child = elementsById_Cache[++kr]) {
              if(root === document || root.contains(child)){
                preResult.push(child);
                elementsById_Cache.splice(kr--, 1);
              }
            };
          }
          else return result;
        }
        child = preResult[0];
      break;
      case 2://">" W3C: "an F element preceded by an E element"
        preResult = root.children;
        child = preResult[0];
      break;
      case 3://"~" W3C: "an F element preceded by an E element"
        nextRoot = roots[rootIndex + 1];
      case 4://"+"
        if(!(child = getNextElement(root)))continue;
      default:
    }

    if(canWeReturnUnsafeArray)return preResult;

    childrenIndex = 0;

    if(child) do {
        if((!needCheck_nodeType || child.nodeType === 1) && !(globalResultAsSparseArray && (indexIn_resultKeys = child["sourceIndex"]) in globalResult)) {
          if(match = !(needCheck_tag && (child_nodeName = child.nodeName.toUpperCase()) !== tag || needCheck_id && child.id !== id || needCheck_classes && !(child.className && klas.test(child.className)))) {
            if(css3Attr) {
              kr = -1;
              u = child.attributes;

              while(match && (css3Attr_add = css3Attr[++kr]) && (match = (c = css3Attr_add[1]) in u)) {
                if(c in attributeSpecialCase)nodeAttrCurrent_value = attributeSpecialCase[c](child);
                else {
                  nodeAttrCurrent_value = u[c];
                  nodeAttrCurrent_value = (nodeAttrCurrent_value && (nodeAttrCurrent_value.specified || c in attributeSpecialSpecified) && nodeAttrCurrent_value.nodeValue !== "") ? nodeAttrCurrent_value.nodeValue : null;
                }
                
                a = css3Attr_add[2];

                if(nodeAttrCurrent_value === null) {
                  if(!(match = a == 8))
                  match = false;
                  continue;
                }

				if(css3Attr_add[4]) {//Attribute case-sensitivity
					nodeAttrCurrent_value = nodeAttrCurrent_value.toUpperCase();
				}

                nodeAttrExpected_value = css3Attr_add[3];
				
				/* from yass 0.3.9 http://yass.webo.in/
                 and edited by me :) */
                /* function calls for CSS2/3 attributes selectors */
                switch(a) {
                  /* W3C "an E element with a "nodeAttrCurrent_value" attribute" */
                  case 1://css3Attr[2] == ''
                    match = !!nodeAttrCurrent_value || nodeAttrCurrent_value === "";
                  break;

                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
                  exactly equal to "nodeAttrExpected_value"
                  */
                  case 2://'='
                    match = /*nodeAttrCurrent_value && */nodeAttrCurrent_value === nodeAttrExpected_value;
                  break;

                  /*
                  from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
                  a list of space-separated nodeAttrExpected_value's, one of which is exactly
                  equal to "nodeAttrExpected_value"
                  */
                  case 3://'&='
                  /* nodeAttrCurrent_value doesn't contain given nodeAttrExpected_value */
                  case 8://'!='
                    match = /*nodeAttrCurrent_value && */(new RegExp('(^| +)' + nodeAttrExpected_value + '($| +)').test(nodeAttrCurrent_value));
                    if(a == 8)match = !match;
                  break;

                  /*
                  from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  begins exactly with the string "nodeAttrExpected_value"
                  */
                  case 4://'^='
                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  ends exactly with the string "nodeAttrExpected_value"
                  */
                  case 5://'$='
                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  contains the substring "nodeAttrExpected_value"
                  */
                  case 6://'*='
                    b = nodeAttrCurrent_value.indexOf(nodeAttrExpected_value);
                    match = a === 6 ? ~b : a === 5 ? (b == nodeAttrCurrent_value.length - nodeAttrExpected_value.length) : !b;
                  break;

                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute has
                  a hyphen-separated list of nodeAttrExpected_value's beginning (from the
                  left) with "nodeAttrExpected_value"
                  */
                  case 7://'|='
                    match = (/*nodeAttrCurrent_value && */(nodeAttrCurrent_value === nodeAttrExpected_value || !!~nodeAttrCurrent_value.indexOf(nodeAttrExpected_value + '-')));
                  break;

                  case 9://'~='
                    match = /*nodeAttrCurrent_value && */!!~(" " + nodeAttrCurrent_value.replace(RE__queryOneSelector__spaces, " ") + " ").indexOf(" " + nodeAttrExpected_value + " ");
                  break;
                }
              }
            }
        
            if(match && css3Pseudo) {
              /*
              function calls for CSS2/3 modificatos. Specification taken from
              http://www.w3.org/TR/2005/WD-css3-selectors-20051215/
              on success return negative result.
              */
              switch(css3PseudoOperatorType) {
                /* W3C: "an E element, the n-th child of its parent" */
                case 0://'nth-child':
                /* W3C: "an E element, the n-th rs of its parent, counting from the last one" */
                case 1://'nth-last-child':
                  if(!css3Pseudo_add[1] && !css3Pseudo_add[3])break;
                  c = child[A] || 0;
                  a = css3Pseudo_add[3] ? (css3Pseudo_add[2] === '%' ? -1 : 1) * css3Pseudo_add[3] : 0;
                  b = css3Pseudo_add[1];
                  if (c) {//check if we have already looked into siblings, using exando - very bad
                    match = !b ? !(c + a) : !((c + a) % b);
                  }
                  else {//in the other case just reverse logic for n and loop siblings
                    match = false;
                    brother = child.parentNode[B];
                    //c++;
                    do {//looping in rs to find if nth expression is correct
                      //nodeIndex expando used from Peppy / Sizzle/ jQuery
                      if (brother.nodeType == 1 &&
                        (brother[A] = ++c) &&
                        child === brother &&
                        (!b ? !(c + a) : !((c + a) % b))) {
                        match = true;
                      }
                    } while (!match && (brother = brother[C]));
                  }
                break;

                /* W3C: "an E element, only child of its parent" */
                case 2://'only-child':
                /* implementation was taken from jQuery.1.7 */
                /* W3C: "an E element, first rs of its parent" */
                case 3://'first-child':
                /* implementation was taken from jQuery.1.7 */
                  brother = child;
                  while ((brother = brother.previousSibling) && brother.nodeType !== 1) {}
                /* Check for node's existence */
                  match = !brother;

                  if(!match || css3PseudoOperatorType == 3)break;
                /* W3C: "an E element, last rs of its parent" */
                case 4://'last-child'://In this block we lose "rs" value
                /* Check for node's existence */
                  match = !getNextElement(child);
                break;

                /* W3C: "an E element, root of the document" */
                case 5://'root':
                  match = (child_nodeName || child.nodeName.toUpperCase()) == "HTML";
                break;             
                /*
                Rrom w3.org: "an E element that has no rsren (including text nodes)".
                Thx to John, from Sizzle, 2008-12-05, line 416
                */
                case 6://'empty':
                  match = !child.firstChild;
                  /*
                  var n, i;
                  for (i = 0;
                  (n = e.childNodes[i]); i++) {
                    if (n.nodeType == 1 || n.nodeType == 3) return false
                  }
                  return true
                  */
                break;
                /*
                W3C: "a user interface element E which is checked
                (for instance a radio-button or checkbox)"
                */
                case 7://'checked':
                  match = !!child.checked;
                break;
                /*
                W3C: "an element of type E in language "fr"
                (the document language specifies how language is determined)"
                */
                case 8://'lang':
                  match = (child.lang == css3Pseudo_add || _document_documentElement.lang == css3Pseudo_add);
                break;

                case 9://'enabled':
                case 10://'disabled':
                  match = ("disabled" in child && "form" in child/*filter only form elements TODO::check it*/) && (css3PseudoOperatorType == 10 ? child.disabled === true && child.type !== 'hidden' : child.disabled === false);
                break;

                /* thx to John, from Sizzle, 2008-12-05, line 407 */
                case 11://'selected':
                // Accessing this property makes selected-by-default options in Safari work properly.
                  match = child.parentNode.selectedIndex && !!child.selected;//Тут уже Closure Compiler не удаляет нужный вызов
                break;

                case 12://'contains':
                  match = !!~(child.textContent || child.data || child.innerText || child.nodeValue || child.value || "").indexOf(css3Pseudo[2]);
                break;

                case 13://'not':
                case 14://'matches':
                  match = _matchesSelector.call(child, css3Pseudo[2]);
                  if(css3PseudoOperatorType == 13)match = !match;
                break;

                case 15://'read-only':
                case 16://'read-write':
                  child_nodeName || (child_nodeName = child.nodeName.toUpperCase());
                  match = (child_nodeName == "INPUT" || child_nodeName == "TEXTAREA" || child.getAttribute("contenteditable") !== null) && !child.readonly;
                  if(css3PseudoOperatorType == 16)match = !match;
                break;
                /*TODO::
                default:
                  //Non-standart pseudo-classes
                  var f = $$N.nonStandartPseudoClasses[css3Pseudo[1]];
                  if(f)match = f(child);*/
              }
            }
          }

          if(match) {
            if(onlyOne)return [child];

            if(globalResultAsSparseArray) {
              result[indexIn_resultKeys] = child;
            }
            else {
              result.push(child);
            }
          }

          child_nodeName = void 0;
    }
  }
    while( child = combinatorTypeMoreThen_2 ? (combinatorType === 4 ? void 0 : child === nextRoot ? void 0 : getNextElement(child) ) : preResult[ ++childrenIndex ] );
    

  }
  while(root = roots[++rootIndex]);

  return result;
}