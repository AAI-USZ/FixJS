function() {
      InspectorUI.highlighter.addListener("nodeselected", highlightBodyNode);
      // Test that navigating around without a selected node gets us to the
      // body element.
      node = doc.querySelector("body");
      let bc = InspectorUI.breadcrumbs;
      bc.nodeHierarchy[bc.currentIndex].button.focus();
      EventUtils.synthesizeKey("VK_RIGHT", { });
    }