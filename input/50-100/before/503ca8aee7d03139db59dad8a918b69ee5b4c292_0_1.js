function() {
      InspectorUI.highlighter.addListener("nodeselected", highlightBodyNode);
      // Test that navigating around without a selected node gets us to the
      // body element.
      node = doc.querySelector("body");
      EventUtils.synthesizeKey("VK_RIGHT", { });
    }