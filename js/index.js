$(function(){
	var el="";
	for(var p=0;p<30;p++){
		for(var q=0;q<30;q++){
			if( (p%2==0&&q%2==0) || (p%2==1&&q%2==1) ){
				el+='<div class="odd"></div>';
			}
			else{
				el+='<div class="even"></div>';
			}
		}
	}
	$('.senceback').html(el);

	var els="";
	for(var i=0;i<30;i++){
		for(var j=0;j<30;j++){
			var id=i+'_'+j;
			els+='<div id="'+id+'" class="sencesnake"></div>';
		}
	}
	$('.sence').html(els);
	
	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var data={'0_0':true,'0_1':true,'0_2':true};
	var createsnake=function(){
		$.each(snake,function(index,value){
			$('#'+value.x+'_'+value.y).addClass('snake');
			if((value.x==snake[snake.length-1].x)&&(value.y==snake[snake.length-1].y)){
				$('#'+value.x+'_'+value.y).removeClass('snake').addClass('shetour');
			}
		})
	}
	createsnake();

	var dropfood=function(){
		var x=Math.floor(Math.random()*30);
		var y=Math.floor(Math.random()*30);
		while(data[x+'_'+y]){
			var x=Math.floor(Math.random()*30);
			var y=Math.floor(Math.random()*30);
		}
		$('#'+x+'_'+y).addClass('food');
		return {x:x,y:y}
	}

	var fangxiang=39;
	var food=dropfood();
	var move=function(){
		var oldtou=snake[snake.length-1];
		$('#'+oldtou.x+'_'+oldtou.y).removeClass('shetour').addClass('snake');
		$('#'+oldtou.x+'_'+oldtou.y).removeClass('shetoul').addClass('snake');
		$('#'+oldtou.x+'_'+oldtou.y).removeClass('shetout').addClass('snake');
		$('#'+oldtou.x+'_'+oldtou.y).removeClass('shetoub').addClass('snake');
		if(fangxiang==39){
			var newtou={x:oldtou.x,y:oldtou.y+1}
		}
		if(fangxiang==40){
			var newtou={x:oldtou.x+1,y:oldtou.y}
		}
		if(fangxiang==37){
			var newtou={x:oldtou.x,y:oldtou.y-1}
		}
		if(fangxiang==38){
			var newtou={x:oldtou.x-1,y:oldtou.y}
		}
		if(newtou.x<0||newtou.y<0||newtou.x>29||newtou.y>29||data[newtou.x+'_'+newtou.y]){
			$('.over').show();
			$('.again').show();
			clearInterval(t);
			return;
		}
		if(newtou.x==food.x && newtou.y==food.y){
			$('#'+newtou.x+'_'+newtou.y).removeClass('food');
			food=dropfood();
		}
		else{
			var weiba=snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).removeClass('snake');
		}
		snake.push(newtou);
		data[newtou.x+'_'+newtou.y]=true;
		if(fangxiang==39){
			$('#'+newtou.x+'_'+newtou.y).addClass('shetour');
		}
		if(fangxiang==40){
			$('#'+newtou.x+'_'+newtou.y).addClass('shetoub');
		}
		if(fangxiang==37){
			$('#'+newtou.x+'_'+newtou.y).addClass('shetoul');
		}
		if(fangxiang==38){
			$('#'+newtou.x+'_'+newtou.y).addClass('shetout');
		}
		
	}
	/*$('.start').click(function(){
		$('.start').hide();
		$('.starts').hide();
		t=setInterval(move,200);
	})
	$('.again').click(function(){
		$('.start').show();
		$('.starts').show();
		$('.over').hide();
		$('.again').hide();
		location.reload();
		snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		data={'0_0':true,'0_1':true,'0_2':true};
		createsnake();
	})*/
	touch.on($('.start'),'tap',function(){
		$('.start').hide();
		$('.starts').hide();
		t=setInterval(move,200);
	});
	touch.on($('.again'),'tap',function(){
		$('.start').show();
		$('.starts').show();
		$('.over').hide();
		$('.again').hide();
		//location.reload();
		for(var i=0;i<30;i++){
			for(var j=0;j<30;j++){
				var id=i+'_'+j;
				$('#'+id).removeClass('snake');
				delete data[id];
			}
		}
		fangxiang=39;
		snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		data={'0_0':true,'0_1':true,'0_2':true};
		createsnake();
	})
	$(document).keydown(function(e){
		if(Math.abs( e.keyCode-fangxiang)==2){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40) ){
			return;
		}
		fangxiang=e.keyCode;
	})
})