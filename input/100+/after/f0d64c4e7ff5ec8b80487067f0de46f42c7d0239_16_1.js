function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  svg = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Leisure.req('./prelude');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

Nil = Parse.Nil;
var cons = Parse.cons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var _insertFields, _svgTemplate, _svg, _svgFile, _field, _defaultCircleMap, _defaultRectMap, _defaultLineMap, _defaultEllipseMap, _defaultTextMap, _defaultPolygonMap, _svgNode, _svgNodes, _svgConcat, _svgElement, _svgMeasure, _svgPresent, _circle, _rect, _ellipse, _line, _text, _polygon, _group, _translate, _rotate;
processResult(//AST(require "maps")
(_require()((function(){return "maps"}))));
//insertFields = AST(λmap . if (null? map) "" (concat ([ (field (firstPair map)) , (insertFields (restPairs map)) ])))
root.defs._insertFields = _insertFields = Parse.define('insertFields', (function() {var f = (function(_map){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_field()((function(){var $m; return (function(){return $m || ($m = (_firstPair()(_map)))})})())))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_insertFields()((function(){var $m; return (function(){return $m || ($m = (_restPairs()(_map)))})})())))})})())(_$s)))})})())))})})());}); return function _insertFields(){return f;}})(), 1, "\\map. if (null? map) ''\n  concat [ (field (firstPair map)), (insertFields (restPairs map)) ]");
;
//svgTemplate = AST(λattrs contents . html (concat ([ "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" " , attrs , ">" , contents , "</svg>" ])))
root.defs._svgTemplate = _svgTemplate = Parse.define('svgTemplate', (function() {var f = (function(_attrs){return function(_contents){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))(_$b)(_attrs)(_$b)((function(){return ">"}))(_$b)(_contents)(_$b)((function(){return "</svg>"}))(_$s)))})})())))})})());};}); return function _svgTemplate(){return f;}})(), 2, "\\attrs. \\contents. html (concat [ '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', attrs, '>', contents, '</svg>'])");
;
//svg = AST(λo map . svgTemplate (concat ([ "style=\"width: " , (getHashValueDefault "width" 100 map) , "; height: " , (getHashValueDefault "height" 100 map) , "\"" ])) (o id))
root.defs._svg = _svg = Parse.define('svg', (function() {var f = (function(_o){return function(_map){return _svgTemplate()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "style=\"width: "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_getHashValueDefault()((function(){return "width"}))((function(){return 100}))(_map)))})})())(_$b)((function(){return "; height: "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_getHashValueDefault()((function(){return "height"}))((function(){return 100}))(_map)))})})())(_$b)((function(){return "\""}))(_$s)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_o()(_id)))})})());};}); return function _svg(){return f;}})(), 2, "\\o. \\map. svgTemplate (concat ['style=\"width: ', (getHashValueDefault 'width' 100 map), '; height: ' , (getHashValueDefault 'height' 100 map), '\"']) (o id)");
;
//svgFile = AST(λmap . html (concat ([ "<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" " , (insertFields map) , "</object>" ])))
root.defs._svgFile = _svgFile = Parse.define('svgFile', (function() {var f = (function(_map){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insertFields()(_map)))})})())(_$b)((function(){return "</object>"}))(_$s)))})})())))})})());}); return function _svgFile(){return f;}})(), 1, "\\map. html (concat [ '<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', (insertFields map), '</object>' ] )");
;
//field = AST(λcell . concat ([ (key cell) , "=\"" , (value cell) , "\" " ]))
root.defs._field = _field = Parse.define('field', (function() {var f = (function(_cell){return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_key()(_cell)))})})())(_$b)((function(){return "=\""}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_value()(_cell)))})})())(_$b)((function(){return "\" "}))(_$s)))})})());}); return function _field(){return f;}})(), 1, "\\cell. concat [ (key cell), '=\"', (value cell), '\" ' ]");
;
//defaultCircleMap = AST(hashFromList ([ "cx" , 50 , "cy" , 50 , "r" , 40 , "stroke" , "black" , "stroke-width" , 2 , "fill" , "red" ]))
root.defs._defaultCircleMap = _defaultCircleMap = Parse.define('defaultCircleMap', (function _defaultCircleMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "r"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "red"}))(_$s)))})})())));}), 0, "hashFromList [ 'cx', 50, 'cy', 50, 'r', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'red' ]");
;
//defaultRectMap = AST(hashFromList ([ "x" , 1 , "y" , 1 , "width" , 50 , "height" , 50 , "stroke" , "black" , "stroke-width" , 2 , "fill" , "green" ]))
root.defs._defaultRectMap = _defaultRectMap = Parse.define('defaultRectMap', (function _defaultRectMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 1}))(_$b)((function(){return "y"}))(_$b)((function(){return 1}))(_$b)((function(){return "width"}))(_$b)((function(){return 50}))(_$b)((function(){return "height"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "green"}))(_$s)))})})())));}), 0, "hashFromList [ 'x', 1, 'y', 1, 'width', 50, 'height', 50, 'stroke', 'black', 'stroke-width', 2, 'fill', 'green' ]");
;
//defaultLineMap = AST(hashFromList ([ "x1" , 0 , "y1" , 0 , "x2" , 50 , "y2" , 50 , "stroke" , "black" , "stroke-width" , 2 ]))
root.defs._defaultLineMap = _defaultLineMap = Parse.define('defaultLineMap', (function _defaultLineMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x1"}))(_$b)((function(){return 0}))(_$b)((function(){return "y1"}))(_$b)((function(){return 0}))(_$b)((function(){return "x2"}))(_$b)((function(){return 50}))(_$b)((function(){return "y2"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$s)))})})())));}), 0, "hashFromList [ 'x1', 0, 'y1', 0, 'x2', 50, 'y2', 50, 'stroke', 'black', 'stroke-width', 2 ]");
;
//defaultEllipseMap = AST(hashFromList ([ "cx" , 50 , "cy" , 50 , "rx" , 40 , "ry" , 40 , "stroke" , "black" , "stroke-width" , 2 , "fill" , "blue" ]))
root.defs._defaultEllipseMap = _defaultEllipseMap = Parse.define('defaultEllipseMap', (function _defaultEllipseMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "rx"}))(_$b)((function(){return 40}))(_$b)((function(){return "ry"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "blue"}))(_$s)))})})())));}), 0, "hashFromList [ 'cx', 50, 'cy', 50, 'rx', 40, 'ry', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'blue' ]");
;
//defaultTextMap = AST(hashFromList ([ "x" , 0 , "y" , 10 , "stroke" , "black" , "stroke-width" , 2 , "fill" , "black" ]))
root.defs._defaultTextMap = _defaultTextMap = Parse.define('defaultTextMap', (function _defaultTextMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 0}))(_$b)((function(){return "y"}))(_$b)((function(){return 10}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "black"}))(_$s)))})})())));}), 0, "hashFromList [ 'x', 0, 'y', 10, 'stroke', 'black', 'stroke-width', 2, 'fill', 'black' ]");
;
//defaultPolygonMap = AST(hashFromList ([ "points" , "350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161" , "stroke" , "black" , "stroke-width" , 2 , "fill" , "yellow" ]))
root.defs._defaultPolygonMap = _defaultPolygonMap = Parse.define('defaultPolygonMap', (function _defaultPolygonMap() {return ((_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "points"}))(_$b)((function(){return "350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161"}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "yellow"}))(_$s)))})})())));}), 0, "hashFromList [ 'points', '350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161', 'stroke', 'black', 'stroke-width', 2, 'fill', 'yellow' ]");
;
//svgNode = AST(λcontents f . f contents)
root.defs._svgNode = _svgNode = Parse.define('svgNode', (function() {var f = (Parse.setDataType(function(_contents){return Parse.setType(function(_f){return _f()(_contents);}, 'svgNode');}, 'svgNode')); return function _svgNode(){return f;}})(), 1, "\\contents. \\f . f contents");
;
//svgNodes = AST(λnodeList . nodeList λh t D . cons (h id) (svgNodes t) nil)
root.defs._svgNodes = _svgNodes = Parse.define('svgNodes', (function() {var f = (function(_nodeList){return _nodeList()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return (function(){return $m || ($m = (_h()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_svgNodes()(_t)))})})());};};}))})})())(_nil);}); return function _svgNodes(){return f;}})(), 1, "\\nodeList. nodeList (\\h t D . cons (h id) (svgNodes t)) nil");
;
//svgConcat = AST(λnodeList . svgNode (concat (svgNodes nodeList)))
root.defs._svgConcat = _svgConcat = Parse.define('svgConcat', (function() {var f = (function(_nodeList){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_svgNodes()(_nodeList)))})})())))})})());}); return function _svgConcat(){return f;}})(), 1, "\\nodeList. svgNode (concat (svgNodes nodeList))");
;
//svgElement = AST(λname map . svgNode (concat ([ "<" , name , " " , (insertFields map) , "/>" ])))
root.defs._svgElement = _svgElement = Parse.define('svgElement', (function() {var f = (function(_name){return function(_map){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<"}))(_$b)(_name)(_$b)((function(){return " "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insertFields()(_map)))})})())(_$b)((function(){return "/>"}))(_$s)))})})())))})})());};}); return function _svgElement(){return f;}})(), 2, "\\name. \\map. svgNode (concat [ '<', name, ' ', (insertFields map), '/>' ])");
;
//svgMeasure = AST(λcontent . primSvgMeasure content)
root.defs._svgMeasure = _svgMeasure = Parse.define('svgMeasure', (function() {var f = (function(_content){return _primSvgMeasure()(_content);}); return function _svgMeasure(){return f;}})(), 1, "\\content. primSvgMeasure content");
;
//svgPresent = AST(λcontent . svgMeasure content λx y w h . svgTemplate (concat ([ "width='" , w , "' height='" , h , "' viewbox='" , x , " " , y , " " , w , " " , h , "'" ])) content)
root.defs._svgPresent = _svgPresent = Parse.define('svgPresent', (function() {var f = (function(_content){return _svgMeasure()(_content)((function(){var $m; return (function(){return $m || ($m = (function(_x){return function(_y){return function(_w){return function(_h){return _svgTemplate()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "width='"}))(_$b)(_w)(_$b)((function(){return "' height='"}))(_$b)(_h)(_$b)((function(){return "' viewbox='"}))(_$b)(_x)(_$b)((function(){return " "}))(_$b)(_y)(_$b)((function(){return " "}))(_$b)(_w)(_$b)((function(){return " "}))(_$b)(_h)(_$b)((function(){return "'"}))(_$s)))})})())))})})())(_content);};};};}))})})());}); return function _svgPresent(){return f;}})(), 1, "\\content. svgMeasure content \\x y w h .\n  svgTemplate (concat [\"width='\", w, \"' height='\", h, \"' viewbox='\", x, ' ', y, ' ', w, ' ', h, \"'\"]) content");
;
//circle = AST(λmap . svgElement "circle" (if (null? map) defaultCircleMap map))
root.defs._circle = _circle = Parse.define('circle', (function() {var f = (function(_map){return _svgElement()((function(){return "circle"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultCircleMap)(_map)))})})());}); return function _circle(){return f;}})(), 1, "\\map. svgElement 'circle' (if (null? map) defaultCircleMap map)");
;
//rect = AST(λmap . svgElement "rect" (if (null? map) defaultRectMap map))
root.defs._rect = _rect = Parse.define('rect', (function() {var f = (function(_map){return _svgElement()((function(){return "rect"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultRectMap)(_map)))})})());}); return function _rect(){return f;}})(), 1, "\\map. svgElement 'rect' (if (null? map) defaultRectMap map)");
;
//ellipse = AST(λmap . svgElement "ellipse" (if (null? map) defaultEllipseMap map))
root.defs._ellipse = _ellipse = Parse.define('ellipse', (function() {var f = (function(_map){return _svgElement()((function(){return "ellipse"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultEllipseMap)(_map)))})})());}); return function _ellipse(){return f;}})(), 1, "\\map. svgElement 'ellipse' (if (null? map) defaultEllipseMap map)");
;
//line = AST(λmap . svgElement "line" (if (null? map) defaultLineMap map))
root.defs._line = _line = Parse.define('line', (function() {var f = (function(_map){return _svgElement()((function(){return "line"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultLineMap)(_map)))})})());}); return function _line(){return f;}})(), 1, "\\map. svgElement 'line' (if (null? map) defaultLineMap map)");
;
//text = AST(λt map . svgNode (concat ([ "<text " , (insertFields (if (null? map) defaultTextMap map)) , ">" , (if (null? t) "undefined" t) , "</text>" ])))
root.defs._text = _text = Parse.define('text', (function() {var f = (function(_t){return function(_map){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<text "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insertFields()((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultTextMap)(_map)))})})())))})})())(_$b)((function(){return ">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_t)))})})())((function(){return "undefined"}))(_t)))})})())(_$b)((function(){return "</text>"}))(_$s)))})})())))})})());};}); return function _text(){return f;}})(), 2, "\\t. \\map. svgNode (concat [ '<text ', (insertFields (if (null? map) defaultTextMap map)), '>', (if (null? t) 'undefined' t), '</text>' ])");
;
//polygon = AST(λmap . svgElement "polygon" (if (null? map) defaultPolygonMap map))
root.defs._polygon = _polygon = Parse.define('polygon', (function() {var f = (function(_map){return _svgElement()((function(){return "polygon"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultPolygonMap)(_map)))})})());}); return function _polygon(){return f;}})(), 1, "\\map. svgElement 'polygon' (if (null? map) defaultPolygonMap map)");
;
//group = AST(λelem . svgNode (concat ([ "<g>" , (elem id) , "</g>" ])))
root.defs._group = _group = Parse.define('group', (function() {var f = (function(_elem){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g>"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());}); return function _group(){return f;}})(), 1, "\\elem. svgNode (concat [ '<g>', (elem id), '</g>' ])");
;
//translate = AST(λelem x y . svgNode (concat ([ "<g transform=\"translate(" , x , ", " , y , ")\">" , (elem id) , "</g>" ])))
root.defs._translate = _translate = Parse.define('translate', (function() {var f = (function(_elem){return function(_x){return function(_y){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g transform=\"translate("}))(_$b)(_x)(_$b)((function(){return ", "}))(_$b)(_y)(_$b)((function(){return ")\">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());};};}); return function _translate(){return f;}})(), 3, "\\elem. \\x. \\y. svgNode (concat ['<g transform=\"translate(', x, ', ', y, ')\">', (elem id), '</g>' ])");
;
//rotate = AST(λelem r . svgNode (concat ([ "<g transform=\"rotate(" , r , ")\">" , (elem id) , "</g>" ])))
root.defs._rotate = _rotate = Parse.define('rotate', (function() {var f = (function(_elem){return function(_r){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g transform=\"rotate("}))(_$b)(_r)(_$b)((function(){return ")\">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());};}); return function _rotate(){return f;}})(), 2, "\\elem. \\r. svgNode (concat ['<g transform=\"rotate(', r, ')\">', (elem id), '</g>' ])");
;

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}