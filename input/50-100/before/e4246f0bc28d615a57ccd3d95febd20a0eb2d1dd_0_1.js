function fetch_control_set(thesaurus) {
    if (!_acs_cache_by_at[thesaurus]) {
        var at = pcrud.retrieve(
            "at", thesaurus,
            {"flesh": 1, "flesh_fields": {"at": ["control_set"]}}
        );
        _acs_cache_by_at[thesaurus] = at.control_set();
    }
    return _acs_cache_by_at[thesaurus];
}