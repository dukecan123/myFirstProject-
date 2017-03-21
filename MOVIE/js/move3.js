function getstyle(obj,name){
			if(obj.currentStyle){
				return obj.currentStyle[name];
				//IE浏览器获取非行间样式
			}
			else{
				return getComputedStyle(obj,false)[name];
				//非IE浏览器获取非行间样式
			}
		}
function move(obj,json,fnend){
	clearInterval(obj.time);
	var sTop=true;
	obj.time=setInterval(function(){
		for(var attr in json){
			var at=0;
			if (attr=='opacity') {
				at=Math.round(parseFloat(getstyle(obj,attr))*100);
			} else{
				at=parseInt(getstyle(obj,attr));
			}
			var speed=(json[attr]-at)/10;
			speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
			if(at!=json[attr]){
				sTop=false;
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(at+speed)+')';
				obj.style.opacity=(at+speed)/100;
			}else{
				obj.style[attr]=at+speed+'px';
			}
		}
		if(sTop){
			clearInterval(obj.time);
			if(fnend) fnend();
		}
	},30);
}