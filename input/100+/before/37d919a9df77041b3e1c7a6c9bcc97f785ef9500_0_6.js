function jQuery_detach (node, async, fn) {
			  var parent = node.parentNode;
			  var next = node.nextSibling;
			  if (!parent) {
				  return;
			  }
			  parent.removeChild(node);
			  if (typeof async !== 'boolean') {
				  fn = async;
				  async = false;
			  }
			  if (fn && async) {
				  fn.call(node, reattach);
			  } else if (fn) {
				  fn.call(node);
				  reattach();
			  }

			  function reattach() {
				  parent.insertBefore(node, next);
			  }
		  }