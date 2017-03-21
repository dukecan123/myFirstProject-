function getByClass(obj,clname){
			//封装这个函数，以后可以用来获取类名为clname的标签
			var result=[];
			var aLi=obj.getElementsByTagName('*');
			
			for(var i=0;i<aLi.length;i++){
					if(aLi[i].className==clname){
						result.push(aLi[i]);
					}
			}
			return result;
		}
window.onload=function(){
		var aXing=getByClass(document,'xing');
		
		for(var i=0;i<aXing.length;i++){
			z(aXing[i])
		}
		function z(obj){
			var ss = obj.getElementsByTagName('img');
			var a = false;
			for (var j=0;j<ss.length;j++){
				ss[j].index = j;
				ss[j].onmouseover=function(){
					for(var k=0;k<this.index+1;k++){
						ss[k].src='img1/huang2.png';
					}
					for(var y=this.index+1;y<ss.length;y++){
						ss[y].src='img1/huang.png';
					}
					
				}
				ss[j].onclick=function(){
//					for(var k=0;k<this.index+1;k++){
//						ss[k].src='img/huang2.png';
//					}
//					for(var y=this.index+1;y<ss.length;y++){
//						ss[y].src='img/huang.png';
//					}
//					a =true ;
					obj.innerHTML='谢谢你们的投票!';
					obj.style.fontSize='14px';
					obj.style.color='#4C4145';
				}
				obj.onmouseout=function(){
					if(a){return;}
						for(var k=0;k<ss.length;k++){
							ss[k].src='img1/huang.png';
						}
					
					
				
				}
				
			}
		}
		
	
}
