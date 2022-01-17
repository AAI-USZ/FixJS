function attrOnInput(AThis,AEvent) {
  // user changed input, change selected item(s)
  console.log('attrOnInput: '+AThis.id+' := '+AThis.value);
  var AReport = report;
  var r = false;
  for(var i=0; i<AReport.length; i++)
    if (AReport[i].Selected) {
      switch (AThis.id) {
        case 'attr_caption'  : textChangeCaption(canvas,context,AReport[i],AThis.value); r=true; break;
        case 'attr_color'    : AReport[i].Color = AThis.value; r=true; break;
        case 'attr_height'   : AReport[i].Height = 1*AThis.value; if (AReport[i].Type == 'Text') textChangeCaption(canvas,context,AReport[i],AReport[i].Caption); r=true; break;
        case 'attr_thicknes' : AReport[i].Thicknes = 1*AThis.value; r=true; break;
        default: throw "Attribute '"+AThis.id+"' change is not yet supported!";
      }
    }
  if (r)
    redraw('attrOnInput');
}