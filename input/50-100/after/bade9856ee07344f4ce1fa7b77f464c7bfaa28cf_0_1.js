function _is_target_slot(list) {
    var i, target;

    if (list == null) {
        return true;
    }

    for (i = 0; i < list.length; i += 1) {
        target = list[i];
        if ((target.type === 'ioperator') && (target.id == this.operator.id) && (target.endpoint == this.meta.name)) {
            return true;
        }
    }
    return false;
}