function getXHR() {
			if (window.XMLHttpRequest
				&& ('file:' !== window.location.protocol || !window.ActiveXObject)) {
				return new XMLHttpRequest();
			} else {
				try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) {}
			}
			return false;
		}