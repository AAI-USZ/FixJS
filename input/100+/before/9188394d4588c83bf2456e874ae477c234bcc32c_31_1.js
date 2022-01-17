function(a, b) {
          return isConnected(networks[b]) ? 100 :
              networks[b].relSignalStrength - networks[a].relSignalStrength;
        }