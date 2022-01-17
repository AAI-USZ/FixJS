function _is_target_slot(list) {
    var i, slot;

    if (list == null) {
        return true;
    }

    for (i = 0; i < list.length; i += 1) {
        slot = list[i];
        if (slot.ioperator == this.operator.id && slot.name == this.meta.name) {
            return true;
        }
    }
    return false;
}