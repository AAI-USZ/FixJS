function (path, val) {
            if (path.indexOf(".") === -1) {
                throw new Error("Setting a ugen directly is not currently supported.");
            }
            
            var lastSegIdx = path.lastIndexOf("."),
                ugenInputPath = path.substring(0, lastSegIdx),
                ugenPath = ugenInputPath.substring(0, ugenInputPath.lastIndexOf(".")),
                inputName = path.substring(lastSegIdx + 1),
                ugen = flock.get(ugenPath, that.ugens.named),
                prevInputUGen = ugen.input(inputName),
                inputUGen = ugen.input(inputName, val);
            
            that.ugens.replace(inputUGen, prevInputUGen);
            ugen.onInputChanged(inputName);
            return inputUGen;
        }