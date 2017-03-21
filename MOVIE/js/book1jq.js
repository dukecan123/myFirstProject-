$(function (){
	//Book a ticket中的切换
	$(".butt a").click(function (){
		$(this).css({"width":"101px","background-position":"0px 0px"}).siblings().css({"width":"91px","background-position":"-1px -32px"});
	});	
	//日期
	date();

	//选座位号.
	$(".first span,.second span,.third span,.fourt span,.fifth span,.sixth span,.seventh span,.eighth span,.ninth span,.tenth span,.eleventh span").hover(function (){
		$(this).addClass('curent1').siblings('span').removeClass('curent1');
	},function(){
		$(".first span,.second span,.third span,.fourt span,.fifth span,.sixth span,.seventh span,.eighth span,.ninth span,.tenth span,.eleventh span").removeClass('curent1')
	});
	
	var count=0;
	
	var num=0;
	$(".num_table span").click(function (){
		if($(this).hasClass('curentClick')){
			$(this).removeClass('curentClick');
		
			var $p = $('.txt p');
			var list = document.getElementById("txt");
			for(var i = 0; i<$p.length; i++){
				//console.log('p:'+$p[i].innerHTML);
				//console.log('this:'+$(this).text());
				if($p[i].innerHTML == $(this).text()){
					list.removeChild($p[i])
					break;
				}
			}
			
			$b=$(this).attr("title");
			count -=Number($b);
			$(".finalResult").text(count);
		}else{
			$(this).addClass('curentClick');
			$b=$(this).attr("title");
    		count +=Number($b);	
			//var =$(".txt").text($(this).text());
			//var oP=document.createElement('p');
			//oP.text($(this).text());
			$(".txt").append('<p>'+$(this).text()+'</p>');
			$(".finalResult").text(count);
		}
	});

});

function date(){
	if(!document.getElementById("date")) return false;
	$("#date").datepicker();
}