function Resource(container) {
        var graph;
        var current;
        var source = this;

        var views;

        //bind events
        events.bind(EventCode.CONCEPT.SELECTED,function(event){
            current = event.data;
            show(event.data.uri,event.data.type);
        });
        events.bind(EventCode.GRAPH.LOAD,function(event){
            graph = event.data.uri;
        });

        events.bind(EventCode.VIEW.RELOAD,function(event){
            for(var i in event.data.uris) {
                var uri = event.data.uris[i];
                for(var j in views) {
                    if(views[j].getProperty() == uri) {
                        views[j].reload();
                        console.info(uri);
                    }
                }
            }
        });

        this.init = function() {
        }

        //load templates
        var literal_view_template = HTML_TEMPLATES.views.resource.literal.view;
        var literal_fix_template = HTML_TEMPLATES.views.resource.literal.fix;
        var literal_edit_template = HTML_TEMPLATES.views.resource.literal.edit;
        var add_template = HTML_TEMPLATES.views.resource.add;
        var text_view_template = HTML_TEMPLATES.views.resource.text.view;
        var text_fix_template = HTML_TEMPLATES.views.resource.text.fix;
        var text_edit_template = HTML_TEMPLATES.views.resource.text.edit;
        var concept_fix_template = HTML_TEMPLATES.views.resource.concept.fix;
        var concept_edit_template = HTML_TEMPLATES.views.resource.concept.edit;

        //show skos view
        function show(uri,type) {
            var content = $("<div></div>");
            $("#" + container).empty().append(content);
            events.unbind("property-view");
            content.html(HTML_TEMPLATES.views.resource.basic);
            $("#view_header_uri").text(uri);
            $("#view_content").addClass(type);
            $("#view_header_rdf_link").click(function() {
                OPTIONS.RDF_LINK(uri);
            });
            $("#view_header_uri_delete").click(function(){
                events.fire(new Event(EventCode.CONCEPT.DELETE,current,self));
            })
            switch (type) {
                case 'graph':
                    views = createView(PROPERTIES.graph);
                    break;
                case 'scheme':
                    views = createView(PROPERTIES.scheme);
                    break;
                default:
                    views = createView(PROPERTIES.concept);
                    break;
            }
        }

        //display in columns depending on configurations
        function createView(options) {

            var v = [];

            for(var i=0;i<options.left.length;i++) {
                var view = createPropertyView(options.left[i]);
                $("#view_content_left").append(view.getBox());
                bindEvents(view);
                v.push(view);
            }
            for(var i=0;i<options.right.length;i++) {
                var view = createPropertyView(options.right[i]);
                $("#view_content_right").append(view.getBox());
                bindEvents(view);
                v.push(view);
            }

            return v;
        }

        //event-binding for rerender (e.g. modified, broader, etc)
        function bindEvents(view) {
            switch(view.getType()) {
                case "string":
                    switch(view.getProperty()) {
                        case "http://purl.org/dc/terms/modified" :
                            events.bind(EventCode.PROPERTY.UPDATED,function(e) {
                                if(e.data.uri==current.uri) {
                                    view.reload();
                                }
                            },"property-view");
                            events.bind(EventCode.PROPERTY.DELETED,function(e) {
                                if(e.data.uri==current.uri) {
                                    view.reload();
                                }
                            },"property-view");
                            events.bind(EventCode.PROPERTY.CREATED,function(e) {
                                if(e.data.uri==current.uri) {
                                    view.reload();
                                }
                            },"property-view");
                            events.bind(EventCode.RELATION.CREATED,function(e){
                                switch(e.data.type) {
                                    case "broader": if(e.data.narrower==current.uri)view.reload();break;
                                    case "narrower": if(e.data.broader==current.uri)view.reload();break;
                                    case "broaderNarrower": if(e.data.broader==current.uri||e.data.narrower==current.uri)view.reload();break;
                                    case "topConcept": if(e.data.parent==current.uri) view.reload();break;
                                    default: if(e.data.concept1=current.uri) view.reload();
                                }
                            },"property-view");
                            events.bind(EventCode.RELATION.DELETED,function(e){
                                switch(e.data.type) {
                                    case "broader": if(e.data.narrower==current.uri) view.reload();break;
                                    case "narrower": if(e.data.broader==current.uri) view.reload();break;
                                    case "topConcept": if(e.data.parent==current.uri) view.reload();break;
                                    default: if(e.data.concept1=current.uri) view.reload();
                                }
                            },"property-view");
                            break;
                    }break;
                case 'concept':
                    switch(view.getProperty()) {
                        case "http://www.w3.org/2004/02/skos/core#broader" :
                        case "http://www.w3.org/2004/02/skos/core#narrower" :
                        case "http://www.w3.org/2004/02/skos/core#hasTopConcept" :
                            events.bind(EventCode.RELATION.DELETED,function(e){
                                switch(e.data.type) {
                                    case "broader": if(e.data.narrower==current.uri) view.reload();break;
                                    case "narrower": if(e.data.broader==current.uri) view.reload();break;
                                    case "topConcept": if(e.data.parent==current.uri) view.reload();break;
                                }
                            },"property-view");
                            events.bind(EventCode.RELATION.CREATED,function(e){
                                switch(e.data.type) {
                                    case "broader": if(e.data.narrower==current.uri) view.reload();break;
                                    case "narrower": if(e.data.broader==current.uri) view.reload();break;
                                    case "broaderNarrower": if(e.data.broader==current.uri||e.data.narrower==current.uri)view.reload();break;
                                    case "topConcept": if(e.data.parent==current.uri) view.reload();break;
                                }
                            },"property-view");
                            break;
                    }break;
            }
        }

        //different view-type for different types of properties
        function createPropertyView(options) {
            switch(options.type) {
                case 'string': return new StringPropertyView(options.title,options.property,options.multilingual,options.multivalue,options.editable,false);
                case 'text' : return new StringPropertyView(options.title,options.property,options.multilingual,options.multivalue,options.editable,true);
                case 'uri' : return new UriPropertyView(options.title,options.property,options.multivalue,options.editable);
                case 'concept' : return new ConceptPropertyView(options.title,options.property,options.droppable,options.editable);
            }
        }

        /**
         *
         * @param title to show
         * @param property as uri
         * @param multilingual
         * @param multivalue
         * @param editable
         * @param multiline text should have more then one line
         */
        function StringPropertyView(title,property,multilingual,multivalue,editable,multiline) {
            var box = $("<div></div>").addClass("content_box").append($("<h1></h1>").text(title));
            var container = $("<div></div>").appendTo(box);
            load();
            this.getBox = function() {
                return box;
            }
            this.getType = function() {
                return "string";
            }
            this.getProperty = function() {
                return property;
            }
            this.reload = function() {
                load();
            }

            //get properties
            function load(){
                skos.list.values(graph,current.uri,property,write,function(){popups.alert("Alert","could not list values "+property)});
            }
            //write properties
            function write(data) {
                container.empty();
                var obj = {};
                //order on language
                for(var i=0; i<data.length;i++) {
                    if(data[i].value["xml:lang"]) {
                        if(!obj[data[i].value["xml:lang"]]) obj[data[i].value["xml:lang"]] = [];
                        obj[data[i].value["xml:lang"]].push(data[i].value.value);
                    } else {
                        if(!obj["none"]) obj["none"] = [];
                        obj["none"].push(data[i].value.value);
                    }
                }
                var boxClass = multiline?"view_subbox_text":"view_subbox";
                if(multilingual) {
                    for(var i=0; i<settings.getLanguages().length;i++) {
                        var content = $("<div></div>").addClass('list_values');
                        content.appendTo(container);
                        content.append($("<div></div>").addClass("language_sign").append("<span>"+settings.getLanguages()[i]+"</span>"));
                        content.append($("<div></div>").addClass(boxClass).append(createTable(obj[settings.getLanguages()[i]],settings.getLanguages()[i])));
                    }
                } else {
                    var content = $("<div></div>").addClass('list_values');
                    content.appendTo(container);
                    content.append($("<div></div>").addClass(boxClass).append(createTable(obj["none"],null)));
                }

                function createTable(data, language) {
                    var table = $("<table></table>").addClass("literal_table");

                    // a single row
                    function createSingle(data) {
                        if(editable) {
                            var templ1 = multiline?$(text_view_template):$(literal_view_template);
                            var templ2 = multiline?$(text_edit_template):$(literal_edit_template);
                            templ2.find(".literal_input").val(data);
                            templ1.find(".literal_text").html(data.n3escapeToHMTL());
                            templ1.find(".literal_text").attr('original',data);
                            templ1.find(".literal_text").click(function() {
                                templ1.hide();
                                templ2.show();
                                templ2.find(".literal_input").focus();
                            });
                            templ1.find(".literal_edit").click(function() {
                                templ1.hide();
                                templ2.show();
                                templ2.find(".literal_input").focus();
                            });
                            templ2.find(".literal_save").click(function() {
                                var n3str = templ2.find(".literal_input").val().n3escape();
                                var htmlStr = templ2.find(".literal_input").val().n3escapeToHMTL();
                                skos.update.value(graph, current.uri, property, templ1.find(".literal_text").attr('original').n3escape(), n3str, language, function() {
                                    events.fire(new Event(EventCode.PROPERTY.UPDATED, {uri:current.uri,property:property,language:language,value:n3str}, source));
                                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                                    templ1.find(".literal_text").html(htmlStr);
                                    templ1.find(".literal_text").attr('original',n3str);
                                    templ2.hide();
                                    templ1.show();
                                })
                            });
                            templ2.find(".literal_cancel").click(function() {
                                templ2.hide();
                                templ2.find(".literal_input").val(templ1.find(".literal_text").attr('original'));
                                templ1.show();
                            });
                            templ1.find(".literal_delete").click(function() {
                                if (confirm("delete property?")) {
                                    skos._delete.value(graph, current.uri, property, templ1.find(".literal_text").attr('original').n3escape(), language, function() {
                                        events.fire(new Event(EventCode.PROPERTY.DELETED, {uri:current.uri,property:property,language:language}, source));
                                        events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                                        load();
                                    });
                                }
                            });
                            table.append(templ1);
                            table.append(templ2);
                        } else {
                            var templ = multiline?$(text_fix_template):$(literal_fix_template);
                            templ.find(".literal_text").text(data);
                            table.append(templ);
                        }

                    }

                    //to add new rows
                    function createAdd() {
                        var templ = $(add_template);
                        templ.find(".add").click(function() {
                            var lang = language?("("+language+")"):"";
                            var inp = prompt("Set value for '"+title+"' "+lang, "");
                            if (inp != null) {
                                if (inp == "") {
                                    popups.alert("Alert","value must not be empty");
                                } else {
                                    skos.set.value(graph,current.uri,property,inp,language,function(){
                                        events.fire(new Event(EventCode.PROPERTY.CREATED,{uri:current.uri,property:property,language:language,value:inp},source));
                                        events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                                        load();
                                    });
                                }
                            }
                        });
                        table.append(templ);
                    }

                    //if value is not set and not editable
                    function createEmpty() {
                        var templ = $(literal_fix_template);
                        templ.find(".literal_text").text("N/A");
                        table.append(templ);
                    }

                    //organize display
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            createSingle(data[i]);
                        }
                        if (multivalue && editable) {
                            createAdd();
                        }
                    } else {
                        if(editable) {
                            createAdd();
                        } else {
                            createEmpty();
                        }
                    }
                    return table;
                }
            }
            return this;
        }

        /**
         * to display and edit uris
         * @param title
         * @param property
         * @param multivalue
         * @param editable
         */
        function UriPropertyView(title, property, multivalue, editable) {
            var box = $("<div></div>").addClass("content_box").append($("<h1></h1>").text(title));
            var container = $("<div></div>").appendTo(box);
            load();
            this.getBox = function() {
                return box;
            }
            this.getType = function() {
                return "uri";
            }
            this.getProperty = function() {
                return property;
            }
            this.reload = function() {
                load();
            }
            //get properties
            function load() {
                skos.list.values(graph, current.uri, property, write, function() {
                    popups.alert("Alert","could not list values " + property)
                });
            }

            //write editable row
            function writeEditable(table,data) {
                var templ1 = $(literal_view_template);
                var templ2 = $(literal_edit_template);
                templ2.find(".literal_input").val(data.value.value);
                templ1.find(".literal_text").text(data.value.value);
                templ1.find(".literal_text").click(function() {
                    templ1.hide();
                    templ2.show();
                    templ2.find(".literal_input").focus();
                });
                templ1.find(".literal_edit").click(function() {
                    templ1.hide();
                    templ2.show();
                    templ2.find(".literal_input").focus();
                });
                templ2.find(".literal_save").click(function() {
                    var oldT = templ1.find(".literal_text").text();
                    var newT = templ2.find(".literal_input").val();
                    //Check url
                    if (check(newT)) {
                        skos.update.uri(graph, current.uri, property, oldT, newT, function() {
                            events.fire(new Event(EventCode.PROPERTY.UPDATED, {uri:current.uri,property:property,value:newT}, source));
                            events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                            templ1.find(".literal_text").text(newT);
                            templ2.hide();
                            templ1.show();
                        });
                    } else {
                        popups.alert("Alert",newT + " is not a valid url");
                    }
                });
                templ2.find(".literal_cancel").click(function() {
                    templ2.hide();
                    templ2.find(".literal_input").val(templ1.find(".literal_text").text());
                    templ1.show();
                });
                templ1.find(".literal_delete").click(function() {
                    if (confirm("delete property?")) {
                        skos._delete.uri(graph, current.uri, property, templ1.find(".literal_text").text(), function() {
                            events.fire(new Event(EventCode.PROPERTY.DELETED, {uri:current.uri,property:property}, source));
                            events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                            load();
                        });
                    }
                });
                table.append(templ1);
                table.append(templ2);
            }

            //write table
            function write(data) {
                var table = $("<table></table>").addClass("literal_table");
                var subview = $("<div></div>").addClass("view_subbox").append(table);
                var content = $("<div></div>").addClass('list_values').append(subview);
                container.empty().append(content);
                if (data && data.length>0) {
                    if (editable) {
                        for (var i = 0; i < data.length; i++) {
                            writeEditable(table,data[i])
                        }
                        if(multivalue)createAdd();
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var templ = $(literal_fix_template);
                            templ.find(".literal_text").text(data[i].value.value);
                            table.append(templ);
                        }
                    }
                } else {
                    if(editable) {
                       createAdd();
                    } else {
                        var templ = $(literal_fix_template);
                        templ.find(".literal_text").text("N/A");
                        table.append(templ);
                    }
                }
                //to add new value
                function createAdd() {
                    var templ = $(add_template);
                    templ.find(".add").click(function() {
                        var inp = prompt("Set value for '" + title + "'");
                        if (inp != null) {
                            if (inp == "") {
                                popups.alert("Alert","value must not be empty");
                            } else if(check(inp)){
                                skos.set.uri(graph, current.uri, property, inp, function() {
                                    events.fire(new Event(EventCode.PROPERTY.CREATED, {uri:current.uri,property:property,value:inp}, source));
                                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri]}));
                                    load();
                                });
                            } else {
                                popups.alert("Alert",inp+" is not a valid url");
                            }
                        }
                    });
                    table.append(templ);
                }
            }

            //check if input is valid uri
            function check(value) {
                var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
                return urlregex.test(value);
            }

            return this;
        }

        /**
         * To show concepts (with dropable feature)
         * @param title
         * @param property
         * @param droppable
         * @param editable
         */
        function ConceptPropertyView(title,property,droppable,editable) {
            var box = $("<div></div>").addClass("content_box").append($("<h1></h1>").text(title));
            var container = $("<div></div>").appendTo(box);
            load();
            this.getBox = function() {
                return box;
            }
            this.getType = function() {
                return "concept";
            }
            this.getProperty = function() {
                return property;
            }
            this.reload = function() {
                load();
            }
            //get properties
            function load() {
                skos.list.concepts(graph, current.uri, property, write, function() {
                    popups.alert("Alert","could not list values " + property);
                });
            }

            //write a single row
            function writeSingle(table,data) {
                var title = data.title?data.title.value:data.uri.value;
                if(editable) {
                    var temp = $(concept_edit_template);
                    temp.find(".concept_text").text(title).click(function() {
                        events.fire(new Event(EventCode.CONCEPT.SELECTED,{uri:data.uri.value,type:'concept'},source));
                    });
                    table.append(temp);
                    temp.find(".concept_delete").click(function(){
                         if(!confirm("delete relation")) return false;
                         if(property=="http://www.w3.org/2004/02/skos/core#broader") {
                             skos._delete.broaderNarrower(graph,data.uri.value,current.uri,function(){
                                 events.fire(new Event(EventCode.RELATION.DELETED,{type:"broader",narrower:current.uri,broader:data.uri.value},source));
                                 events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri.value]}));
                             },function(){popups.alert("Alert","could not delete relation")});
                         } else if(property=="http://www.w3.org/2004/02/skos/core#narrower") {
                              skos._delete.broaderNarrower(graph,current.uri,data.uri.value,function(){
                                  events.fire(new Event(EventCode.RELATION.DELETED,{type:"narrower",narrower:data.uri.value,broader:current.uri},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri.value]}));
                             },function(){popups.alert("Alert","could not delete relation")});
                         } else if((property=="http://www.w3.org/2004/02/skos/core#hasTopConcept")) {
                              skos._delete.topConcept(graph,current.uri,data.uri.value,function(){
                                  events.fire(new Event(EventCode.RELATION.DELETED,{type:"topConcept",parent:current.uri,child:data.uri.value},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri.value]}));
                             },function(){popups.alert("Alert","could not delete relation")});
                         } else if((property=="http://www.w3.org/2004/02/skos/core#related")) {
                              skos._delete.related(graph,current.uri,data.uri.value,function(){
                                  events.fire(new Event(EventCode.RELATION.DELETED,{type:"related",concept1:current.uri,concept2:data.uri.value},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri.value]}));
                                  load();
                              },function(){popups.alert("Alert","could not delete relation")});
                         }  else {
                            skos._delete.uri(graph,current.uri,property,data.uri.value,function(){
                                //TODO check event
                                  events.fire(new Event(EventCode.RELATION.CREATED,{type:property,concept1:current.uri,concept2:data.uri.value},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri.value]}));
                                  load();
                             },function(){popups.alert("Alert","could not create relation")});
                         }
                    })
                } else {
                    var temp = $(concept_fix_template);
                    temp.find(".concept_text").text(title).click(function() {
                        events.fire(new Event(EventCode.CONCEPT.SELECT,current,source));
                    });
                    table.append(temp);
                }
            }

            //write table
            function write(data) {
                var table = $("<table></table>").addClass("literal_table");
                var subview = $("<div></div>").addClass("view_subbox").append(table);
                if(droppable) {
                    $("<div><i class='icon-share-alt'></i></div>").addClass("droppable").appendTo(subview);
                    subview.addClass("view_uri_subbox");
                }
                var content = $("<div></div>").addClass('list_values').append(subview);
                container.empty().append(content);
                if (data && data.length>0) {
                    for (var i = 0; i < data.length; i++) {
                        writeSingle(table,data[i]);
                    }
                }

                //implement drop actions
                if(droppable) {
                    subview.get(0).addEventListener('dragenter', function(e) {
                        content.addClass('boxDragover');
                    }, false);
                    subview.get(0).addEventListener('dragover', function(e) {
                        if (e.preventDefault) {e.preventDefault();}
                        //e.dataTransfer.dropEffect = 'move';
                        return false;
                    }, false);
                    subview.get(0).addEventListener('dragleave', function(e) {
                        content.removeClass('boxDragover');
                    }, false);
                    subview.get(0).addEventListener('drop', function(e) {
                        if (e.stopPropagation) {
                            e.stopPropagation();
                        }
                        var uri = e.dataTransfer.getData('text/uri-list');
                        e.preventDefault();
                        //prevent other drops
                        if(e.dataTransfer.getData('text/plain')) {
                            popups.info("Not Allowed","This kind of drop is not allowed");
                            return false;
                        }
                        if(!uri || uri=="") {
                            popups.info("Not Allowed","This kind of drop is not allowed");
                            return false;
                        }

                        var parent = e.dataTransfer.getData('parent');
                        if(property=="http://www.w3.org/2004/02/skos/core#broader") {
                             skos.set.broaderNarrower(graph,uri,current.uri,function(){
                                 events.fire(new Event(EventCode.RELATION.CREATED,{type:"broader",broader:uri,narrower:current.uri},source));
                                 events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri]}));
                             },function(){popups.alert("Alert","could not set relation")});
                         } else if(property=="http://www.w3.org/2004/02/skos/core#narrower") {
                              skos.set.broaderNarrower(graph,current.uri,uri,function(){
                                  events.fire(new Event(EventCode.RELATION.CREATED,{type:"narrower",narrower:uri,broader:current.uri},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri]}));
                             },function(){popups.alert("Alert","could not set relation")});
                         } else if((property=="http://www.w3.org/2004/02/skos/core#hasTopConcept")) {
                              skos.set.topConcept(graph,current.uri,uri,function(){
                                  events.fire(new Event(EventCode.RELATION.CREATED,{type:"topConcept",parent:current.uri,child:uri},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri]}));
                             },function(){popups.alert("Alert","could not set relation");});
                         } else if((property=="http://www.w3.org/2004/02/skos/core#related")) {
                              skos.set.related(graph,current.uri,uri,function(){
                                  events.fire(new Event(EventCode.RELATION.CREATED,{type:"related",concept1:current.uri,concept2:uri},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri]}));
                                  load();
                             },function(){popups.alert("Alert","could not create relation")});
                         }  else {
                              skos.set.uri(graph,current.uri,property,uri,function(){
                                  events.fire(new Event(EventCode.RELATION.CREATED,{type:property,concept1:current.uri,concept2:uri},source));
                                  events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[current.uri,data.uri]}));
                                  load();
                             },function(){popups.alert("Alert","could not create relation")});
                         }
                        content.removeClass('boxDragover');
                        return false;
                    }, false);
                }
            }
            return this;
        }
    }