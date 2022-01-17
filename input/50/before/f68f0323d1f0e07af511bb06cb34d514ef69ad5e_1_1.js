function(el) {
            console.log('Rendering nav');
            $("#mtnav").html(el);
            ModelBinding.bind(context.loginForm);
        }