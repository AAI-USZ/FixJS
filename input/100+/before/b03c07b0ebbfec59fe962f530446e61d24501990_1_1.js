function(splat,entityId, parentId,rootId,_var){
           var routeToken = _.find(KYT.routeTokens,function(item){
               return item.route == splat;
           });
           if(!routeToken)return;
           // this is so you don't set the id to the routetoken which stays in scope
           var viewOptions = $.extend({},routeToken);
           if(entityId) {viewOptions.url +="/"+entityId; viewOptions.route+="/"+entityId;}
           if(parentId) {viewOptions.url +="?ParentId="+parentId;viewOptions.route+="/"+parentId;}
           if(rootId) {viewOptions.url +="&RootId="+rootId;viewOptions.route+="/"+rootId;}
           if(_var) {viewOptions.url +="&Var="+_var;viewOptions.route+="/"+_var; viewOptions.extraVar = _var;}
           KYT.State.set({"Relationships":
               {
                   "entityId":entityId?entityId:0,
                   "parentId":parentId?parentId:0,
                   "rootId":rootId?rootId:0
               }
           });
           var item = new KYT.Views[routeToken.viewName](viewOptions);

           if(routeToken.isChild){
               var hasParent = KYT.WorkflowManager.addChildView(item);
               if(!hasParent){
                   KYT.WorkflowManager.cleanAllViews();
                   KYT.State.set({"currentView":item});
                   KYT.content.show(item);
               }
           }else{
               KYT.WorkflowManager.cleanAllViews();
               KYT.State.set({"currentView":item});
               KYT.content.show(item);
           }
       }