function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}
//判断是否IE
function isIE(){
	var ie = !-[1,]; 
	return ie;
}
//通过类名获取样式
function myGetByClass(object,clname,tagname){
	var result = [];
	var obj = object.getElementsByTagName(tagname);
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == clname){
			result.push(obj[i]);
		}
	}
	return result;
}
//获取非行间样式
function getStyle(obj,property){
	if(obj.currentStyle){
		return obj.currentStyle[property];
	}else{
		return getComputedStyle(obj,false)[property];
	}
}
//运动框架
function moveAll(obj,property,target,factor,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var cur = 0;
		if(property == 'opacity'){
			cur = parseFloat(getStyle(obj,property))*100;
		}else{
			cur = parseInt(getStyle(obj,property));
		}	
		
		var speed =(target-cur)/factor;
		speed>0?speed = Math.ceil(speed):speed = Math.floor(speed);
					
		if(cur == target){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}else{					
			if(property == 'opacity'){
				obj.style.opacity = (cur+speed)/100;
				obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
			}else{
				obj.style[property] = cur+speed+'px';
			}
		}
	},30)
}


//首页轮播图
function changeImg(){
	var banner = document.getElementById("banner");
	if(!banner) return false;
	//var imgList = banner.getElementsByTagName('img');
	var imgList = myGetByClass(banner,'banner-info','div');
	
	if(isIE()){		
		for(var i=1;i<imgList.length;i++){
			imgList[i].style.display = 'none'
		}
		var index = 0;
		function change1(){
			if(index==3)index=0;
			else index+=1;
			for(var i=0;i<imgList.length;i++){
				imgList[i].style.display = 'none'
			}
			imgList[index].style.display = 'block';
		}	
		setInterval(change1,5000);
		return;
	}
	
	for(var i=0;i<imgList.length;i++){
		//imgList[i].style.zIndex = imgList.length-i;
		imgList[i].style.opacity = 0;
	}
	imgList[0].style.opacity = 1;
	
	var index = 0;
	var zindex = parseInt(imgList[0].style.zIndex);
	
	var timer =	setInterval(change,5000);
	
//	function change(){
//		if(index == imgList.length-1)index=0;
//	  	else index+=1;
//		imgList[index].style.zIndex = zindex+''
//		imgList[index].style.opacity = '0';
//		moveAll(imgList[index],'opacity',100,30);	
//		if(imgList[imgList.length-1].style.zIndex == zindex){			
//			if(zindex == imgList.length+1)zindex = imgList.length;
//			zindex +=1;
//		}
//		if(imgList[imgList.length-1].style.zIndex == imgList[0].style.zIndex){
//			for(var i=0;i<imgList.length;i++){
//				imgList[i].style.zIndex = imgList.length;
//			}
//		}
//	}	

	function change(){
		if(index == 3)index = 0;
		else index++;
		for(var i=0;i<imgList.length;i++){
			if(i != index){
				moveAll(imgList[i],'opacity',0,30);	
			}			
		}
		moveAll(imgList[index],'opacity',100,30);	
	}
	
	var nextBtn = document.getElementById("next-btn");
	var preBtn = document.getElementById("pre-btn");
	
	nextBtn.onclick = function(){
		clearInterval(timer);
		change();
	}
	preBtn.onclick = function(){
		if(index-2 < 0)index = index+2;
		else index -=2;
		clearInterval(timer);		
		change();
	}
	
	nextBtn.onmouseout = preBtn.onmouseout = function(){
		timer = setInterval(change,5000);
	}
	banner.onmouseover = function(){
		moveAll(nextBtn,'opacity',100,10);	
		moveAll(preBtn,'opacity',100,10);	
	}
	banner.onmouseout = function(){
		moveAll(nextBtn,'opacity',0,10);	
		moveAll(preBtn,'opacity',0,10);	
	}
}
addLoadEvent(changeImg);

//今日推荐信息
function showMovieInfo(){
	var best = document.getElementById("best");
	if(!best) return false;
	var list = myGetByClass(best,'movie-list','div');
	for(var i=0;i<list.length;i++){
		list[i].onmouseover = function(){
			if(!this) return false;
			var info = myGetByClass(this,'movie-info','ul');
//			info[0].style.bottom = -info[0].offsetHeight+'px';
			moveAll(info[0],'bottom',-info[0].offsetHeight,5);
		}
		list[i].onmouseout = function(){
			if(!this) return false;
			var info = myGetByClass(this,'movie-info','ul');
//			info[0].style.bottom = '0px';
			moveAll(info[0],'bottom',0,5);
		}
	}
}
addLoadEvent(showMovieInfo);

//页面主体搜索
function prepareGallery(){
	var list = document.getElementById("select-list");
	if(!list) return false;
	var links = list.getElementsByTagName('a');
	var input = document.getElementById("search-input");
	var group = myGetByClass(document,'select-group','ul');
	
	for(var i=0;i<links.length;i++){
		links[i].onclick = function(){	
			for(var j=0;j<links.length;j++){
				links[j].removeAttribute('class');
			}
			this.setAttribute('class','active');
			return showPic(this);
		};
		
	}
	var a = false;
	input.onfocus = function(){showList();};	
	input.onblur = function(){setTimeout(hideList,300);};
	
	function showList(){
		hideList();
		for(var i=0;i<links.length;i++){
			if(links[i].getAttribute('class')){
				this.index = i;
				group[this.index].style.display = 'block';	
				group[this.index].style.zIndex = '5';
				moveAll(group[this.index],'opacity',100,5);
				var liList = group[this.index].getElementsByTagName('li');
				for(var j=0;j<liList.length;j++){
					liList[j].onclick = function(){
						input.value = this.innerHTML;
						hideList();
					};
				}
			}
		}		
	}

	function hideList(){
		for(var j=0;j<group.length;j++){
			moveAll(group[j],'opacity',0,5);
			group[j].style.zIndex = '1';					
			group[j].style.display = 'none';			
		}
	}
	
	function showPic(pic){
		var source = pic.getAttribute('title');
//		var title = pic.getAttribute('title');
		var img = document.getElementById("search-img");
		var btn = document.getElementById("search-btn");
		img.setAttribute('src',source);
//		btn.setAttribute('value',title);
		return false;
	}
}
addLoadEvent(prepareGallery);

//改变电影图片透明度
function changeOPA(obj,clsName,target){
	var img = myGetByClass(obj,clsName,'div');
	for(var i=0;i<img.length;i++){
		img[i].onmouseover = function(){
			for(var j=0;j<img.length;j++){
				img[j].style.opacity = '1';
			}
			this.style.opacity = target/100+'';
			this.style.filter = 'alpha(opacity:'+target+')';
		};
		img[i].onmouseout = function(){
			this.style.opacity = '1';
			this.style.filter = 'alpha(opacity:100)'
		};
	}
}
changeOPA(document,'movie-img',75);

//电影评分
function rate(){
	var now = document.getElementById("now-left");
	if(!now) return false;
	var rate = myGetByClass(now,'movie-rate','div');
	for(var x=0;x<rate.length;x++){
		rating(rate[x]);
	}
	function rating(obj){
		var starList = obj.getElementsByTagName('img');
		var isClick = false;
		for(var i=0;i<starList.length;i++){
			starList[i].index = i;
			starList[i].onmouseover = function(){
				if(isClick){return;}
				for(var j=0;j<this.index+1;j++){
					starList[j].src = 'img/index/star-on.png';
				}
				for(var k =this.index+1;k<starList.length;k++){
					starList[k].src = 'img/index/star.png';
				}
			};
		
			starList[i].onclick = function(){
				for(var j=0;j<this.index+1;j++){
					starList[j].src = 'img/index/star-on.png';
				}
				for(var k =this.index+1;k<starList.length;k++){
					starList[k].src = 'img/index/star.png';
				}
				isClick = true;
			};

			obj.onmouseout = function(){
				if(isClick){return;}
				for(var l =0;l<starList.length;l++){
					starList[l].src = 'img/index/star.png';
				}
			};	
		}
	}
}
addLoadEvent(rate);

//返回顶部
function toTop(){
	var btn = document.getElementById("go-to-top");
	if(!btn) return false;
	
	var flag = true;
	var timer = null;
	
	window.onscroll = function(){		
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop>400){
			btn.style.display = 'block';
			moveAll(btn,'opacity',100,1);
		}else{
			moveAll(btn,'opacity',0,1);		
		}
		if(scrollTop == 0){
			btn.style.display = 'none';
		}
				
		if(!flag) {
			clearInterval(timer);
		}
		flag = false;
		
	}
	
	function go(){
		clearInterval(timer);
		timer = setInterval(function() {
			var scoll = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor(-scoll / 10);
			if(isIE()) speed = -100;
			flag = true;
			document.documentElement.scrollTop = document.body.scrollTop = scoll + speed;
			if(scoll == 0) {
				clearInterval(timer);
			}
		}, 30)
	}
	
	btn.onclick = function(){
		go();		
	}
}
addLoadEvent(toTop);
//底部图标
function social(){
	var box = document.getElementById("social");
	if(!box) return false;
	var imgList = box.getElementsByTagName('img');
	if(!imgList) return false;
	var source;
	for(var i=0;i<imgList.length;i++){
		imgList[i].onmouseover = function(){
			source = this.src;
			var arr = source.split('.png')
			this.src = arr[0]+'-af.png';
		};
		imgList[i].onmouseout = function(){
			this.src = source;
		}
	}
}
addLoadEvent(social);

//判断是否支持svg图片
function hasSVG(){
	var b = false;
　　SVG_NS = 'http://www.w3.org/2000/svg';
  	var a = !!document.createElementNS;
  	if(a){
  		b = !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
  	}	
	return a&&b;
}


function app(){
	var apple = document.getElementById("apple");
	if(!apple) return false;
	var google = document.getElementById("google");
	if(!google) return false;
	var windows = document.getElementById("windows");
	if(!windows) return false;
	if(!hasSVG()){
		apple.src = 'img/index/apple.png';
		google.src = 'img/index/google.png';
		windows.src = 'img/index/window.png';
	}
	var app = document.getElementById("app");
	var p = app.getElementsByTagName('p')
	for(var i=0;i<p.length;i++){
	p[i].index = i;
	p[i].onmouseover = function(){
		var QRcode = document.createElement("div");
		QRcode.setAttribute('id','QRcode');
		QRcode.style.left = '-80px';
		QRcode.style.top = 70*this.index+15+'px';
		moveAll(QRcode,'opacity',100,5)
		app.appendChild(QRcode);
	}
	p[i].onmouseout = function(){
		app.removeChild(app.lastChild);
	}
	}
	
}
addLoadEvent(app);

//侧栏文字说明
function showBannerInfo(){
	var ban = myGetByClass(document,'side-banner','div');
	if(!ban) return false;
	var desc = myGetByClass(document,'ban-desc','p');
	if(!desc) return false;
	for(var i=0;i<ban.length;i++){
		ban[i].index = i;
		ban[i].onmouseover = function(){
			moveAll(desc[this.index],'top',200,5);
		}
		ban[i].onmouseout = function(){
			moveAll(desc[this.index],'top',250,5);
		}
	}
	
}
addLoadEvent(showBannerInfo);


//头部搜索
function searchSelect(){
	
	var search = document.getElementById("search");
	if(!search) return false;
	var show = document.getElementById("show-search");
	if(!show) return false;
	var a = true;
	show.onclick = function(){
		if(a){
			moveAll(search,'height',86,10,function(){
				search.style.overflow = 'visible';
			});
			a = !a;
		}else{
			search.style.overflow = 'hidden';
			moveAll(search,'height',0,10);
			a = !a;
		}
		return false;
	}
	
	var searchBy = document.getElementById("search-by");
	if(!searchBy) return false;
	var searchSelect = document.getElementById("search-select")
	if(!searchSelect) return false;
	var list = searchSelect.getElementsByTagName('li');

	var a = true;
	
	searchBy.onfocus = function(){
		moveAll(searchSelect,'height',183,5);
		this.style.backgroundImage = 'url(img/up.png)';
	};
	
	searchBy.onblur = function(){
		setTimeout(function(){
			searchBy.style.backgroundImage = 'url(img/down.png)';
			moveAll(searchSelect,'height',0,5);
		},100);
	}
	
	searchBy.onclick = function(){
		if(searchSelect.style.height == '183px'){
			moveAll(searchSelect,'height',0,5);
			this.style.backgroundImage = 'url(img/down.png)';
		}else if(searchSelect.style.height == '0px'){
			moveAll(searchSelect,'height',183,5);
			this.style.backgroundImage = 'url(img/up.png)';
		}
	};
	
	for(var i=0;i<list.length;i++){
		list[i].onclick = function(){
			searchBy.innerHTML = this.innerHTML;
		};
	}
}
addLoadEvent(searchSelect);

//城市选择下拉
function citySelect(){
	var city = document.getElementById("city");
	if(!city) return false;
	var cityList = document.getElementById("city-list");
	if(!cityList) return false;
	var list = cityList.getElementsByTagName('li');
	city.onfocus = function(){
		moveAll(cityList,'height',208,2);
	};
	city.onblur = function(){
		setTimeout(function(){
			moveAll(cityList,'height',0,2);
		},100);
	};
	city.onclick = function(){
		if(cityList.style.height == '208px'){
			moveAll(cityList,'height',0,2);
		}else if(cityList.style.height == '0px'){
			moveAll(cityList,'height',208,2);
		}
	}
	for(var i=0;i<list.length;i++){
		list[i].onclick = function(){
			city.innerHTML = this.innerHTML;
		}
	}
}
addLoadEvent(citySelect);

//影院筛选
function sortCinema(){
	var sort = document.getElementById("sort-cinema");
	if(!sort) return false;
	var sortBy = sort.getElementsByTagName('a');
	if(!sortBy) return false;
	var cinema = myGetByClass(document,'single-ciname','div');
	for(var i=0;i<sortBy.length;i++){
		sortBy[i].index = i;
		sortBy[i].onclick = function(){
			for(var j=0;j<sortBy.length;j++){
				sortBy[j].removeAttribute('class');
			}
			this.setAttribute('class','active');
			
			if(this.index == 0){
				for(var k=0;k<cinema.length;k++){
					cinema[k].style.display = 'block';
				}
			}else{
				for(var j=0;j<cinema.length;j++){
					if(cinema[j].title == this.title){
						cinema[j].style.display = 'block';
					}else{
						cinema[j].style.display = 'none';
					}
				}
			}			
			return false;
		};
	}	
}
addLoadEvent(sortCinema);

//隐藏遮罩层
function maskHide(){
	var cinema = myGetByClass(document,'single-ciname','div');
	if(!cinema) return false;
	var mask = myGetByClass(document,'mask','div');
	if(!mask) return false;
	if(isIE()){
		for(var i=0;i<mask.length;i++){
			mask[i].style.display = 'none';
		}
	}
	
	for(var i=0;i<cinema.length;i++){
		cinema[i].index = i;
		cinema[i].onmouseover = function(){			
			moveAll(mask[this.index],'opacity',0,4);
			mask[this.index].getElementsByTagName('span')[0].style.transition = 'all .5s';
			mask[this.index].getElementsByTagName('span')[0].style.transform = 'scale(0)';
		};
		cinema[i].onmouseout = function(){
			moveAll(mask[this.index],'opacity',100,4);
			mask[this.index].getElementsByTagName('span')[0].style.transform = 'scale(1)';
		};
	}
}
addLoadEvent(maskHide);

//影院图片滚动
function showCinemaPic(){
	var warp = document.getElementById('pic-list');
	if(!warp) return false;
	var list = warp.getElementsByTagName('li');	

	warp.innerHTML += warp.innerHTML;
	warp.style.width = list[0].offsetWidth*list.length+'px';
	
	function move(){
		if(warp.offsetLeft<-warp.offsetWidth/2){
			warp.style.left = '0px';
		}
		if(warp.offsetLeft>0){
			warp.style.left = -warp.offsetWidth/2+'px'
		}
		warp.style.left = warp.offsetLeft-1+'px';
	}
	
	var timer = setInterval(move,40);
	warp.onmouseover = function(){
		clearInterval(timer);
		isMove = false;
	};
	warp.onmouseout = function(){
		timer = setInterval(move,40);
	};	
	
	var isMove = false;
		
	for(var i=0;i<list.length;i++){		
		var img = list[i].getElementsByTagName('img')[0];
		img.setAttribute('draggable',false);	
		img.ondrag = function(){return false;}
		
		list[i].onclick = function(){			
			if(!isMove){
				var singleImg = this.getElementsByTagName('img')[0];
			
				var mask = document.createElement("div");
				mask.style.width = document.documentElement.clientWidth+'px';
				mask.style.height = document.documentElement.clientHeight+'px';
				mask.setAttribute('id','mask');
				
				mask.onclick = function(){
					document.documentElement.removeChild(this);
				}
				
				var conImg = document.createElement("div");
				conImg.setAttribute('class','con-img');
				conImg.style.height = document.documentElement.clientHeight*0.7+'px';
				conImg.style.width = document.documentElement.clientWidth*0.6+'px';
				conImg.style.marginTop = document.documentElement.clientHeight*0.3/2+'px';
				mask.appendChild(conImg);
				
				var newImg = document.createElement("img");
				newImg.src = singleImg.src;
				newImg.style.width = '100%';
				newImg.style.height = document.documentElement.clientHeight*0.7-10+'px';
				conImg.appendChild(newImg);
				
				document.documentElement.appendChild(mask);
			}			
		}
	}
		
	warp.onmousedown = function(ev){
		e = ev||window.event; 
		var x=e.clientX-warp.offsetLeft;
		document.onmousemove = function(ev){
			e = ev||window.event;
			warp.style.left = e.clientX-x+'px';
			if(warp.offsetLeft>0){
				warp.style.left = -warp.offsetWidth/2+'px'
			}
			if(warp.offsetLeft<-warp.offsetWidth/2){
				warp.style.left = '0px';
			}	
			isMove = true;
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}			
}
addLoadEvent(showCinemaPic);

//影院页面选项卡
function showTabContent(){
	var tab = document.getElementById("ciname-nav");
	if(!tab) return false;
	var tabCon = document.getElementById("tab-content");
	if(!tabCon) return false;
	var list = tab.getElementsByTagName('li');
	var con = myGetByClass(tabCon,'con','div');
	con[0].style.display = 'block';
	for(var i=0;i<list.length;i++){
		list[i].index = i;
		list[i].onclick = function(){
			for(var j=0;j<list.length;j++){
				list[j].removeAttribute('class');
				con[j].style.display = 'none';
			}
			this.setAttribute('class','active');
			con[this.index].style.display = 'block';
		};
	}
}
addLoadEvent(showTabContent);

//评论
function replyComment(){
	var comm = document.getElementById("comment");
	if(!comm) return false;
	var show = document.getElementById("show-more");
	
	var list = myGetByClass(comm,'comment-list','div');
	var reply = myGetByClass(comm,'reply','a');
	var replyArea = myGetByClass(comm,'replyarea','div');
	for(var i=0;i<reply.length;i++){
		reply[i].index = i;
		reply[i].onclick = function(){
			for(var j=0;j<replyArea.length;j++){
				replyArea[j].style.display = 'none';
			}
			replyArea[this.index].style.display = 'block';
			return false;
		}
	}
	for(var i=3;i<list.length;i++){
		list[i].style.display = 'none';
	}
	if(show){
		show.onclick = function(){
			for(var i=0;i<list.length;i++){
				list[i].style.display = 'block';
			}
		}
	}	
	
	var tabCom =  document.getElementById("tab-comments");	
	var inputArea = myGetByClass(tabCom,'inputarea','div');
	var input = inputArea[0].getElementsByTagName('textarea')[0];
	var send = inputArea[0].getElementsByTagName('input')[0];
	
	send.onclick = function(){
		var newCom = document.createElement("div");
		list = myGetByClass(comm,'comment-list','div');
		
		newCom.setAttribute('class','comment-list');
		newCom.innerHTML = list[0].innerHTML;
		comm.insertBefore(newCom,list[0]);
		
		var newList = myGetByClass(comm,'comment-list','div');
	 	var newCon = myGetByClass(newList[0],'comment-con','div');
	 	newCon[0].getElementsByTagName('p')[0].innerHTML = input.value;
	 	
	}
}
addLoadEvent(replyComment);

//时间选择插件
function datePicker(){
	var datepicker = document.getElementById("datepicker");
	if(!datepicker) return false;
	
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth();
	var d = date.getDate();
	
	datepicker.value = y+'-'+(m+1)+'-'+d;
		
	$(function(){
		$('#datepicker').datepicker({ 
	   		dateFormat: 'yy-mm-dd',
	   		dayNamesMin: ['日','一','二','三','四','五','六']
	   	});
	});
}
addLoadEvent(datePicker);

//----------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------
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
addLoadEvent(citychoice);
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
	var banner = document.getElementById('banner1');
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
addLoadEvent(bookTicket);
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
	}, 30);

	oul.onmouseover = function() {
		clearInterval(timer);
	}
	oul.onmouseout = function() {
		timer = setInterval(function() {
			move();
		}, 30);
	}
	var speed = -1;
	
	
	for(var i=0;i<oli.length;i++){
		oli[i].onclick = function(){
			for(var j=0;j<oli.length;j++){
				oli[j].style.opacity = 1;
				oli[j].style.filter = 'alpha(opacity:100)';
			}
			moveAll(this,'opacity',80,5)
		}
	}
	
	
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
addLoadEvent(pic_move);
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
addLoadEvent(addTitle);

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
addLoadEvent(choosen);

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
addLoadEvent(email_judge);
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
addLoadEvent(tel_judge);
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
//---------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------

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

function diamying1(){
	var oTh = document.getElementById('th');
	if(!oTh) return false;
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
addLoadEvent(diamying1);

function xingxing(){
	
	var oYp=document.getElementById("yp");
	if(!oYp) return false;
	
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
	
	var oTh3 = document.getElementById("th3");
	if(!oTh3) return false;
	var oTh4 = document.getElementById("th4");
	if(!oTh4) return false;
	oTh3.onclick = function() {
		move(oYp, 'height', 404);
		oTh4.style.display = 'block';
		oTh3.style.display = 'none';
	}
	oTh4.onclick = function() {
		move(oYp, 'height', 0);
		oTh3.style.display = 'block';
		oTh4.style.display = 'none';
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
addLoadEvent(xingxing);

function xiangxiang(){
	
	var lei = document.getElementById("lei");
	if(!lei) return false;
	
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
addLoadEvent(xiangxiang);
//---------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
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
addLoadEvent(huang);

function shouye(){
	var oR=document.getElementById('right');
	if(!oR) return false;
	//var obgt=oR.getElementsByClassName('bgt');
	var obgt = getByClass(oR,'bgt');
	//var obgt1=oR.getElementsByClassName('bgt_1');
	var obgt1 = getByClass(oR,'bgt_1');
    for(var i=0;i<obgt.length;i++){
    	obgt[i].index = i;
    	
    	obgt[i].onmouseover=function (){
    		obgt1[this.index].style.display = 'block';
			startMove(obgt1[this.index],{width:770,height:161,opacity:70});
		}
		obgt[i].onmouseout=function (){
			var index = this.index;
			startMove(obgt1[this.index],{width:870,height:261,opacity:0},function(){
				obgt1[index].style.display = 'none';
			});
		}
    }
}
addLoadEvent(shouye);

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
    		obgt1[this.index].style.display = 'block';
			startMove(obgt1[this.index],{width:this.offsetWidth*0.8,height:this.offsetHeight*0.8,opacity:70});
		}
		obgt[i].onmouseout=function (){
			var index = this.index;
			startMove(obgt1[this.index],{width:this.offsetWidth,height:this.offsetHeight,opacity:0},function(){
				obgt1[index].style.display = 'none';
			});
		}
    }
}
addLoadEvent(two);

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
addLoadEvent(four);

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
//---------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------

function one() {
	var btn = document.getElementById('btn');

	if(!btn) return false;
	var Name = document.getElementById('name');		
	if(!Name) return false;
	var Wby = document.getElementById('wby');
	if(!Wby) return false;
	var Email = document.getElementById('em');
	if(!Email) return false;
	var inf1 = document.getElementById('inf1');
	var inf2 = document.getElementById('inf2');
	var inf3 = document.getElementById('inf3');
	var Thanks = document.getElementById('Thanks');
	btn.onclick = function() {
		var re = /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
		var reName = /^[a-zA-Z][a-zA-Z0-9]{1,10}$/;
		if(reName.test(Name.value)) {
			move(inf1, 'height', 0);
		} else {
			move(inf1, 'height', 60);
		}
		if(re.test(Email.value)) {
			move(inf2, 'height', 0);
		} else {
			move(inf2, 'height', 60);
		}
		setTimeout(function() {
			move(inf3, 'height', 0);
			move(inf2, 'height', 0);
			move(inf1, 'height', 0);
		}, 5000)
		if(reName.test(Wby.value)) {
			move(inf3, 'height', 0);

		} else {
			move(inf3, 'height', 60);

		}
		if(reName.test(Name.value) && re.test(Email.value) && reName.test(Wby.value)) {
			Thanks.style.display = 'block';
		}
	}
}
addLoadEvent(one);

function two1() {
	var oF = document.getElementById('f');
	if(!oF) return false;
	var oN = document.getElementById('n');
	if(!oN) return false;
	var oT = document.getElementById('t');
	if(!oT) return false;
	oF.onmouseover = function() {
		move(this, 'opacity', 100);
	};
	oF.onmouseout = function() {
		move(this, 'opacity', 0);
	};
	oN.onmouseover = function() {
		move(this, 'opacity', 100);
	};
	oN.onmouseout = function() {
		move(this, 'opacity', 0);
	};
	oT.onmouseover = function() {
		move(this, 'opacity', 100);
	};
	oT.onmouseout = function() {
		move(this, 'opacity', 0);
	};
	var Email = document.getElementById('email');
	var Pass = document.getElementById('password');
	var Hint1 = document.getElementById('E-hint');
	var Hint2 = document.getElementById('P-hint');
	var oBtn = document.getElementById('btn');
	var OSign = document.getElementById('SIGNED');
	var oReg = document.getElementById('register');
	oBtn.onclick = function() {
		var re = /^\w+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		var rePass = /^[a-zA-Z][a-zA-Z0-9]{2,9}$/
		if(re.test(Email.value)) {
			move(Hint1, 'height', 0);
		} else {
			move(Hint1, 'height', 60);
		}
		setTimeout(function() {
			move(Hint2, 'height', 0);
			move(Hint1, 'height', 0);
		}, 3000)
		if(rePass.test(Pass.value)) {
			move(Hint2, 'height', 0);
		} else {
			move(Hint2, 'height', 60);
		}
		if(re.test(Email.value) && rePass.test(Pass.value)) {
			OSign.style.display = 'block';
			oReg.style.display = 'none';
		}
	};
}
addLoadEvent(two1);

function three() {
	var Tag = document.getElementById('offers-bg');
	if(!Tag) return false;
	var oImg = Tag.getElementsByTagName('img');
	for(var i = 0; i < oImg.length; i++) {
		oImg[i].onmouseover = function() {
			move(this, 'opacity', 100);
		};
		oImg[i].onmouseout = function() {
			move(this, 'opacity', 0);
		};
	}
}
addLoadEvent(three);

function four1() {
	var oCon = document.getElementById('con');
	if(!oCon) return false;
	var oLi = oCon.getElementsByTagName('li');
	var Bg = document.getElementById('move-bg');
	var move = document.getElementById('move');
	var Cha = document.getElementById('chacha');
		
	var moveWidth = parseInt(getstyle(move,'width'));//获取move宽度
	var moveHeight = parseInt(getstyle(move,'height'));//获取moveg高度
	
	move.style.left = (document.documentElement.clientWidth-moveWidth)/2+'px';
	move.style.top = (document.documentElement.clientHeight-moveHeight)/2+'px';
	
	for(var i = 0; i < oLi.length; i++) {
		oLi[i].onclick = function() {
			Bg.style.display = 'block';
			move.style.display = 'block';
//			Cha.style.display = 'block';
			
			var bb = document.createElement('div');
			bb.innerHTML = '<video width="900" height="507" src="video/movie.mp4" controls="controls">抱歉!你的浏览器不支持视频播放</video>';			
			bb.style.color = '#fff';
			bb.style.fontSize = '20px';
			move.appendChild(bb);
			
		};
		
		
		
	}
	
	Cha.onclick = function() {
		Bg.style.display = 'none';
		move.style.display = 'none';
//		Cha.style.display = 'none';		
		move.removeChild(move.children[1]);//删除创建的video标签
	};
}
addLoadEvent(four1);

