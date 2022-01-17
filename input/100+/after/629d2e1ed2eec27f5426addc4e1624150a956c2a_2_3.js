function (e) {
				droparea.classList.remove('droppable');
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
			}