function() {
    var state = new osg.State();
    state.setGraphicContext(createFakeRenderer());
    
    var stateSet0 = new osg.StateSet();
    stateSet0.setAttributeAndMode(new osg.Material());

    var stateSet1 = new osg.StateSet();
    stateSet1.setTextureAttributeAndMode(0,new osg.Texture(undefined));

    state.pushStateSet(stateSet0);
    state.pushStateSet(stateSet1);
    state.apply();
    ok(true, "check not exception");
}