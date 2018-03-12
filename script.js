// Copyright(C)2016 Cafi Net All Rights Reserved.[120]
// 利用規約 http://japanism.info/free-template.html#template

$(function(){
// 調整用 ここから
	var back_top_speed = 500; // トップへ戻るスピード（back-top.png をクリックしたとき）
	var nav_speed = 300; // スマートフォンメニューの表示スピード
	var nav_scroll_speed = 300; // メニュースクロールスピード
	var menu_hover = 300; // リンク hover アクションのスピード	
	var min_width = 1000; // ブレークポイント[1000]
	var content_state = 1; // content の非表示・表示（1 = ON）（0 = OFF）
	// スライドショーのスピードを変更
	var first_photo = 2000; // 最初の写真を何秒かけて表示するか（1000 = 1秒）
	var change_photo = 2000; // 写真を何秒かけて切り替えるか
	var slide_time = 5000; // 何秒ごとに写真の切り替えを実行するか（first_photo と change_photo より長く設定）
	var change_photo_click = 800; // 写真を何秒かけて切り替えるか（進む・戻るボタンなどクリックによる切り替え）
// 調整用 ここまで

	var menu_button = $('#menu_button');
	var nav = $('#nav_mo nav');
	var back_top = $('#back_top');
	var touch_start = ('ontouchstart' in window);	
	var window_width = $(window).width();
	if (window_width > min_width) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > 1000) {
				back_top.fadeIn('fast');
			} else {
				back_top.fadeOut('fast');
			}
		});
		back_top.click(function(){
			$('body,html').animate({scrollTop: '0px'}, back_top_speed, 'swing');
		});
	}
	function window_control () {
		menu_button.unbind();
		nav.unbind();
		$('a[href^=#block]').unbind();
		window_width = $(window).width();
		if (window_width < min_width) {
			var nav_height = nav.height();
			if(nav.css('margin-top') <= '0px') {
				nav.css('margin-top', '-' + nav_height + 'px');
			}
			menu_button.click(function(){
				if(nav.css('margin-top') === '-' + nav_height + 'px') {
					nav.animate({'margin-top': '0px'}, nav_speed, 'linear');
					$('#menu_button_line').addClass('close');
					$('#overlay').fadeIn('fast');
				} else {
					nav.animate({'margin-top': '-' + nav_height + 'px'}, nav_speed, 'linear');
					$('#menu_button_line').removeClass('close');
					$('#overlay').fadeOut('fast');
				}
			});
			$('#nav_mo nav ul li a').click(function(){	
				if(window_width < min_width && nav.css('margin-top') <= '0px') {
					nav.animate({'margin-top': '-' + nav_height + 'px'}, nav_speed, 'linear');
					$('#menu_button_line').removeClass('close');
					$('#overlay').fadeOut('fast');
				}			
			});
		} else {
			if(nav.css('margin-top') <= '0px') {
				nav.css('margin-top', '0px');
			}
		}
		$('#menu_button_line').removeClass('close');
		$('#overlay').css('display', 'none');
		var header_height = $('header').height();
		if (window_width >= min_width) {
			$('a[href^=#block]').click(function(){
				var id = $($(this).attr('href')).offset().top;
				$('body,html').animate({scrollTop:id - header_height +'px'}, nav_scroll_speed, 'swing');
				return false;
			});
		} else {
			$('a[href^=#block]').click(function(){
				var id = $($(this).attr('href')).offset().top;
				$('body,html').animate({scrollTop:id +'px'}, nav_scroll_speed, 'swing');
				return false;
			});
		}
		if (touch_start === false) {
			$('body a').hover(function(){
				$(this).stop().animate({opacity: 0.5}, menu_hover);
			},
			function(){
				$(this).stop().animate({opacity: 1}, menu_hover);
			});		
		}
	}
		if (touch_start === false) {
			if ($(window).height() < $('body').height() && content_state === 1) {
				var block_count = $("[id^='block']").length;
				for (var i = 3; i <= block_count; i++) {
					$('#block'+i).css('opacity', 0);
				}
			}
			$(window).scroll(function(){
				var scroll_value2 = $(window).scrollTop();
				if (content_state === 1) {
					for (var i = 3; i <= block_count; i++) {
						var block_top = $('#block'+(i-1)).offset().top;
						if (scroll_value2 >= block_top) {
							$('#block'+i).animate({'opacity': 1}, 700, 'swing');
						}
					}
					if ($(window).height() + scroll_value2 >= $(document).height() - 100) {
						for (var i = 3; i <= block_count; i++) {
							$('#block'+i).animate({'opacity': 1}, 700, 'swing');
						}
					}
				}
			});
		}
	var last = $('#stage ul li').length;
	var number = 1;	
	var slide_set;
	var cafinet;
	var state;
	var stage = $('#stage');
	var stage_first = $('#stage ul li:first-child');
	var slide_control = $('#slide_control');
	var play_stop = $('#play_stop');
	$(window).load(function(){
		window_control();
		var stage_height = stage_first.find('img').height();
		stage.css('height', stage_height);
		var stage_width = stage_first.find('img').width();
		var slide_control_width = slide_control.innerWidth();
		slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});
	});
	$(window).resize(function(){
		window_control();
		var stage_height = stage_first.find('img').height();
		stage.css('height', stage_height);
		var stage_width = stage_first.find('img').width();
		var slide_control_width = slide_control.innerWidth();
		slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});	
	});
	stage_first.animate({opacity:1}, first_photo);
	for (var i = 1; i <= last; i++) {
		if (i == 1) {
			$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="images/active.png"/></span>');
		} else {
			$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="images/active.png"/></span>');
			$('#photo_'+i).css('opacity', 0.3);
		}
		$('#photo_'+i).css('width', '20px');
	}
	function slide_start (){
		slide_set = setInterval(function(){
			if (number == last) {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo);
				stage_first.animate({opacity:1}, change_photo);
				number = 1;
				$("#photo_1").animate({opacity:1}, change_photo);
				for (var i = 1; i <= last; i++) {
					if (i != number) {
						$("#photo_"+i).animate({opacity:0.3}, change_photo);
					}
				}
			} else {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo).next('li').animate({opacity:1}, change_photo);
				number++;
				$("#photo_"+number).animate({opacity:1}, change_photo);
				for (var i = 1; i <= last; i++) {
					if (i != number) {
						$("#photo_"+i).animate({opacity:0.3}, change_photo);
					}
				}
			}
		},slide_time);
		state = 1;
		play_stop.html('<img src="images/stop.png" alt="停止"/>');
	}
	function slide_stop (){
		clearInterval(slide_set);
		state = 0;
		play_stop.html('<img src="images/play.png" alt="再生"/>');
	}
	slide_start();
	$("[id^='photo_']").on('click', function(){ 
		var photo_id = $(this).attr('id');
		var id_slice = photo_id.slice(6);
		slide_stop();
		$('#stage ul li:not(:nth-child(' + id_slice + '))').animate({opacity:0}, change_photo_click); 
		$('#stage ul li:nth-child(' + id_slice + ')').animate({opacity:1}, change_photo_click);
		number = id_slice;
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.3}, change_photo_click);
			}
		}
	});	
	$('#prev_button').click(function(){
		slide_stop();
		if (number == 1) {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
			$('#stage ul li:nth-child(' + last + ')').animate({opacity:1}, change_photo_click);
			number = last;
		} else {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).prev('li').animate({opacity:1}, change_photo_click);
			number--;
		}
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.3}, change_photo_click);
			}
		}
	});
	$('#next_button').click(function(){
		slide_stop();
		if (number == last) {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
			stage_first.animate({opacity:1}, change_photo_click);
			number = 1;
		} else {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).next('li').animate({opacity:1}, change_photo_click);
			number++;
		}
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.3}, change_photo_click);
			}
		}
	});
	play_stop.on('click', function(){ 
		if(state == 1){
			slide_stop();
		} else if(state == 0){
			slide_start();
		}
	});		
});