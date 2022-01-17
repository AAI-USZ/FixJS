function dateSetMask(mask) {
  if (mask != '') {
    mask = stringReplace("%y", "yy", mask);
    mask = stringReplace("%Y", "yyyy", mask);

    mask = stringReplace("%m", "mm", mask);
    mask = stringReplace("%o", "mm", mask);

    mask = stringReplace("%d", "dd", mask);
    mask = stringReplace("%e", "dd", mask);

    //In the function getCleanMask valid characters for an mask that does not
    //is currency/percentage are: '0 ',' # ',' d ',' m ',' y ',' Y '.
    //For hours, minutes and seconds replace this mask with '#'
    mask = stringReplace("%H", "##", mask);
    mask = stringReplace("%I", "##", mask);
    mask = stringReplace("%k", "##", mask);
    mask = stringReplace("%l", "##", mask);

    mask = stringReplace("%M", "##", mask);
    mask = stringReplace("%S", "##", mask);

    mask = stringReplace("%j", "###", mask);
  }

  return mask;
}