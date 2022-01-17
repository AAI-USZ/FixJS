function(a,b){a.widget("Midgard.midgardCollectionAdd",{addButton:null,options:{editingWidgets:null,collection:null,model:null,view:null,disabled:!1,vie:null,editableOptions:null},_create:function(){var a=this;a.options.collection.localStorage||(a.options.collection.url=a.options.model.url()),a.options.view.collection.bind("add",function(b){b.primaryCollection=a.options.collection,a.options.vie.entities.add(b),b.collection=a.options.collection}),a._bindCollectionView(a.options.view)},_bindCollectionView:function(a){var b=this;a.bind("add",function(a){b._makeEditable(a)})},_makeEditable:function(b){this.options.editableOptions.disabled=this.options.disabled,this.options.editableOptions.model=b.model,a(b.el).midgardEditable(this.options.editableOptions)},_init:function(){if(this.options.disabled){this.disable();return}this.enable()},enable:function(){var b=this;b.addButton=a('<button class="btn"><i class="icon-plus"></i> Add</button>').button(),b.addButton.addClass("midgard-create-add"),b.addButton.click(function(){b.options.collection.add({})}),a(b.options.view.el).after(b.addButton)},disable:function(){this.addButton&&(this.addButton.remove(),delete this.addButton)}})})(jQuery),function(a,b){a.widget("Midgard.midgardCollectionAddBetween",a.Midgard.midgardCollectionAdd,{addButtons:[],_bindCollectionView:function(a){var b=this;a.bind("add",function(a){b._makeEditable(a),b._refreshButtons()}),a.bind("remove",function(){b._refreshButtons()})},_refreshButtons:function(){var a=this;window.setTimeout(function(){a.disable(),a.enable()},1)},prepareButton:function(b){var c=this,d=a('<button class="btn"><i class="icon-plus"></i></button>').button();return d.addClass("midgard-create-add"),d.click(function(){c.options.collection.add({},{at:b})}),d},enable:function(){var b=this,c=b.prepareButton(0);a(b.options.view.el).before(c),b.addButtons.push(c),a.each(b.options.view.entityViews,function(c,d){var e=b.options.collection.indexOf(d.model),f=b.prepareButton(e+1);a(d.el).after(f),b.addButtons.push(f)})},disable:function(){var b=this;a.each(b.addButtons,function(a,b){b.remove()}),b.addButtons=[]}})}(jQuery),function(a,b){a.widget("Midgard.midgardCreate",{options:{toolbar:"full",saveButton:null,state:"browse",highlight:!0,highlightColor:"#67cc08",editorWidgets:{Text:"halloWidget","default":"halloWidget"},editorOptions:{},url:function(){},storagePrefix:"node",workflows:{url:null},notifications:{},vie:null,stanbolUrl:null,dbPediaUrl:null,tags:!1},_create:function(){this.options.vie?this.vie=this.options.vie:(this.vie=new VIE,this.vie.use(new this.vie.RdfaService),this.options.stanbolUrl&&this.vie.use(new this.vie.StanbolService({proxyDisabled:!0,url:this.options.stanbolUrl})),this.options.dbPediaUrl&&this.vie.use(new this.vie.DBPediaService({proxyDisabled:!0,url:this.options.dbPediaUrl}))),this._checkSession(),this._enableToolbar(),this._saveButton(),this._editButton(),this._prepareStorage(),this.element.midgardWorkflows&&this.element.midgardWorkflows(this.options.workflows),this.element.midgardNotifications&&this.element.midgardNotifications(this.options.notifications)},_prepareStorage:function(){this.element.midgardStorage({vie:this.vie,url:this.options.url}),this.element.bind("midgardstoragesave",function(){a("#midgardcreate-save a").html('Saving <i class="icon-upload"></i>')}),this.element.bind("midgardstoragesaved midgardstorageerror",function(){a("#midgardcreate-save a").html('Save <i class="icon-ok"></i>')})},_init:function(){this.options.state==="edit"?this._enableEdit():this._disableEdit()},showNotification:function(b){this.element.midgardNotifications&&a(this.element).data("midgardNotifications").create(b)},_checkSession:function(){if(!Modernizr.sessionstorage)return;var a=this.options.storagePrefix+"Midgard.create.toolbar";sessionStorage.getItem(a)&&this._setOption("toolbar",sessionStorage.getItem(a));var b=this.options.storagePrefix+"Midgard.create.state";sessionStorage.getItem(b)&&this._setOption("state",sessionStorage.getItem(b)),this.element.bind("midgardcreatestatechange",function(a,c){sessionStorage.setItem(b,c.state)})},_saveButton:function(){return this.options.saveButton?this.options.saveButton:(a(".create-ui-toolbar-statustoolarea .create-ui-statustools",this.element).append(a('<li id="midgardcreate-save"><a class="create-ui-btn">Save <i class="icon-ok"></i></a></li>')),this.options.saveButton=a("#midgardcreate-save",this.element),this.options.saveButton.hide(),this.options.saveButton)},_editButton:function(){var b=this,c={edit:'<a class="create-ui-btn">Cancel <i class="icon-remove"></i></a>',browse:'<a class="create-ui-btn">Edit <i class="icon-edit"></i></a>'};a(".create-ui-toolbar-statustoolarea .create-ui-statustools",this.element).append(a('<li id="midgardcreate-edit">'+c[b.options.state]+"</li>"));var d=a("#midgardcreate-edit",this.element);this.options.state==="edit"&&d.addClass("selected"),d.bind("click",function(){if(b.options.state==="edit"){b._disableEdit(),d.html(c[b.options.state]);return}b._enableEdit(),d.html(c[b.options.state])})},_enableToolbar:function(){var a=this;this.element.bind("midgardtoolbarstatechange",function(b,c){Modernizr.sessionstorage&&sessionStorage.setItem(a.options.storagePrefix+"Midgard.create.toolbar",c.display),a._setOption("toolbar",c.display)}),this.element.midgardToolbar({display:this.options.toolbar,vie:this.vie})},_enableEdit:function(){this._setOption("state","edit");var b=this,c={toolbarState:b.options.display,disabled:!1,vie:b.vie,widgets:b.options.editorWidgets,editorOptions:b.options.editorOptions};b.options.enableEditor&&(c[enableEditor]=b.options.enableEditor),b.options.disableEditor&&(c[disableEditor]=b.options.disableEditor),a("[about]",this.element).each(function(){var d=this;if(b.options.highlight){var e=function(c,e){if(!a(e.element).is(":visible"))return;if(e.entityElement.get(0)!==d)return;e.element.effect("highlight",{color:b.options.highlightColor},3e3)};a(this).bind("midgardeditableenableproperty",e)}a(this).bind("midgardeditabledisable",function(){a(this).unbind("midgardeditableenableproperty",e)}),b.options.tags&&a(this).bind("midgardeditableenable",function(c,d){a(this).midgardTags({vie:b.vie,entityElement:d.entityElement,entity:d.instance})}),a(this).midgardEditable(c)}),this._trigger("statechange",null,{state:"edit"})},_disableEdit:function(){var b=this,c={disabled:!0,vie:b.vie,editorOptions:b.options.editorOptions};a("[about]",this.element).each(function(){a(this).midgardEditable(c),a(this).removeClass("ui-state-disabled")}),this._setOption("state","browse"),this._trigger("statechange",null,{state:"browse"})}})}(jQuery),function(a,b){a.widget("Midgard.midgardEditable",{options:{editables:[],collections:[],model:null,editorOptions:{},widgets:{Text:"halloWidget","default":"halloWidget"},collectionWidgets:{"default":"midgardCollectionAdd"},toolbarState:"full",vie:null,disabled:!1},_create:function(){this.vie=this.options.vie;if(!this.options.model){var a=this;this.vie.load({element:this.element}).from("rdfa").execute().done(function(b){a.options.model=b[0]})}},_init:function(){if(this.options.disabled){this.disable();return}this.enable()},enable:function(){var b=this;if(!this.options.model)return;this.vie.service("rdfa").findPredicateElements(this.options.model.id,a("[property]",this.element),!1).each(function(){return b._enableProperty(a(this))}),this._trigger("enable",null,{instance:this.options.model,entityElement:this.element}),_.forEach(this.vie.service("rdfa").views,function(a){if(a instanceof b.vie.view.Collection&&b.options.model===a.owner){var c=b.enableCollection({model:b.options.model,collection:a.collection,view:a,element:a.el,vie:b.vie,editableOptions:b.options});b.options.collections.push(c)}})},disable:function(){var b=this;a.each(this.options.editables,function(c,d){b.disableEditor({widget:b,editable:d,entity:b.options.model,element:a(this)})}),this.options.editables=[],a.each(this.options.collections,function(a,c){b.disableCollection({widget:b,model:b.options.model,element:c,vie:b.vie,editableOptions:b.options})}),this.options.collections=[],this._trigger("disable",null,{instance:this.options.model,entityElement:this.element})},_enableProperty:function(a){var b=this,c=this.vie.service("rdfa").getElementPredicate(a);if(!c)return!0;if(this.options.model.get(c)instanceof Array)return!0;var d=this.enableEditor({widget:this,element:a,entity:this.options.model,property:c,editorOptions:this.options.editorOptions,toolbarState:this.options.toolbarState,vie:this.vie,modified:function(d){var e={};e[c]=d,b.options.model.set(e,{silent:!0}),b._trigger("changed",null,{property:c,instance:b.options.model,element:a,entityElement:b.element})},activated:function(){b._trigger("activated",null,{property:c,instance:b.options.model,element:a,entityElement:b.element})},deactivated:function(){b._trigger("deactivated",null,{property:c,instance:b.options.model,element:a,entityElement:b.element})}});this._trigger("enableproperty",null,{editable:d,property:c,instance:this.options.model,element:a,entityElement:this.element}),this.options.editables.push(d)},_widgetName:function(a){if(this.options.widgets[a.property])return this.options.widgets[a.property];var b="default",c=this.options.model.get("@type");return c&&c.attributes&&c.attributes.get(a.property)&&(b=c.attributes.get(a.property).range[0]),this.options.widgets[b]?this.options.widgets[b]:this.options.widgets["default"]},enableEditor:function(b){var c=this._widgetName(b);b.disabled=!1;if(typeof a(b.element)[c]!="function")throw new Error(c+" widget is not available");return a(b.element)[c](b),a(b.element).data("createWidgetName",c),a(b.element)},disableEditor:function(b){var c=a(b.element).data("createWidgetName");b.disabled=!0,c&&(a(b.element)[c](b),a(b.element).removeClass("ui-state-disabled"))},collectionWidgetName:function(a){return this.options.collectionWidgets["default"]},enableCollection:function(b){var c=this.collectionWidgetName(b);b.disabled=!1;if(typeof a(b.element)[c]!="function")throw new Error(c+" widget is not available");return a(b.element)[c](b),a(b.element).data("createCollectionWidgetName",c),a(b.element)},disableCollection:function(b){var c=a(b.element).data("createCollectionWidgetName");b.disabled=!0,c&&(a(b.element)[c](b),a(b.element).removeClass("ui-state-disabled"))}})}(jQuery),function(a,b){a.widget("Create.editWidget",{options:{disabled:!1,vie:null},enable:function(){this.element.attr("contenteditable","true")},disable:function(a){this.element.attr("contenteditable","false")},_create:function(){this._registerWidget(),this._initialize()},_init:function(){if(this.options.disabled){this.disable();return}this.enable()},_initialize:function(){var b=this,c=this.element.html();this.element.bind("blur keyup paste",function(d){if(b.options.disabled)return;var e=a(this).html();c!==e&&(c=e,b.options.modified(e))})},_registerWidget:function(){this.element.data("createWidgetName",this.widgetName)}})}(jQuery),function(a,b){a.widget("Create.alohaWidget",a.Create.editWidget,{enable:function(){this._initialize(),this.options.disabled=!1},disable:function(){try{options.editable.destroy()}catch(a){}this.options.disabled=!0},_initialize:function(){var a=this.options,b=new Aloha.Editable(Aloha.jQuery(a.element.get(0)));b.vieEntity=a.entity,Aloha.bind("aloha-editable-activated",function(){a.activated()}),Aloha.bind("aloha-editable-deactivated",function(){a.deactivated()}),Aloha.bind("aloha-smart-content-changed",function(){if(!b.isModified())return!0;a.modified(b.getContents()),b.setUnmodified()})}})}(jQuery),function(a,b){a.widget("Create.halloWidget",a.Create.editWidget,{options:{disabled:!0,toolbarState:"full",vie:null,entity:null},enable:function(){a(this.element).hallo({editable:!0}),this.options.disabled=!1},disable:function(){a(this.element).hallo({editable:!1}),this.options.disabled=!0},_initialize:function(){a(this.element).hallo(this.getHalloOptions());var b=this;a(this.element).bind("halloactivated",function(a,c){b.options.activated()}),a(this.element).bind("hallodeactivated",function(a,c){b.options.deactivated()}),a(this.element).bind("hallomodified",function(a,c){b.options.modified(c.content),c.editable.setUnmodified()}),a(document).bind("midgardtoolbarstatechange",function(c,d){if(d.display===b.options.toolbarState)return;b.options.toolbarState=d.display,a(b.element).hallo(b.getHalloOptions())})},getHalloOptions:function(){var b={plugins:{halloformat:{},halloblock:{},hallolists:{},hallolink:{},halloimage:{entity:this.options.entity},halloindicator:{}},buttonCssClass:"create-ui-btn-small",placeholder:"["+this.options.property+"]"};typeof this.element.annotate=="function"&&this.options.vie.services.stanbol&&(b.plugins.halloannotate={vie:this.options.vie}),this.options.toolbarState==="full"?(b.parentElement=a(".create-ui-toolbar-dynamictoolarea .create-ui-tool-freearea"),b.toolbar="halloToolbarFixed"):(b.showAlways=!1,b.toolbar="halloToolbarContextual");var c={};return this.options.editorOptions[this.options.property]?c=this.options.editorOptions[this.options.property]:this.options.editorOptions["default"]&&(c=this.options.editorOptions["default"]),_.extend(b,c)}})}(jQuery),function(a,b){var c=[],d=function(b,d){var e={class_prefix:"midgardNotifications",timeout:3e3,auto_show:!0,body:"",bindTo:null,gravity:"T",effects:{onShow:function(a,b){a.animate({opacity:"show"},600,b)},onHide:function(a,b){a.animate({opacity:"hide"},600,b)}},actions:[],callbacks:{}},f={},g={},h=null,i=null,j=null,k=b,l=null,m={constructor:function(a){f=$.extend(e,a||{}),g={container:f.class_prefix+"-container",item:{wrapper:f.class_prefix+"-item",arrow:f.class_prefix+"-arrow",disregard:f.class_prefix+"-disregard",content:f.class_prefix+"-content",actions:f.class_prefix+"-actions",action:f.class_prefix+"-action"}},this._generate()},getId:function(){return i},getElement:function(){return h},_generate:function(){var b=this,d,e,j=null;h=d=a('<div class="'+g.item.wrapper+'-outer"/>'),d.css({display:"none"}),e=a('<div class="'+g.item.wrapper+'-inner"/>'),e.appendTo(d);if(f.bindTo){d.addClass(g.item.wrapper+"-binded");var m=a('<div class="'+g.item.arrow+'"/>');m.appendTo(d)}else d.addClass(g.item.wrapper+"-normal");j=a('<div class="'+g.item.content+'"/>'),j.html(f.body),j.appendTo(e);if(f.actions.length){var n=a('<div class="'+g.item.actions+'"/>');n.appendTo(e),a.each(f.actions,function(c,d){var e=a('<button name="'+d.name+'" class="button-'+d.name+'">'+d.label+"</button>").button();e.bind("click",function(a){l?d.cb(a,l,b):d.cb(a,b)}),d.className&&e.addClass(d.className),n.append(e)})}h.bind("click",function(a){f.callbacks.onClick?f.callbacks.onClick(a,b):l||b.close()}),f.auto_show&&this.show(),this._setPosition(),i=c.push(this),k.append(h)},_setPosition:function(){if(f.bindTo){var b=h.width()?h.width():280,d=h.height()?h.height():109;j=a(f.bindTo);var e=j.outerWidth(),i=j.outerHeight(),k=j.offset().left,l=j.offset().top;switch(f.gravity){case"TL":properties={left:k,top:l+i+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_TL");break;case"TR":properties={left:k+e-b+"px",top:l+i+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_TR");break;case"BL":properties={left:k+"px",top:l-d+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_BL");break;case"BR":properties={left:k+e-b+"px",top:l-d+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_BR");break;case"LT":properties={left:k+e+"px",top:l+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_LT");break;case"LB":properties={left:k+e+"px",top:l+i-d+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_LB");break;case"RT":properties={left:k-b+"px",top:l+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_RT");break;case"RB":properties={left:k-b+"px",top:l+i-d+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_RB");break;case"T":properties={left:k+e/2-b/2+"px",top:l+i+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_T");break;case"R":properties={left:k-b+"px",top:l+i/2-d/2+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_R");break;case"B":properties={left:k+e/2-b/2+"px",top:l-d+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_B");break;case"L":properties={left:k+e+"px",top:l+i/2-d/2+"px"},h.find("."+g.item.arrow).addClass(g.item.arrow+"_L")}properties.position="absolute",h.css(properties);return}f.position||(f.position="top right");var m=a(".create-ui-toolbar-wrapper").outerHeight(!0)+6;pos={position:"fixed"};var n=function(b){var c=0;return a.each(b,function(a,b){if(!b)return;c+=b.getElement().height()}),c};f.position.match(/top/)&&(pos.top=m+n(c)+"px"),f.position.match(/bottom/)&&(pos.bottom=c.length-1*item.height()+item.height()+10+"px"),f.position.match(/right/)&&(pos.right="20px"),f.position.match(/left/)&&(pos.left="20px"),h.css(pos)},show:function(){var b=this,c,d,e,g,i,j;f.callbacks.beforeShow&&f.callbacks.beforeShow(b);if(f.bindTo){var k=a(f.bindTo);c=a(window).scrollTop(),d=a(window).scrollTop()+a(window).height(),g=parseFloat(h.offset().top,10),i=k.offset().top,j=k.outerHeight(),i<g&&(g=i),e=parseFloat(h.offset().top,10)+h.height(),i+j>e&&(e=i+j)}f.timeout>0&&!f.actions.length&&setTimeout(function(){b.close()},f.timeout),f.bindTo&&(g<c||g>d)||e<c||e>d?a("html, body").stop().animate({scrollTop:g},500,"easeInOutExpo",function(){f.effects.onShow(h,function(){f.callbacks.afterShow&&f.callbacks.afterShow(b)})}):f.effects.onShow(h,function(){f.callbacks.afterShow&&f.callbacks.afterShow(b)})},close:function(){var a=this;f.callbacks.beforeClose&&f.callbacks.beforeClose(a),f.effects.onHide(h,function(){f.callbacks.afterClose&&f.callbacks.afterClose(a),a.destroy()})},destroy:function(){var b=this;a.each(c,function(a,d){d&&d.getId()==b.getId()&&delete c[a]}),a(h).remove()},setStory:function(a){l=a},setName:function(a){h.addClass(g.item.wrapper+"-custom-"+a),this.name=a}};return m.constructor(d),delete m.constructor,m},e=function(b,c){var e={},f={},g={},h={},i=null,j=null,k=null,l={constructor:function(a){f=$.extend(e,a||{})},setStoryline:function(b){var c={content:"",actions:[],show_actions:!0,notification:{},back:null,back_label:null,forward:null,forward_label:null,beforeShow:null,afterShow:null,beforeClose:null,afterClose:null};g={},_current_item=null,i=null,j=null,k=null;var d=this;return a.each(b,function(b,e){var f=a.extend({},c,e);f.name=b;var h=a.extend({},c.notification,e.notification||{});h.body=f.content,h.auto_show=!1,f.actions.length&&(h.delay=0),h.callbacks={beforeShow:function(a){f.beforeShow&&f.beforeShow(a,d)},afterShow:function(a){f.afterShow&&f.afterShow(a,d)},beforeClose:function(a){f.beforeClose&&f.beforeClose(a,d)},afterClose:function(a){f.afterClose&&f.afterClose(a,d),i=a.name}},h.actions=[],f.show_actions&&(f.back&&(back_label=f.back_label,back_label||(back_label="Back"),h.actions.push({name:"back",label:back_label,cb:function(a,b,c){b.previous()}})),f.forward&&(forward_label=f.forward_label,forward_label||(forward_label="Back"),h.actions.push({name:"forward",label:forward_label,cb:function(a,b,c){b.next()}})),f.actions.length&&a.each(f.actions,function(a,b){h.actions.push(f.actions[a])})),j||(j=b),k=b,f.notification=h,g[b]=f}),g},start:function(){this._showNotification(g[j])},stop:function(){_current_item.close(),_current_item=null,i=null},next:function(){_current_item.close(),g[_current_item.name].forward?(next_item=g[_current_item.name].forward,this._showNotification(g[next_item])):this._showNotification(g[k])},previous:function(){i?(_current_item.close(),g[_current_item.name].back?(prev_item=g[_current_item.name].back,this._showNotification(g[prev_item])):this._showNotification(g[i])):this.stop()},_showNotification:function(b){return _current_item=new d(a("body"),b.notification),_current_item.setStory(this),_current_item.setName(b.name),_current_item.show(),_current_item}};return l.constructor(b),delete l.constructor,c&&l.setStoryline(c),l},f={start:{content:"Welcome to CreateJS tutorial!",forward:"toolbar_toggle",forward_label:"Start tutorial",actions:[{name:"quit",label:"Quit",cb:function(a,b,c){b.stop()}}]},toolbar_toggle:{content:"This is the CreateJS toolbars toggle button.<br />You can hide and show the full toolbar by clicking here.<br />Try it now.",forward:"edit_button",show_actions:!1,afterShow:function(b,c){a("body").bind("midgardtoolbarstatechange",function(b,d){d.display=="full"&&(c.next(),a("body").unbind("midgardtoolbarstatechange"))})},notification:{bindTo:"#midgard-bar-hidebutton",timeout:0,gravity:"TL"}},edit_button:{content:"This is the edit button.<br />Try it now.",show_actions:!1,afterShow:function(b,c){a("body").bind("midgardcreatestatechange",function(b,d){d.state=="edit"&&(c.next(),a("body").unbind("midgardcreatestatechange"))})},notification:{bindTo:".ui-button[for=midgardcreate-edit]",timeout:0,gravity:"TL"}},end:{content:"Thank you for watching!<br />Happy content editing times await you!"}};a.widget("Midgard.midgardNotifications",{options:{notification_defaults:{class_prefix:"midgardNotifications",position:"top right"}},_create:function(){this.classes={container:this.options.notification_defaults.class_prefix+"-container"},a("."+this.classes.container,this.element).length?(this.container=a("."+this.classes.container,this.element),this._parseFromDOM()):(this.container=a('<div class="'+this.classes.container+'" />'),this.element.append(this.container))},destroy:function(){this.container.remove(),$.Widget.prototype.destroy.call(this)},_init:function(){},_parseFromDOM:function(a){},showStory:function(a,b){var c=new e(a,b);return c.start(),c},create:function(b){return b=a.extend({},this.options.notification_defaults,b||{}),item=new d(this.container,b),item.show(),item},showTutorial:function(){this.showStory({},f)}})}(jQuery),function(a,b){a.widget("Midgard.midgardStorage",{changedModels:[],saveEnabled:!0,options:{localStorage:!1,vie:null,url:"",autoSave:!1,autoSaveInterval:5e3,saveReferencedNew:!1,saveReferencedChanged:!1},_create:function(){var b=this;Modernizr.localstorage&&(this.options.localStorage=!0),this.vie=this.options.vie,this.vie.entities.bind("add",function(a){a.url=b.options.url,a.toJSON=a.toJSONLD}),a("#midgardcreate-save").click(function(){b._saveRemote({success:function(){a("#midgardcreate-save").button({disabled:!0})},error:function(){}})}),b._bindEditables(),b.options.autoSave&&b._autoSave()},_autoSave:function(){var b=this;b.saveEnabled=!0;var c=function(){if(!b.saveEnabled)return;if(b.changedModels.length===0)return;b._saveRemote({success:function(){a("#midgardcreate-save").button({disabled:!0})},error:function(){}})},d=window.setInterval(c,b.options.autoSaveInterval);this.element.bind("startPreventSave",function(){d&&(window.clearInterval(d),d=null),b.disableSave()}),this.element.bind("stopPreventSave",function(){d||(d=window.setInterval(c,b.options.autoSaveInterval)),b.enableSave()})},enableSave:function(){this.saveEnabled=!0},disableSave:function(){this.saveEnabled=!1},_bindEditables:function(){var b=this,c=[];b.element.bind("midgardeditablechanged",function(c,d){_.indexOf(b.changedModels,d.instance)===-1&&b.changedModels.push(d.instance),b._saveLocal(d.instance),a("#midgardcreate-save").button({disabled:!1})}),b.element.bind("midgardeditabledisable",function(c,d){b._restoreLocal(d.instance),a("#midgardcreate-save").hide()}),b.element.bind("midgardeditableenable",function(d,e){a("#midgardcreate-save").button({disabled:!0}),a("#midgardcreate-save").show(),!e.instance.isNew()&&b._checkLocal(e.instance)&&c.push(e.instance)}),b.element.bind("midgardcreatestatechange",function(d,e){if(e.state==="browse"||c.length===0){c=[];return}a("body").data("midgardCreate").showNotification({bindTo:"#midgardcreate-edit a",gravity:"TR",body:c.length+" items on this page have local modifications",timeout:0,actions:[{name:"restore",label:"Restore",cb:function(){_.each(c,function(a){b._readLocal(a)}),c=[]},className:"create-ui-btn"},{name:"ignore",label:"Ignore",cb:function(a,b){b.close(),c=[]},className:"create-ui-btn"}]})}),b.element.bind("midgardstorageloaded",function(c,d){_.indexOf(b.changedModels,d.instance)===-1&&b.changedModels.push(d.instance),a("#midgardcreate-save").button({disabled:!1})})},_saveRemote:function(b){var c=this;if(c.changedModels.length===0)return;c._trigger("save",null,{models:c.changedModels});var d=c.changedModels.length;d>1?notification_msg=d+" objects saved successfully":(subject=c.changedModels[0].getSubjectUri(),notification_msg="Object with subject "+subject+" saved successfully"),c.disableSave(),_.forEach(c.changedModels,function(e,f){_.each(e.attributes,function(a,b){if(!a||!a.isCollection)return;a.each(function(a){if(c.changedModels.indexOf(a)!==-1)return;if(a.isNew()&&c.options.saveReferencedNew)return a.save();if(a.hasChanged()&&c.options.saveReferencedChanged)return a.save()})}),e.save(null,{success:function(){e.originalAttributes&&delete e.originalAttributes,c._removeLocal(e),c.changedModels.splice(f,1),d--,d<=0&&(c._trigger("saved",null,{}),b.success(),a("body").data("midgardCreate").showNotification({body:notification_msg}),c.enableSave())},error:function(d,f){notification_msg="Error occurred while saving",f.responseText&&(notification_msg=notification_msg+":<br />"+f.responseText),b.error(),a("body").data("midgardCreate").showNotification({body:notification_msg}),c._trigger("error",null,{instance:e})}})})},_saveLocal:function(a){if(!this.options.localStorage)return;if(a.isNew()){if(!a.primaryCollection)return;return this._saveLocalReferences(a.primaryCollection.subject,a.primaryCollection.predicate,a)}localStorage.setItem(a.getSubjectUri(),JSON.stringify(a.toJSONLD()))},_getReferenceId:function(a,b){return a.id+":"+b},_saveLocalReferences:function(a,b,c){if(!this.options.localStorage)return;if(!a||!b)return;var d=this,e=a+":"+b,f=c.toJSONLD();if(localStorage.getItem(e)){var g=JSON.parse(localStorage.getItem(e)),h=_.pluck(g,"@").indexOf(f["@"]);h!==-1?g[h]=f:g.push(f),localStorage.setItem(e,JSON.stringify(g));return}localStorage.setItem(e,JSON.stringify([f]))},_checkLocal:function(a){if(!this.options.localStorage)return!1;var b=localStorage.getItem(a.getSubjectUri());return b?!0:!1},_readLocal:function(a){if(!this.options.localStorage)return;var b=localStorage.getItem(a.getSubjectUri());if(!b)return;a.originalAttributes||(a.originalAttributes=_.clone(a.attributes));var c=JSON.parse(b),d=this.vie.entities.addOrUpdate(c,{overrideAttributes:!0});this._trigger("loaded",null,{instance:d})},_readLocalReferences:function(a,b,c){if(!this.options.localStorage)return;var d=this._getReferenceId(a,b),e=localStorage.getItem(d);if(!e)return;c.add(JSON.parse(e))},_restoreLocal:function(b){var c=this;if(!b)return;_.each(b.attributes,function(a,b){a instanceof c.vie.Collection&&a.forEach(function(b){b.isNew()&&a.remove(b)})});if(a.isEmptyObject(b.changedAttributes())){b.originalAttributes&&(b.set(b.originalAttributes),delete b.originalAttributes);return}b.set(b.previousAttributes())},_removeLocal:function(a){if(!this.options.localStorage)return;localStorage.removeItem(a.getSubjectUri())}})}(jQuery),function(a,b){a.widget("Midgard.midgardTags",{enhanced:!1,options:{vie:null,entity:null,element:null,entityElement:null,parentElement:".create-ui-tool-metadataarea",predicate:"skos:related"},_init:function(){var b=this;this.vie=this.options.vie,this.entity=this.options.entity,this.element=this.options.element,a(this.options.entityElement).bind("midgardeditableactivated",function(a,c){if(c.instance!==b.options.entity)return;b._renderWidget(),b.loadTags()}),a(this.options.entityElement).bind("midgardeditablechanged",function(a,c){if(c.instance!==b.options.entity)return;b.enhanced=!1}),this._listenAnnotate(this.options.entityElement)},_normalizeSubject:function(a){return this.entity.isReference(a)?a:(a.substr(0,7)!=="http://"&&(a="urn:tag:"+a),a=this.entity.toReference(a),a)},_tagLabel:function(a){return a=this.entity.fromReference(a),a.substr(0,8)==="urn:tag:"&&(a=a.substr(8,a.length-1)),a.substring(0,7)=="http://"&&(a=a.substr(a.lastIndexOf("/")+1,a.length-1),a=a.replace(/_/g," ")),a},addTag:function(a,c,d){c===b&&(c=this._tagLabel(a)),a=this._normalizeSubject(a),d&&!this.entity.isReference(d)&&(d=this.entity.toReference(d));var e=this.vie.entities.addOrUpdate({"@subject":a,"rdfs:label":c,"@type":d}),f=this.options.entity.get(this.options.predicate);f?f.isCollection||(f=new this.vie.Collection(_.map(f,function(a){return a.isEntity?a:{"@subject":a}})),f.vie=this.options.vie,this.options.entity.set(this.options.predicate,f)):(f=new this.vie.Collection,f.vie=this.options.vie,this.options.entity.set(this.options.predicate,f)),f.addOrUpdate(e),this.options.entityElement.trigger("midgardeditablechanged",{instance:this.options.entity})},removeTag:function(a){var b=this.options.entity.get(this.options.predicate);if(!b)return;a=this._normalizeSubject(a);var c=b.get(a);if(!c)return;b.remove(a),this.options.entityElement.trigger("midgardeditablechanged",{instance:this.options.entity})},_listenAnnotate:function(a){var b=this;a.bind("annotateselect",function(a,c){b.addTag(c.linkedEntity.uri,c.linkedEntity.label,c.linkedEntity.type[0])}),a.bind("annotateremove",function(a,c){b.removeTag(c.linkedEntity.uri)})},_prepareEditor:function(b){var c=a('<div class="create-ui-tags"></div>'),d=a('<div class="articleTags"><h3>Article tags</h3><input type="text" class="tags" value="" /></div>'),e=a('<div class="suggestedTags"><h3>Suggested tags</h3><input type="text" class="tags" value="" /></div>');a("input",d).attr("id","articleTags-"+this.entity.cid),a("input",e).attr("id","suggestedTags-"+this.entity.cid),c.append(d),c.append(e),c.hide();var f=b.position();return c.css("position","absolute"),c.css("left",f.left),c.css("top",f.top),c},_renderWidget:function(){var b=this,c=this.entity.getSubject(),d=a('<button class="create-ui-btn"><i class="icon-tags"></i> Tags</a>').button(),e=a(this.options.parentElement);e.empty(),e.append(d),e.show();var f=this._prepareEditor(d);d.after(f),this.articleTags=a(".articleTags input",f).tagsInput({width:"auto",height:"auto",onAddTag:function(a){b.addTag(a)},onRemoveTag:function(a){b.removeTag(a)}});var g=function(){var c=a.trim(a(this).text());b.articleTags.addTag(c),b.suggestedTags.removeTag(c)};this.suggestedTags=a(".suggestedTags input",f).tagsInput({width:"auto",height:"auto",interactive:!1,onAddTag:function(b){a(".suggestedTags .tag span",f).unbind("click",g),a(".suggestedTags .tag span",f).bind("click",g)},onRemoveTag:function(b){a(".suggestedTags .tag span",f).unbind("click",g),a(".suggestedTags .tag span",f).bind("click",g)},remove:!1}),d.bind("click",function(){f.toggle()})},loadTags:function(){var b=this,c=this.entity.get(this.options.predicate);c&&(_.isString(c)?b.articleTags.addTag(b._tagLabel(c)):c.isCollection?c.each(function(a){b.articleTags.addTag(a.get("rdfs:label"))}):_.each(c,function(a){b.articleTags.addTag(b._tagLabel(a))})),this.vie.services.stanbol?b.enhance():a(".suggestedTags",b.element).hide()},_getLabelLang:function(a){if(!_.isArray(a))return null;var b;return _.each(a,function(a){a["@language"]==="en"&&(b=a["@value"])}),b},_addEnhancement:function(a){if(!a.isEntity)return;var b=this._getLabelLang(a.get("rdfs:label"));if(!b)return;var c=this.options.entity.get(this.options.predicate);if(c&&c.isCollection&&c.indexOf(a)!==-1)return;this.suggestedTags.addTag(b)},enhance:function(){if(this.enhanced)return;this.enhanced=!0;var b=this;this.vie.analyze({element:a("[property]",this.options.entityElement)}).using(["stanbol"]).execute().success(function(a){_.each(a,function(a){b._addEnhancement(a)})}).fail(function(a){})}})}(jQuery),function(a,b){a.widget("Midgard.midgardToolbar",{options:{display:"full"},_create:function(){this.element.append(this._getMinimized()),this.element.append(this._getFull());var b=this;a(".create-ui-toggle").click(function(){b.options.display==="full"?(b.hide(),b.options.display="minimized"):(b.show(),b.options.display="full"),b._trigger("statechange",null,b.options)}),this._setDisplay(this.options.display),b=this,a(this.element).bind("midgardcreatestatechange",function(a,c){c.state=="browse"&&(b._clearWorkflows(),b._clearMetadata())}),a(this.element).bind("midgardworkflowschanged",function(c,d){b._clearWorkflows(),d.workflows.length&&d.workflows.each(function(c){html=a("body").data().midgardWorkflows.prepareItem(d.instance,c,function(a,c){b._clearWorkflows();if(a)return}),a(".create-ui-tool-workflowarea",this.element).append(html)})})},_setOption:function(a,b){a==="display"&&this._setDisplay(b),this.options[a]=b},_setDisplay:function(b){b==="minimized"&&a("div.create-ui-toolbar-wrapper").hide()},hide:function(
){a("div.create-ui-toolbar-wrapper").fadeToggle("fast","linear")},show:function(){a("div.create-ui-toolbar-wrapper").fadeToggle("fast","linear")},_getMinimized:function(){return a('<div class="create-ui-logo"><a class="create-ui-toggle" id="create-ui-toggle-toolbar"></a></div>')},_getFull:function(){return a('<div class="create-ui-toolbar-wrapper"><div class="create-ui-toolbar-toolarea"><div class="create-ui-toolbar-dynamictoolarea"><ul class="create-ui-dynamictools create-ui-toolset-1"><li class="create-ui-tool-metadataarea"></li><li class="create-ui-tool-workflowarea"></li><li class="create-ui-tool-freearea"></li></ul></div><div class="create-ui-toolbar-statustoolarea"><ul class="create-ui-statustools"></ul></div></div></div>')},_clearWorkflows:function(){a(".create-ui-tool-workflowarea",this.element).empty()},_clearMetadata:function(){a(".create-ui-tool-metadataarea",this.element).empty()}})}(jQuery),function(a,b){a.widget("Midgard.midgardWorkflows",{options:{url:function(a){},renderers:{button:function(b,c,d,e){return button_id="midgardcreate-workflow_"+c.get("name"),html=a('<button class="create-ui-btn" id="'+button_id+'">'+c.get("label")+"</button>").button(),html.bind("click",function(a){d(b,c,e)}),html}},action_types:{backbone_save:function(a,b,c){copy_of_url=a.url,original_model=a.clone(),original_model.url=copy_of_url,action=b.get("action"),action.url&&(a.url=action.url),original_model.save(null,{success:function(b){a.url=copy_of_url,a.change(),c(null,a)},error:function(b,d){a.url=copy_of_url,a.change(),c(d,a)}})},backbone_destroy:function(a,b,c){copy_of_url=a.url,original_model=a.clone(),original_model.url=copy_of_url,action=b.get("action"),action.url&&(a.url=action.url),a.destroy({success:function(b){a.url=copy_of_url,a.change(),c(null,b)},error:function(b,d){a.url=copy_of_url,a.change(),c(d,a)}})},http:function(b,c,d){action=c.get("action");if(!action.url)return d("No action url defined!");wf_opts={},action.http&&(wf_opts=action.http),ajax_options=a.extend({url:action.url,type:"POST",data:b.toJSON(),success:function(){b.fetch({success:function(a){d(null,a)},error:function(a,b){d(b,a)}})}},wf_opts),a.ajax(ajax_options)}}},_init:function(){this._renderers={},this._action_types={},this._parseRenderersAndTypes(),this._last_instance=null,this.ModelWorkflowModel=Backbone.Model.extend({defaults:{name:"",label:"",type:"button",action:{type:"backbone_save"}}}),this.workflows={};var b=this;a(this.element).bind("midgardeditableactivated",function(a,c){b._fetchWorkflows(c.instance)})},_fetchWorkflows:function(a){var b=this;if(a.isNew()){b._trigger("changed",null,{instance:a,workflows:[]});return}if(b._last_instance==a){b.workflows[a.cid]&&b._trigger("changed",null,{instance:a,workflows:b.workflows[a.cid]});return}b._last_instance=a;if(b.workflows[a.cid]){b._trigger("changed",null,{instance:a,workflows:b.workflows[a.cid]});return}b.options.url?b._fetchModelWorkflows(a):(flows=new(b._generateCollectionFor(a))([],{}),b._trigger("changed",null,{instance:a,workflows:flows}))},_parseRenderersAndTypes:function(){var b=this;a.each(this.options.renderers,function(a,c){b.setRenderer(a,c)}),a.each(this.options.action_types,function(a,c){b.setActionType(a,c)})},setRenderer:function(a,b){this._renderers[a]=b},getRenderer:function(a){return this._renderers[a]?this._renderers[a]:!1},setActionType:function(a,b){this._action_types[a]=b},getActionType:function(a){return this._action_types[a]},prepareItem:function(a,b,c){var d=this;return renderer=this.getRenderer(b.get("type")),action_type_cb=this.getActionType(b.get("action").type),renderer(a,b,action_type_cb,function(e,f){delete d.workflows[a.cid],d._last_instance=null,b.get("action").type!=="backbone_destroy"&&d._fetchModelWorkflows(a),c(e,f)})},_generateCollectionFor:function(a){var b={model:this.ModelWorkflowModel};return this.options.url&&(b.url=this.options.url(a)),Backbone.Collection.extend(b)},_fetchModelWorkflows:function(a){if(a.isNew())return;var b=this;b.workflows[a.cid]=new(this._generateCollectionFor(a))([],{}),b.workflows[a.cid].fetch({success:function(c){b.workflows[a.cid].reset(c.models),b._trigger("changed",null,{instance:a,workflows:b.workflows[a.cid]})},error:function(a,b){}})}})}