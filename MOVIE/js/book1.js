window.onload = function() {
	//city 选择
	citychoice();

	//订票
	bookTicket();

	//图片滚动
	pic_move();
	//添加title
	addTitle();
	//choosen 订票显示或隐藏
	choosen();
	//邮箱验证
	email_judge();
	//电话验证
    tel_judge();
	//选座位号
	//	var num_table = document.getElementById('num_table');
	//	var aSpan = num_table.getElementsByTagName('span');
	//	//alert(aSpan.length);
	//		for(var i=0;i<aSpan.length;i++){
	//			aSpan[i].onmouseover=function (){
	//				for(var i=0;i<aSpan.length;i++){
	//					aSpan[i].setAttribute("class","")
	//				}
	//				this.className='curent1';
	//			};
	//			aSpan[i].onclick=function (){
	//				this.className='curentClick';
	//			};
	//			
	//		}
	//		num_table.onmouseout=function (){
	//			for(var i=0;i<aSpan.length;i++){
	//					aSpan[i].className='';
	//				}
	//		};

	//onload结束符号
};
//onload结束符号

//city 选择
function citychoice() {
	var london = document.getElementById('london');
	if(!london) return false;
	var city_select = document.getElementById('city_select');
	if(!city_select) return false;
	var sjx = document.getElementById('sjx');
	if(!sjx) return false;
	london.onclick = function(event) {
		sjx.style.display = 'block';
		animate(city_select, {
			'height': 200
		});
		var event = event || window.event;
		if(event && event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	};
	document.onclick = function(event) {
		var event = event || window.event;
		var targetId = event.target ? event.target.id : event.srcElement.id;
		if(targetId != "london") {
			animate(city_select, {
				'height': 0
			}, function() {
				sjx.style.display = 'none';
			});
		}
	};
}
//订票 
function bookTicket() {
	var book_ticket = document.getElementById('book_ticket');
	if(!book_ticket) return false;
	var arrA = book_ticket.getElementsByTagName('a');
	if(!arrA) return false;
	for(var i = 0; i < arrA.length; i++) {
		arrA[i].onclick = function() {
			for(var j = 0; j < arrA.length; j++) {
				arrA[j].className = '';
			}
			this.className = 'current';
		}
	}
	//choosen 图片显示或隐藏
	var choosen_one = document.getElementById('choosen_one');
	if(!choosen_one) return false;
	var banner = document.getElementById('banner');
	if(!banner) return false;
	var pic_change1 = document.getElementById('pic_change1');
	if(!pic_change1) return false;
	choosen_one.onclick = function() {
		if(getStyle(banner, 'height') == '0px') {
			animate(banner, {
				'height': 250
			});
			pic_change1.className = 'up';
		} else {
			animate(banner, {
				'height': 0
			});
			pic_change1.className = 'down';
		}
	};
}
//图片滚动
function pic_move() {
	var oul = document.getElementById('ul');
	if(!oul) return false;
	var oli = oul.getElementsByTagName('li');
	if(!oli) return false;
	oul.innerHTML = oul.innerHTML + oul.innerHTML;
	oul.style.width = oli[0].offsetWidth * oli.length + 'px';
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function() {
		move();
	}, 10);

	oul.onmouseover = function() {
		clearInterval(timer);
	}
	oul.onmouseout = function() {
		timer = setInterval(function() {
			move();
		}, 10);
	}
	var speed = -2;

	function move() {
		if(oul.offsetLeft < -oul.offsetWidth / 2) {
			oul.style.left = '0px';
		}
		if(oul.offsetLeft > 0) {
			oul.style.left = -oul.offsetWidth / 2 + 'px';
		}
		oul.style.left = oul.offsetLeft + speed + 'px';
	}
}
//添加title
function addTitle(){
	var num_table=document.getElementById('num_table');
	if(!num_table) return false;
	var spans=num_table.getElementsByTagName('span');
	if(!spans) return false;
	for(var i=0;i<spans.length;i++){
		if(i<=73){
			spans[i].title='10';
		}else if(i<=145){
			spans[i].title='20';
		}else{
			spans[i].title='30';
		}
	}
}
//choosen 订票显示或隐藏
function choosen() {
	var choosen_ticket = document.getElementById('choosen_ticket');
	if(!choosen_ticket) return false;
	var book_ticket = document.getElementById('book_ticket');
	if(!book_ticket) return false;
	var pic_change2 = document.getElementById('pic_change2');
	if(!pic_change2) return false;
	choosen_ticket.onclick = function() {
		if(getStyle(book_ticket, 'height') == '0px') {
			animate(book_ticket, {
				'height': 406
			});
			pic_change2.className = 'down';
		} else {
			animate(book_ticket, {
				'height': 0
			});
			pic_change2.className = 'up';
		}
	};
}
//邮箱验证
function email_judge(){
	var email = document.getElementById('email');
	if(!email) return false;
	var tips = document.getElementById('tips');
	if(!tips) return false;
	var keepValue = email.value;
	if(!keepValue ) return false;
	email.onfocus = function() {
		this.value = '';
		tips.className = '';
	};
	email.onblur = function() {
		var re = /\w+@[a-zA-Z0-9]+\.[A-Za-z]/;
		if(this.value == '') {
			this.value = keepValue;
			tips.className = '';

		}
		if(re.test(this.value)) {
			tips.className = 't';
		} else {
			tips.className = 'f';
		}
	};
}
//电话验证
function tel_judge(){
	
	var tel = document.getElementById('tel');
	if(!tel) return false;
	var tips2 = document.getElementById('tips2');
	if(!tips2) return false;
	var keepValue = tel.value;
	if(!keepValue ) return false;
	tel.onfocus = function() {
		this.value = '';
		tips2.className = '';
	};
	tel.onblur = function() {
		var retel = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
		if(this.value == '') {
			this.value = keepValue;
			tips2.className = '';

		}
		if(retel.test(this.value)) {
			tips2.className = 't';
		} else {
			tips2.className = 'f';
		}
	};
}
//下面是封装好的函数
// 多个属性运动框架  添加回调函数
function animate(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			var current = 0;
			if(attr == "opacity") {
				current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0;
			} else {
				current = parseInt(getStyle(obj, attr));
			}
			var step = (json[attr] - current) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if(attr == "opacity") {
				if("opacity" in obj.style) {
					obj.style.opacity = (current + step) / 100;
				} else {
					obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";

				}
			} else if(attr == "zIndex") {
				obj.style.zIndex = json[attr];
			} else {
				obj.style[attr] = current + step + "px";
			}

			if(current != json[attr]) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, null)[attr];
	}
}
//clname的标签
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
//	//banner图片加边框
////	var liBorder=banner.getElementsByTagName('li');
////	for(var i=0;i<liBorder.length;i++){
////		liBorder[i].onmouseover=function (){
////			for(var i=0;i<liBorder.length;i++){
////				liBorder[i].className='';
////			}
////			this.className='active';
////		};
////		
////	}
////	banner.onmouseout=function (){
////			for(var i=0;i<liBorder.length;i++){
////			liBorder[i].className='';
////			};
////	};