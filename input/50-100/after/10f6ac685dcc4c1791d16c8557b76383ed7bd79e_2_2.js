function(pagestructure) {
            pagestructure = sakai.api.Server.cleanUpSakaiDocObject(pagestructure);
            pagestructure.structure0 = setEditProperty(pagestructure.structure0, sakai_global.content_profile.content_data.isManager, sakai_global.content_profile.content_data.isEditor);
            if (getPageCount(pagestructure) >= 3) {
                setColumnLayout(true, true);
            } else {
                setColumnLayout(true, false);
            }
            globalPageStructure = pagestructure;
            generateNav(pagestructure);
        }