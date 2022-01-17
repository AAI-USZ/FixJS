function(e){
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
                                        focused.css("background-color", colors.Numbers);
                                        if( initvalue != inputtext){
                                             addToHistory(tempProgram);
					    focused.attr('value',inputtext);
                                             initvalue=null;
                                             tempProgram=null;
                                        }
                                        focused=null;
                                }
                        }

                        //STRINGS
                        else if(focused.closest($("table")).hasClass("Strings")){
                                if( initvalue != inputtext ){
                                             addToHistory(tempProgram);
                                                initvalue=null;
                                                tempProgram=null;
                                }
                                focused=null;
                        }
                        //DEFINING CONSTANTS
                        else if(focused.closest($("table")).hasClass("DefineVar")){
                                if((initvalue !=undefined && initvalue != "") && inputtext !== ""){
                                        console.log("case prev is defined, input is defined");
                                        console.log("prevName is",prevName)
                                        var prevIndex=containsName(prevName,constants);
                                        if(prevIndex != -1){
                                                constants[prevIndex].name=inputtext;
                                        }
                                        addToHistory(tempProgram);
                                        initvalue=null
                                        tempProgram=null;
                                }
                                else if ((initvalue !=undefined && initvalue != "") && inputtext === ""){
                                        console.log("case prev is defined, input is undefined");
                                        constants.splice(containsName(prevName,1));
                                        addToHistory(tempProgram);
                                        initvalue=null;
                                        tempProgram=null;
                                }
                                else if((initvalue ==undefined || prevName == "") && inputtext !== ""){
                                        console.log("case prev is undefined, input is defined");
                                        addToHistory(tempProgram);
                                        initvalue=null;
                                        tempProgram=null;
                                }
                                makeDrawers(functions,constants);
                                drawerButton(activated);
                                focused.attr('value',inputtext);
                                focused=null;
                        }
                        else if(focused.closest($("table")).hasClass("DefineFun")){
                                if( initvalue != inputtext){
                                        addToHistory(tempProgram);
                                        initvalue=null;
                                        tempProgram=null;
                                }
                                focused=null;
                        }
                    }
                }