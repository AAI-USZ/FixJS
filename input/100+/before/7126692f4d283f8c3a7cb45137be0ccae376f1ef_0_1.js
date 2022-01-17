function(object, bindings, deserializer) {
    for (var sourcePath in bindings) {
        var binding = bindings[sourcePath],
            dotIndex;

        if (!("boundObject" in binding)) {
            var targetPath = binding["<-"] || binding["<->"] || binding["<<->"];

            if ("<<->" in binding) {
                console.warn("WARNING: <<-> in bindings is deprectated, use <-> only, please update now.")
            }

            if (targetPath) {
                if (targetPath[0] !== "@") {
                    logger.error("Invalid binding syntax '" + targetPath + "', should be in the form of '@label.path'.");
                    throw "Invalid binding syntax '" + targetPath + "'";
                }
            } else {
                logger.error("Invalid binding syntax '" + JSON.stringify(binding) + "'.");
                throw "Invalid binding syntax '" + JSON.stringify(binding) + "'";
            }

            dotIndex = targetPath.indexOf(".");
            binding.boundObject = deserializer.getObjectByLabel(targetPath.slice(1, dotIndex));
            binding.boundObjectPropertyPath = targetPath.slice(dotIndex+1);
            if ("<-" in binding) {
                binding.oneway = true;
            }
        }
        Object.defineBinding(object, sourcePath, binding);
    }
}