function() {
        var sites = new RegExp("^(https?://)?([^/]+\\.)?(archive\\.org|magnatune\\.com|jamendo\\.com|cdbaby.(com|name)|mange-disque\\.tv|thastrom\\.se|universalpoplab\\.com|alpinechic\\.net|angelika-express\\.de|fixtstore\\.com|phantasma13\\.com|primordialmusic\\.com|transistorsounds\\.com|alter-x\\.net|zorchfactoryrecords\\.com)/");
        return sites.test($('#id-ar\\.url').val())
    }