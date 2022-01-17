function() {
      var args = arguments

      var argsSize = packets.OutgoingPacket.calcArgs(args)
      var size = 2 // id
               + argsSize

      var packet = new packets.OutgoingPacket(client, packets.TYPE_CALLBACK, size)
      packet.writeUInt16BE(id, packet.index)
      packet.index += 2

      packet.writeArgs(args, argsSize)
      return client.sendPacket(packet)
    }