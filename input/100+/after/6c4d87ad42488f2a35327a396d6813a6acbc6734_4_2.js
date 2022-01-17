function(page_model, render_mode, level, ref_element, incremental) {
            // Note: if the topic is not viewable/editable the page model is undefined
            if (!page_model) {
                return
            }
            //
            if (page_model.type == PageModel.SIMPLE) {
                var box = render_box(page_model, is_many(), false)  // is_complex=false
                page_model[render_func_name()](box)
            } else if (page_model.type == PageModel.COMPOSITE) {
                var box = render_box(page_model, is_many(), true)   // is_complex=true
                for (var assoc_def_uri in page_model.childs) {
                    var child_model = page_model.childs[assoc_def_uri]
                    if (child_model.type == PageModel.MULTI) {
                        // cardinality "many"
                        child_model[render_func_name_many()](box, level + 1)
                    } else {
                        // cardinality "one"
                        this.render_page_model(child_model, render_mode, level + 1, box)
                    }
                }
            } else {
                throw "TopicRendererError: invalid page model"
            }

            function is_many() {
                // Note: the top-level page model has no assoc_def
                return page_model.assoc_def && page_model.assoc_def.part_cardinality_uri == "dm4.core.many"
            }

            function render_func_name() {
                switch (render_mode) {
                case "page":
                    return "render_field"
                case "form":
                    return "render_form_element"
                default:
                    throw "TopicRendererError: \"" + render_mode + "\" is an invalid render mode"
                }
            }

            function render_func_name_many() {
                switch (render_mode) {
                case "page":
                    return "render_fields"
                case "form":
                    return "render_form_elements"
                default:
                    throw "TopicRendererError: \"" + render_mode + "\" is an invalid render mode"
                }
            }

            function render_box(page_model, is_many, is_complex) {
                var box = $("<div>").addClass("box")
                // Note: a simple box doesn't get a "level" class to let it inherit the background color
                if (is_complex) {
                    box.addClass("level" + level)
                }
                if (incremental) {
                    ref_element.before(box)
                } else {
                    ref_element.append(box)
                }
                //
                if (render_mode == "form" && is_many) {
                    render_remove_button(page_model, box)
                }
                //
                return box
            }

            function render_remove_button(page_model, parent_element) {
                var remove_button = dm4c.ui.button(do_remove, undefined, "circle-minus")
                var remove_button_div = $("<div>").addClass("remove-button").append(remove_button)
                parent_element.append(remove_button_div)

                function do_remove() {
                    // update model
                    page_model.topic.delete = true
                    // update view
                    parent_element.remove()
                }
            }
        }