function (node, className, shouldHaveClass) {
            var currentClassNames = (node.className || "").split(/\s+/);
            var hasClass = ko.utils.arrayIndexOf(currentClassNames, className) >= 0;

            if (shouldHaveClass && !hasClass) {
                node.className += (currentClassNames[0] ? " " : "") + className;
            } else if (hasClass && !shouldHaveClass) {
                var newClassName = "";
                for (var i = 0; i < currentClassNames.length; i++)
                    if (currentClassNames[i] != className)
                        newClassName += currentClassNames[i] + " ";
                node.className = ko.utils.stringTrim(newClassName);
            }
        }