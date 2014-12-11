define(function(require){
	var outer = $('.wrap')
		, banner = outer.children('.main').children('.page')
		, point = outer.children('.point').children('li')

		, page = banner.length
		, y = 0
		, startY = 0
		, yx = 0
		, yp = 0
		, yn = 0
		, bx = banner.eq(0)
		, bp = banner.eq(1)
		, bn = banner.eq(-1)
		, index = 0
		, ori = 0
		, outer_height
		, timerRoll
		, timerInit
		, time_space = 5000

	var touchStart = function(event){
		banner.attr('status', 'move')

		clearTimeout(timerRoll)
		clearTimeout(timerInit)

		event.preventDefault();
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		outer_height = outer.height()
		startY = touch.pageY - y;
	};

	var touchMove = function(event){
		event.preventDefault();
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		y = touch.pageY - startY
		yx = y / outer_height * 100;
		
		y >= 20 ? ori = 1 : (yx <= -20 ? ori = -1 : ori = 0)

		if(yx <= -100 || yx >= 100)
			return;

		yp = 100 + yx
		yn = -100 + yx
		
		bx.css({'-webkit-transform' : 'translate(0, ' + yx + '%)'})
		bp.css({'-webkit-transform' : 'translate(0, ' + yp + '%)'})
		bn.css({'-webkit-transform' : 'translate(0, ' + yn + '%)'})
		
	}

	var touchEnd = function(event){

		if(y == yx){
			var href = $(this).attr('ahref')
			if(href){
				window.location.href = href;
				return;
			}
		}else{
			y = 0
			startY = 0
			yx = 0
		}

		act()
		timerInit = setTimeout(rollBanner, time_space)
	}

	var act = function(){
		if(ori == 1){
			index--;
			if(index < 0){
				index = page - 1
				bp = banner.eq(0)
			}else{
				bp = banner.eq(index+1)
			}

			bx = banner.eq(index)
			bn = banner.eq(index-1)

			bp.attr('status', 'drop')
			
		}else if(ori == -1){
			index++;
			if(index > page - 1){
				index = 0
				bp = banner.eq(1)
			}else if(index > page - 2){
				bp = banner.eq(0)
			}else{
				bp = banner.eq(index+1)
			}

			bx = banner.eq(index)
			bn = banner.eq(index-1)

			bn.attr('status', 'drop')

		}else{
			bp.attr('status', 'drop')
			bn.attr('status', 'drop')
		}

		bx.attr('status', 'drop')

		reset()

	}
	var reset = function(){
		bx.css({'-webkit-transform' : 'translate(0, 0%)'})
		bp.css({'-webkit-transform' : 'translate(0, 100%)'})
		bn.css({'-webkit-transform' : 'translate(0, -100%)'})

		point.removeClass('curr').eq(index).addClass('curr')
	}

	var rollBanner = function(){
		ori = -1 
		banner.attr('status', 'move')
		act()
		timerRoll = setTimeout(arguments.callee, time_space)
	}

	var init = function(){
		banner.css({'-webkit-transform' : 'translate(0, 100%)'})

		reset()

		banner
			.on("touchstart", touchStart)
			.on("touchmove", touchMove)
			.on("touchend", touchEnd)

		timerInit = setTimeout(rollBanner, time_space)

	}

	if(banner && banner.length > 1) init()

});
