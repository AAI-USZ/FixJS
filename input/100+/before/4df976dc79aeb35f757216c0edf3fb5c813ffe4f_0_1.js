function _rebuildHexLegend(countOrProportion, questionName, responseNames)
{
    var legendTemplate = 
        '<div id="hex-legend" style="display:block">\n' +
        '  <h4><%= title %> </h4>\n' +
        '  <div class="scale">\n' +
        '  <ul class="labels">\n' +
        '<% _.each(hexes, function(hex) { %>' +
        '    <li> <span style="background-color: <%= hex.color %>" />' +
        '         <%= hex.text %> </li>\n<% }); %>' +
        '  </div>\n  </ul>\n<div style="clear:both"></div>\n</div>';
    var proportionString = 'Proportion of surveys with response(s): ' +
            (responseNames && (responseNames.length == 1 ? responseNames[0] :
            _.reduce(responseNames, 
                     function(a,b) { return (a && a + ", or ") + b; }, '')));
    var maxHexCount = _.max(formResponseMngr.dvQuery({dims:['hexID'], vals:[dv.count()]})[1]);
    var interval = function(scheme) { 
        var len = colors.getNumProportional(scheme);
        return _.map(_.range(1,len+1), function (v) { return v / len });
    };
    var templateFiller = {
        count: { title : 'Number of surveys:',
            hexes : _.map(interval("Set1"), function (i) {
                      return  {color: colors.getProportional(i),
                               text: '<' + Math.ceil(i * maxHexCount)}; })
        },
        proportion: { title : proportionString,
            hexes : _.map(interval("Set2"), function (i) {
                      return {color: colors.getProportional(i, "Set2"),
                              text: '<' + Math.ceil(i * 100) + '%'}; })
        }
    };
    $('#hex-legend').remove();
    $(_.template(legendTemplate, templateFiller[countOrProportion]))
            .appendTo(legendsContainer);
    if(!hexbinLayerGroupActive) $('#hex-legend').hide();
}