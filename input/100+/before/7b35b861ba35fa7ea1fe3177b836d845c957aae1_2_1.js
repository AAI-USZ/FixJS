function onDataLoaded(res) {
    if (!res) {
        return;
    }
    // wrong response
    if (res.meta.z != zoom) {
        return;
    }
    meta = res.meta;
    data = res.data;
    fadeIn();
}