function testAddressParser() {
  var reader = new devtools.profiler.LogReader({});

  assertEquals([0x10000000, 0x10001000, 0xffff000, 0x10000000],
               reader.processStack(0x10000000, 0, ['overflow',
                   '+1000', '-2000', '+1000']));
}