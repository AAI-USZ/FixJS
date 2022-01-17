function(view, action) {
    if (action === 'parent-push' || action === 'parent-pop') return;
    
	  // Clear any nav buttons currently in the navbar (other than the back button)
	  // NOTE: Using .detach() will preserve any attached event handlers.
	  if (this.$viewSpecificNavButtons) this.$viewSpecificNavButtons.detach();

    // Append buttons for this view
    this.$element.append(this.$viewSpecificNavButtons = view.$navbarButtons);
    
    // Show/Hide the back button
    switch (action) {
      case 'push':
        if (!view.hideNavBackButton) {
          this.$backButtonElement.addClass('pop active');
        } else {
          this.$backButtonElement.removeClass('pop active');
        }
        break;
      case 'pop':
        if (!view.hideNavBackButton && this.viewStack.views.length > 1) {
          this.$backButtonElement.addClass('pop active');
        } else {
          this.$backButtonElement.removeClass('pop active');
        }
      default:
        break;
    }
	}