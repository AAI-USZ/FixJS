function closeInfo() {
  if (!infoDiv) {
    return;
  }
  dojo.fx.wipeOut({ node: infoDiv.id,
                    duration: 500,
                  }).play();
  infoDiv = null;
}