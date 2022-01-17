function(other) {
  if (other == null)
    return false;
  
  return ((this.keysize == other.keysize) && (this.y.equals(other.y)));
}