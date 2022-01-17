function (c) {
  console.error('exit '+c)
  if (c && !ready) {
    console.error('squid must be installed to run this test.')
    c = null
    hadError = null
    process.exit(0)
    return
  }

  if (c) {
    hadError = hadError || new Error('Squid exited with '+c)
  }
  if (hadError) throw hadError
}