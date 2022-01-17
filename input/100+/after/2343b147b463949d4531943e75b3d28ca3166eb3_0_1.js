function createOptionsMenu() {
  var yAxisUnitMenu = new Ext.menu.Menu({
    items: [
      menuRadioItem("yUnit", "Standard", "yUnitSystem", "si"),
      menuRadioItem("yUnit", "Binary", "yUnitSystem", "binary"),
      menuRadioItem("yUnit", "None", "yUnitSystem", "none")
      
    ]
  });
  var yAxisSideMenu = new Ext.menu.Menu({
    items: [
      menuRadioItem("yAxis", "Left", "yAxisSide", "left"),
      menuRadioItem("yAxis", "Right", "yAxisSide", "right")
    ]
  });

  var yAxisLeftMenu = new Ext.menu.Menu({
    items: [
      menuInputItem("Left Y Label", "vtitle"),
      menuInputItem("Left Y Minimum", "yMinLeft"),
      menuInputItem("Left Y Maximum", "yMaxLeft"),
      menuInputItem("Left Y Limit", "yLimitLeft"),
      menuInputItem("Left Y Step", "yStepLeft"),
      menuInputItem("Left Line Width", "leftWidth"),
      menuInputItem("Left Line Color", "leftColor"),
      menuInputItem("Left Line Dashed (length, in px)", "leftDashed")
    
    ]
  });
  var yAxisRightMenu = new Ext.menu.Menu({
    items: [
      menuInputItem("Right Y Label", "vtitleRight"),
      menuInputItem("Right Y Minimum", "yMinRight"),
      menuInputItem("Right Y Maximum", "yMaxRight"),
      menuInputItem("Right Y Limit", "yLimitRight"),
      menuInputItem("Right Y Step", "yStepRight"),
      menuInputItem("Right Line Width", "rightWidth"),
      menuInputItem("Right Line Color", "rightColor"),
      menuInputItem("Right Line Dashed (length, in px)", "rightDashed")
    
    ]
  });

  var SecondYAxisMenu = new Ext.menu.Menu({
    items: [
      {text: "Left Y-Axis", menu: yAxisLeftMenu},
      {text: "Right Y-Axis", menu: yAxisRightMenu}
    ]
  });

  var yAxisMenu = new Ext.menu.Menu({
    items: [
      menuInputItem("Label", "vtitle"),
      menuInputItem("Minimum", "yMin"),
      menuInputItem("Maximum", "yMax"),
      menuInputItem("Minor Lines", "minorY", "Enter the number of minor lines to draw", /^[a-zA-Z]/),
      menuInputItem("Logarithmic Scale", "logBase", "Enter the logarithmic base to use (ie. 10, e, etc...)"),
      {text: "Unit", menu: yAxisUnitMenu},
      {text: "Side", menu: yAxisSideMenu},
      {text: "Dual Y-Axis Options", menu: SecondYAxisMenu},
      menuHelpItem("Dual Y-Axis Help", "To select metrics to associate with the second (right-side) y-axis, go into the Graph Data dialog box, highlight a metric, click Apply Functions, Special, Second Y Axis.")
    ]
  });

  var xAxisMenu = new Ext.menu.Menu({
    items: [
      menuInputItem("Time Format", "xFormat", "Enter the time format (see Python's datetime.strftime())", /^$/),
      menuInputItem("Timezone", "tz", "Enter the timezone to display (e.g. UTC or America/Chicago)", /^$/),
      menuInputItem("Point-width Consolidation Threshold", "minXStep", "Enter the closest number of pixels between points before consolidation")
    ]
  });

  var areaMenu = new Ext.menu.Menu({
    items: [
      menuRadioItem("area", "None", "areaMode", ""),
      menuRadioItem("area", "First Only", "areaMode", "first"),
      menuRadioItem("area", "Stacked", "areaMode", "stacked"),
      menuRadioItem("area", "All", "areaMode", "all")
    ]
  });

  var lineMenu = new Ext.menu.Menu({
    items: [
        menuRadioItem("line", "Slope Line (default)", "lineMode", ""),
        menuRadioItem("line", "Staircase Line", "lineMode", "staircase"),
        menuRadioItem("line", "Connected Line", "lineMode", "connected"),
        menuCheckItem("Draw Null as Zero", "drawNullAsZero")
    ]
  });

  var fontFacesMenu = new Ext.menu.Menu({
    items: [
      menuRadioItem("fontFace", "Sans", "fontName", "Sans"),
      menuRadioItem("fontFace", "Times", "fontName", "Times"),
      menuRadioItem("fontFace", "Courier", "fontName", "Courier"),
      menuRadioItem("fontFace", "Helvetica", "fontName", "Helvetica")
    ] 
  });

  var fontMenu = new Ext.menu.Menu({
    items: [
      {text: "Face", menu: fontFacesMenu},
      {
        text: "Style",
        menu: {
          items: [
            menuCheckItem("Italics", "fontItalic"),
            menuCheckItem("Bold", "fontBold")
          ]
        }
      },
      menuInputItem("Size", "fontSize", "Enter the font size in pt"),
      {text: "Color", menu: createColorMenu('fgcolor')}
    ]
  });

  var displayMenu = new Ext.menu.Menu({
    items: [
      {text: "Font", menu: fontMenu},
      {
        text: "Color",
        menu: {
          items: [
            menuInputItem("Line Colors", "colorList", "Enter an ordered list of comma-separated colors (name or hex values)", /^$/),
            {text: "Background", menu: createColorMenu('bgcolor')},
            {text: "Major Grid Line", menu: createColorMenu('majorGridLineColor')},
            {text: "Minor Grid Line", menu: createColorMenu('minorGridLineColor')},
            menuInputItem("Filled Area Alpha Value", "areaAlpha", "Enter the alpha value (between 0.0 and 1.0)")
          ]
        }
      },
      {
        text: "Graph Legend",
        menu: {
          items: [
            menuRadioItem("legend", "Hide If Too Many", "hideLegend"),
            menuRadioItem("legend", "Always Hide", "hideLegend", "true"),
            menuRadioItem("legend", "Never Hide", "hideLegend", "false"),
            menuCheckItem("Hide Duplicate Items", "uniqueLegend")
          ]
        }
      },
      menuInputItem("Line Thickness", "lineWidth", "Enter the line thickness in pixels"),
      menuCheckItem("Graph Only", "graphOnly"),
      menuCheckItem("Hide Axes", "hideAxes"),
      menuCheckItem("Hide Y-Axis", "hideYAxis"),
      menuCheckItem("Hide Grid", "hideGrid"),
      menuInputItem("Apply Template", "template", "Enter the name of a template defined in graphTemplates.conf", /^$/)
    ]
  });

  return {
    xtype: 'menu',
    items: [
      menuInputItem("Graph Title", "title", "Graph Title", /^$/),
      {text: "Display", menu: displayMenu},
      {text: "Line Mode", menu: lineMenu},
      {text: "Area Mode", menu: areaMenu},
      {text: "X-Axis", menu: xAxisMenu},
      {text: "Y-Axis", menu: yAxisMenu}
    ]
  };
}