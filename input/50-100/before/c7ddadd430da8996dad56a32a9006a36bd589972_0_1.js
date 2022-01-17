function(packet) {
        packet.subCmd = packet.seekInt(2);
        var subCmd = intToHexStr(packet.subCmd);
        if (!sub[subCmd]) {
          console.log('Client sent unknown subcommand for 0xBF: ' + subCmd);
          return;
        }
        return sub[subCmd].call(this, packet);
      }