function() { // cpath-aware bounds
    var cpath = this.xdata.__cpath;
    return cpath 
            ? cpath.bounds()
            : this.ibounds();
}