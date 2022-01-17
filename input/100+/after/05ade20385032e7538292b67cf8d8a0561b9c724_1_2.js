function (value) {
  if (value === null)
    return false;
  else if (Array.isArray(value))
    return true;

  if (JSIL.IsTypedArray(value))
    return true;

  return false;
}