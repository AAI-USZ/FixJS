function(path) {
try { return origRequire(path); }
catch(e) {
return retryRequire(path, e);
}
}