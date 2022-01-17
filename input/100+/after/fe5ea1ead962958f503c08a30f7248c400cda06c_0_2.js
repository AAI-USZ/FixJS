function (binding) {
            var operators = getBindingOperators(binding.key),
                bindingInfo, binder;

            bindingInfo = operators.ops;
            bindingInfo.key = operators.key;
            bindingInfo.element = element;
            bindingInfo.context = context;
            bindingInfo.isComment = isStartCommentNode;
            bindingInfo.commentTemplate = isStartCommentNode ? commentContainer.html() : null;
            bindingInfo.endCommentElement = isStartCommentNode ? endCommentElement : null;

            if (_.startsWith(bindingInfo.key, ".")) {
                binder = databindings["className"];
                bindingInfo.key = bindingInfo.key.substring(1);
            }
            else {
                binder = databindings[bindingInfo.key];
            }

            if (!_.isObject(binder)) {
                binder = databindings["attr"];
            }

            if (_.isBoolean(binder.bindChildren)) {
                bindChildren &= binder.bindChildren;
            }

            attachBinder(binder, viewModel, [null].concat(_.trim(binding.value).split(".")), bindingInfo);
        }