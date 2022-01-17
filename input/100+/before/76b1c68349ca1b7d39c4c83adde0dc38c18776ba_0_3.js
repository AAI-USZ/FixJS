function(){

"use strict";
  // this function is strict...

// If there is no window.console, we'll make one up.
if (!window.console){
        $(document).ready(function() {
                var consoleDiv = $("<div id='console'/>");
                $(document.body).append(consoleDiv);
                consoleDiv.css("position", "absolute");
                consoleDiv.css("right", "10px");
                consoleDiv.css("top", "10px");
                consoleDiv.css("width", "300px");
                consoleDiv.css("height", "500px");
                consoleDiv.css("background-color", "white");
                consoleDiv.css("border", "1px solid red");
                consoleDiv.css("overflow", "scroll");
                window.console = { log: function() {
                                            var i;
                                            for (i = 0; i < arguments.length; i++) {
                                                consoleDiv.append($("<span/>").text(arguments[i]));
                                                consoleDiv.append($("<br/>")); 
                                             }
                                        }
                                 };
                
                 

        });
} 





/*====================================================================================
 ___       _          ___       __ _      _ _   _             
|   \ __ _| |_ __ _  |   \ ___ / _(_)_ _ (_) |_(_)___ _ _  ___
| |) / _` |  _/ _` | | |) / -_)  _| | ' \| |  _| / _ \ ' \(_-<
|___/\__,_|\__\__,_| |___/\___|_| |_|_||_|_|\__|_\___/_||_/__/
                                                               
=====================================================================================*/

/*
program is an array of makeDefineFunc/makeDefineVar/Expressions that make up the user's program
on the screen.
*/
var program = [];

/*
Constucts the define function block given a contract, a list of arguments (a list of variables), 
and an expression which is an expression object

(define (add2 x) (+ x 2)) =>
makeDefineFunc(contract1, ["x"], makeApp("+", [makeVariable("x"), 2]))

contract1 = makeContract("add2", ["Numbers"], "Numbers")

expr = the expr, not a list, an object
*/
var ExprDefineFunc = function(){
        this.contract = new ExprContract();
        this.argumentNames = undefined;
        this.expr = undefined;
        this.funcIDList = makeIDList(1);
        this.id = makeID();
};

var ExprContract = function(){
        this.funcName = undefined;
        this.argumentTypes = undefined;
        this.outputType = undefined;
        this.id = makeID();
};

/*
Constucts the define variable block given a name (string), an expression which is an expression 
object, and an output type

(define x 3) =>
ExprDefinevar("x", ExprNum(3), "Numbers")

(define y (+ 2 x)) =>
ExprDefineVar("y", (ExprApp("+", [ExprNum("2"), ExprVar("x")))
*/
var ExprDefineConst = function(){
        this.constName = undefined;
        this.expr = undefined;
        this.outputType = undefined; //MAKE SURE THIS WILL BE DEFINED!!!!
        this.id = makeID();
};

/*
Returns true if the object is a literal or constant, false otherwise.
*/
function isLiteral (obj){
        return (
        obj instanceof ExprString ||
        obj instanceof ExprNumber ||
        obj instanceof ExprConst);
}

/*
Returns true if the object is a definition, false otherwise
*/
function isDefine (obj){
        return (obj instanceof ExprDefineConst || obj instanceof ExprDefineFunc);
}

/*
Constructs an application of an operator given the name, arguments, and output type. The arguments 
is an array of expressions. Value is initially initialized to null.
expr is a list of objects (one for each argument)
*/
var ExprApp = function(funcName, args){
        this.funcName = funcName;
        this.funcIDList = makeIDList(args.length);
        this.args = args;
        this.outputType = getOutput(funcName);
        this.id = makeID();
};

/*
Constructs a string given the contents of the string (str).
The value of the string is initialized as an empty string "". <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var ExprString= function(){
        this.value = "";
        this.outputType = "Strings";
        this.id = makeID();
};

/*
Constructs a number given a number num.
*/
var ExprNumber = function(){
        this.value = undefined;
        this.outputType = "Numbers";
        this.id = makeID();
};

/*
NOTE: Not sure if necessary
Constructs a variable object given a name of type string.
*/
var ExprConst = function(constName){
        this.constName = constName;
        //this.outputType = getConstantType(constName);
        this.id = makeID();
};

/*
Constructs a boolean true or false (else == true)
*/
var ExprBoolean = function(value){
        this.value=value;
        this.outputType = "Booleans";
        this.id = makeID();
};

/*
Constructs a tuple of boolean and answer to use in a cond expression
*/
var ExprBoolAnswer=function(){
        this.bool = undefined;
        this.answer = undefined;
        this.outputType = undefined;
        this.id = makeID();
};


/*
Constructs a conditional statement given a list of tuples, formatted: (expr, expr)
The first expression has to be a boolean

(cond
        [(true) 2]
        [(false) 1]
) =>
ExprCond(list1)
list1 = [ExprBoolAnswer(ExprBoolean(true),ExprNum(2)).ExprBoolAnswer(ExprBoolean(False),ExprNum(1))]
*/
var ExprCond = function(){
        this.listOfBooleanAnswer=[new ExprBoolAnswer()];
        this.outputType = undefined;
        this.id = makeID();

};



//Functions is an array of objects containing a name, tuples of type and name corresponding to their inputs and an output type
var functions=[];
functions[0]={};
functions[0].name="+";
functions[0].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[0].output="Numbers";
functions[1]={};
functions[1].name="-";
functions[1].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[1].output="Numbers";
functions[2]={};
functions[2].name="*";
functions[2].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[2].output="Numbers";
functions[3]={};
functions[3].name="/";
functions[3].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[3].output="Numbers";
functions[4]={};
functions[4].name="remainder";
functions[4].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[4].output="Numbers";
functions[5]={};
functions[5].name="sqrt";
functions[5].input=[{type:"Numbers",name:"Exp1"}];
functions[5].output="Numbers";
functions[6]={};
functions[6].name="sqr";
functions[6].input=[{type:"Numbers",name:"Exp1"}];
functions[6].output="Numbers";
functions[7]={};
functions[7].name="expt";
functions[7].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[7].output="Numbers";
functions[8]={};
functions[8].name="=";
functions[8].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[8].output="Booleans";
functions[9]={};
functions[9].name=">";
functions[9].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[9].output="Booleans";
functions[10]={};
functions[10].name="<";
functions[10].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[10].output="Booleans";
functions[11]={};
functions[11].name="<=";
functions[11].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[11].output="Booleans";
functions[12]={};
functions[12].name=">=";
functions[12].input=[{type:"Numbers",name:"Exp1"},{type:"Numbers",name:"Exp2"}];
functions[12].output="Booleans";
functions[13]={};
functions[13].name="even?";
functions[13].input=[{type:"Numbers",name:"Exp1"}];
functions[13].output="Booleans";
functions[14]={};
functions[14].name="odd?";
functions[14].input=[{type:"Numbers",name:"Exp1"}];
functions[14].output="Booleans";
functions[15]={};
functions[15].name="string-append";
functions[15].input=[{type:"Strings",name:"String1"},{type:"Strings",name:"String2"}];
functions[15].output="Strings";
functions[16]={};
functions[16].name="string-length";
functions[16].input=[{type:"Strings",name:"String1"}];
functions[16].output="Numbers";
functions[17]={};
functions[17].name="string=?";
functions[17].input=[{type:"Strings",name:"String1"},{type:"Strings",name:"String2"}];
functions[17].output="Booleans";
functions[18]={};
functions[18].name="and";
functions[18].input=[{type:"Booleans",name:"Boolean Exp1"},{type:"Booleans",name:"Boolean Exp2"}];
functions[18].output="Booleans";
functions[19]={};
functions[19].name="or";
functions[19].input=[{type:"Booleans",name:"Boolean Exp1"},{type:"Booleans",name:"Boolean Exp2"}];
functions[19].output="Booleans";
functions[20]={};
functions[20].name="not";
functions[20].input=[{type:"Booleans",name:"Boolean Exp1"}];
functions[20].output="Booleans";
functions[21]={};
functions[21].name="rectangle";
functions[21].input=[{type:"Numbers",name:"Width"},{type:"Numbers",name:"Height"}, {type:"Strings", name:"Outline"}, {type:"Strings",name:"Color"}];
functions[21].output="Images";
functions[22]={};
functions[22].name="circle";
functions[22].input=[{type:"Numbers",name:"Radius"}, {type:"Strings", name:"Outline"}, {type:"Strings",name:"Color"}];
functions[22].output="Images";
functions[23]={};
functions[23].name="triangle";
functions[23].input=[{type:"Numbers",name:"Length"}, {type:"Strings", name:"Outline"}, {type:"Strings",name:"Color"}];
functions[23].output="Images";
functions[24]={};
functions[24].name="ellipse";
functions[24].input=[{type:"Numbers",name:"A"},{type:"Numbers",name:"B"}, {type:"Strings", name:"Outline"}, {type:"Strings",name:"Color"}];
functions[24].output="Images";
functions[25]={};
functions[25].name="star";
functions[25].input=[{type:"Numbers",name:"Side-Length"}, {type:"Strings", name:"Outline"}, {type:"Strings",name:"Color"}];
functions[25].output="Images";
functions[26]={};
functions[26].name="scale";
functions[26].input=[{type:"Numbers",name:"Multiple"},{type:"Images",name:"Image"}];
functions[26].output="Images";
functions[27]={};
functions[27].name="rotate";
functions[27].input=[{type:"Numbers",name:"Degrees"},{type:"Images",name:"Image"}];
functions[27].output="Images";
functions[28]={};
functions[28].name="place-image";
functions[28].input=[{type:"Images",name:"Image"}, {type:"Numbers",name:"x"},{type:"Numbers",name:"y"},{type:"Images",name:"Background"}];
functions[28].output="Images";

//constants is an array of user defined variables containing their name and type
var constants=[];

//restricted contains a list of key words in racket that we aren't allowing the user to redefine
var restricted=["lambda","define","list","if","else","cond","foldr","foldl","map","let","local"];

//pre-defined and user-defined types
var types=["Numbers","Strings","Booleans","Images"];

//Colors is an object containing kv pairs of type to color
var colors={};
 colors.Numbers="#33CCFF";
 colors.Strings="#FFA500";
 colors.Images="#66FF33";
 colors.Booleans="#CC33FF";
 colors.Define="#FFFFFF";
 colors.Expressions="#FFFFFF";
 colors.Constants="#FFFFFF";

/*
history of the program state. Updated when the user changes something about the program (i.e.
adds a block, moves a block, deletes something, etc.)
*/
var history = [];

/*====================================================================================
   ___ _     _          _  __   __        _      _    _        
  / __| |___| |__  __ _| | \ \ / /_ _ _ _(_)__ _| |__| |___ ___
 | (_ | / _ \ '_ \/ _` | |  \ V / _` | '_| / _` | '_ \ / -_|_-<
  \___|_\___/_.__/\__,_|_| _ \_/\__,_|_| |_\__,_|_.__/_\___/__/
 / _|___  | __|  _ _ _  __| |_(_)___ _ _  ___                  
 > _|_ _| | _| || | ' \/ _|  _| / _ \ ' \(_-<                  
 \_____|  |_| \_,_|_||_\__|\__|_\___/_||_/__/                  
                                                                
=====================================================================================*/

// These variables store what the height and width of the code div should be
var codeHeight;
var codeWidth;
// Which Drawer type is currently being displayed
var activated;
// which text block in the #code div is currently being focused
var focused=null;
// ID that matches together a code object and an HTML element
var ID =0;


//resizes code div when the window is resized
function onResize(){
        codeHeight = window.innerHeight - $("#header").height() - $("#Drawer").height();
        codeWidth = window.innerWidth;
        $("#code").height(codeHeight);
        $("#code").width(codeWidth);
        $("#List").height(codeHeight - 150);
        $("#List").width(codeWidth - 150);
}


$(document).ready(function(){
        //When the window is resized, the height of the width of the code div changes
        $(window).resize(onResize);
        onResize();

        //draws drawers when the page is loaded
        makeDrawers(functions,constants);

        // activated is initially set to "Numbers"
        activated = $("#options #Numbers");
        activated.css("visibility", "visible");

        /*
        adds a stylesheet to <head> such that blocks can be colored according to their type
        */
    renderTypeColors();
    
    /*
    sets focus equal to the input that is focused. 
    */
    $("#List input").live('focus',function(){
        focused=$(this);
    });

    var formValidation = function(e){
                        //e.preventDefault();
                        //if focused is not null and if you are clicking something else besides the focused object
                    if(focused !==null && $(e.target).attr("id") !== focused.attr("id")){
                        var inputtext=focused.val();
                        var codeObject = searchForIndex(focused.closest($("table")).attr("id"),program);
                        //NUMBERS
                        if(focused.closest($("table")).hasClass("Numbers")){
                                if(isNaN(Number(inputtext))){
                                        focused.css("background-color", colors.Expressions);
                                        e.stopPropagation();
                                        alert("Please only enter a number into this text field");
                                        focused.focus();
                                        return;
                                } 
                                else{
                                        console.log(program);
                                        
                                        codeObject.value = inputtext;

                                                focused.css("background-color", colors.Numbers);
                                        focused=null;
                                }
                        }

                        //STRINGS
                        else if(focused.closest($("table")).attr("class")==="Strings"){
                                codeObject.value = inputtext;
                                        focused=null;
                        }
                        //TODO saving values
                    }
                };
    $(document.body).live('click', formValidation);
});

/*
        adds a stylesheet to <head> such that blocks can be colored according to their type
*/
function renderTypeColors(){
        var styleCSS = "<style type='text/css'>";
        for (var type in colors){
                if (colors.hasOwnProperty(type)) {
                        styleCSS+="."+encode(type)+"{background-color:"+colors[type]+";}";
                }
        }
        styleCSS += "</style>";
        $(styleCSS).appendTo("head");
}

/*
Given an id from an HTML element, getCodeObject returns the corresponding code Object
within the programs array.
*/
// function getCodeObject(id){
//      for(var i = 0; i < program.length ; i++){
//              if (program[i].id == id){
//                      return program[i];
//              }
//      }
//      throw new Error("Can't find code object");
// }

//takes in id from DOMelement (#) and returns code object (internal representation of html blocks)
// function getProgramIndex(id, arr){
//      for(var i = 0; i < program.length ; i++){
//              if (program[i].id == id){
//                      return program[i];
//              } else if (program[i] instanceof makeDefineFunc){

//              }
//      }
//      throw new Error("Can't find code object");
// }

/*
A function for Arrays that takes in an id (String) and outputs the code object which has
the same id
DO COND!
*/

// TODO: avoid the monkeypatch here.
function searchForIndex(id,array){
        for(var i=0; i<array.length;i++){
                if(array[i].id===id){
                        return array[i];
                }
                else if(array[i] instanceof ExprDefineFunc || array[i] instanceof ExprDefineConst){
                        if(array[i].expr.id===id){
                                return array[i].expr;
                        }
                        else if(array[i].expr instanceof ExprApp){
                                return searchForIndex(id,array[i].expr.args);
                        }
                }
                else if(array[i] instanceof ExprApp){
                        return searchForIndex(id,array[i].args);
                }
        }
        //throw new Error("Can't find code object");
}

//DELETE WHEN DONE WITH REMOVE PROGRAM THIGN
// $("#trash").droppable({
//      accept: ".expr, .Define",
//      drop: function(event, ui){
//              history[history.length] = program;
//              $(ui.draggable).remove();
//              removeFromProgram($(ui.draggable).id);
//      }
// })




// //tries to remove id block within program array
// function removeFromProgram(id){
//      for (var i = 0; i < program.length; i++){
//              if (program[i].id == id){
//                      program.splice(i, 1);
//              }
//               else if (isDefine(program[i])){
//                      removeExpression(id, program[i])
//              }
//              else if(program[i] instanceof ExprCond){
//                      //removeCond(id,program[i])
//              }
//               else if(program[i] instanceof ExprApp){
//                      removeApp(id,program[i])
//              }
//      }
// }


// //tries to remove id block within define block
// function removeExpression(id, codeObject){
//      if (codeObject.expr.id == id){
//              codeObject.expr = null;
//      } else if (codeObject.expr instanceof ExprApp){
//              removeApp(id, codeObject.expr)
//      } else if (arg instanceof ExprCond){
//              //removeCond(something)
//      }
// }

// //tries to remove id block within app
// function removeApp(id,parent){
//      for (var i = 0; i < parent.args.length; i++){
//              if (parent.args[i].id == id){
//                      parent.args[i] = null;
//              }
//              else if (parent.args[i] instanceof ExprApp){
//                      removeApp(id, parent.args[i])
//              }
//              else if (parent.args[i] instanceof ExprCond){
//                      //removeCond(something)
//              }
//      }
// }

// Returns a string representing an ID used for an HTML element and its corresp. code object
function makeID(){
        return String(ID++);
}

/* 
Returns an array of strings representing IDs. Used for functions such that every argument
can have an ID
*/
function makeIDList(num){
        var toReturn = [];
        for(var i = 0; i<num; i++){
                toReturn[i] = makeID();
        }
        return toReturn;
}

//containsName takes in an array of objects and a string and returns the index at which that string is the name property of any of the objects
function containsName(array_of_obj,stringElement){
        var contain=-1;
        for (var i = 0; i < array_of_obj.length; i++) {
                if(array_of_obj[i].name===stringElement){
                        contain=i;
                         break;
                }
        }
        return contain;
}

/*====================================================================================
  ___                            ___             _   _             
 |   \ _ _ __ ___ __ _____ _ _  | __|  _ _ _  __| |_(_)___ _ _  ___
 | |) | '_/ _` \ V  V / -_) '_| | _| || | ' \/ _|  _| / _ \ ' \(_-<
 |___/|_| \__,_|\_/\_/\___|_|   |_| \_,_|_||_\__|\__|_\___/_||_/__/
                       
=====================================================================================*/

//During the course of the whole session, drawers can be opened and closed to reveal all of the buttons (functions) that they contain
$(".bottomNav").live('click', function(e){
    drawerButton($(this));
});

//DrawerButton takes in an element and either activates (shows) or deactivates (hides) the current element to show the new one
function drawerButton(elt){
                activated.css("visibility","hidden");
                activated = $("#options #" + elt.attr('id'));
                activated.css("visibility", "visible");
}

//makeTypesArray will construct an object of kv pairs such that each type's value is an array of all indices to which that type is the output or the exclusive input
function makeTypesArray(allFunctions,allConstants){
        var types={};
        for(var i=0;i<allFunctions.length;i++){
                var curOutput=allFunctions[i].output;
                if(types[curOutput]!==undefined){
                        types[curOutput].push(i);
                }
                else{
                        types[curOutput]=[i];
                }


                var curInput=allFunctions[i].input;
                if(unique(curInput) && curInput.length>0){
                        var addition=curInput[0].type;
                        if( types[addition]!==undefined ){
                                if( types[addition][ types[addition].length-1 ]!==i ){
                                        types[addition].push(i);
                                }
                        }
                        else{
                                 types[addition]=[i];
                        }
                }
        }
        types.Constants=[];
        for(i=0;i<allConstants.length;i++){
                types.Constantstypes.Constants.length=i;
        }

        types.Define=["define-constant","define-function","define-struct"];
        types.Expressions=["cond"];
        types.Booleans.unshift("true","false");
        types.Numbers.unshift("Number");
        types.Strings.unshift("Text");

        return types;

        $("")
}

//unique takes as input an array and outputs if there is only one type in the whole array
// (arrayof input-tuple) -> boolean
function unique(array_inputs){
        if(array_inputs.length>0){
                var first=array_inputs[0].type;
                for(var i=1;i<array_inputs.length;i++){
                        if(first!==array_inputs[i].type){
                                return false;
                        }
                }
        }
        return true;
}

//makeDrawers takes in all of the functions and all of the constants and will change the HTML so that each of the types is an openable drawer and when that drawer is opened
//all of the functions corresponding to that type are displayed
// INJECTION ATTACK FIXME
function makeDrawers(allFunctions,allConstants){
        var typeDrawers=makeTypesArray(allFunctions,allConstants);
        var Drawers="<div id=\"options\">\n";
        var Selector="<div id=\"selectors\">\n";
        var i;
        for(var Type in typeDrawers){
                if(typeDrawers.hasOwnProperty(Type)){
                Drawers+="<div id=\""+Type+"\">\n";
                if(Type==="Constants"){
                        for(i=0;i<typeDrawers[Type].length;i++){
                                Drawers+="<span class=\"draggable "+Type+"\">"+allConstants[typeDrawers[Type][i]].name+"</span>\n";
                        }
                }
                else if(Type==="Define"){
                        for(i=0;i<typeDrawers[Type].length;i++){
                                Drawers+="<span class=\"draggable "+Type+"\">"+typeDrawers[Type][i]+"</span>\n";
                        }
                }
                else if(Type==="Expressions"){
                        for(i=0;i<typeDrawers[Type].length;i++){
                                Drawers+="<span class=\"draggable "+Type+"\">"+typeDrawers[Type][i]+"</span>\n";
                        }
                }
                else{
                        for(i=0;i<typeDrawers[Type].length;i++){
                                if(typeDrawers[Type][i]==="true"){
                                        Drawers+="<span class=\"Booleans draggable\">true</span>\n";
                                }
                                else if(typeDrawers[Type][i]==="false"){
                                        Drawers+="<span class=\"Booleans draggable\">false</span>\n";
                                }
                                else if(typeDrawers[Type][i]==="Text"){
                                        Drawers+="<span class=\"Strings draggable\">Text</span>\n";
                                }
                                else if(typeDrawers[Type][i]==="Number"){
                                        Drawers+="<span class=\"Numbers draggable\">Number</span>\n";
                                }
                                else{
                                Drawers+="<span class=\"draggable "+allFunctions[typeDrawers[Type][i]].output+"\">"+allFunctions[typeDrawers[Type][i]].name+"</span>\n";
                        }
                        }
                }

                Drawers+="</div>\n";
                Selector+="<div class=\""+Type+" bottomNav\" id=\""+Type+"\">"+Type+"</div>\n";
        }
        }

        Drawers+="</div>";
        Selector+="</div>";
        document.getElementById("Drawer").innerHTML=Drawers+"\n"+Selector;
}


/*====================================================================================
  ___                                ___             _         _           
 | _ \_ _ ___  __ _ _ _ __ _ _ __   | _ \___ _ _  __| |___ _ _(_)_ _  __ _ 
 |  _/ '_/ _ \/ _` | '_/ _` | '  \  |   / -_) ' \/ _` / -_) '_| | ' \/ _` |
 |_| |_| \___/\__, |_| \__,_|_|_|_| |_|_\___|_||_\__,_\___|_| |_|_||_\__, |
              |___/                                                  |___/ 
=====================================================================================*/


//changes the program array when a draggable element is clicked
// $("#options span").live('click',function(){
//      //TODO, change where in the program the block is added
//      $("#List").append("<li>" + createBlock(makeCodeFromOptions($(this).text())));
// });


/*
Adds a block to the end of the list given the HTML of the block.
*/
// function renderBlocktoProgram(block){
//              document.getElementById("List").appendChild(block);
// }

/*
Gets the output type of a function
*/
function getOutput(funcname){
        var index=containsName(functions,funcname);
        if(index!==-1){
                return functions[index].output;
        }
}

/*
Given the text within the options span, returns the code object associated with it.
*/
function makeCodeFromOptions(optionsText){
        var i;
        if(optionsText === "define-function"){
                        return new ExprDefineFunc();
                } else if (optionsText === "define-constant"){
                        return new ExprDefineConst();
                } else if (optionsText === "cond"){
                        return new ExprCond([new ExprBoolAnswer()]);
                } 
                else if(optionsText==="true" || optionsText==="false"){
                        return new ExprBoolean(optionsText);
                }
                else if(optionsText==="Text"){
                        return new ExprString();
                }
                else if(optionsText==="Number"){
                        return new ExprNumber();
                }
                else if(optionsText==="define-struct"){
                        //todo
                        return;
                }
                else{
                        for(i = 0; i < functions.length; i++){
                                if (functions[i].name === optionsText){
                                        return new ExprApp(optionsText, [functions[i].input.length]);
                                }
                        }
                        for(i=0;i<constants.length;i++){
                                if (constants[i].name === optionsText){
                                        return new ExprConst(optionsText);
                                }
                        }
                        throw new Error("createBlock: internal error");
                }
        }

/*
createBlock takes in a code object and outputs the corresponding DOMElement block to that function
createBlock: code object -> element
*/
function createBlock(codeObject){
        var i;
        if(codeObject instanceof ExprDefineFunc){
                return createDefineBlock(codeObject);
        } else if (codeObject instanceof ExprDefineConst){
                return createDefineVarBlock(codeObject);
        }/* else if (codeObject instanceof ExprDefineStruct){
                return stringToElement(createDefineStructBlock());
        }*/ else if (codeObject instanceof ExprCond){
                return createCondBlock(codeObject);
        } else if (codeObject instanceof ExprConst){
                for(i = 0; i < constants.length; i++){
                        if (encode(constants[i].name) === encode(codeObject.constName)){
                                return createConstantBlock(constants[i], codeObject);
                        }
                }
                throw new Error("createBlock: internal error");
        } else if (codeObject instanceof ExprApp){
                for(i = 0; i < functions.length; i++){
                        if (encode(functions[i].name) === encode(codeObject.funcName)){
                                return createFunctionBlock(i, codeObject);
                        }
                }
                throw new Error("createBlock: internal error");
        } else if (codeObject instanceof ExprNumber){
                return createNumBlock(codeObject);
        } else if (codeObject instanceof ExprString){
                return createStringBlock(codeObject);
        } else if (codeObject instanceof ExprBoolean){
                return createBooleanBlock(codeObject);
        }
        
 }

/*
encode takes in a string and encodes it such that bugs resulting from &, ", #, etc are eliminated"
decode does something similar for the same purpose
*/
function encode(string){
            return String(string)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
function decode(string){
        return String(string)
                .replace('&amp;', '&')
            .replace('&quot;','\"')
            .replace('&#39;','\'')
            .replace('&lt;',"<")
            .replace('&gt;',">");
}



/*
createFunctionBlock takes as input a functionIndex and will output an HTML element corresponding to 
that function with name, color, and spaces for input blocks
 createFunctionBlock: number -> string
 */
 function createFunctionBlock(functionIndex, codeObject){
        var func = functions[functionIndex];
        var block = "<table class=\"expr " + func.output  +"\"" + "id=\""+codeObject.id+"\">";
        block += "<tr><th>" + encode(func.name) + "</th>";
        for(var i = 0; i < func.input.length; i++){
                block += "<th class=\"" + encode(func.input[i].type) +" droppable\" id=\""+codeObject.funcIDList[i]+"\">" + func.input[i].name + "</th>";
        }
        return block + "</tr></table>";
 }

//createDefineBlock outputs the block corresponding to defining a function
function createDefineBlock(codeObject){
        var block ="<table class=\"Define\" style=\"background: " + colors.Define +";\"" + "id=\""+codeObject.id+"\">";
        //contract
        block+="<tr><th><input id=\"name\"></th><th> : </th><th>"+generateTypeDrop()+"</th><th> <button class=\"buttonPlus\">+</button> </th><th> -> </th><th>"+generateTypeDrop()+"</th></th></tr>";
        //define block
        block+="<tr><th>define</th>";
        block+="<th class=\"expr\"> <input type=\"Name\" id=\"Name\" name=\"Name\"/><th class=\"expr\">args <th  class=\"expr\">expr";
        return block + "</tr></table>";
}

//createDefineVarBlock outputs the block corresponding to creating a variable
function createDefineVarBlock(codeObject){
        var block = "<table class=\"Define\" " + "id=\""+codeObject.id+"\"><tr><th>define</th>";
        block+="<th class=\"expr\"> <input type=\"Name\" id=\"Name\" name=\"Name\"/> <th  class=\"expr\">expr</th>";
        return block + "</tr></table>";
}

//createDefineStructBlock outputs the block corresponding to creating a structure
function createDefineStructBlock(codeObject){
        var block ="<table class=\"Define\" " + "id=\""+codeObject.id+"\"><tr><th>define-struct</th>";
        block+="<th class=\"expr\"><input type=\"Name\" id=\"Name\" name=\"Name\"/><th class=\"expr\">properties";
        return block + "</tr></table>";
}

//createCondBlock outputs the block corresponding to creating a conditional
function createCondBlock(codeObject){
        var block =  "<table class=\"expr Expressions\" " + "id=\""+codeObject.id+"\"><tr><th>cond</tr>";
        block+="<tr><th><th class=\"Booleans expr\">boolean <th class=\"expr\">expr</tr>";
        block+="<tr><th><th><button class=\"buttonCond\">+</button></th></tr>";
        return block + "</table>";
}

function createConstantBlock(constantelement, codeObject){
        var block =  "<table class=\"expr " + encode(constantelement.type)+"\" " + "id=\""+codeObject.id+"\"><tr><th>"+encode(constantelement.name)+"</tr>";
        return block + "</table>";
}

function createBooleanBlock(codeObject){
        var block =  "<table class=\"Booleans expr\" " + "id=\""+codeObject.id+"\"><tr><th>"+codeObject.value+"</tr>";
        return block + "</table>";
}
function createNumBlock(codeObject){
        var block =  "<table class=\"Numbers expr\" " + "id=\""+codeObject.id+"\" width=\"10px\"><tr><th><input style=\"width:50px;\"></tr>";
        return block + "</table>";
}
function createStringBlock(codeObject){
        var block =  "<table class=\"Strings expr\" " + "id=\""+codeObject.id+"\"><tr><th>\"<input class=\"Strings\">\"</tr>";
        return block + "</table>";
}

function stringToElement(string){
        var wrapper= document.createElement('div');
        wrapper.innerHTML=string;
        return wrapper.firstChild;
}

/*
Creates a drop down menu for use in the contract in order to select types.
*/
function generateTypeDrop(){
        var HTML = "<select name=\"TypeDrop\"><option value=\"select\">select</option>";
        for(var i=0;i<types.length;i++){
                HTML+="<option value=\""+ types[i] +"\" class=\""+ types[i]+"\">"+ types[i] +"</option>";
        }
        return HTML+"<option value=\"delete\">delete</option></select>";
}


/*====================================================================================
  ___     _                        _           
 |_ _|_ _| |_ ___ _ _ _ __ _ _ ___| |_ ___ _ _ 
  | || ' \  _/ -_) '_| '_ \ '_/ -_)  _/ -_) '_|
 |___|_||_\__\___|_| | .__/_| \___|\__\___|_|  
                     |_|                       
=====================================================================================*/

/*
parseProgram takes in the entire program array and runs it through the interpreter
*/
function parseProgram(){
        var racketCode="";
        for(var i=0;i<program.length;i++){
                racketCode+=interpreter(program[i])+"\n";
        }
        return racketCode;
}

/*
The interpreter translates our representation of the program array to Racket code
*/
function interpreter(obj){
    var toReturn = "";
    var i;
    if(obj instanceof ExprDefineConst){
        toReturn += "(define " + obj.constName + " \n" + interpreter(obj.expr) + ")";
    }else if(obj instanceof ExprDefineFunc){
        toReturn += ";" + obj.contract.funcName + ":";
        for(i = 0; i < obj.contract.argumentTypes.length; i++){
                    toReturn += " " + obj.contract.argumentTypes[i];
        }
        toReturn += "-> " + obj.contract.outputType + "\n";
        toReturn += "(define (" + obj.contract.funcName;
        for(i = 0; i < obj.argumentNames.length; i++){
            toReturn += " " + obj.argumentNames[i];
        }
        toReturn += ") \n" + interpreter(obj.expr);
    }else if(obj instanceof ExprApp){
        toReturn += "(" + decode(obj.funcName);
        for(i=0; i < obj.args.length; i++){    
            toReturn += " " + interpreter(obj.args[i]);
        }
        toReturn += ")";
    }else if(obj instanceof ExprNumber || obj instanceof ExprBoolean){
        toReturn += obj.value;
    }else if(obj instanceof ExprString){
        toReturn += "\"" + obj.value + "\"";
    }else if(obj instanceof ExprConst){
        toReturn += decode(obj.constName);
    }else if(obj instanceof ExprCond){
        toReturn += "(cond\n";
        for(i = 0; i < obj.listOfBooleanAnswer.length; i++){
            toReturn += "[" + interpreter(obj.listOfBooleanAnswer[i].bool) + " " + interpreter(obj.listOfBooleanAnswer[i].answer) + "]\n";
        }
        toReturn+= ")";
    }
    return toReturn;
}


/*====================================================================================
  ___                  __       ___               
 |   \ _ _ __ _ __ _  / _|___  |   \ _ _ ___ _ __ 
 | |) | '_/ _` / _` | > _|_ _| | |) | '_/ _ \ '_ \
 |___/|_| \__,_\__, | \_____|  |___/|_| \___/ .__/
               |___/                        |_|
=====================================================================================*/

//What is currently being carried. Type: Jquery object
var carrying;
//Similar to the variable carrying, except that is stores the corresponding program object
var programCarrying;
//Similar to programCarrying, except it refers to the codeObject being dragged from the drawers
var dragCarrying;

// .draggable is referring to the options within the drawers
// .sortable is referring to the list containing the blocks within the program
// .droppable is referring to things within the table that need to be filled and are yet to be actual expressions <e.g. (+ exp1 exp2)>
$(function() {

        //implements sortability for the program block
        $("#List").sortable({
                connectWith: "#trash, .droppable",
                start: function(event, ui){
                        var itemIndex = $(ui.item).index();
                        carrying = $(ui.item).children();
                        console.log(carrying);
                        programCarrying = program[itemIndex];
                        program.splice(itemIndex, 1);
                },

                stop: function(event, ui) {
                        var itemIndex;
                        if (ui.item.is('span.draggable')){
                                var replacement = $('<li>' + createBlock(dragCarrying) + '</li>');
                                addDroppableFeature(replacement.find('.droppable'));
                        ui.item.replaceWith(replacement);
                        program.splice(replacement.index(), 0, dragCarrying);
                        dragCarrying = null;
                        } else{
                                itemIndex = carrying.index();
                                carrying = null;
                                program.splice(itemIndex, 0, programCarrying);
                        }
                        programCarrying = null;
                        carrying = null;
                },
                remove: function(event, ui){
                        $(ui.item).remove();
                },
                receive:function(event,ui){
                        if (!ui.item.is('span.draggable')){
                                ui.item.remove();
                        }
                },
                tolerance:'pointer',
                cursor:'pointer',
                scroll:false,
                items:'li'
                //revert:'invalid'
        });


        //Exprs things draggable from the drawer to the code
        $('.draggable').draggable({
                helper: function(event, ui){
                        dragCarrying = makeCodeFromOptions($(this).text());
                        carrying = $(createBlock(dragCarrying));
                        console.log(carrying);
                        return createBlock(dragCarrying) ;
                },
                connectToSortable: "#List"
        });

        //allows for deletion
        $("#trash").sortable({
                //accept: ".expr",
                tolerance:'pointer',
                cursor:'pointer',
                dropOnEmpty:true,
                update:function(event, ui){
                        history.push(program);
                        $(ui.item).remove();
                        for(var i=0;i<program.length;i++){
                                if(program[i].id===$(ui.item).id){
                                        program.splice(i,1);
                                }
                        }
                        console.log(program +"asdfasdf \n");
                        console.log(history);

                }
        });
});


/*
addDroppableFeature is a function that takes in a jQuery selector and applys droppable functionality
to that selector
*/
var addDroppableFeature = function(jQuerySelection) {
        console.log("adding droppability to", jQuerySelection);
                $(jQuerySelection).droppable({
//              accept: "table",
                hoverClass:"highlight",
                tolerance:"touch",
                drop: function(event, ui){
                        if($(this).children().length===0){
//                              carrying=$('<table>').html(ui.draggable.html())
                                carrying.draggable({
                                        connectToSortable: "#List",
                                        helper: "clone"
                                });
                                $(this).html(carrying);
                                ui.helper.hide();
                                ui.draggable.remove();
                        }
                }
        });
};




/*====================================================================================
 __      __       _   _                      
 \ \    / /__ _ _| |_(_)_ _  __ _   ___ _ _  
  \ \/\/ / _ \ '_| / / | ' \/ _` | / _ \ ' \ 
   \_/\_/\___/_| |_\_\_|_||_\__, | \___/_||_| trash (done)
                            |___/                       
=====================================================================================*/



/*====================================================================================
  _____           _     
 |_   _|__ ___ __| |___ 
   | |/ _ \___/ _` / _ \
   |_|\___/   \__,_\___/
                         
=====================================================================================*/

/*

7/9-7/11
- Draggable from program to trash

7/11-7/13
- Draggable blocks into blocks
- Type checking
- Add functionality for cond

7/16-7/20
- undo (Monday)
- full functionality of defines
        - user defined (function, constant) appearing in new drawer. deleting defines
        - Contracts in define full functionality (design check off by Shriram).

7/22-27
- run, stop
- save program
- Add functionality for structs


OPTIONAL
        - lists
        - lists of generic type
- Clean up appearance
*/


/*====================================================================================
  _____                 ___       __                         
 |_   _|  _ _ __  ___  |_ _|_ _  / _|___ _ _ ___ _ _  __ ___ 
   | || || | '_ \/ -_)  | || ' \|  _/ -_) '_/ -_) ' \/ _/ -_)
   |_| \_, | .__/\___| |___|_||_|_| \___|_| \___|_||_\__\___| 
       |__/|_|                                               
=====================================================================================
 
- evaluate expressions from top-down to get constraints
- compare constraints against contracts
- if we run into an inconsistency, we mark the id associated with that inconsistency and highlight it

*/

var argsArray = [];

function typeInfer(expr){
}

}