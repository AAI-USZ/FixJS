function KmlViewerUi() {
    // fetch URL bases
    var $url_base = $('#url-base');
    this.api_url = $url_base.attr('data-api-url');
    this.jarkusmean_chart_url = $url_base.attr('data-jarkusmean-chart-url');

    // components
    this.treeStore = null;
    this.treePanel = null;
    this.jarkusPanel = null;
    this.accordion = null;

    // etc
    this.previewImageUrl = emptyGif;

    // for multiselection
    this.isMultiSelectEnabled = false;
    this.selectedItems = [];
}