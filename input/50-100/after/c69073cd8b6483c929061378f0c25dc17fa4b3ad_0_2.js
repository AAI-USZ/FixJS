function(instance){
    var t = pvc.text;
    var size = t.getTextSize(instance.text, instance.font);
    
    return t.getLabelPolygon(
                size.width,
                size.height,
                instance.textAlign,
                instance.textBaseline,
                instance.textAngle,
                instance.textMargin)
            .apply(pv.Transform.identity.translate(instance.left, instance.top));
}