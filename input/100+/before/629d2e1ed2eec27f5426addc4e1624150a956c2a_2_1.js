function() {
			var img = document.querySelector('#drag-image');
			var droparea = document.querySelector('#drag-image').parentNode;

			droparea.ondragover = handleDragOver;
			droparea.ondragend = handleDrop;
			
			droparea.ondrop = function (e) {
				e.preventDefault();
				droparea.removeChild(img);
				var reader = new FileReader();
				reader.onload = function (event) {
					var image = new Image();
					image.src = event.target.result;
					image.width = 250; // a fake resize
					droparea.appendChild(image);
				};
				reader.readAsDataURL(e.dataTransfer.files[0]);
				console.log(e.dataTransfer.files);
			}
		}