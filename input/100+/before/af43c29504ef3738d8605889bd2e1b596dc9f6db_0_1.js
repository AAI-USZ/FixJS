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
                    createView(PROPERTIES.graph);
                    break;
                case 'scheme':
                    createView(PROPERTIES.scheme);
                    break;
                default:
                    createView(PROPERTIES.concept);
                    break;
            }
        }