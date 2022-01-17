function is_function(i) {
    return types.is_atom(i) && i.type === "primitive";
}