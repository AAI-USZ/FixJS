function () {
            require.cache[filename] = module_;
            fn.call(
                this,
                require_,
                module_,
                module_.exports,
                dirname,
                filename,
                process
            );
            return module_.exports;
        }