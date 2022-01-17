function updateChip() {
        if (target !== null && targetName !== null) {
          throw new Error("Inconsistent");
          
        } else if (target !== null) {
          // Examine object
          var label = null;
          if (target.persistence) {
            label = persistencePool.getObjectName(target);
            chipE.classList.add("object-chip-live");
          }
          if (label === null) {
            label = "a ";
            
            if (target instanceof World) {
              label += target.wx + "×" + target.wy + "×" + target.wz + " ";
            }
            var typeName = Persister.findType(target.constructor);
            if (!typeName) {
              if (target instanceof cubes.Selection) { // TODO special case
                typeName = "selection";
              } else {
                typeName = "object";
              }
            }
            label += typeName;
            if (target instanceof BlockType && target.name !== null) {
              label += " “" + target.name + "”";
            }
            
            chipE.classList.add("object-chip-ephemeral");
          }
          
          nameE.textContent = label;
          
        } else if (targetName !== null) {
          nameE.textContent = targetName;
          chipE.classList.add(persistencePool.getIfLive(targetName) ? "object-chip-live" : "object-chip-named");

        } else {
          throw new Error("Can't happen");
        }
      }