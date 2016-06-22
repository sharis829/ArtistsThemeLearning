$(document).ready(function() {
	$('body').fadeIn();

	$('header h1').fitText(1, {
		maxFontSize: '72px',
		minFontSize: '20px'
	});

	// 功能模块初始化

	// 1. 平滑滑动处理
	smoothScroll();
	// 2. 工作section的所有功能
	workSlide();

	// 3. 客户section的功能
//	clientAnimation();

	// 用其他方法改写
	clientSection();

});

function clientSection(){
	$('.icon-arrow-left, .icon-arrow-right').on('click', function(){
		var $this = $(this),
			length = $('.client-unit').length,
			activeObj = $('.client-unit.animated'),
			position = $('.client-unit').index(activeObj);
		
		
		if($this.hasClass('icon-arrow-right')){
			if(position < length - 1 ){
				$('.client-unit.animated').removeClass('animated').next().addClass('animated');
				$('.client-logos .active').removeClass('active').next().addClass('active');
			}else{
				$('.client-unit').removeClass('animated').first().addClass('animated');
				$('.client-logos div').removeClass('active').first().addClass('active');
			}
		}else{
			if(position === 0 ){
				$('.client-unit').removeClass('animated').last().addClass('animated');
				$('.client-logos div').removeClass('active').last().addClass('active');
			}else{
				$('.client-unit.animated').removeClass('animated').prev().addClass('animated');
				$('.client-logos .active').removeClass('active').prev().addClass('active');
			}
		}
	});
	
	$('.client-logos div, .client-mobile-nav span').on('click', function(){
		var $this = $(this),
			position = $this.parent().children().index($this);
			$this.addClass('active');
			
			$('.client-mobile-nav span').removeClass('active').eq(position).addClass('active');
			$('.client-logos div').removeClass('active').eq(position).addClass('active');
			$('.client-unit').removeClass('animated').eq(position).addClass('animated');
			
	});
}

function smoothScroll() {
	$('nav a').on('click', function(event) {
		var $this = $(this);
		event.preventDefault();
		var scrollTop = $($this.attr('href')).offset().top;

		$('body').animate({
			scrollTop: scrollTop
		}, {
			duration: 1000,
			complete: function() {
				console.log('cool, it animates!');
			}
		});
	})
}

function clientAnimation() {
	var num = 1;
	var length = $('.client-unit').length;
	
	// arrow and sliders' functions
	$('.section-clients .icon').on('click', arrowClickHandler);
	
	$('.client-logos div').on('click', logoNavClickHandler);
	
	$('.client-mobile-nav span').on('click', mobileNavClickHandler);
	
	function mobileNavClickHandler(){
		var $this = $(this);
		num = $('.client-mobile-nav span').index($this) + 1;
		
		reset('.client-mobile-nav span', 'active');
		$this.addClass('active');
		
		reset('.client-unit', 'animated');
		$('.client-unit:nth-child('+ num+')').addClass('animated');
	}
	
	function logoNavClickHandler(){
		var $this = $(this);
		num = $('.client-logos div').index($this) + 1;
		
		reset('.client-logos div', 'active');
		$this.addClass('active');
		
		reset('.client-unit', 'animated');
		$('.client-unit:nth-child('+ num+')').addClass('animated');
	}
	
	function arrowClickHandler(){
		var $this = $(this);
		
		// 如果当前icon是prev-icon，num 减一 上一个 client
		if($this.hasClass('icon-arrow-left')){
			num = ( num == 1 ) ? length : (num-1); 
		}
		
		if($this.hasClass('icon-arrow-right')){
			num = (num == length ) ? 1 : (num+1); 
		}
		
		reset('.client-unit', 'animated');
		$('.client-unit:nth-child('+ num+')').addClass('animated');
		
		reset('.client-logos div', 'active');
		$('.client-logos div:nth-child('+ num+')').addClass('active');
	}
	
	function reset(selector, cls){
		$(selector).removeClass(cls);
	}
}

function workSlide() {
	$('.thumb-unit').on('click', function() {
		var $this = $(this),
			title = $this.find('strong').text(),
			spinner = '<div class="loader">Loading...</div>',
			filenameStr = 'work/' + $this.data('id') + '.html';

		//add the animation
		$('.slide-wrapper').addClass('slided');
		$('.work-detail').fadeIn();

		//load the project's correct title
		$('.proj-title').text(title);

		// load the project content
		$('.proj-wrapper').html(spinner).load(filenameStr);
	});

	$('.icon-back').on('click', function() {
		$('.slide-wrapper').removeClass('slided');
		$('.work-detail').fadeOut();
	});

}

(function($) {
	$.fn.fitText = function(k, options) {
		var compressor = k | 1;

		this.each(function() {
			var $this = $(this);

			var resizer = function() {
				var fontSize = Math.max(Math.min($this.width() / (compressor * 10), parseFloat(options.maxFontSize)), parseFloat(options.minFontSize));
				$this.css('fontSize', fontSize + 'px');
			}

			//页面load完 就resize一次
			resizer();

			$(window).on('resize.fitText', resizer);
		});

	}
})(jQuery);