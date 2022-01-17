function(i){
            var temp = getNavItem(i, sakai.config.Navigation);
            // Add in the template categories
            if (sakai.config.Navigation[i].id === "navigation_create_and_add_link"){
                for (var c = 0; c < sakai.config.worldTemplates.length; c++){
                    var category = sakai.config.worldTemplates[c];
                    sakai.config.Navigation[i].subnav.push({
                        "id": "subnavigation_" + category.id + "_link",
                        "label": category.menuLabel || category.title,
                        "url": "/create#l=" + category.id
                    });
                }
            } else if (sakai.config.Navigation[i].id === "navigation_explore_link" || sakai.config.Navigation[i].id === "navigation_anon_explore_link"){
                for (var x = 0; x < sakai.config.worldTemplates.length; x++){
                    var categoryx = sakai.config.worldTemplates[x];
                    sakai.config.Navigation[i].subnav.push({
                        "id": "subnavigation_explore_" + categoryx.id + "_link",
                        "label": categoryx.titlePlural,
                        "url": "/search#l=" + categoryx.id
                    });
                }
            }

            if (sakai.config.Navigation[i].subnav) {
                temp.subnav = [];
                for (var ii in sakai.config.Navigation[i].subnav) {
                    if (sakai.config.Navigation[i].subnav.hasOwnProperty(ii)) {
                        temp.subnav.push(getNavItem(ii, sakai.config.Navigation[i].subnav));
                    }
                }
            }
            return temp;
        }