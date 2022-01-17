function (rootParent, element, context, props, adding) {

    var inhEnum = _Inheritable;

    if (props === inhEnum.None)

        return;



    if (adding) {

        this.MaybePropagateInheritedValue(context.ForegroundSource, inhEnum.Foreground, props, element);

        this.MaybePropagateInheritedValue(context.FontFamilySource, inhEnum.FontFamily, props, element);

        this.MaybePropagateInheritedValue(context.FontStretchSource, inhEnum.FontStretch, props, element);

        this.MaybePropagateInheritedValue(context.FontStyleSource, inhEnum.FontStyle, props, element);

        this.MaybePropagateInheritedValue(context.FontWeightSource, inhEnum.FontWeight, props, element);

        this.MaybePropagateInheritedValue(context.FontSizeSource, inhEnum.FontSize, props, element);

        this.MaybePropagateInheritedValue(context.LanguageSource, inhEnum.Language, props, element);

        this.MaybePropagateInheritedValue(context.FlowDirectionSource, inhEnum.FlowDirection, props, element);

        this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, inhEnum.UseLayoutRounding, props, element);

        this.MaybePropagateInheritedValue(context.TextDecorationsSource, inhEnum.TextDecorations, props, element);

        this.MaybePropagateInheritedValue(context.FontResourceSource, inhEnum.FontResource, props, element);



        var eleContext = new _InheritedContext(element, context);



        props = eleContext.Compare(context, props);

        if (props === inhEnum.None)

            return;



        this.WalkSubtree(rootParent, element, eleContext, props, adding);

    } else {

        var eleContext2 = new _InheritedContext(element, context);



        this.MaybeRemoveInheritedValue(context.ForegroundSource, inhEnum.Foreground, props, element);

        this.MaybeRemoveInheritedValue(context.FontFamilySource, inhEnum.FontFamily, props, element);

        this.MaybeRemoveInheritedValue(context.FontStretchSource, inhEnum.FontStretch, props, element);

        this.MaybeRemoveInheritedValue(context.FontStyleSource, inhEnum.FontStyle, props, element);

        this.MaybeRemoveInheritedValue(context.FontWeightSource, inhEnum.FontWeight, props, element);

        this.MaybeRemoveInheritedValue(context.FontSizeSource, inhEnum.FontSize, props, element);

        this.MaybeRemoveInheritedValue(context.LanguageSource, inhEnum.Language, props, element);

        this.MaybeRemoveInheritedValue(context.FlowDirectionSource, inhEnum.FlowDirection, props, element);

        this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, inhEnum.UseLayoutRounding, props, element);

        this.MaybeRemoveInheritedValue(context.TextDecorationsSource, inhEnum.TextDecorations, props, element);

        this.MaybeRemoveInheritedValue(context.FontResourceSource, inhEnum.FontResource, props, element);



        props = eleContext2.Compare(context, props);

        if (props === inhEnum.None)

            return;



        this.WalkSubtree(rootParent, element, context, props, adding);

    }

}