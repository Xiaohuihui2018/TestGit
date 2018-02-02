;(function($){
    $.fn.carousel_ZSH=function(options){
       var $defaults={
            width:320,
            height:180,
            duration:2300,
            type:'fade',
            page:true,
            index:0,
            marquee:true,
            change:true
       }
       return this.each(function(){
        $this=$(this);
        var timer;
        var $opts=$.extend({},$defaults,options);
        $imgs_len=$opts.imgs.length;
        var $idxNow=0;
        //初始化
           function init(){
              if($opts.type=='fade'){
                $opts.marquee=false;
              }
              $this.css({width:$opts.width,height:$opts.height});
              var $html=$.map($opts.imgs,function(url){
                return '<li><img src="'+url+'"/></li>'
              }).join('');
              $('<ul/>').html($html).appendTo($this);
              if($opts.change==true){
                  $arrowl=$('<img/>').attr('src','img/arrowl.png').addClass('prev');        
                  $arrowr=$('<img/>').attr('src','img/arrowr.png').addClass('next');
                  $this.prepend($arrowl,$arrowr);
              }
              $this.addClass('carousel-ZSH');
              switch ($opts.type){
                    case 'horizontal':
                    $this.children('ul').css('width',$imgs_len*$opts.width).children('li').css('float','left');
                    console.log('水平');
                    autoRoll();
                    break;
                    case 'vertical':
                    //疑点
                    console.log('垂直');
                    autoRoll();
                    break;
                    default:
                    console.log('淡入淡出');
                    $('li').css('position','absolute');
                    $this.find('li').css({'left':0,'top':0}).slice(1).hide();
                    autoRoll();
                    break;
              }
           };
           init();
           //移入移出事件
           $this.on('mouseenter',function(){
                clearInterval(timer);
           }).on('mouseleave',function(){
                if($opts.type!='fade' && $opts.marquee==true){
                    $('li').last().remove();
                }
                autoRoll();
           });
           //前进后退
           if($opts.change==true){
                $('.next').click(function(){
                    //无缝点击
                    console.log($opts.marquee);
                    if($opts.marquee){
                        console.log('无缝');
                        $opts.index++;
                        if($opts.index==$imgs_len+1){
                            $opts.index=1;
                            if($opts.type=='horizontal'){
                               $this.find('ul').stop(true,true).css({'left':0,'right':'auto'});
                            }else{
                               $this.find('ul').stop(true,true).css({'top':0,'bottom':'auto'});
                            }
                        };
                        if($opts.type=='horizontal'){
                            $this.children('ul').stop(true,true).css('right','auto').animate({left:-$opts.index*$opts.width});
                        }else{
                            $this.children('ul').stop(true,true).css('bottom','auto').animate({top:-$opts.index*$opts.height});
                        };
                        if($opts.page==true){
                            if($opts.index==$imgs_len){
                                $('span').eq(0).addClass('active').siblings().removeClass('active');
                            }              
                            $('span').eq($opts.index).addClass('active').siblings().removeClass('active'); 
                        }    
                    }else{
                    //有缝点击及淡化切换
                        console.log('有缝');
                        $opts.index++;
                        if($opts.type=='fade'){
                            if($opts.index>=$imgs_len){
                               $opts.index=0;
                            };
                            $this.find('li').stop(true,true).eq($opts.index).fadeIn(1500).siblings().    fadeOut(1500);
                            //页码
                            if($opts.page==true){
                               $('span').eq($opts.index).addClass('active').siblings().removeClass(' active');
                            }
                        }else{
                               if($opts.index>=$imgs_len){
                                   $opts.index=0;
                               };
                               if($opts.type=='horizontal'){
                                   $this.children('ul').stop(true,true).css('right','auto').animate({left:-$opts.index*$opts.width}); 
                               }else{
                                   $this.children('ul').stop(true,true).css('bottom','auto').animate({top:-$opts.index*$opts.height});
                               }
                                 //页码
                               if($opts.page==true){
                                   $('span').eq($opts.index).addClass('active').siblings().removeClass('active');
                               };
                        }
                    }
                });
                $('.prev').click(function(){
                    //无缝点击
                    console.log($opts.marquee);
                    if($opts.marquee){
                        $opts.index--;
                        if($opts.index<0){
                            $opts.index=$imgs_len-1;
                            if($opts.type=='horizontal'){
                               $this.find('ul').stop(true,true).css('left',-$imgs_len*$opts.width);
                            }else{
                               $this.find('ul').stop(true,true).css('top',-$imgs_len*$opts.height);
                            }
                        };
                        if($opts.type=='horizontal'){
                            $this.children('ul').stop(true,true).animate({left:-$opts.index*$opts.width});
                        }else{
                            $this.children('ul').stop(true,true).animate({top:-$opts.index*$opts.height});
                        };
                        if($opts.page==true){             
                            $('span').eq($opts.index).addClass('active').siblings().removeClass('active'); 
                        }    
                    }else{
                    //有缝点击及淡化切换
                        console.log('有缝');
                        $opts.index--;
                        if($opts.type=='fade'){
                            if($opts.index<0){
                               $opts.index=$imgs_len-1;
                            };
                            $this.find('li').stop(true,true).eq($opts.index).fadeIn(1500).siblings().    fadeOut(1500);
                            //页码
                            if($opts.page==true){
                               $('span').eq($opts.index).addClass('active').siblings().removeClass(' active');
                            }
                        }else{
                               if($opts.index<0){
                                   $opts.index=$imgs_len-1;
                               };
                               if($opts.type=='horizontal'){
                                console.log('lll')
                                   $this.children('ul').stop(true,true).css('right','auto').animate({left:-$opts.index*$opts.width}); 
                               }else{
                                   $this.children('ul').stop(true,true).css('bottom','auto').animate({top:-$opts.index*$opts.height});
                               }
                                 //页码
                               if($opts.page==true){
                                   $('span').eq($opts.index).addClass('active').siblings().removeClass('active');
                               };
                        }
                    }
                });
           }
           // 滚动页码
           function pageShow(){
                if($opts.page==true){
                var $spans=$.map($opts.imgs,function(val,idx){
                    return '<span></span>';
                }).join('');
                
                $('<div/>').addClass('page').append($spans).appendTo($this).children().eq($opts.index).addClass('active').siblings().removeClass('active');
                }
           };
           pageShow();
           //轮播动画
           function autoRoll(){
                switch($opts.type){
                    //水平滚动两种方式
                    case 'horizontal':
                    if($opts.marquee==true){ 
                        clearInterval(timer);
                        $liCopy=$this.find('li').first().clone();
                        $this.find('ul').width(($imgs_len+1)*$opts.width).append($liCopy);
                        timer=setInterval(function(){
                           $opts.index++;
                           if($opts.index>=$imgs_len+1){
                             $this.find('ul').stop(true,true).css('left',0);
                              $opts.index=1;
                           };
                           $this.children('ul').stop(true,true).animate({left:-$opts.index*$opts.width});
                           //页码 
                           if($opts.page==true){
                                if($opts.index==$imgs_len){
                                 $('span').eq(0).addClass('active').siblings().removeClass('active');
                                }              
                                $('span').eq($opts.index).addClass('active').siblings().removeClass('active');   
                           }
                        }, $opts.duration);
                    }else{
                        clearInterval(timer);
                        timer=setInterval(function(){
                           $opts.index++;
                           if($opts.index>=$imgs_len){
                              $opts.index=0;
                           };
                           $this.children('ul').stop(true,true).animate({left:-$opts.index*$opts.width});
                            //页码
                           if($opts.page==true){
                              $('span').eq($opts.index).addClass('active').siblings().removeClass('active');
                           };
                        }, $opts.duration);
                    }
                    break;
                    //垂直滚动两种方式
                    case 'vertical':
                    if($opts.marquee==true){ 
                        clearInterval(timer);
                        $liCopy=$this.find('li').first().clone();
                        $this.find('ul').append($liCopy);
                        timer=setInterval(function(){
                           $opts.index++; 
                           if($opts.index>=$imgs_len+1){
                             $this.find('ul').stop(true,true).css('top',0);
                              $opts.index=1;
                           };    
                           //页码 
                           if($opts.page==true){
                                if($opts.index==$imgs_len){
                                 $('span').eq(0).addClass('active').siblings().removeClass('active');
                                }              
                                $('span').eq($opts.index).addClass('active').siblings().removeClass('active');   
                           }
                           $this.children('ul').stop(true,true).animate({top:-$opts.index*$opts.height},860);
                        }, $opts.duration);
                    }else{
                        clearInterval(timer);
                        timer=setInterval(function(){
                           $opts.index++;
                           if($opts.index>=$imgs_len){
                              $opts.index=0;
                           };
                           $this.children('ul').stop(true,true).animate({top:-$opts.index*$opts.height});
                            //页码
                           if($opts.page==true){
                              $('span').eq($opts.index).addClass('active').siblings().removeClass('active');
                           };
                        }, $opts.duration);
                    }
                    break;
                    //淡入淡出
                    default :
                        clearInterval(timer);
                        timer=setInterval(function(){
                          $opts.index++;
                           if($opts.index>=$imgs_len){
                              $opts.index=0;
                           };
                           $this.find('li').stop(true,true).eq($opts.index).fadeIn(1500).siblings().fadeOut(1500);
                           //页码
                           if($opts.page==true){
                              $('span').eq($opts.index).addClass('active').siblings().removeClass('active');
                           }
                        }, $opts.duration);  
                }   
           };  
       }); 
    }
    
})(jQuery);