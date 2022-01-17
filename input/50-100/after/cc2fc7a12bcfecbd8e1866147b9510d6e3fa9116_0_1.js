function addHideRowLinks() {
    var parentEl = Ext.fly('distribution_centres_table');
    if (parentEl) {
        parentEl.on('click', function(event, target, options) {
            event.preventDefault();
            var inputField = Ext.get(target).prev('.destroy-field');
            inputField.set({
                value:true
            });
            Ext.get(target).parent().parent().hide();
        }, this, {
            delegate: 'a'
        });
    }
}