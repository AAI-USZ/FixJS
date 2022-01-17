function type_name(i) {
    if (types.is_list(i)) return "list";
    if (types.is_symbol(i)) return "symbol";
    if (types.is_number(i)) return "number";
    if (types.is_string(i)) return "string";
    if (types.is_function(i)) return "function";
    return "unknown";
}