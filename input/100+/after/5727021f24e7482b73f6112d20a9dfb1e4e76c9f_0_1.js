function (foregroundSource, fontFamilySource, fontStretchSource, fontStyleSource,

        fontWeightSource, fontSizeSource, languageSource, flowDirectionSource, useLayoutRoundingSource, textDecorationsSource, fontResourceSource) {

    var ic = new _InheritedContext();

    ic.ForegroundSource = foregroundSource;

    ic.FontFamilySource = fontFamilySource;

    ic.FontStretchSource = fontStretchSource;

    ic.FontStyleSource = fontStyleSource;

    ic.FontWeightSource = fontWeightSource;

    ic.FontSizeSource = fontSizeSource;

    ic.LanguageSource = languageSource;

    ic.FlowDirectionSource = flowDirectionSource;

    ic.UseLayoutRoundingSource = useLayoutRoundingSource;

    ic.TextDecorationsSource = textDecorationsSource;

    ic.FontResourceSource = fontResourceSource;

    return ic;

}