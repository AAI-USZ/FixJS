function() {
    var self = this;
    this.accounts = ko.observableArray([]);
    this.selectedAccount = ko.observable();
    this.campaigns = ko.observableArray([]);
    this.selectedCampaign = ko.observable();

    this.selectedAccountId = function() {
        return self.selectedAccount() !== null ? self.selectedAccount().Id() : -1;
    };
}