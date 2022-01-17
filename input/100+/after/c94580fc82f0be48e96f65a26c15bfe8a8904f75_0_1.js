function draw() {
    var org_id = openils.User.user.ws_ou();
    var list = fieldmapper.aou.findOrgUnit(org_id).orgNodeTrail().map(
        function (i) {return i.id() }
    );

    new openils.User().buildPermOrgSelector(
        'VIEW_PROVIDER', contextOrgSelector, null,
        function() {
            dojo.connect(contextOrgSelector, 'onChange', filterGrid);
        }
    );


    if(providerId) {
        openils.Util.addCSSClass(dojo.byId('provider-list-div'), 'hidden');
       
        console.log('in draw');
        var pcrud = new openils.PermaCrud();
        pcrud.retrieve('acqpro', providerId, {
                oncomplete : function(r) {
                    provider = openils.Util.readResponse(r);
                    console.log('provider is' + js2JSON(provider));
                    var pane = new openils.widget.EditPane({fmObject:provider, paneStackCount:2}, dojo.byId('provider-summary-pane'));
                    pane.startup();
                    console.log("pane started");
                    dojo.connect(providerTabs, 'selectChild', drawProviderSummary);                        
                }
 
            });
      
        drawProviderSummary();
    } else {
        openils.Util.addCSSClass(dojo.byId('provider-details-div'), 'hidden');       
        console.log('in else block');
        pListGrid.loadAll({order_by:{acqpro : 'name'}},{'owner':list});
        pListGrid.onPostCreate = function(fmObject) {
            location.href = location.href + '/' + fmObject.id();
        }
        
    }
   
}