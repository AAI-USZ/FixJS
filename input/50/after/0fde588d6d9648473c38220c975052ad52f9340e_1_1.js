function(f) {
  if (!f.exists() || !f.isDirectory()) {  
    f.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0774);  
  }
}