f      var myself = this,
          rootScene = layoutInfo.rootScene,
          sceneColorProp = function(scene){
              return scene.vars.item.color;
          };
      
      this.pvPanel.overflow("hidden");
          
      this.pvLegendPanel = this.pvPanel.add(pv.Panel)
          .data(rootScene.childNodes)
          .localProperty('group', Object)
          .group(function(scene){ return scene.group; }) // for rubber band selection support
          .localProperty('isOn', Boolean)
          .isOn(function(scene){ return scene.vars.item.isOn(); })
          .def("hidden", "false")
          .left(layoutInfo.leftProp)
          .top(layoutInfo.topProp)
          .height(layoutInfo.cellSize.height)
          .width(layoutInfo.cellSize.width)
          .cursor(function(scene){
              return scene.vars.item.click ? "pointer" : null;
          })
          .fillStyle(function(){
              return this.hidden() == "true" ? 
                     "rgba(200,200,200,1)" : 
                     "rgba(200,200,200,0.0001)";
          })
          .event("click", function(scene){
              var item = scene.vars.item;
              if(item.click){
                  return item.click();
              }
          });
      
      var pvLegendProto;
      
      if(this.drawLine && this.drawMarker){
          
          this.pvRule = this.pvLegendPanel.add(pv.Rule)
              .left(0)
              .width(this.markerSize)
              .lineWidth(1)
              .strokeStyle(sceneColorProp);

          this.pvDot = this.pvRule.anchor("center").add(pv.Dot)
              .shapeSize(this.markerSize)
              .shape(function(scene){
                  return myself.shape || scene.vars.item.shape;
              })
             .lineWidth(0)
             .fillStyle(sceneColorProp)
             ;

          pvLegendProto = this.pvRule; // Rule is wider, so text would be over the rule with text margin 0
          
      } else if(this.drawLine) {
      
          this.pvRule = this.pvLegendPanel.add(pv.Rule)
              .left(0)
              .width(this.markerSize)
              .lineWidth(1)
              .strokeStyle(sceneColorProp)
              ;

          pvLegendProto = this.pvRule;
          
      } else { // => if(this.drawMarker) {
          this.pvDot = this.pvLegendPanel.add(pv.Dot)
              .left(this.markerSize / 2)
              .shapeSize(this.markerSize)
              .shape(function(scene){
                  return myself.shape || scene.vars.item.shape;
              })
              .angle(Math.PI/2)
              .lineWidth(2)
              .strokeStyle(sceneColorProp)
              .fillStyle  (sceneColorProp)
              ;

          pvLegendProto = this.pvDot;
      }
    
      this.pvLabel = pvLegendProto.anchor("right").add(pv.Label)
          .text(function(scene){
              // TODO: trim to width - the above algorithm does not update the cellWidth...
              return scene.vars.item.label;
          })
          .font(this.font)
          .textMargin(this.textMargin)
          .textDecoration(function(){ return this.parent.isOn() ? "" : "line-through"; })
          .intercept(
                'textStyle',
                labelTextStyleInterceptor,
                this._getExtension('legendLabel', 'textStyle'));
          
      function labelTextStyleInterceptor(getTextStyle, args) {
          var baseTextStyle = getTextStyle ? getTextStyle.apply(this, args) : "black";
          return this.parent.isOn() ? 
                      baseTextStyle : 
                      pvc.toGrayScale(baseTextStyle, null, undefined, 150);
      }
    },
