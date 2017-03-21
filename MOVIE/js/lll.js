window.onload=function(){
	
	shouye();
	four();
	huang();
	two();
//	--------------------------------------------------
	
	
};


function huang(){
	var oZzz=document.getElementById('zzz');
	if(!oZzz) return false;
//	var oXt=oZzz.getElementsByClassName('xbgt');
	var oXt = getByClass(oZzz,'xbgt');
	for(var i=0;i<oXt.length;i++){
		
		oXt[i].onmouseover=function(){
//			alert(this.innerHTML)
			Move2(this,'width',this.parentNode.offsetWidth);
		};
		oXt[i].onmouseout=function(){

			Move2(this,'width',50);
		};
	}
}

function shouye(){
	var oR=document.getElementById('right');
	if(!oR) return false;
	var obgt=oR.getElementsByClassName('bgt');
	if(!obgt) return false;
	var obgt1=oR.getElementsByClassName('bgt_1');
	
    for(var i=0;i<obgt.length;i++){
    	obgt[i].index = i;
    	
    	obgt[i].onmouseover=function (){
			startMove(obgt1[this.index],{width:770,height:161,opacity:70});
		}
		obgt[i].onmouseout=function (){
			startMove(obgt1[this.index],{width:870,height:261,opacity:0});
		}
    }
}
function two(){
	var oR=document.getElementById('zzz');
	if(!oR) return false;
	
//	var obgt=oR.getElementsByClassName('bgt');
	var obgt = getByClass(oR,'bgt');
//	var obgt1=oR.getElementsByClassName('bgt_1');
	var obgt1 = getByClass(oR,'bgt_1');
	
    for(var i=0;i<obgt.length;i++){
    	obgt[i].index = i;
    	
    	obgt[i].onmouseover=function (){
			startMove(obgt1[this.index],{width:this.offsetWidth*0.8,height:this.offsetHeight*0.8,opacity:70});
		}
		obgt[i].onmouseout=function (){
			startMove(obgt1[this.index],{width:this.offsetWidth,height:this.offsetHeight,opacity:0});
		}
    }
}

function four(){
	var oZuo=document.getElementById('you');
	if(!oZuo) return false;
	var oYou=document.getElementById('zuo');
	if(!oYou) return false;
	var oZzz=document.getElementById('zzz');
	
	var stop = true;
	
	oZuo.onclick=function(){
		if (oZzz.offsetLeft<=-2000) {
			return;
		} else{
			Move3(oZzz,'left',oZzz.offsetLeft-1200);				
		}
	};
			
	oYou.onclick=function(){
		if (oZzz.offsetLeft>=0) {
			return;
		} else{
			Move3(oZzz,'left',oZzz.offsetLeft+1200);
		}
	};	
		
	function Move3(obj, attr, iTarget) {
		if(stop){
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				stop = false;
				var cur = 0;
	
				if(attr == 'opacity') {
					cur = Math.round(parseFloat(getSttyle(obj, attr)) * 100);
	
				} else {
					cur = parseInt(getStyle(obj, attr));
				}
	
				var speed = (iTarget - cur) / 5;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	
				if(cur == iTarget) {
					stop = true;
					clearInterval(obj.timer);
				} else {
					if(attr == 'opacity') {
						obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
						obj.style.opacity = (cur + speed) / 100;
	
						document.getElementById('txt1').value = obj.style.opacity;
					} else {
						obj.style[attr] = cur + speed + 'px';
					}
				}
			}, 30);
		}		
	}
}


function Move2(obj, attr, iTarget) {

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var cur = 0;

		if(attr == 'opacity') {
			cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
		} else {
			cur = parseInt(getStyle(obj, attr));
		}

		var speed = (iTarget - cur) / 5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		if(cur == iTarget) {
			clearInterval(obj.timer);
		} else {
			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;
//				document.getElementById('txt1').value = obj.style.opacity;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
	}, 30);
}



function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

function startMove(obj, json, fnend) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		//for(var attr in json){

		var stop = true;

		for(var attr in json) {

			var cur = 0;

			if(attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}
			//var speed=(json[attr]-cur)/10;
			var speed = (json[attr] - cur) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(cur != json[attr]) {
				stop = false;
			}
			//if(cur==json[attr])

			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;

				//				document.getElementById('txt1').value=obj.style.opacity;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}

		}

		if(stop) {
			clearInterval(obj.timer);
			if(fnend) fnend();
		}
		//}
	}, 30);
}

function getByClass(obj, clname) {
	//封装这个函数，以后可以用来获取类名为clname的标签
	var result = [];
	var aLi = obj.getElementsByTagName('*');

	for(var i = 0; i < aLi.length; i++) {
		if(aLi[i].className == clname) {
			result.push(aLi[i]);
		}
	}
	return result;
}

