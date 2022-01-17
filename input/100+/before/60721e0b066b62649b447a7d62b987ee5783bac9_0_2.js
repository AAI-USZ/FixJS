function () {
    var label, breadcrum;

    label = gettext('No marketplace registered');
    if (this.number_of_alternatives > 0) {
        label = this.alternatives.getCurrentAlternative().getLabel();
    }

    breadcrum = [
        {
            'label': 'marketplace'
        },
        {
            'label': label,
            'menu': this.marketMenu
        }
    ];
    // If no alternatives exist, it is no posible to have an extra breadcrum
    if (this.number_of_alternatives > 0) {
        if (typeof this.alternatives.getCurrentAlternative().getExtraBreadcrum === 'function') {
            breadcrum = breadcrum.concat(this.alternatives.getCurrentAlternative().getExtraBreadcrum());
        }
    }
    return breadcrum;
}