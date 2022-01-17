function initSectionData(list) {
    if (!list || !list.model) return;
    _sectionData = [];
    _sections = [];
    var current = "";
    var prop = list.section.property;

    for (var i = 0, count = (typeof list.model.count === 'undefined' ? list.model.length : list.model.count); i < count; i++) {
        var item = list.model.get(i);
        if (item[prop] !== current) {
            current = item[prop];
            _sections.push(current);
            _sectionData.push({ index: i, header: current });
        }
    }
}