"use strict";

function tabBlock(_obj){
	this.tabNav = _obj.tabNav;
	this.tabView = _obj.tabView;
	this.video = _obj.video;
	this.init();
}
tabBlock.prototype = {
	isMobile: !!navigator.userAgent.match(/mobile/i),
	init: function(){
		var self = this;
		this.tabNav.find('li').each(function(index,item){
			var poster = $(item).data('poster');
			var src = $(item).data('src');
			if(self.isMobile){
				self.tabView.remove();
				var video = $('<video class="video video-full video-media" data-multiple="1.878" poster="'+poster+'" width="100%" controls="controls"><source src="'+src+'.mp4" media="only screen and (min-device-width: 568px)"></source></video>');
				$(item).find('.img-wrap').html(video);
			}else{
				$(item).on('click',function(){
					self.video.find("source").each(function(){
						$(this).attr('src',src+'.'+$(this).data('type'));
						$(self.video).load();
					});
				})
			}
		});
	}
}

$('.video-full').each(function(){
	$(this).height($(this).width()/$(this).data('multiple'));
})
function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();
 
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};
function realFunc(){
    console.log("Success");
    $('.video-full').each(function(){
		$(this).height($(this).width()/$(this).data('multiple'));
	})
}
window.addEventListener('resize',throttle(realFunc,500,1000));

var listsEnterTimeout,listsLeaveTimeout;
$('.lists-view>.span4').each(function(index,item){
	// $(item).on('click',function(){
	// 	if($(this).hasClass('active')){
	// 		$(this).removeClass('active');
	// 	}else{
	// 		$('.lists-view>.span4').removeClass('active');
	// 		$(this).addClass('active');
	// 	}
	// })
	$(item).on('mouseenter',function(){
		clearTimeout(listsLeaveTimeout);
		listsEnterTimeout = setTimeout(function(){
			$('.lists-view>.span4').removeClass('active');
			$(item).addClass('active');
		},300)
	})
	$(item).on('mouseleave',function(){
		clearTimeout(listsEnterTimeout);
		listsLeaveTimeout = setTimeout(function(){
			$('.lists-view>.span4').removeClass('active');
		},500)
	})
})

$('.tab-block .tab-nav .tab-nav-item').each(function(index,item){
	$(this).on('click',function(){
		$('.tab-block').attr({
			class: 'tab-block tab-'+index
		});
		$(this).addClass('active').siblings().removeClass('active');
		var poster = $(this).data('poster');
		var src = $(this).data('src');
		$('.tab-block video').find("source").each(function(){
			$(this).attr('src',src+'.'+$(this).data('type'));
			$('.tab-block video').load();
		});
	});
});