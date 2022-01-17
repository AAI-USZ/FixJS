function(
    declare,
    lang,
    query,
    nodeListManipulate,
    topic,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    Toolbar
) {
    return declare('Sage.Platform.Mobile.TitleBar', [Toolbar], {
        position: 'top',
        components: [
            {tag: 'h1', attrs: {'class':'toolbar-title'}, components: [
                {tag: 'span', attachPoint: 'titleNode'}
            ]}
        ],
        _setTitleAttr: {node: 'titleNode', type: 'innerHTML'},

        onCreate: function() {
            domAttr.set(this.domNode, 'data-action', 'scroll');
        },

        scroll: function() {
            console.log('scroll!');
        }
    });
}