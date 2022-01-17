function (code) {
  if (code !== 0) {
    console.error('grep process exited with code ' + code);
    process.exit(code);
  }
}