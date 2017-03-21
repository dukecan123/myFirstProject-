function getstyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
};

function move(obj, attr, target) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var at = 0;
		if(attr == 'opacity') {
			at = Math.round(parseFloat(getstyle(obj, attr)) * 100);
		} else {
			at = parseInt(getstyle(obj, attr));
		}
		var speed = (target - at) / 10;
		speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);

		if(at == target) {
			clearInterval(obj.timer);
		} else {
			if(attr == 'opacity') {
				obj.style.opacity = (at + speed) / 100;
				obj.style.filter = 'algha(opacity:' + (at + speed) + ')';
			} else {
				obj.style[attr] = at + speed + 'px';
			}
		}
	}, 30);
};

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

//下拉列表
window.onload = function() {
	var oTh = document.getElementById('th');
	var oLon = getByClass(oTh, 'lon');
	var oTh11 = getByClass(oTh, 'th11');

	for(var i = 0; i < oLon.length; i++) {
		oLon[i].index = i;
		var a = true;

		oLon[i].onclick = function() {
			for(var j = 0; j < oTh11.length; j++) {
				oTh11[j].style.display = 'none';
			}
			if(a) {

				move(oTh11[this.index], 'height', 263);
				oTh11[this.index].style.display = 'block';
				a = !a;
			} else {
				move(oTh11[this.index], 'height', 0);
				a = !a;
				oTh11[this.index].style.display = 'block';
			}
		};
	}
	//星星评分
	var aXing = getByClass(document, 'xing');

	for(var i = 0; i < aXing.length; i++) {
		z(aXing[i])
	}

	function z(obj) {
		var ss = obj.getElementsByTagName('img');
		var a = false;
		for(var j = 0; j < ss.length; j++) {
			ss[j].index = j;
			ss[j].onmouseover = function() {

				for(var k = 0; k < this.index + 1; k++) {
					ss[k].src = 'img1/xing1.png';
				}
				for(var y = this.index + 1; y < ss.length; y++) {
					ss[y].src = 'img1/xing.png';
				}

			}
			ss[j].onclick = function() {
				for(var k = 0; k < this.index + 1; k++) {
					ss[k].src = 'img1/xing1.png';
				}
				for(var y = this.index + 1; y < ss.length; y++) {
					ss[y].src = 'img1/xing.png';
				}
				a = true;
			}
			obj.onmouseout = function() {
				if(a) {
					return;
				}
				for(var k = 0; k < ss.length; k++) {
					ss[k].src = 'img1/xing.png';
				}

			}

		}
	}

	var tha = getByClass(oTh, 'tha');

	for(var i = 0; i < tha.length; i++) {

		aa(tha[i]);
	}

	function aa(obj) {
		var lon = getByClass(obj,'lon')[0];

		var oLi = obj.getElementsByTagName('li');

		for(var i = 0; i < oLi.length; i++) {
			oLi[i].index = i;
			oLi[i].onclick = function() {
				
				lon.innerHTML = this.innerHTML;
			}
		}
	}

	var oYp = getByClass(document, 'yp');

	for(var i = 0; i < oYp.length; i++) {

		ypd(oYp[i]);

	}

	function ypd(obj) {
		var aLi = obj.getElementsByTagName('li');
		var ax = false;
		for(var j = 0; j < aLi.length; j++) {
			aLi[j].index = j;
			aLi[j].onclick = function() {
				//				alert(this.innerHTML);
				for(var j = 0; j < aLi.length; j++) {
					aLi[j].className = '';
				}
				this.className = 'dq';
			}
		}
	}

	var oCom32 = getByClass(document, 'com32');
	//		var oYp=getByClass(document,'yp');

	for(var i = 0; i < oCom32.length; i++) {
		oCom32[i].index = i;
		var a = true;

		oCom32[i].onclick = function() {
			if(a) {
				move(oYp[this.index], 'height', 404);
				a = !a;
			} else {
				move(oYp[this.index], 'height', 0);
				a = !a;
			}

		};
	}

}