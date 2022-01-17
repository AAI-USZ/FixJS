function route(handle, pathname) {
  console.log("[INFO] About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log("[ERROR] No request handler found for " + pathname);
  }
}