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
function move(obj,att,target,fnend){
	clearInterval(obj.time);
	obj.time=setInterval(function(){
		var at=0;
		if (att=='opacity') {
			at=Math.round(parseFloat(getstyle(obj,att))*100);
		} else{
			at=parseInt(getstyle(obj,att));
		}
		var speed=(target-at)/10;
		speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
		if(at==target){
			clearInterval(obj.time);
			if(fnend) fnend();
		}
		else{
			if(att=='opacity'){
				obj.style.opacity=(at+speed)/100;
				obj.style.filter='alpha(opacity:'+at+speed+')';
			}else{
				obj.style[att]=at+speed+'px';
			}
						
		}
	},20)
}