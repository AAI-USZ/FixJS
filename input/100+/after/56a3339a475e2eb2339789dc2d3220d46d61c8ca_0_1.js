function formatAppendee(str) {
				str=str.replace(/\\'/g,'\'');
				str=str.replace(/\\"/g,'"');
				str=str.replace(/\\0/g,'\0');
				str=str.replace(/\\\\/g,'\\');
				str=str.substring(1,str.length-1);
				return str;
			}