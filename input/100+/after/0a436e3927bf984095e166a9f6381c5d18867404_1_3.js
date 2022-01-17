function unbind_events() {
    // Unbind events
    ProfilesLib.searchfield_elm.unbind('propertychange keyup input paste');
    ProfilesLib.adv_search_country_elm.unbind('change');
    ProfilesLib.adv_search_group_elm.unbind('change');
    ProfilesLib.adv_search_area_elm.unbind('change');
    $(window).unbind('hashchange');
}