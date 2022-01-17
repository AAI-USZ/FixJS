function packUInt64(number) {
  return Put().word64be(number).buffer()
}