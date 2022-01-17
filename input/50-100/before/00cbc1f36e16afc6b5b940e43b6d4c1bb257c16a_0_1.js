function (node) {
        var dp = self.getPanel(node.registration().divisionId());

        var panels = ko.toJS(self.panels);
        var index = _.indexOf(panels, dp()) + 1;
        var result = panels[index] || panels[0]; //get the next one or the first one

        dp(result);
    }