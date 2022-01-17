function () {
        this.view.get('modelList').reset([{ a: 5 }]);

        Y.Assert.areSame('5', this.view.tbodyNode.one('td').get('text'));
    }