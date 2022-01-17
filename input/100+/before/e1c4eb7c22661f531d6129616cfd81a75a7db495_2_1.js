function(request, sender, response){    
                                       switch(request.msg){
                                       case "getLS":
                                       response({ls: localStorage});
                                       break;
                                       case "setLS":
                                       setRequestLS(request);
                                       break;
                                       case "chgLS":
                                       setRequestLS(request);
                                       chrome.tabs.getSelected(null,function(tab){
                                                               chrome.tabs.sendRequest(tab.id,{msg:"chgLS",ls:localStorage});
                                                               });
                                       break;
                                       case "event":
                                       chrome.tabs.sendRequest(sender.tab.id,{msg:"event",e:request.e});
                                       break;
                                       case "getElementPoint":
                                       chrome.tabs.sendRequest(sender.tab.id,{msg:"getElementPoint",x:request.x,y:request.y}, function(innerResponse){
                                                               response({element:innerResponse.element});
                                                               });
                                       break;
                                       case "getElementJquery":
                                       chrome.tabs.sendRequest(sender.tab.id,{msg:"getElementJquery",j:request.j}, function(innerResponse){
                                                               response({element:innerResponse.element});
                                                               });
                                       break;
                                       case "getSize":
                                       chrome.tabs.sendRequest(sender.tab.id,{msg:"getSize",size:request.size}, function(innerResponse){
                                                               response({size:innerResponse.size});
                                                               });
                                       break;
                                       }
                                       }