function (code) {
  if (code !== 0) {
    console.error('pack process exited with code ' + code);
    process.exit(code);
  }
}