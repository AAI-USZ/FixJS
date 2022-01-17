function (id, properties, packet) {
    var client = packet.client

    if (client.remoteCallbacks[id] && !weak.isDead(client.remoteCallbacks[id])) {
      return weak.get(client.remoteCallbacks[id])
    }


    var fn = function() {
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

    var ref = weak(fn, function() {
      client.remoteCallbacks[id] = null

      var size = 2 // id

      var packet = new packets.OutgoingPacket(client, packets.TYPE_CALLBACK_GC, size)
      packet.writeUInt16BE(id, packet.index)
      packet.index += 2

      return client.sendPacket(packet)
    })

    client.remoteCallbacks[id] = ref


    console.log('properties', properties)
    if (properties) {
      extend(fn, properties)
    }

    return fn
  }