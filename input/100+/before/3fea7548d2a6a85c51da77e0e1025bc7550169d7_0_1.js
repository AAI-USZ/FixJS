function(a,b){if(!b.jquery_draggable_initialized)return f(b)}),a("img",d).each(function(a,b){b.contentEditable=!1;if(!b.jquery_draggable_initialized)return f(b)}),a("p",d).each(function(c,d){if(a(d).data("jquery_droppable_initialized"))return;return a(d).droppable({tolerance:"pointer",drop:b.handleDropEvent,over:b.handleOverEvent,out:b.handleLeaveEvent}),a(d).data("jquery_droppable_initialized",!0)})},enableDragging:function(){return a.each(c,function(b,c){return a(c).draggable("option","disabled",!1)})},disableDragging:function(){return a.each(c,function(b,c){return a(c).draggable("option","disabled",!0)})}},c=[],d=a(this.options.editable.element),j=this.options,f=d.offset(),i=parseFloat(d.width()/3),h={width:i,height:d.height()},g={big:a("<div/>").addClass("bigOverlay").css({width:i*2,height:d.height()}),left:a("<div/>").addClass("smallOverlay smallOverlayLeft").css(h),right:a("<div/>").addClass("smallOverlay smallOverlayRight").css(h).css("left",i*2)},b.init(),d.bind("halloactivated",b.enableDragging),d.bind("hallodeactivated",b.disableDragging)}})}(jQuery),function(a){return a.widget("IKS.halloformat",{options:{editable:null,toolbar:null,uuid:"",formattings:{bold:!0,italic:!0,strikeThrough:!1,underline:!1},buttonCssClass:null},_create:function(){var b,c,d,e,f,g,h=this;f=this,c=a('<span class="'+f.widgetName+'"></span>'),b=function(b){var d;return d=a("<span></span>"),d.hallobutton({label:b,editable:h.options.editable,command:b,uuid:h.options.uuid,cssClass:h.options.buttonCssClass}),c.append(d)},g=this.options.formattings;for(e in g)d=g[e],d&&b(e);return c.buttonset(),this.options.toolbar.append(c)},_init:function(){}})}(jQuery),function(a){return a.widget("IKS.halloreundo",{options:{editable:null,toolbar:null,uuid:"",buttonCssClass:null},_create:function(){var b,c,d=this;return c=a('<span class="'+this.widgetName+'"></span>'),b=function(b,e){var f;return f=a("<span></span>"),f.hallobutton({uuid:d.options.uuid,editable:d.options.editable,label:e,icon:b==="undo"?"icon-undo":"icon-repeat",command:b,queryState:!1,cssClass:d.options.buttonCssClass}),c.append(f)},b("undo","Undo"),b("redo","Redo"),c.buttonset(),this.options.toolbar.append(c)},_init:function(){}})}(jQuery),function(a){return a.widget("IKS.halloblock",{options:{editable:null,toolbar:null,uuid:"",elements:["h1","h2","h3","p","pre","blockquote"],buttonCssClass:null},_create:function(){var b,c,d;return b=a('<span class="'+this.widgetName+'"></span>'),c=""+this.options.uuid+"-"+this.widgetName+"-data",d=this._prepareDropdown(c),b.append(d),b.append(this._prepareButton(d)),this.options.toolbar.append(b)},_prepareDropdown:function(b){var c,d,e,f,g,h,i,j=this;e=a('<div id="'+b+'"></div>'),d=this.options.editable.element.get(0).tagName.toLowerCase(),c=function(b){var c,e;return c=a("<"+b+' class="menu-item">'+b+"</"+b+">"),d===b&&c.addClass("selected"),d!=="div"&&c.addClass("disabled"),c.bind("click",function(){if(c.hasClass("disabled"))return;return j.options.editable.execute("formatBlock",b.toUpperCase())}),e=function(a){var d;d=document.queryCommandValue("formatBlock");if(d.toLowerCase()===b){c.addClass("selected");return}return c.removeClass("selected")},j.options.editable.element.bind("halloenabled",function(){return j.options.editable.element.bind("keyup paste change mouseup",e)}),j.options.editable.element.bind("hallodisabled",function(){return j.options.editable.element.unbind("keyup paste change mouseup",e)}),c},i=this.options.elements;for(g=0,h=i.length;g<h;g++)f=i[g],e.append(c(f));return e},_prepareButton:function(b){var c;return c=a("<span></span>"),c.hallodropdownbutton({uuid:this.options.uuid,editable:this.options.editable,label:"block",icon:"icon-text-height",target:b,cssClass:this.options.buttonCssClass}),c}})}(jQuery),function(a){return a.widget("IKS.hallolink",{options:{editable:null,toolbar:null,uuid:"",link:!0,image:!0,defaultUrl:"http://",dialogOpts:{autoOpen:!1,width:540,height:95,title:"Enter Link",modal:!0,resizable:!1,draggable:!1,dialogClass:"hallolink-dialog"},butonCssClass:null},_create:function(){var b,c,d,e,f,g,h,i=this;h=this,e=""+this.options.uuid+"-dialog",d=a('<div id="'+e+'"><form action="#" method="post" class="linkForm"><input class="url" type="text" name="url" value="'+this.options.defaultUrl+'" /><input type="submit" id="addlinkButton" value="Insert" /></form></div>'),g=a("input[name=url]",d).focus(function(a){return this.select()}),f=function(a){var b;return a.preventDefault(),b=g.val(),h.options.editable.restoreSelection(h.lastSelection),(new RegExp(/^\s*$/)).test(b)||b===h.options.defaultUrl?(h.lastSelection.collapsed&&(h.lastSelection.setStartBefore(h.lastSelection.startContainer),h.lastSelection.setEndAfter(h.lastSelection.startContainer),window.getSelection().addRange(h.lastSelection)),document.execCommand("unlink",null,"")):h.lastSelection.startContainer.parentNode.href===void 0?document.execCommand("createLink",null,b):h.lastSelection.startContainer.parentNode.href=b,h.options.editable.element.trigger("change"),h.options.editable.removeAllSelections(),d.dialog("close"),!1},d.find("form").submit(f),c=a('<span class="'+h.widgetName+'"></span>'),b=function(b){var e,f,j;return j=""+i.options.uuid+"-"+b,f=a("<span></span>"),f.hallobutton({label:"Link",icon:"icon-link",editable:i.options.editable,command:null,queryState:!1,uuid:i.options.uuid,cssClass:i.options.buttonCssClass}),c.append(f),e=f,e.bind("change",function(b){return h.lastSelection=h.options.editable.getSelection(),g=a("input[name=url]",d),h.lastSelection.startContainer.parentNode.href===void 0?g.val(h.options.defaultUrl):(g.val(a(h.lastSelection.startContainer.parentNode).attr("href")),a(g[0].form).find("input[type=submit]").val("update")),h.options.editable.keepActivated(!0),d.dialog("open"),d.bind("dialogclose",function(){return a("label",f).removeClass("ui-state-active"),h.options.editable.element.focus(),h.options.editable.keepActivated(!1)})}),i.element.bind("keyup paste change mouseup",function(b){var c,d;d=a(h.options.editable.getSelection().startContainer),c=d.prop("nodeName")?d.prop("nodeName"):d.parent().prop("nodeName");if(c&&c.toUpperCase()==="A"){a("label",e).addClass("ui-state-active");return}return a("label",e).removeClass("ui-state-active")})},this.options.link&&b("A");if(this.options.link)return c.buttonset(),this.options.toolbar.append(c),d.dialog(this.options.dialogOpts)},_init:function(){}})}(jQuery),function(a){return a.widget("IKS.hallojustify",{options:{editable:null,toolbar:null,uuid:"",buttonCssClass:null},_create:function(){var b,c,d=this;return c=a('<span class="'+this.widgetName+'"></span>'),b=function(b){var e;return e=a("<span></span>"),e.hallobutton({uuid:d.options.uuid,editable:d.options.editable,label:b,command:"justify"+b,icon:"icon-align-"+b.toLowerCase(),cssClass:d.options.buttonCssClass}),c.append(e)},b("Left"),b("Center"),b("Right"),c.buttonset(),this.options.toolbar.append(c)},_init:function(){}})}(jQuery),function(a){return a.widget("IKS.hallobutton",{button:null,options:{uuid:"",label:null,icon:null,editable:null,command:null,queryState:!0,cssClass:null},_create:function(){var a,b,c;return(c=(b=this.options).icon)==null&&(b.icon="icon-"+this.options.label.toLowerCase()),a=""+this.options.uuid+"-"+this.options.label,this.element.append(this._createButton(a,this.options.command)),this.element.append(this._createLabel(a,this.options.command,this.options.label,this.options.icon)),this.options.cssClass&&this.element.find("label").addClass(this.options.cssClass),this.button=this.element.find("input"),this.button.button(),this.options.cssClass&&this.button.addClass(this.options.cssClass),this.button.data("hallo-command",this.options.command)},_init:function(){var a,b,c=this;this.button||(this.button=this._prepareButton()),this.element.append(this.button),this.options.command&&this.button.bind("change",function(a){return c.options.editable.execute(c.options.command)});if(!this.options.queryState)return;return a=this.options.editable.element,b=function(a){if(!c.options.command)return;try{return c.checked(document.queryCommandState(c.options.command))}catch(b){}},a.bind("halloenabled",function(){return a.bind("keyup paste change mouseup hallomodified",b)}),a.bind("hallodisabled",function(){return a.unbind("keyup paste change mouseup hallomodified",b)})},enable:function(){return this.button.button("enable")},disable:function(){return this.button.button("disable")},refresh:function(){return this.button.button("refresh")},checked:function(a){return this.button.attr("checked",a),this.refresh()},_createButton:function(b){return a('<input id="'+b+'" type="checkbox" />')},_createLabel:function(b,c,d,e){return a('<label for="'+b+'" class="'+c+'_button" title="'+d+'"><i class="'+e+'"></i></label>')}})}(jQuery),function(a){return a.widget("IKS.hallodropdownbutton",{button:null,options:{uuid:"",label:null,icon:null,editable:null,target:"",cssClass:null},_create:function(){var a,b;return(b=(a=this.options).icon)!=null?b:a.icon="icon-"+this.options.label.toLowerCase()},_init:function(){var b,c=this;return b=a(this.options.target),b.css("position","absolute"),b.addClass("dropdown-menu"),b.hide(),this.button||(this.button=this._prepareButton()),this.button.bind("click",function(){if(b.hasClass("open")){