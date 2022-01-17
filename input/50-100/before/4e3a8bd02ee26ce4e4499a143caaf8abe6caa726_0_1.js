function () {
    this.accounts = ko.observableArray([]);
    this.selectedAccount = ko.observable();
    this.campaigns = ko.observableArray([]);
    this.selectedCampaign = ko.observable();
}