function is_user_entry_is_empty(entry) {
    if(entry.online) return false;
    if(entry.reserved.length) return false;

    // search for claims
    found = false;
    for (idx in claims) {
        if (claims[idx]['owner'] == entry.user_nick) {
            found = true;
            break;
        }
    }
    if(found) return false;

    // all checks failed -- entry is useless
    return true;
}