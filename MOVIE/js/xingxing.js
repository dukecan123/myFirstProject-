function getstyle(obj,name){
				if(obj.currentStyle){
					return obj.currentStyle[name];
				}
				else{
					return getComputedStyle(obj,false)[name];
				}
			};
			function move(obj,attr,target){
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var at=0;
					if (attr=='opacity') {
						at=Math.round(parseFloat(getstyle(obj,attr))*100);
					} else{
						at=parseInt(getstyle(obj,attr));
					}
					var speed=(target-at)/10;
					speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
					
					if(at==target){
						clearInterval(obj.timer);
					}
					else{
						if (attr=='opacity') {
							obj.style.opacity=(at+speed)/100;
							obj.style.filter='algha(opacity:'+(at+speed)+')';
						} else{
							obj.style[attr]=at+speed+'px';
						}
					}
				},30);
			};
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
						ss[k].src='img1/xing1.png';
					}
					for(var y=this.index+1;y<ss.length;y++){
						ss[y].src='img1/xing.png';
					}
					
				}
				ss[j].onclick=function(){
					for(var k=0;k<this.index+1;k++){
						ss[k].src='img1/xing1.png';
					}
					for(var y=this.index+1;y<ss.length;y++){
						ss[y].src='img1/xing.png';
					}
					a =true ;
				}
				obj.onmouseout=function(){
					if(a){return;}
						for(var k=0;k<ss.length;k++){
							ss[k].src='img1/xing.png';
						}
					
					
				
				}
				
			}
		}
	
	var oYp=document.getElementById("yp");
					var oTh3=document.getElementById("th3");
					var oTh4=document.getElementById("th4");
					oTh3.onclick=function(){
						move(oYp,'height',404);
						oTh4.style.display='block';
						oTh3.style.display='none';
					}
					oTh4.onclick=function(){
						move(oYp,'height',0);
						oTh3.style.display='block';
						oTh4.style.display='none';
					}
					
	var aLi=oYp.getElementsByTagName('li');
	
		for(var j=0;j<aLi.length;j++){
			aLi[j].index=j;
			aLi[j].onclick=function(){
//				alert(this.innerHTML);
				for (var j=0;j<aLi.length;j++){
					aLi[j].className='';
				}
				this.className='dq';
			}
		}
	
	var oLon=document.getElementById("lon");
	var oTh11=document.getElementById("th11");
	var oLi=oTh11.getElementsByTagName('li');
	var a=true;
	oLon.onclick=function(){
		
		if(a){
			move(oTh11,'height',263);
			a=!a;
		}
		else{
			move(oTh11,'height',0);
			a=!a;
		}
	}
	for (var i=0;i<oLi.length;i++){
		oLi[i].onclick=function(){
			oLon.innerHTML=this.innerHTML;
		}
	}
	
}
