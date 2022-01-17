function initSectionData(list) {
    if (!list || !list.model) return;
    sectionData = [];
    _sections = [];
    var current = "",
        prop = list.section.property,
        item;

    for (var i = 0, count = list.model.count; i < count; i++) {
        item = list.model.get(i);
        if (item[prop] !== current) {
            current = item[prop];
            _sections.push(current);
            sectionData.push({ index: i, header: current });
        }
    }
}