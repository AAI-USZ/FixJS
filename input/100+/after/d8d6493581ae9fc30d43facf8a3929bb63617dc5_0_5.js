function dateSetMask(mask) {
  if (mask != '') {
    mask = strReplace("%y", "yy", mask);
    mask = strReplace("%Y", "yyyy", mask);

    mask = strReplace("%m", "mm", mask);
    mask = strReplace("%o", "mm", mask);

    mask = strReplace("%d", "dd", mask);
    mask = strReplace("%e", "dd", mask);

    //In the function getCleanMask valid characters for an mask that does not
    //is currency/percentage are: '0 ',' # ',' d ',' m ',' y ',' Y '.
    //For hours, minutes and seconds replace this mask with '#'
    mask = strReplace("%H", "##", mask);
    mask = strReplace("%I", "##", mask);
    mask = strReplace("%k", "##", mask);
    mask = strReplace("%l", "##", mask);

    mask = strReplace("%M", "##", mask);
    mask = strReplace("%S", "##", mask);

    mask = strReplace("%j", "###", mask);
  }

  return mask;
}