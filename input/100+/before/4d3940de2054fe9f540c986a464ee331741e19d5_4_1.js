function fExamineSyntacticCodeUnit(oSyntacticCodeUnit) {
     var _,
         /**
          * Indicates whether the syntactic code unit represents global code.
          * @type {boolean}
          */
         bIsGlobal = 'toplevel' === oSyntacticCodeUnit[0],
         /**
          * Indicates whether the whole scope is being examined.
          * @type {boolean}
          */
         bIsWhollyExaminable = !bIsGlobal,
         /**
          * An array-like object representing source elements that constitute a
          * syntactic code unit.
          * @type {!TSyntacticCodeUnit}
          */
         oSourceElements,
         /**
          * A record consisting of data about the source element that is
          * currently being examined.
          * @type {!TSourceElementsData}
          */
         oSourceElementData,
         /**
          * The scope of the syntactic code unit.
          * @type {!TScope}
          */
         oScope,
         /**
          * An instance of an object that allows the traversal of an <abbr
          * title="abstract syntax tree">AST</abbr>.
          * @type {!TWalker}
          */
         oWalker,
         /**
          * An object encompassing collections of functions used during the
          * traversal of an <abbr title="abstract syntax tree">AST</abbr>.
          * @namespace
          * @type {!Object.<string, !Object.<string, function(...[*])>>}
          */
         oWalkers = {
           /**
            * A collection of functions used during the surveyance of source
            * elements.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
           oSurveySourceElement: {
             /**#nocode+*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {string} sIdentifier The identifier of the function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
             'defun': function(
                 sIdentifier,
                 aFormalParameterList,
                 oFunctionBody) {
               fClassifyAsExcludable();
               fAddIdentifier(sIdentifier);
               aFormalParameterList.forEach(fAddIdentifier);
             },
             /**
              * Increments the count of the number of occurrences of the String
              * value that is equivalent to the sequence of terminal symbols
              * that constitute the encountered identifier name.
              * @param {!TSyntacticCodeUnit} oExpression The nonterminal
              *     MemberExpression.
              * @param {string} sIdentifierName The identifier name used as the
              *     property accessor.
              * @return {!Array} The encountered branch of an <abbr title=
              *     "abstract syntax tree">AST</abbr> with its nonterminal
              *     MemberExpression traversed.
              */
             'dot': function(oExpression, sIdentifierName) {
               fCountPrimaryExpression(
                   EPrimaryExpressionCategories.N_IDENTIFIER_NAMES,
                   EValuePrefixes.S_STRING + sIdentifierName);
               return ['dot', oWalker.walk(oExpression), sIdentifierName];
             },
             /**
              * Adds the optional identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {?string} sIdentifier The optional identifier of the
              *     function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
             'function': function(
                 sIdentifier,
                 aFormalParameterList,
                 oFunctionBody) {
               if ('string' === typeof sIdentifier) {
                 fAddIdentifier(sIdentifier);
               }
               aFormalParameterList.forEach(fAddIdentifier);
             },
             /**
              * Either increments the count of the number of occurrences of the
              * encountered null or Boolean value or classifies a source element
              * as containing the {@code eval} identifier name.
              * @param {string} sIdentifier The identifier encountered.
              */
             'name': function(sIdentifier) {
               if (-1 !== A_OTHER_SUBSTITUTABLE_LITERALS.indexOf(sIdentifier)) {
                 fCountPrimaryExpression(
                     EPrimaryExpressionCategories.N_NULL_AND_BOOLEAN_LITERALS,
                     EValuePrefixes.S_SYMBOLIC + sIdentifier);
               } else {
                 if ('eval' === sIdentifier) {
                   oSourceElementData.nCategory =
                       ESourceElementCategories.N_EVAL;
                 }
                 fAddIdentifier(sIdentifier);
               }
             },
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name.
              * @param {TSyntacticCodeUnit} oExpression The expression whose
              *     value is to be returned.
              */
             'return': function(oExpression) {
               fClassifyAsExcludable();
             },
             /**
              * Increments the count of the number of occurrences of the
              * encountered String value.
              * @param {string} sStringValue The String value of the string
              *     literal encountered.
              */
             'string': function(sStringValue) {
               if (sStringValue.length > 0) {
                 fCountPrimaryExpression(
                     EPrimaryExpressionCategories.N_STRING_LITERALS,
                     EValuePrefixes.S_STRING + sStringValue);
               }
             },
             /**
              * Adds the identifier reserved for an exception to the list of
              * identifier names found.
              * @param {!TSyntacticCodeUnit} oTry A block of code in which an
              *     exception can occur.
              * @param {Array} aCatch The identifier reserved for an exception
              *     and a block of code to handle the exception.
              * @param {TSyntacticCodeUnit} oFinally An optional block of code
              *     to be evaluated regardless of whether an exception occurs.
              */
             'try': function(oTry, aCatch, oFinally) {
               if (Array.isArray(aCatch)) {
                 fAddIdentifier(aCatch[0]);
               }
             },
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of each declared variable to the list
              * of identifier names found.
              * @param {!Array.<!Array>} aVariableDeclarationList Variable
              *     declarations.
              */
             'var': function(aVariableDeclarationList) {
               fClassifyAsExcludable();
               aVariableDeclarationList.forEach(fAddVariable);
             },
             /**
              * Classifies a source element as containing the {@code with}
              * statement.
              * @param {!TSyntacticCodeUnit} oExpression An expression whose
              *     value is to be converted to a value of type Object and
              *     become the binding object of a new object environment
              *     record of a new lexical environment in which the statement
              *     is to be executed.
              * @param {!TSyntacticCodeUnit} oStatement The statement to be
              *     executed in the augmented lexical environment.
              * @return {!Array} An empty array to stop the traversal.
              */
             'with': function(oExpression, oStatement) {
               oSourceElementData.nCategory = ESourceElementCategories.N_WITH;
               return [];
             }
             /**#nocode-*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
           },
           /**
            * A collection of functions used while looking for nested functions.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
           oExamineFunctions: {
             /**#nocode+*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
             /**
              * Orders an examination of a nested function declaration.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
             'defun': function() {
               fExamineSyntacticCodeUnit(this);
               return [];
             },
             /**
              * Orders an examination of a nested function expression.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
             'function': function() {
               fExamineSyntacticCodeUnit(this);
               return [];
             }
             /**#nocode-*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
           }
         },
         /**
          * Records containing data about source elements.
          * @type {Array.<TSourceElementsData>}
          */
         aSourceElementsData = [],
         /**
          * The index (in the source text order) of the source element
          * immediately following a <a href="http://es5.github.com/#x14.1"
          * >Directive Prologue</a>.
          * @type {number}
          */
         nAfterDirectivePrologue = 0,
         /**
          * The index (in the source text order) of the source element that is
          * currently being considered.
          * @type {number}
          */
         nPosition,
         /**
          * The index (in the source text order) of the source element that is
          * the last element of the range of source elements that is currently
          * being considered.
          * @type {(undefined|number)}
          */
         nTo,
         /**
          * Initiates the traversal of a source element.
          * @param {!TWalker} oWalker An instance of an object that allows the
          *     traversal of an abstract syntax tree.
          * @param {!TSyntacticCodeUnit} oSourceElement A source element from
          *     which the traversal should commence.
          * @return {function(): !TSyntacticCodeUnit} A function that is able to
          *     initiate the traversal from a given source element.
          */
         cContext = function(oWalker, oSourceElement) {
           /**
            * @return {!TSyntacticCodeUnit} A function that is able to
            *     initiate the traversal from a given source element.
            */
           var fLambda = function() {
             return oWalker.walk(oSourceElement);
           };

           return fLambda;
         },
         /**
          * Classifies the source element as excludable if it does not
          * contain a {@code with} statement or the {@code eval} identifier
          * name.
          */
         fClassifyAsExcludable = function() {
           if (oSourceElementData.nCategory ===
               ESourceElementCategories.N_OTHER) {
             oSourceElementData.nCategory =
                 ESourceElementCategories.N_EXCLUDABLE;
           }
         },
         /**
          * Adds an identifier to the list of identifier names found.
          * @param {string} sIdentifier The identifier to be added.
          */
         fAddIdentifier = function(sIdentifier) {
           if (-1 === oSourceElementData.aIdentifiers.indexOf(sIdentifier)) {
             oSourceElementData.aIdentifiers.push(sIdentifier);
           }
         },
         /**
          * Adds the identifier of a variable to the list of identifier names
          * found.
          * @param {!Array} aVariableDeclaration A variable declaration.
          */
         fAddVariable = function(aVariableDeclaration) {
           fAddIdentifier(/** @type {string} */ aVariableDeclaration[0]);
         },
         /**
          * Increments the count of the number of occurrences of the prefixed
          * String representation attributed to the primary expression.
          * @param {number} nCategory The category of the primary expression.
          * @param {string} sName The prefixed String representation attributed
          *     to the primary expression.
          */
         fCountPrimaryExpression = function(nCategory, sName) {
           if (!oSourceElementData.aCount[nCategory].hasOwnProperty(sName)) {
             oSourceElementData.aCount[nCategory][sName] = 0;
             if (-1 === oSourceElementData.aPrimitiveValues.indexOf(sName)) {
               oSourceElementData.aPrimitiveValues.push(sName);
             }
           }
           oSourceElementData.aCount[nCategory][sName] += 1;
         },
         /**
          * Consolidates all worthwhile primitive values in a range of source
          *     elements.
          * @param {number} nFrom The index (in the source text order) of the
          *     source element that is the first element of the range.
          * @param {number} nTo The index (in the source text order) of the
          *     source element that is the last element of the range.
          * @param {boolean} bEnclose Indicates whether the range should be
          *     enclosed within a function call with no argument values to a
          *     function with an empty parameter list if any primitive values
          *     are consolidated.
          * @see TPrimitiveValue#nSaving
          */
         fExamineSourceElements = function(nFrom, nTo, bEnclose) {
           var _,
               /**
                * The index of the last mangled name.
                * @type {number}
                */
               nIndex = oScope.cname,
               /**
                * The index of the source element that is currently being
                * considered.
                * @type {number}
                */
               nPosition,
               /**
                * A collection of functions used during the consolidation of
                * primitive values and identifier names used as property
                * accessors.
                * @namespace
                * @type {!Object.<string, function(...[*])>}
                */
               oWalkersTransformers = {
                 /**
                  * If the String value that is equivalent to the sequence of
                  * terminal symbols that constitute the encountered identifier
                  * name is worthwhile, a syntactic conversion from the dot
                  * notation to the bracket notation ensues with that sequence
                  * being substituted by an identifier name to which the value
                  * is assigned.
                  * Applies to property accessors that use the dot notation.
                  * @param {!TSyntacticCodeUnit} oExpression The nonterminal
                  *     MemberExpression.
                  * @param {string} sIdentifierName The identifier name used as
                  *     the property accessor.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'dot': function(oExpression, sIdentifierName) {
                   /**
                    * The prefixed String value that is equivalent to the
                    * sequence of terminal symbols that constitute the
                    * encountered identifier name.
                    * @type {string}
                    */
                   var sPrefixed = EValuePrefixes.S_STRING + sIdentifierName;

                   return oSolutionBest.oPrimitiveValues.hasOwnProperty(
                       sPrefixed) &&
                       oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                       ['sub',
                        oWalker.walk(oExpression),
                        ['name',
                         oSolutionBest.oPrimitiveValues[sPrefixed].sName]] :
                       ['dot', oWalker.walk(oExpression), sIdentifierName];
                 },
                 /**
                  * If the encountered identifier is a null or Boolean literal
                  * and its value is worthwhile, the identifier is substituted
                  * by an identifier name to which that value is assigned.
                  * Applies to identifier names.
                  * @param {string} sIdentifier The identifier encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'name': function(sIdentifier) {
                   /**
                    * The prefixed representation String of the identifier.
                    * @type {string}
                    */
                   var sPrefixed = EValuePrefixes.S_SYMBOLIC + sIdentifier;

                   return [
                     'name',
                     oSolutionBest.oPrimitiveValues.hasOwnProperty(sPrefixed) &&
                     oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                     oSolutionBest.oPrimitiveValues[sPrefixed].sName :
                     sIdentifier
                   ];
                 },
                 /**
                  * If the encountered String value is worthwhile, it is
                  * substituted by an identifier name to which that value is
                  * assigned.
                  * Applies to String values.
                  * @param {string} sStringValue The String value of the string
                  *     literal encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'string': function(sStringValue) {
                   /**
                    * The prefixed representation String of the primitive value
                    * of the literal.
                    * @type {string}
                    */
                   var sPrefixed =
                       EValuePrefixes.S_STRING + sStringValue;

                   return oSolutionBest.oPrimitiveValues.hasOwnProperty(
                       sPrefixed) &&
                       oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                       ['name',
                        oSolutionBest.oPrimitiveValues[sPrefixed].sName] :
                       ['string', sStringValue];
                 }
               },
               /**
                * Such data on what to consolidate within the range of source
                * elements that is currently being considered that lead to the
                * greatest known reduction of the number of the terminal symbols
                * in comparison to the original source text.
                * @type {!TSolution}
                */
               oSolutionBest = new TSolution(),
               /**
                * Data representing an ongoing attempt to find a better
                * reduction of the number of the terminal symbols in comparison
                * to the original source text than the best one that is
                * currently known.
                * @type {!TSolution}
                * @see oSolutionBest
                */
               oSolutionCandidate = new TSolution(),
               /**
                * A record consisting of data about the range of source elements
                * that is currently being examined.
                * @type {!TSourceElementsData}
                */
               oSourceElementsData = new TSourceElementsData(),
               /**
                * Variable declarations for each primitive value that is to be
                * consolidated within the elements.
                * @type {!Array.<!Array>}
                */
               aVariableDeclarations = [],
               /**
                * Augments a list with a prefixed representation String.
                * @param {!Array.<string>} aList A list that is to be augmented.
                * @return {function(string)} A function that augments a list
                *     with a prefixed representation String.
                */
               cAugmentList = function(aList) {
                 /**
                  * @param {string} sPrefixed Prefixed representation String of
                  *     a primitive value that could be consolidated within the
                  *     elements.
                  */
                 var fLambda = function(sPrefixed) {
                   if (-1 === aList.indexOf(sPrefixed)) {
                     aList.push(sPrefixed);
                   }
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of a primitive value of a given
                * category that could be consolidated in the source element with
                * a given index to the count of occurrences of that primitive
                * value within the range of source elements that is currently
                * being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @param {number} nCategory The category of the primary
                *     expression from which the primitive value is derived.
                * @return {function(string)} A function that performs the
                *     addition.
                * @see cAddOccurrencesInCategory
                */
               cAddOccurrences = function(nPosition, nCategory) {
                 /**
                  * @param {string} sPrefixed The prefixed representation String
                  *     of a primitive value.
                  */
                 var fLambda = function(sPrefixed) {
                   if (!oSourceElementsData.aCount[nCategory].hasOwnProperty(
                           sPrefixed)) {
                     oSourceElementsData.aCount[nCategory][sPrefixed] = 0;
                   }
                   oSourceElementsData.aCount[nCategory][sPrefixed] +=
                       aSourceElementsData[nPosition].aCount[nCategory][
                           sPrefixed];
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of each primitive value of a
                * given category that could be consolidated in the source
                * element with a given index to the count of occurrences of that
                * primitive values within the range of source elements that is
                * currently being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @return {function(number)} A function that performs the
                *     addition.
                * @see fAddOccurrences
                */
               cAddOccurrencesInCategory = function(nPosition) {
                 /**
                  * @param {number} nCategory The category of the primary
                  *     expression from which the primitive value is derived.
                  */
                 var fLambda = function(nCategory) {
                   Object.keys(
                       aSourceElementsData[nPosition].aCount[nCategory]
                   ).forEach(cAddOccurrences(nPosition, nCategory));
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of each primitive value that
                * could be consolidated in the source element with a given index
                * to the count of occurrences of that primitive values within
                * the range of source elements that is currently being
                * considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                */
               fAddOccurrences = function(nPosition) {
                 Object.keys(aSourceElementsData[nPosition].aCount).forEach(
                     cAddOccurrencesInCategory(nPosition));
               },
               /**
                * Creates a variable declaration for a primitive value if that
                * primitive value is to be consolidated within the elements.
                * @param {string} sPrefixed Prefixed representation String of a
                *     primitive value that could be consolidated within the
                *     elements.
                * @see aVariableDeclarations
                */
               cAugmentVariableDeclarations = function(sPrefixed) {
                 if (oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0) {
                   aVariableDeclarations.push([
                     oSolutionBest.oPrimitiveValues[sPrefixed].sName,
                     [0 === sPrefixed.indexOf(EValuePrefixes.S_SYMBOLIC) ?
                      'name' : 'string',
                      sPrefixed.substring(EValuePrefixes.S_SYMBOLIC.length)]
                   ]);
                 }
               },
               /**
                * Sorts primitive values with regard to the difference in the
                * number of terminal symbols between the original source text
                * and the one with those primitive values consolidated.
                * @param {string} sPrefixed0 The prefixed representation String
                *     of the first of the two primitive values that are being
                *     compared.
                * @param {string} sPrefixed1 The prefixed representation String
                *     of the second of the two primitive values that are being
                *     compared.
                * @return {number}
                *     <dl>
                *         <dt>-1</dt>
                *         <dd>if the first primitive value must be placed before
                *              the other one,</dd>
                *         <dt>0</dt>
                *         <dd>if the first primitive value may be placed before
                *              the other one,</dd>
                *         <dt>1</dt>
                *         <dd>if the first primitive value must not be placed
                *              before the other one.</dd>
                *     </dl>
                * @see TSolution.oPrimitiveValues
                */
               cSortPrimitiveValues = function(sPrefixed0, sPrefixed1) {
                 /**
                  * The difference between:
                  * <ol>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     first primitive value consolidated, and</li>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     second primitive value consolidated.</li>
                  * </ol>
                  * @type {number}
                  */
                 var nDifference =
                     oSolutionCandidate.oPrimitiveValues[sPrefixed0].nSaving -
                     oSolutionCandidate.oPrimitiveValues[sPrefixed1].nSaving;

                 return nDifference > 0 ? -1 : nDifference < 0 ? 1 : 0;
               },
               /**
                * Assigns an identifier name to a primitive value and calculates
                * whether instances of that primitive value are worth
                * consolidating.
                * @param {string} sPrefixed The prefixed representation String
                *     of a primitive value that is being evaluated.
                */
               fEvaluatePrimitiveValue = function(sPrefixed) {
                 var _,
                     /**
                      * The index of the last mangled name.
                      * @type {number}
                      */
                     nIndex,
                     /**
                      * The representation String of the primitive value that is
                      * being evaluated.
                      * @type {string}
                      */
                     sName =
                         sPrefixed.substring(EValuePrefixes.S_SYMBOLIC.length),
                     /**
                      * The number of source characters taken up by the
                      * representation String of the primitive value that is
                      * being evaluated.
                      * @type {number}
                      */
                     nLengthOriginal = sName.length,
                     /**
                      * The number of source characters taken up by the
                      * identifier name that could substitute the primitive
                      * value that is being evaluated.
                      * substituted.
                      * @type {number}
                      */
                     nLengthSubstitution,
                     /**
                      * The number of source characters taken up by by the
                      * representation String of the primitive value that is
                      * being evaluated when it is represented by a string
                      * literal.
                      * @type {number}
                      */
                     nLengthString = oProcessor.make_string(sName).length;

                 oSolutionCandidate.oPrimitiveValues[sPrefixed] =
                     new TPrimitiveValue();
                 do {  // Find an identifier unused in this or any nested scope.
                   nIndex = oScope.cname;
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].sName =
                       oScope.next_mangled();
                 } while (-1 !== oSourceElementsData.aIdentifiers.indexOf(
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].sName));
                 nLengthSubstitution = oSolutionCandidate.oPrimitiveValues[
                     sPrefixed].sName.length;
                 if (0 === sPrefixed.indexOf(EValuePrefixes.S_SYMBOLIC)) {
                   // foo:null, or foo:null;
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving -=
                       nLengthSubstitution + nLengthOriginal +
                       oWeights.N_VARIABLE_DECLARATION;
                   // null vs foo
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                       oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.
                               N_NULL_AND_BOOLEAN_LITERALS][sPrefixed] *
                       (nLengthOriginal - nLengthSubstitution);
                 } else {
                   // foo:'fromCharCode';
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving -=
                       nLengthSubstitution + nLengthString +
                       oWeights.N_VARIABLE_DECLARATION;
                   // .fromCharCode vs [foo]
                   if (oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.N_IDENTIFIER_NAMES
                       ].hasOwnProperty(sPrefixed)) {
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                         oSourceElementsData.aCount[
                             EPrimaryExpressionCategories.N_IDENTIFIER_NAMES
                         ][sPrefixed] *
                         (nLengthOriginal - nLengthSubstitution -
                          oWeights.N_PROPERTY_ACCESSOR);
                   }
                   // 'fromCharCode' vs foo
                   if (oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.N_STRING_LITERALS
                       ].hasOwnProperty(sPrefixed)) {
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                         oSourceElementsData.aCount[
                             EPrimaryExpressionCategories.N_STRING_LITERALS
                         ][sPrefixed] *
                         (nLengthString - nLengthSubstitution);
                   }
                 }
                 if (oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving >
                     0) {
                   oSolutionCandidate.nSavings +=
                       oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving;
                 } else {
                   oScope.cname = nIndex; // Free the identifier name.
                 }
               },
               /**
                * Adds a variable declaration to an existing variable statement.
                * @param {!Array} aVariableDeclaration A variable declaration
                *     with an initialiser.
                */
               cAddVariableDeclaration = function(aVariableDeclaration) {
                 (/** @type {!Array} */ oSourceElements[nFrom][1]).unshift(
                     aVariableDeclaration);
               };

           if (nFrom > nTo) {
             return;
           }
           // If the range is a closure, reuse the closure.
           if (nFrom === nTo &&
               'stat' === oSourceElements[nFrom][0] &&
               'call' === oSourceElements[nFrom][1][0] &&
               'function' === oSourceElements[nFrom][1][1][0]) {
             fExamineSyntacticCodeUnit(oSourceElements[nFrom][1][1]);
             return;
           }
           // Create a list of all derived primitive values within the range.
           for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
             aSourceElementsData[nPosition].aPrimitiveValues.forEach(
                 cAugmentList(oSourceElementsData.aPrimitiveValues));
           }
           if (0 === oSourceElementsData.aPrimitiveValues.length) {
             return;
           }
           for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
             // Add the number of occurrences to the total count.
             fAddOccurrences(nPosition);
             // Add identifiers of this or any nested scope to the list.
             aSourceElementsData[nPosition].aIdentifiers.forEach(
                 cAugmentList(oSourceElementsData.aIdentifiers));
           }
           // Distribute identifier names among derived primitive values.
           do {  // If there was any progress, find a better distribution.
             oSolutionBest = oSolutionCandidate;
             if (Object.keys(oSolutionCandidate.oPrimitiveValues).length > 0) {
               // Sort primitive values descending by their worthwhileness.
               oSourceElementsData.aPrimitiveValues.sort(cSortPrimitiveValues);
             }
             oSolutionCandidate = new TSolution();
             oSourceElementsData.aPrimitiveValues.forEach(
                 fEvaluatePrimitiveValue);
             oScope.cname = nIndex;
           } while (oSolutionCandidate.nSavings > oSolutionBest.nSavings);
           // Take the necessity of adding a variable statement into account.
           if ('var' !== oSourceElements[nFrom][0]) {
             oSolutionBest.nSavings -= oWeights.N_VARIABLE_STATEMENT_AFFIXATION;
           }
           if (bEnclose) {
             // Take the necessity of forming a closure into account.
             oSolutionBest.nSavings -= oWeights.N_CLOSURE;
           }
           if (oSolutionBest.nSavings > 0) {
             // Create variable declarations suitable for UglifyJS.
             Object.keys(oSolutionBest.oPrimitiveValues).forEach(
                 cAugmentVariableDeclarations);
             // Rewrite expressions that contain worthwhile primitive values.
             for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
               oWalker = oProcessor.ast_walker();
               oSourceElements[nPosition] =
                   oWalker.with_walkers(
                       oWalkersTransformers,
                       cContext(oWalker, oSourceElements[nPosition]));
             }
             if ('var' === oSourceElements[nFrom][0]) {  // Reuse the statement.
               (/** @type {!Array.<!Array>} */ aVariableDeclarations.reverse(
                   )).forEach(cAddVariableDeclaration);
             } else {  // Add a variable statement.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom,
                   0,
                   ['var', aVariableDeclarations]);
               nTo += 1;
             }
             if (bEnclose) {
               // Add a closure.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom,
                   0,
                   ['stat', ['call', ['function', null, [], []], []]]);
               // Copy source elements into the closure.
               for (nPosition = nTo + 1; nPosition > nFrom; nPosition -= 1) {
                 Array.prototype.unshift.call(
                     oSourceElements[nFrom][1][1][3],
                     oSourceElements[nPosition]);
               }
               // Remove source elements outside the closure.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom + 1,
                   nTo - nFrom + 1);
             }
           }
           if (bEnclose) {
             // Restore the availability of identifier names.
             oScope.cname = nIndex;
           }
         };

     oSourceElements = (/** @type {!TSyntacticCodeUnit} */
         oSyntacticCodeUnit[bIsGlobal ? 1 : 3]);
     if (0 === oSourceElements.length) {
       return;
     }
     oScope = bIsGlobal ? oSyntacticCodeUnit.scope : oSourceElements.scope;
     // Skip a Directive Prologue.
     while (nAfterDirectivePrologue < oSourceElements.length &&
            'stat' === oSourceElements[nAfterDirectivePrologue][0] &&
            'string' === oSourceElements[nAfterDirectivePrologue][1][0]) {
       nAfterDirectivePrologue += 1;
       aSourceElementsData.push(null);
     }
     if (oSourceElements.length === nAfterDirectivePrologue) {
       return;
     }
     for (nPosition = nAfterDirectivePrologue;
          nPosition < oSourceElements.length;
          nPosition += 1) {
       oSourceElementData = new TSourceElementsData();
       oWalker = oProcessor.ast_walker();
       // Classify a source element.
       // Find its derived primitive values and count their occurrences.
       // Find all identifiers used (including nested scopes).
       oWalker.with_walkers(
           oWalkers.oSurveySourceElement,
           cContext(oWalker, oSourceElements[nPosition]));
       // Establish whether the scope is still wholly examinable.
       bIsWhollyExaminable = bIsWhollyExaminable &&
           ESourceElementCategories.N_WITH !== oSourceElementData.nCategory &&
           ESourceElementCategories.N_EVAL !== oSourceElementData.nCategory;
       aSourceElementsData.push(oSourceElementData);
     }
     if (bIsWhollyExaminable) {  // Examine the whole scope.
       fExamineSourceElements(
           nAfterDirectivePrologue,
           oSourceElements.length - 1,
           false);
     } else {  // Examine unexcluded ranges of source elements.
       for (nPosition = oSourceElements.length - 1;
            nPosition >= nAfterDirectivePrologue;
            nPosition -= 1) {
         oSourceElementData = (/** @type {!TSourceElementsData} */
             aSourceElementsData[nPosition]);
         if (ESourceElementCategories.N_OTHER ===
             oSourceElementData.nCategory) {
           if ('undefined' === typeof nTo) {
             nTo = nPosition;  // Indicate the end of a range.
           }
           // Examine the range if it immediately follows a Directive Prologue.
           if (nPosition === nAfterDirectivePrologue) {
             fExamineSourceElements(nPosition, nTo, true);
           }
         } else {
           if ('undefined' !== typeof nTo) {
             // Examine the range that immediately follows this source element.
             fExamineSourceElements(nPosition + 1, nTo, true);
             nTo = void 0;  // Obliterate the range.
           }
           // Examine nested functions.
           oWalker = oProcessor.ast_walker();
           oWalker.with_walkers(
               oWalkers.oExamineFunctions,
               cContext(oWalker, oSourceElements[nPosition]));
         }
       }
     }
   }