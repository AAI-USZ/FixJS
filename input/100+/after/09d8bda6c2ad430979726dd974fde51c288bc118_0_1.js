function (page) {
    var oldPage;
    if (page !== null && (!(page instanceof ADMNode) ||
                          page.getType() !== "Page")) {
        console.warn("Warning: tried to set an invalid active page");
        return false;
    }

    if (ADM._activePage !== page) {
        oldPage = ADM._activePage;
        ADM._activePage = page;
        ADM.setSelected(page);
        ADM.clearEvent("activePageChanged");
        ADM.fireEvent("activePageChanged", { page: page, oldPage: oldPage });
        return true;
    }
    return false;
}