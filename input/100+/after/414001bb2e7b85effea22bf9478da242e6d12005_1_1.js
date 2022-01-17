function transcript(text){
				try{
				var current_word="";
				var vowels=0,consonants=0;
				var ch='';
				var result="";
				var flag=false;
				var posl=-1,posg=-1;
				var temp_str="";
				var direction=0;
				for(var i=0;i<text.length;i++){
					ch=text.charAt(i);
					
					if(stop_symbols.indexOf(ch)==-1||ch=="."){
						current_word+=ch;
					} else {
							flag=abra_check_current(current_word)&&abra_check_double(current_word);
							if(en_letters.indexOf(current_word.charAt(0))!=-1) direction=0; else direction=1;
							if(en_notwords.indexOf(current_word)!=-1){
								current_word=en_words[en_notwords.indexOf(current_word)];
								flag=false;
								}
							else 
								if(ru_notwords.indexOf(current_word)!=-1){
									current_word=ru_words[ru_notwords.indexOf(current_word)];
									flag=false;
							}
							if(flag) current_word=replace(current_word,direction);
							result+=current_word;
							if(ch=="<"){
								var t=text.substring(i);
								posg=t.indexOf(">");
								if(posg>0){
									temp_str=t.substring(0,posg+1);
									result+=temp_str;
									i+=posg;
									current_word="";
									continue;
								} else current_word+=ch;
							}  else {
								result+=ch;
								current_word=""; 
							}
							flag=false;
						
					}
				}
				flag=abra_check_current(current_word)&&abra_check_double(current_word);
						if(en_letters.indexOf(current_word.charAt(0))!=-1) direction=0; else direction=1;
						if(en_notwords.indexOf(current_word)!=-1){
								current_word=en_words[en_notwords.indexOf(current_word)];
								flag=false;
								}
							else 
								if(ru_notwords.indexOf(current_word)!=-1){
									current_word=ru_words[ru_notwords.indexOf(current_word)];
									flag=false;
							}
							if(flag) current_word=replace(current_word,direction);
				result+=current_word;
				return result;
				} catch(e){
				 console.log("transcript");
				}
			}