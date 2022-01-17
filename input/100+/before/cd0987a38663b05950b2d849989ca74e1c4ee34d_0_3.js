function showSignature() {
  if (!currentLine) {
    return;
  }

  var sidebarItem = findSidebarItem(currentLine);
  if (!sidebarItem) {
    if (signatureVisible) {
      hideSignature();
    }
    return;
  }

  if (!signatureVisible) {
    dojo.fadeIn({node: signature}).play();
    signatureVisible = true;
  }

  signature.innerHTML = sidebarItem.loc + ' ' + sidebarItem.sig;
  dojo.style(signature, { top: maincontent.scrollTop + "px"});
}