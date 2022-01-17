function()
    {
      if (this.__inAnimation)
      {
        var fromElement = this.__activeWidget.getContainerElement();
        var toElement = this.__widget.getContainerElement();

        qx.event.Registration.removeListener(fromElement, "animationEnd", this._onAnimationEnd, this);
        qx.event.Registration.removeListener(toElement, "animationEnd", this._onAnimationEnd, this);

        qx.bom.element.Class.removeClasses(fromElement, this.__getAnimationClasses("out"));
        qx.bom.element.Class.removeClasses(toElement, this.__getAnimationClasses("in"));

        this.__swapWidget();
        this.__widget.getLayoutParent().removeCssClass("animationParent");
        this.__inAnimation = false;
      }
    }