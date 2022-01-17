function fetch_control_set(thesaurus) {
    if (!_acs_cache_by_at[thesaurus]) {
        var at = pcrud.retrieve(
            "at", thesaurus,
            {"flesh": 1, "flesh_fields": {"at": ["control_set"]}}
        );
        var cs;
        if (at.control_set()) {
            cs = at.control_set();
        } else {
            cs = new fieldmapper.acs();
            cs.name("None");    // XXX i18n

        }
        _acs_cache_by_at[thesaurus] = cs;
    }
    return _acs_cache_by_at[thesaurus];
}