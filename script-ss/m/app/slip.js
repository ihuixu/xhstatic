define(function(require,exports){
	var outer = $('.wrap')
		, main = outer.children('.main')
		, $page = main.children('.page')
		, dragMove = main.attr('dragMove') | 0
		, pages = {}
		, pageSize = $page.length
		, dragF = 10
		, y = 0
		, startY = 0
		, yx = 0
		, yp = 0
		, yn = 0
		, bx = $page.eq(0)
		, bp = $page.eq(1)
		, bn = $page.eq(-1)
		, index = 0
		, ori = 0
		, isA = 0
		, isZ = 0
		, outer_height

	var touchStart = function(event){
		$page.removeAttr('status')

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

		yx >= dragF
			? (isA ? ori = 0 : ori = 1)
			: (
				yx <= (- dragF)
					? (isZ ? ori = 0 : ori = -1)
					: ori = 0
			)


		if(!dragMove) return;

		if(yx <= -100 || yx >= 100) return;

		bx.css({'-webkit-transform' : 'translate(0, ' + yx + '%)'})

		if(!isZ && ori <= 0){
			yp = 100 + yx
			bp.css({'-webkit-transform' : 'translate(0, ' + yp + '%)'})
		}

		if(!isA && ori >= 0){
			yn = -100 + yx
			bn.css({'-webkit-transform' : 'translate(0, ' + yn + '%)'})
		}
	}

	var touchEnd = function(event){

		y = 0
		startY = 0
		yx = 0

		act()
	}

	var act = function(){
		if(ori == 1){
			if(index > 0){
				index--;
				bp = $page.eq(index+1)
			}

			bx = $page.eq(index)
			bn = $page.eq(index-1)
			bp.attr('status', 'drop')
			bx.trigger('onPageShow')
			bp.trigger('onPageHide')
			
		}else if(ori == -1){
			if(!isZ){
				index++;
				bp = $page.eq(index+1)
			}

			bx = $page.eq(index)
			bn = $page.eq(index-1)
			bn.attr('status', 'drop')
			bx.trigger('onPageShow')
			bn.trigger('onPageHide')

		}else{
			!isZ && bp.attr('status', 'drop')
			!isA && bn.attr('status', 'drop')
		}

		bx.attr('status', 'drop')

		;(index == 0) ? isA = 1 : isA = 0;
		;(index < pageSize - 1) ? isZ = 0 : isZ = 1;

		reset()

	}
	var reset = function(){
		bx.css({'-webkit-transform' : 'translate(0, 0%)'})
			.siblings().css({'-webkit-transform' : 'translate(0, 100%)'})

		isA	? bn.css({'-webkit-transform' : 'translate(0, 100%)'})
			: bn.css({'-webkit-transform' : 'translate(0, -100%)'})

	}

	var init = function(){
		outer.height($(window).height())
		$(window).on('resize', function(){
			outer.height($(window).height())
		})


		if($page){
			isA = 1

			if(pageSize > 1){
				bx.trigger('onPageShow')
					.css({'-webkit-transform' : 'translate(0, 0)'})
					.siblings().css({'-webkit-transform' : 'translate(0, 100%)'})

				$page
					.on("touchstart", touchStart)
					.on("touchmove", touchMove)
					.on("touchend", touchEnd)

				$page
					.on('onPageShow', function(e){
					})
					.on('onPageHide', function(e){
					})


			}else{
				isZ = 1
			}

		}
	}

	$page
		.on('onPageShow', function(e){
			console.log('onPageShow', 'index:',$(e.target).index())
		})
		.on('onPageHide', function(e){
			console.log('onPageHide', 'index:', $(e.target).index())
		})

	init();


	exports.pageSize = pageSize
	exports.page = function(){ return $page }
	exports.index = function(){ return index }
	exports.isA = function(){ return isA }
	exports.isZ = function(){ return isZ }
	exports.ori = function(){ return ori }

	function getPage(index){
		return $page.eq(index)
	}
	exports.getPage = getPage; 

	exports.pages = {
		getPage : getPage
		, getCurrentPage : function(){
			return bx 
		}
		, getNextPage : function(){
			return bn	
		}
		, getPrevPage : function(){
			return bp	
		}
	};

});
