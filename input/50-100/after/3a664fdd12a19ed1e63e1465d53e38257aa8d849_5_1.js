function (c) {
  console.error('squid: exit '+c)
  if (c && !ready) {
    console.error('squid must be installed to run this test.')
    console.error('skipping this test. please install squid and run again if you need to test tunneling.')
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