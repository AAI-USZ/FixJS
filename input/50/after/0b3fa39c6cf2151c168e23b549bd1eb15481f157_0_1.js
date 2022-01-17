function (view) {
        	console.log(view);
        	assert.equal(view.view.render_state, view_component.RENDER_STATES.RENDER_COMPLETE);
        }