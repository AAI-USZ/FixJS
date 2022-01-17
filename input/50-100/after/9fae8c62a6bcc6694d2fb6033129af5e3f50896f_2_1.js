function(idx, name){
                    var tag = new Tag();
                    tag.setName(name);
                    tag.setUrlParams(name)
                    //tag.setLinkable(false);
                    me._tags.push(tag);
                    me._tag_list_element.append(tag.getElement());
                }