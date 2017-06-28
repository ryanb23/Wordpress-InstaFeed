
var sbi_js_exists = (typeof sbi_js_exists !== 'undefined') ? true : false;
var export_table_data = new Array();
var export_table_header_data = new Array();
var export_file_name = "export";
var myChart;
if(!sbi_js_exists){

    "function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
    (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.sbi_owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.sbi_owl)a.sbi_owl.hasOwnProperty(d)&&(e+=a.sbi_owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
        (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("sbi_owl-originalStyles",this.$elem.attr("style"));this.$elem.data("sbi_owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
        this.wrapItems();this.$sbi_owlItems=this.$elem.find(".sbi_owl-item");this.$sbi_owlWrapper=this.$elem.find(".sbi_owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.sbi_owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
    (this.options.autoPlay=5E3);this.play();this.$elem.find(".sbi_owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
        [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
        g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="sbi_owl-wrapper">').wrap('<div class="sbi_owl-item"></div>');this.$elem.find(".sbi_owl-wrapper").wrap('<div class="sbi_owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".sbi_owl-wrapper-outer");this.$elem.css("display","block")},
        baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
            !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
        a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
        !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
            this,b=0,e=a.itemsAmount-a.options.items;a.$sbi_owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("sbi_owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("sbi_owl-roundPages",b)})},appendWrapperSizes:function(){this.$sbi_owlWrapper.css({width:this.$sbi_owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
            this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$sbi_owlItems[e]),
            c=c.data("sbi_owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.sbi_owlControls=f('<div class="sbi_owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="sbi_owl-buttons"/>');a.sbi_owlControls.append(b);a.buttonPrev=
            f("<div/>",{"class":"sbi_owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"sbi_owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstSATURACart.sbi_owlControls mousedown.sbi_owlControls",'div[class^="sbi_owl"]',function(a){a.preventDefault()});b.on("touchend.sbi_owlControls mouseup.sbi_owlControls",'div[class^="sbi_owl"]',function(b){b.preventDefault();f(this).hasClass("sbi_owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
            f('<div class="sbi_owl-pagination"/>');a.sbi_owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.sbi_owlControls mouseup.sbi_owlControls",".sbi_owl-page",function(b){b.preventDefault();Number(f(this).data("sbi_owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("sbi_owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
        (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"sbi_owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"sbi_owl-numbers":""}),d.append(g),d.data("sbi_owl-page",b===c?e:c),d.data("sbi_owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".sbi_owl-page").each(function(){f(this).data("sbi_owl-roundPages")===
        f(a.$sbi_owlItems[a.currentItem]).data("sbi_owl-roundPages")&&(a.paginationWrapper.find(".sbi_owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
        this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.sbi_owlControls&&(this.options.items>=this.itemsAmount?this.sbi_owlControls.hide():this.sbi_owlControls.show())},destroyControls:function(){this.sbi_owlControls&&this.sbi_owlControls.remove()},next:function(a){if(this.isTransition)return!1;
            this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
            this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.sbi_owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
            !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
            c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
            this.sbi_owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.sbi_owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
        checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$sbi_owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$sbi_owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$sbi_owlWrapper.css(this.addCssSpeed(a))},
        addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
        a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$sbi_owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$sbi_owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$sbi_owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.sbi_owl mousedown.sbi_owl","touchmove.sbi_owl mousemove.sbi_owl","touchend.sbi_owl touchcancel.sbi_owl mouseup.sbi_owl"]:
            !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.sbi_owl","touchmove.sbi_owl","touchend.sbi_owl touchcancel.sbi_owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.sbi_owl","mousemove.sbi_owl","mouseup.sbi_owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.sbi_owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
        gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
            "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.sbi_owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
            function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$sbi_owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.sbi_owl.dragDirection="left":d.sbi_owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
                a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".sbi_owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
                !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$sbi_owlWrapper.hasClass("grabbing")||d.$sbi_owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
            a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
            (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("sbi_owl.next",function(){a.next()});a.$elem.on("sbi_owl.prev",function(){a.prev()});a.$elem.on("sbi_owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("sbi_owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("sbi_owl.goTo",function(b,e){a.goTo(e)});
            a.$elem.on("sbi_owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$sbi_owlItems[a]),"loaded"!==b.data("sbi_owl-loaded")&&(e=b.data("sbi_owl-item"),c=b.find(".lazysbi_owl"),"string"!==typeof c.data("src")?
            b.data("sbi_owl-loaded","loaded"):(void 0===b.data("sbi_owl-loaded")&&(c.hide(),b.addClass("loading").data("sbi_owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("sbi_owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
            [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$sbi_owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
            100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$sbi_owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$sbi_owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$sbi_owlItems[a]).addClass("active");
            this.sbi_owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="sbi_owl-"+a+"-out";this.inClass="sbi_owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$sbi_owlItems.eq(a.currentItem),d=a.$sbi_owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$sbi_owlWrapper.addClass("sbi_owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
        "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$sbi_owlWrapper.removeClass("sbi_owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},sbi_owlStatus:function(){this.sbi_owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,sbi_owlItems:this.$sbi_owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".sbi_owl sbi_owl mousedown.disableTextSelect");
            f(k).off(".sbi_owl sbi_owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$sbi_owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.sbi_owlControls&&this.sbi_owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("sbi_owl-originalStyles")||"").attr("class",this.$elem.data("sbi_owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
            a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.sbi_owlCarousel=function(a){return this.each(function(){if(!0===
        f(this).data("sbi_owl-init"))return!1;f(this).data("sbi_owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"sbi_owlCarousel",b)})};f.fn.sbi_owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
        responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"sbi_owl-carousel",theme:"sbi_owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

    /* JavaScript Linkify - v0.3 - 6/27/2009 - http://benalman.com/projects/javascript-linkify/ */
    window.sbiLinkify=(function(){var k="[a-z\\d.-]+://",h="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",c="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",n="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",f="(?:"+c+n+"|"+h+")",o="(?:[;/][^#?<>\\s]*)?",e="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",d="\\b"+k+"[^<>\\s]+",a="\\b"+f+o+e+"(?!\\w)",m="mailto:",j="(?:"+m+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+f+e+"(?!\\w)",l=new RegExp("(?:"+d+"|"+a+"|"+j+")","ig"),g=new RegExp("^"+k,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},i={callback:function(q,p){return p?'<a href="'+p+'" title="'+p+'" target="_blank">'+q+"</a>":q},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(u,z){z=z||{};var w,v,A,p,x="",t=[],s,E,C,y,q,D,B,r;for(v in i){if(z[v]===undefined){z[v]=i[v]}}while(w=l.exec(u)){A=w[0];E=l.lastIndex;C=E-A.length;if(/[\/:]/.test(u.charAt(C-1))){continue}do{y=A;r=A.substr(-1);B=b[r];if(B){q=A.match(new RegExp("\\"+B+"(?!$)","g"));D=A.match(new RegExp("\\"+r,"g"));if((q?q.length:0)<(D?D.length:0)){A=A.substr(0,A.length-1);E--}}if(z.punct_regexp){A=A.replace(z.punct_regexp,function(F){E-=F.length;return""})}}while(A.length&&A!==y);p=A;if(!g.test(p)){p=(p.indexOf("@")!==-1?(!p.indexOf(m)?"":m):!p.indexOf("irc.")?"irc://":!p.indexOf("ftp.")?"ftp://":"http://")+p}if(s!=C){t.push([u.slice(s,C)]);s=E}t.push([A,p])}t.push([u.substr(s)]);for(v=0;v<t.length;v++){x+=z.callback.apply(window,t[v])}return x||u}})();

    //Shim for "fixing" IE's lack of support (IE < 9) for applying slice on host objects like NamedNodeMap, NodeList, and HTMLCollection) https://github.com/stevenschobert/instafeed.js/issues/84
    (function(){"use strict";var e=Array.prototype.slice;try{e.call(document.documentElement)}catch(t){Array.prototype.slice=function(t,n){n=typeof n!=="undefined"?n:this.length;if(Object.prototype.toString.call(this)==="[object Array]"){return e.call(this,t,n)}var r,i=[],s,o=this.length;var u=t||0;u=u>=0?u:o+u;var a=n?n:o;if(n<0){a=o+n}s=a-u;if(s>0){i=new Array(s);if(this.charAt){for(r=0;r<s;r++){i[r]=this.charAt(u+r)}}else{for(r=0;r<s;r++){i[r]=this[u+r]}}}return i}}})()

    //IE8 also doesn't offer the .bind() method triggered by the 'sortBy' property. Copy and paste the polyfill offered here:
    if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i}}

    /*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
    (function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this)});


    /* Lightbox v2.7.1 by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/ - Heavily modified specifically for this plugin */
    (function() {

        var a = jQuery,
            b = function() {
                function a() {
                    this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
                }
                return a.prototype.albumLabel = function(a, b) {
                    return a + " / " + b
                }, a
            }(),
            c = function() {
                function b(a) {
                    this.options = a, this.album = [], this.currentImageIndex = void 0, this.init()
                }
                return b.prototype.init = function() {
                    this.enable(), this.build()
                }, b.prototype.enable = function() {
                    var b = this;
                    a("body").on("click", "a[data-lightbox-sbi]", function(c) {
                        return b.start(a(c.currentTarget)), !1
                    })
                }, b.prototype.build = function() {
                    var b = this;
                    a("<div id='sbi_lightboxOverlay' class='sbi_lightboxOverlay'></div><div id='sbi_lightbox' class='sbi_lightbox'><div class='sbi_lb-outerContainer'><div class='sbi_lb-container'><video class='sbi_video' src='' poster='' controls></video><img class='sbi_lb-image' src='' /><div class='sbi_lb-nav'><a class='sbi_lb-prev' href='#' ></a><a class='sbi_lb-next' href='#' ></a></div><div class='sbi_lb-loader'><a class='sbi_lb-cancel'></a></div></div></div><div class='sbi_lb-dataContainer'><div class='sbi_lb-data'><div class='sbi_lb-details'><span class='sbi_lb-caption'></span><span class='sbi_lb-number'></span><div class='sbi_lightbox_action sbi_share'><a href='JavaScript:void(0);'><i class='fa fa-share'></i>Share</a><p class='sbi_lightbox_tooltip sbi_tooltip_social'><a href='' target='_blank' id='sbi_facebook_icon'><i class='fa fa-facebook-square'></i></a><a href='' target='_blank' id='sbi_twitter_icon'><i class='fa fa-twitter'></i></a><a href='' target='_blank' id='sbi_google_icon'><i class='fa fa-google-plus'></i></a><a href='' target='_blank' id='sbi_linkedin_icon'><i class='fa fa-linkedin'></i></a><a href='' id='sbi_pinterest_icon' target='_blank'><i class='fa fa-pinterest'></i></a><a href='' id='sbi_email_icon' target='_blank'><i class='fa fa-envelope'></i></a><i class='fa fa-play fa-rotate-90'></i></p></div><div class='sbi_lightbox_action sbi_instagram'><a href='https://instagram.com/' target='_blank'><i class='fa fa-instagram'></i>Instagram</a></div><div id='sbi_mod_link' class='sbi_lightbox_action'><a href='JavaScript:void(0);'><i class='fa fa-times'></i>Hide photo (admin)</a><p id='sbi_mod_box' class='sbi_lightbox_tooltip'>Add this ID to the plugin's <strong>Hide Photos</strong> setting: <span id='sbi_photo_id'></span><i class='fa fa-play fa-rotate-90'></i></p></div></div><div class='sbi_lb-closeContainer'><a class='sbi_lb-close'></a></div></div></div></div>").appendTo(a("body")), this.$lightbox = a("#sbi_lightbox"), this.$overlay = a("#sbi_lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".sbi_lb-outerContainer"), this.$container = this.$lightbox.find(".sbi_lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                        return b.end(), !1
                    }), jQuery(document).on('click', function(event, b, c) {
                        //Fade out the lightbox if click anywhere outside of the two elements defined below
                        if (!jQuery(event.target).closest('.sbi_lb-outerContainer').length) {
                            if (!jQuery(event.target).closest('.sbi_lb-dataContainer').length) {
                                //Fade out lightbox
                                jQuery('#sbi_lightboxOverlay, #sbi_lightbox').fadeOut();
                                //Pause video
                                if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                            }
                        }
                    }), this.$lightbox.hide(),
                        jQuery('#sbi_lightboxOverlay').on("click", function(c) {
                            if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                            return "sbi_lightbox" === a(c.target).attr("id") && b.end(), !1
                        }), this.$lightbox.find(".sbi_lb-prev").on("click", function() {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".sbi_lb-container").on("swiperight", function() {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".sbi_lb-next").on("click", function() {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".sbi_lb-container").on("swipeleft", function() {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".sbi_lb-loader, .sbi_lb-close").on("click", function() {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.end(), !1
                    })
                }, b.prototype.start = function(b) {
                    function c(a) {
                        d.album.push({
                            link: a.attr("href"),
                            title: a.attr("data-title") || a.attr("title"),
                            video: a.attr("data-video"),
                            id: a.attr("data-id"),
                            url: a.attr("data-url"),
                            user: a.attr("data-user"),
                            avatar: a.attr("data-avatar"),
                            is_red: a.attr("data-red")
                        })
                    }
                    var d = this,
                        e = a(window);
                    e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
                        visibility: "hidden"
                    }), this.sizeOverlay(), this.album = [];
                    var f, g = 0,
                        h = b.attr("data-lightbox-sbi");
                    if (h) {
                        f = a(b.prop("tagName") + '[data-lightbox-sbi="' + h + '"]');
                        for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
                    } else if ("lightbox" === b.attr("rel")) c(b);
                    else {
                        f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
                        for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
                    }
                    var k = e.scrollTop() + this.options.positionFromTop,
                        l = e.scrollLeft();
                    this.$lightbox.css({
                        top: k + "px",
                        left: l + "px"
                    }).fadeIn(this.options.fadeDuration), this.changeImage(g)
                    if(this.album[this.currentImageIndex].is_red == 1){
                        jQuery("#sbi_lightbox .sbi_lb-outerContainer").addClass("red_border");
                    }else
                        jQuery("#sbi_lightbox .sbi_lb-outerContainer").removeClass("red_border");
                }, b.prototype.changeImage = function(b) {
                    var c = this;
                    this.disableKeyboardNav();
                    var d = this.$lightbox.find(".sbi_lb-image");
                    this.$overlay.fadeIn(this.options.fadeDuration), a(".sbi_lb-loader").fadeIn("slow"), this.$lightbox.find(".sbi_lb-image, .sbi_lb-nav, .sbi_lb-prev, .sbi_lb-next, .sbi_lb-dataContainer, .sbi_lb-numbers, .sbi_lb-caption").hide(), this.$outerContainer.addClass("animating");
                    var e = new Image;
                    e.onload = function() {
                        var f, g, h, i, j, k, l;
                        d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20, i = k - c.containerTopPadding - c.containerBottomPadding - 150, (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
                    }, e.src = this.album[b].link, this.currentImageIndex = b
                }, b.prototype.sizeOverlay = function() {
                    this.$overlay.width(a(window).width()).height(a(document).height())
                }, b.prototype.sizeContainer = function(a, b) {
                    function c() {
                        d.$lightbox.find(".sbi_lb-dataContainer").width(g), d.$lightbox.find(".sbi_lb-prevLink").height(h), d.$lightbox.find(".sbi_lb-nextLink").height(h), d.showImage()
                    }
                    var d = this,
                        e = this.$outerContainer.outerWidth(),
                        f = this.$outerContainer.outerHeight(),
                        g = a + this.containerLeftPadding + this.containerRightPadding,
                        h = b + this.containerTopPadding + this.containerBottomPadding;
                    e !== g || f !== h ? this.$outerContainer.animate({
                        width: g,
                        height: h
                    }, this.options.resizeDuration, "swing", function() {
                        c()
                    }) : c()
                }, b.prototype.showImage = function() {
                    this.$lightbox.find(".sbi_lb-loader").hide(), this.$lightbox.find(".sbi_lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                }, b.prototype.updateNav = function() {
                    var a = !1;
                    try {
                        document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                    } catch (b) {}
                    this.$lightbox.find(".sbi_lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".sbi_lb-prev, .sbi_lb-next").css("opacity", "1"), this.$lightbox.find(".sbi_lb-prev, .sbi_lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".sbi_lb-prev").show(), a && this.$lightbox.find(".sbi_lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".sbi_lb-next").show(), a && this.$lightbox.find(".sbi_lb-next").css("opacity", "1"))))
                }, b.prototype.updateDetails = function() {
                    var b = this;

                    /** NEW PHOTO ACTION **/
                    //Switch video when either a new popup or navigating to new one
                    if( sbi_supports_video() ){
                        jQuery('#sbi_lightbox').removeClass('sbi_video_lightbox');
                        if( this.album[this.currentImageIndex].video.length ){
                            jQuery('#sbi_lightbox').addClass('sbi_video_lightbox');
                            jQuery('.sbi_video').attr({
                                'src' : this.album[this.currentImageIndex].video,
                                'poster' : this.album[this.currentImageIndex].link,
                                'autoplay' : 'true'
                            });
                        }
                    }
                    jQuery('#sbi_lightbox .sbi_instagram a').attr('href', this.album[this.currentImageIndex].url);
                    jQuery('#sbi_lightbox .sbi_lightbox_tooltip').hide();
                    jQuery('#sbi_lightbox #sbi_mod_box').find('#sbi_photo_id').text( this.album[this.currentImageIndex].id );
                    //Change social media sharing links on the fly
                    jQuery('#sbi_lightbox #sbi_facebook_icon').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + this.album[this.currentImageIndex].url+'&t=Text');
                    jQuery('#sbi_lightbox #sbi_twitter_icon').attr('href', 'https://twitter.com/home?status='+this.album[this.currentImageIndex].url+' ' + this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_google_icon').attr('href', 'https://plus.google.com/share?url='+this.album[this.currentImageIndex].url);
                    jQuery('#sbi_lightbox #sbi_linkedin_icon').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url='+this.album[this.currentImageIndex].url+'&title='+this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_pinterest_icon').attr('href', 'https://pinterest.com/pin/create/button/?url='+this.album[this.currentImageIndex].url+'&media='+this.album[this.currentImageIndex].link+'&description='+this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_email_icon').attr('href', 'mailto:?subject=Instagram&body='+this.album[this.currentImageIndex].title+' '+this.album[this.currentImageIndex].url);
                    if(this.album[this.currentImageIndex].is_red == 1){
                        jQuery("#sbi_lightbox .sbi_lb-outerContainer").addClass("red_border");
                    }else
                        jQuery("#sbi_lightbox .sbi_lb-outerContainer").removeClass("red_border");
                    //Add links to the caption
                    var sbiLightboxCaption = this.album[this.currentImageIndex].title,
                        hashRegex = /(^|\s)#(\w[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC+0-9]+\w)/gi,
                        tagRegex = /[@]+[A-Za-z0-9-_]+/g;

                    (sbiLightboxCaption) ? sbiLightboxCaption = sbiLinkify(sbiLightboxCaption) : sbiLightboxCaption = '';

                    //Link #hashtags
                    function sbiReplaceHashtags(hash){
                        //Remove white space at beginning of hash
                        var replacementString = jQuery.trim(hash);
                        //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
                        if ( /^#[0-9A-F]{6}$/i.test( replacementString ) ){
                            return replacementString;
                        } else {
                            return ' <a href="https://instagram.com/explore/tags/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                        }
                    }
                    sbiLightboxCaption = sbiLightboxCaption.replace( hashRegex , sbiReplaceHashtags );

                    //Link @tags
                    function sbiReplaceTags(tag){
                        var replacementString = jQuery.trim(tag);
                        return ' <a href="https://instagram.com/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                    }
                    sbiLightboxCaption = sbiLightboxCaption.replace( tagRegex , sbiReplaceTags );


                    "undefined" != typeof sbiLightboxCaption && "" !== sbiLightboxCaption && this.$lightbox.find(".sbi_lb-caption").html('<a class="sbi_lightbox_username" href="https://instagram.com/'+this.album[this.currentImageIndex].user+'" target="_blank"><img src="'+this.album[this.currentImageIndex].avatar+'" /><p>@'+this.album[this.currentImageIndex].user + '</p></a> ' + sbiLightboxCaption).fadeIn("fast"), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".sbi_lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".sbi_lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".sbi_lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                        return b.sizeOverlay()
                    })
                }, b.prototype.preloadNeighboringImages = function() {
                    if (this.album.length > this.currentImageIndex + 1) {
                        var a = new Image;
                        a.src = this.album[this.currentImageIndex + 1].link
                    }
                    if (this.currentImageIndex > 0) {
                        var b = new Image;
                        b.src = this.album[this.currentImageIndex - 1].link
                    }
                }, b.prototype.enableKeyboardNav = function() {
                    a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
                }, b.prototype.disableKeyboardNav = function() {
                    a(document).off(".keyboard")
                }, b.prototype.keyboardAction = function(a) {

                    var KEYCODE_ESC        = 27;
                    var KEYCODE_LEFTARROW  = 37;
                    var KEYCODE_RIGHTARROW = 39;

                    var keycode = event.keyCode;
                    var key     = String.fromCharCode(keycode).toLowerCase();
                    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');
                        this.end();
                    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                        if (this.currentImageIndex !== 0) {
                            this.changeImage(this.currentImageIndex - 1);
                        } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(this.album.length - 1);
                        }

                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');

                    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                        if (this.currentImageIndex !== this.album.length - 1) {
                            this.changeImage(this.currentImageIndex + 1);
                        } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(0);
                        }

                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');

                    }

                }, b.prototype.end = function() {
                    this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
                        visibility: "visible"
                    })
                }, b
            }();
        a(function() {
            {
                var a = new b;
                new c(a)
            }
        })
    }).call(this);
    //Checks whether browser support HTML5 video element
    function sbi_supports_video() {
        return !!document.createElement('video').canPlayType;
    }

    var user_ids_array=[];var created_times=[];var tmp_post_array={};var exact_times={};
    var tmp_datasets = {};;
    var brands_array = [];//for product_influencer
    var post_style_info = {};
    var post_style_global = {users:0,posts:0,likes:0,reps:0,views:0,ints:0};
    var post_style_influencer_info={};
    var post_style_influencer_global={brands:0,posts:0,likes:0,reps:0,views:0,ints:0};
    var post_sytle_view_data = {};
    // var ajax_video_url = "http://web2responsive.com/mediascrap/scrap.php";
    var ajax_video_url = "/wp-content/plugins/instagram-feed-pro/scrap.php";
    var sbi_item_array =[];

    //Start plugin code
    function sbi_init(){
        var sbiTouchDevice = false;
        if (sbiIsTouchDevice() === true) sbiTouchDevice = true;

        function sbiIsTouchDevice() {
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }

        // used in case user name is used instead of id
        function sbiSetUserApiUrl(user_id, at, before, extra, handleData) {
                var url = 'https://api.instagram.com/v1/users/search?q=' + user_id + '&access_token=' + at;
                jQuery.ajax({
                        method: "GET",
                        url: url,
                        dataType: "jsonp",
                        success: function(data) {
                            var matchingID = data.data[0].id;
                            jQuery.each(data.data, function() {
                                if(this.username === user_id){
                                    matchingID = this.id;
                                }
                            });

                            var apiCall = "https://api.instagram.com/v1/users/"+ matchingID + before + "?access_token=" + at + extra;
                            handleData(apiCall);
                        }
                });
            }

        var $i = 0, //Used for iterating lightbox
            sbi_time = 0, //might be added to if includewords is used on the page
            numIncludewords = 0; //keep track of includewords feeds on page

        sbiCreatePage( function() {
            // using this code as the callback to make sure we know if includewords is being used
            // and we need to stagger the loading of the feeds
            jQuery('#sb_instagram.sbi').each(function () {
                var feedOptions = JSON.parse( this.getAttribute('data-options') );
                if( feedOptions.includewords.length > 0 ) {
                    numIncludewords++;
                }
            });
        });
        //Wrapped in a function to delay the feeds being loaded until includewords feeds are detected
        function sbiCreatePage(_callback) {

            // forces the function to wait until the includewords detecting code is run
            _callback();

            jQuery('#sb_instagram.sbi').each(function(){ //Ends on line 1676

                var var_this = this,
                    feedOptions = JSON.parse( var_this.getAttribute('data-options') );

                setTimeout( function() {
                    sbiCreateFeed(var_this,feedOptions);
                },sbi_time );

                // stagger the loading of each feed by two seconds to help with includewords issue
                if( numIncludewords > 0 ){
                    sbi_time += 2000;
                }
                function sbiCreateFeed(var_this,feedOptions) {

                    $i = $i+2;
                    var imagesArrCount = 0;

                    var $self = jQuery(var_this),
                        $target = $self.find('#sbi_images'),
                        $loadBtn = $self.find("#sbi_load .sbi_load_btn"),
                        imgRes = 'standard_resolution',
                        cols = parseInt( var_this.getAttribute('data-cols') ),
                        likes = var_this.getAttribute('data-likes'),
                        percentage = var_this.getAttribute('data-percentage'),
                        marcas = var_this.getAttribute('data-marcas'),
                        todos = var_this.getAttribute('data-todos'),
                        rank = var_this.getAttribute('data-rank'),
                        //Convert styles JSON string to an object
                        showcaption = '',
                        showlikes = '',
                        getType = feedOptions.type,
                        sortby = 'none',
                        hovercolorstyles = '',
                        hovertextstyles = '',
                        img_full = '',
                        num = var_this.getAttribute('data-num'),
                        sbiDays = feedOptions.sbiMediaDays,
                        user_id = var_this.getAttribute('data-id'),
                        posts_arr = [],
                        $header = '',
                        disablelightbox = feedOptions.disablelightbox,
                        morePosts = [], //Used to determine whether to show the Load More button when displaying posts from more than one id/hashtag. If one of the ids/hashtags has more posts then still show button.
                        hidePhotos = sb_instagram_js_options.sb_instagram_hide_photos.replace(/ /g,'').split(","),
                        blockUsers = sb_instagram_js_options.sb_instagram_block_users.replace(/ /g,'').split(","),
                        includeWords = feedOptions.includewords.replace(/ /g,'').split(","), //Explode into an array
                        post_style = feedOptions.post_style,
                        excludeWords = feedOptions.excludewords.replace(/ /g,'').split(","), //Explode into an array
                        sbiCacheExists = feedOptions.sbiCacheExists,
                        sbiHeaderCache = feedOptions.sbiHeaderCache,
                        media = feedOptions.media,
                        sbiShowAvatar = feedOptions.sbiShowAvatar,
                        sbiShowHighlight = feedOptions.sbiShowHighlight,
                        sbiCustomAnalysis = feedOptions.sbiCustomAnalysis,
                        sbiShowLabel = parseInt(feedOptions.sbiShowLabel),
                        sbiFilterMedia = parseInt(feedOptions.sbiFilterMedia);

                    var CostArr = JSON.parse( var_this.getAttribute('data-cost-arr'));

                    var sbiSinceTime = null;
                    if(!isNaN(sbiDays) && sbiDays)
                        sbiSinceTime = Math.floor(Date.now() / 1000 - 24*60*60*sbiDays);
                    console.log(sbiSinceTime);
                    //If they're not defined because they're not included in the page source code for some reason then set them to be empty
                    if(typeof hidePhotos === 'undefined') hidePhotos = []; //If the hidePhotos array is empty then set it to be an empty array, otherwise .push throws an error
                    if(typeof blockUsers === 'undefined') blockUsers = [];

                    //Remove the sbi_ prefix from the start of each ID
                    for(var i=0; i < hidePhotos.length; i++) {
                        hidePhotos[i] = hidePhotos[i].replace(/sbi_/g, '');
                    }


                    if(feedOptions.disablecache == 'true'){
                        feedOptions.disablecache = true;
                    } else {
                        feedOptions.disablecache = true;
                    }

                    if( feedOptions.showcaption == 'false' || feedOptions.showcaption == '' ) showcaption = 'style="display: none;"';
                    if( feedOptions.showlikes == 'false' || feedOptions.showlikes == '' ) showlikes = 'display: none;';
                    if( feedOptions.sortby !== '' ) sortby = feedOptions.sortby;
                    if( feedOptions.hovercolor !== '0,0,0' ) hovercolorstyles = 'style="background: rgba('+feedOptions.hovercolor+',0.85)"';
                    if( feedOptions.hovertextcolor !== '0,0,0' ) hovertextstyles = 'style="color: rgba('+feedOptions.hovertextcolor+',1)"';


                    switch( var_this.getAttribute('data-res') ) {
                        case 'auto':
                            var feedWidth = $self.innerWidth(),
                                colWidth = $self.innerWidth() / cols;

                            //Check if page width is less than 640. If it is then use the script above
                            var sbiWindowWidth = jQuery(window).width();
                            if( sbiWindowWidth < 640 ){
                                //Need this for mobile so that image res is right on mobile, as the number of cols isn't always accurate on mobile as they are changed using CSS
                                if( feedWidth < 640 && $self.is('.sbi_col_1') ) colWidth = 480; //Use full size images - this is for carousel as it's always set to sbi_col_1
                                if( feedWidth < 640 && $self.is('.sbi_col_3, .sbi_col_4, .sbi_col_5, .sbi_col_6') ) colWidth = 300; //Use medium images
                                if( feedWidth < 640 && $self.is('.sbi_col_7, .sbi_col_8, .sbi_col_9, .sbi_col_10') ) colWidth = 100; //Use thumbnail images
                                if( (feedWidth > 320 && feedWidth < 480) && sbiWindowWidth < 480 ) colWidth = 480; //Use full size images
                                if( feedWidth < 320 && sbiWindowWidth < 480 ) colWidth = 300; //Use medium size images
                                colWidth = 100; //custom code by J
                            }

                            if( colWidth < 150 ){
                                imgRes = 'thumbnail';
                            } else if( colWidth < 320 ){
                                imgRes = 'low_resolution';
                            } else {
                                imgRes = 'standard_resolution';
                            }

                            //If the feed is hidden (eg; in a tab) then the width is returned as 100, and so auto set the res to be medium to cover most bases
                            if( feedWidth <= 100 ) imgRes = 'low_resolution';
                            break;
                        case 'thumb':
                            imgRes = 'thumbnail';
                            break;
                        case 'medium':
                            imgRes = 'low_resolution';
                            break;
                        default:
                            imgRes = 'standard_resolution';
                    }
                    // console.log(getType);
                    //Split comma separated hashtags into array
                    if(getType == 'hashtag'){
                        var hashtags_arr = feedOptions.hashtag.replace(/ /g,'').split(",");
                        var looparray = hashtags_arr;
                    } else if(getType == 'user'){
                        var ids_arr = user_id.replace(/ /g,'').split(",");
                        var looparray = ids_arr;
                    } else if(getType == 'location'){
                        var locations_arr = feedOptions.location.replace(/ /g,'').split(",");
                        var looparray = locations_arr;
                    } else if(getType == 'coordinates'){
                        var coords_arr = feedOptions.coordinates.replace(/ /g,'').split("),(");
                        var looparray = coords_arr;
                    } else if(getType == 'single') {
                        var single_arr = feedOptions.single.replace(/sbi_/g, '');
                        single_arr = single_arr.replace(' ', '').split(",");

                        var looparray = single_arr;
                    } else {
                        var looparray = [''];
                    }


                    //START FEED
                    var apiURLs = [],
                        apiCall = '';
                    // console.log(looparray);
                    //Loop through ids or hashtags
                    jQuery.each( looparray, function( index, entry ) {

                        //Create an array of API URLs to pass to the fetchData function
                        if(getType == 'user'){
                            fetchCount = num;
                            if(post_style == 'product' || post_style == 'product_influencer')
                                fetchCount = 33;
                            apiCall = "https://api.instagram.com/v1/users/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count="+fetchCount;
                        } else if(getType == 'coordinates') {

                            //If the entry is coords
                            //Split the lat and long into pieces and place in the URL
                            entry = entry.replace(/[()]/g, '');
                            entryArr = entry.split(",");
                            var lat = entryArr[0];
                            var lng = entryArr[1];
                            if( typeof entryArr[2] === 'undefined' ){
                                var dis = '1000';
                            } else {
                                var dis = entryArr[2];
                            }
                            apiCall = "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+lng+"&distance="+dis+"&access_token=" + sb_instagram_js_options.sb_instagram_at+"&count="+num+"&max_timestamp=";

                        } else if(getType == 'location') {
                            apiCall = "https://api.instagram.com/v1/locations/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count="+num;
                        } else if(getType == 'liked') {
                            apiCall = "https://api.instagram.com/v1/users/self/media/liked?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count="+num;
                        } else if(getType == 'single') {
                            apiCall = "https://api.instagram.com/v1/media/"+ entry +"?access_token=" + sb_instagram_js_options.sb_instagram_at;
                        } else {
                            apiCall = "https://api.instagram.com/v1/tags/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count="+num;
                        }
                        apiURLs.push( apiCall );

                    }); //End hashtag array loop


                    //Create an object of the settings so that they can be passed to the buildFeed function
                    var sbiSettings = {num:num, getType:getType, user_id:user_id, cols:cols, likes:likes,percentage:percentage,todos:todos,marcas:marcas,rank:rank,imgRes:imgRes, sortby:sortby, showcaption:showcaption, showlikes:showlikes, disablelightbox:disablelightbox, feedOptions:feedOptions, hidePhotos:hidePhotos, blockUsers:blockUsers, excludeWords:excludeWords, includeWords:includeWords, looparray: looparray,post_style:post_style,since_time:sbiSinceTime};


                    var sbi_cache_string_include = '';
                    var sbi_cache_string_exclude = '';

                    if( includeWords.length > 0 ){
                        jQuery.each( includeWords, function( index, word ) {
                            sbi_include_word = word.replace(/ /g,"").replace(/#/g,"");
                            sbi_cache_string_include += sbi_include_word.substring(0, 3);
                        });
                    }

                    if( excludeWords.length > 0 ){
                        jQuery.each( excludeWords, function( index, word ) {
                            sbi_exclude_word = word.replace(/ /g,"").replace(/#/g,"");
                            sbi_cache_string_exclude += sbi_exclude_word.substring(0, 3);
                        });
                    }

                    //Figure out how long the first part of the caching string should be
                    var sbi_cache_string_include_length = sbi_cache_string_include.length;
                    var sbi_cache_string_exclude_length = sbi_cache_string_exclude.length;
                    var sbi_cache_string_length = 40 - Math.min(sbi_cache_string_include_length + sbi_cache_string_exclude_length, 20);


                    var transientName = 'sbi_';

//                    looparray = looparray.join().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
//                    transientName += looparray.substring(0, sbi_cache_string_length);

                    //calculate sum of ids to get transientName
                    var t_sum = 0;
                    for(var i=0;i<looparray.length;i++){
                        t_sum += parseInt(looparray[i]);
                    }

                    transientName += t_sum.toString().substring(0,sbi_cache_string_length);
                    //console.log(transientName);

                    //Find the length of the string so far, and then however many chars are left we can use this for filters
                    sbi_cache_string_length = transientName.length;
                    sbi_cache_string_length = 44 - sbi_cache_string_length;


                    //Set the length of each filter string
                    if( sbi_cache_string_exclude_length < sbi_cache_string_length/2 ){
                        sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length - sbi_cache_string_exclude_length);
                    } else {
                        //Exclude string
                        if( sbi_cache_string_exclude.length == 0 ){
                            sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length);
                        } else {
                            sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length/2);
                        }
                        //Include string
                        if( sbi_cache_string_include.length == 0 ){
                            sbi_cache_string_exclude = sbi_cache_string_exclude.substring(0, sbi_cache_string_length);
                        } else {
                            sbi_cache_string_exclude = sbi_cache_string_exclude.substring(0, sbi_cache_string_length/2);
                        }
                    }

                    //Add both parts of the caching string together and make sure it doesn't exceed 45
                    transientName += sbi_cache_string_include + sbi_cache_string_exclude;
                    transientName = transientName.substring(0, 45);
                    //console.log(transientName);
                    //1. Does the transient/cache exist in the db?
                    //alert(sbiCacheExists +' '+ feedOptions.disablecache);
                    if(sbiCacheExists == 'true' && !feedOptions.disablecache){
                        //Use ajax to get the cache
                        //alert('image ');
                        images = sbiGetCache(transientName, sbiSettings, $self, 'feed', apiURLs);
                    } else if(getType == 'user' && isNaN(ids_arr[0])){
                        sbiSetUserApiUrl(ids_arr[0], sb_instagram_js_options.sb_instagram_at, '/media/recent', '&count='+num, function(apiURL){
                            sbiFetchData([apiURL], transientName, sbiSettings, $self);
                        });
                    } else {
                        //Get photos from the Instagram API
                        sbiFetchData(apiURLs, transientName, sbiSettings, $self);
                    }



                    //This is the arr that we'll keep adding the new images to
                    var imagesArr = '',
                        sbiNewData = false,
                        noMoreData = false,
                        photoIds = [],
                        imagesHTML = '';
                    photosAvailable = 0, //How many photos are available to be displayed
                        apiRequests = 1;

                    //Build the HTML for the feed
                    function sbiBuildFeed(images, transientName, sbiSettings, $self,has_to_sort){
                        if(has_to_sort == undefined)
                            has_to_sort = false;
                        //VARS:
                        var $target = $self.find('#sbi_images'),
                            $loadBtn = $self.find("#sbi_load .sbi_load_btn"),
                            num = parseInt(sbiSettings.num),
                            cols = parseInt(sbiSettings.cols),
                            hovercolorstyles = '',
                            hovertextstyles = '',
                            feedOptions = sbiSettings.feedOptions,
                            disablelightbox = sbiSettings.disablelightbox,
                            itemCount = 0,
                            user_id = sbiSettings.user_id,
                            imgRes = sbiSettings.imgRes,
                            getType = feedOptions.type,
                            hidePhotos = sbiSettings.hidePhotos, //Contains the IDs of the photos which need to be hidden
                            blockUsers = sbiSettings.blockUsers,
                            excludeWords = sbiSettings.excludeWords,
                            includeWords = sbiSettings.includeWords,
                            post_style = sbiSettings.post_style,
                            maxRequests = parseInt(feedOptions.maxrequests),
                            removedPhotosCount = 0, //How many photos are being hidden so far
                            carousel = JSON.parse(feedOptions.carousel)[0],
                            carouselarrows = JSON.parse(feedOptions.carousel)[1],
                            carouselpag = JSON.parse(feedOptions.carousel)[2],
                            carouselautoplay = JSON.parse(feedOptions.carousel)[3],
                            carouseltime = JSON.parse(feedOptions.carousel)[4],
                            imagepadding = feedOptions.imagepadding,
                            imagepaddingunit = feedOptions.imagepaddingunit,
                            looparray = sbiSettings.looparray,
                            headerstyle = feedOptions.headerstyle,
                            showfollowers = feedOptions.showfollowers,
                            showbio = feedOptions.showbio,
                            headerstyle = feedOptions.headerstyle,
                            headerprimarycolor = feedOptions.headerprimarycolor,
                            headersecondarycolor = feedOptions.headersecondarycolor,
                            media = feedOptions.media;

                        //On first load imagesArr is empty so set it to be the images
                        if(imagesArr == ''){
                            imagesArr = images;

                            //On all subsequent loads add the new images to the imagesArr
                        } else if( sbiNewData == true ) {
                            jQuery.each( images.data, function( index, entry ) {
                                //Add the images to the imagesArr,
                                imagesArr.data.push( entry );
                            });
                            sbiNewData = false;
                        }

                        var imagesNextUrl = images.pagination.next_url;
                        if( typeof imagesNextUrl === 'undefined' || imagesNextUrl.length == 0 ){
                            noMoreData = true;
                        } else {
                            $loadBtn.show();
                        }

                        //If the next url exists then update the pagination object in the imagesArr with the next pagination info
                        if( typeof images.pagination !== 'undefined' ) imagesArr["pagination"] = images.pagination;

                        if( feedOptions.showcaption == 'false' || feedOptions.showcaption == '' ) showcaption = 'style="display: none;"';
                        if( feedOptions.showlikes == 'false' || feedOptions.showlikes == '' ) showlikes = 'display: none;';
                        if( feedOptions.sortby !== '' ) sortby = feedOptions.sortby;
                        if( feedOptions.hovercolor !== '0,0,0' ) hovercolorstyles = 'style="background: rgba('+feedOptions.hovercolor+',0.85)"';
                        if( feedOptions.hovertextcolor !== '0,0,0' ) hovertextstyles = 'style="color: rgba('+feedOptions.hovertextcolor+',1)"';


                        var imagesArrCountOrig = imagesArrCount,
                            removePhotoIndexes = []; //This is used to keep track of the indexes of the photos which should be removed so that they can be removed from imagesArr after the loop below has finished and then resultantly not cached.

                        //BUILD HEADER
                        if( $self.find('.sbi_header_link').length == 0 ){

                            //Get page info for first User ID
                            if(getType == 'user'){

                                var sbi_page_url = 'https://api.instagram.com/v1/users/' + looparray[0] + '?access_token=' + sb_instagram_js_options.sb_instagram_at;

                                if(isNaN(looparray[0])){
                                    sbiSetUserApiUrl(looparray[0], sb_instagram_js_options.sb_instagram_at, '', '', function(apiURL){
                                        sbi_page_url = apiURL;

                                        if(sbiHeaderCache == 'true' && !feedOptions.disablecache){
                                            //alert('haha');
                                            //Use ajax to get the cache
                                            sbiGetCache(headerTransientName, sbiSettings, $self, 'header');
                                        } else {
                                            // Make the ajax request here
                                            jQuery.ajax({
                                                method: "GET",
                                                url: sbi_page_url,
                                                dataType: "jsonp",
                                                success: function(data) {
                                                    sbiBuildHeader(data, sbiSettings);
                                                    if(!feedOptions.disablecache) sbiCachePhotos(data, headerTransientName);

                                                }
                                            });
                                        }
                                    });
                                } else {
                                    //Create header transient name
                                    var headerTransientName = 'sbi_header_' + looparray[0];
                                    headerTransientName = headerTransientName.substring(0, 45);

                                    //Check whether header cache exists
                                    if(sbiHeaderCache == 'true' && !feedOptions.disablecache){
                                        //alert('haha');
                                        //Use ajax to get the cache
                                        sbiGetCache(headerTransientName, sbiSettings, $self, 'header');
                                    } else {
                                        // Make the ajax request here
                                        jQuery.ajax({
                                            method: "GET",
                                            url: sbi_page_url,
                                            dataType: "jsonp",
                                            success: function (data) {
                                                sbiBuildHeader(data, sbiSettings);
                                                if (!feedOptions.disablecache) sbiCachePhotos(data, headerTransientName);

                                            }
                                        });
                                    }
                                }

                            } else {

                                var headerStyles = '';
                                if(feedOptions.headercolor.length) headerStyles = 'style="color: #'+feedOptions.headercolor+'"';

                                if(getType == 'hashtag'){
                                    $header = '<a href="https://instagram.com/explore/tags/'+looparray[0]+'" target="_blank" class="sbi_header_link" '+headerStyles+'>';
                                } else {
                                    $header = '<div class="sbi_header_link" '+headerStyles+'>';
                                }

                                $header += '<div class="sbi_header_text">';
                                $header += '<h3 class="sbi_no_bio" '+headerStyles+'>';
                                if(getType == 'hashtag'){

                                    if( looparray.length > 1 ){
                                        jQuery.each( looparray, function( index, hashtag ) { // itemNumber = index, item = value
                                            $header += '<a href="https://instagram.com/explore/tags/'+hashtag+'" target="_blank">#' + hashtag + '&nbsp;</a>';
                                        });
                                    } else {
                                        $header += '#'+looparray[0];
                                    }

                                } else {
                                    $header += 'Instagram';
                                }
                                $header += '</h3>';
                                $header += '</div>';

                                $header += '<div class="sbi_header_img"';
                                if(headerstyle == 'boxed') $header += ' style="background: #'+headersecondarycolor+';"';
                                $header += '>';


                                $header += '<div class="sbi_header_hashtag_icon"';
                                if(headerstyle == 'boxed') $header += ' style="color: #'+headerprimarycolor+';"';
                                $header += '><i class="sbi_new_logo" '+hovertextstyles+'></i></div>';
                                $header += '</div>';
                                if(getType == 'hashtag'){
                                    $header += '</a>';
                                } else {
                                    $header += '</div>';
                                }
                                //Add the header
                                if( $self.find('.sbi_header_link').length == 0 ) $self.find('.sb_instagram_header').prepend( $header );


                                //Header profile pic hover
                                $self.find('.sb_instagram_header .sbi_header_link').hover(function(){
                                    //Change the color of the hashtag circle for hashtag headers to match the color of the header text. This is then faded in in the CSS file.
                                    $self.find('.sbi_feed_type_user .sbi_header_hashtag_icon, .sbi_feed_type_hashtag .sbi_header_hashtag_icon').attr('style', 'background: ' +$self.find('h3').css('color') );

                                    $self.find('.sbi_feed_type_hashtag.sbi_header_style_boxed .sbi_header_hashtag_icon').css({
                                        'background' : '#000',
                                        'color' : '#fff'
                                    });

                                }, function(){
                                    $self.find('.sbi_feed_type_user .sbi_header_hashtag_icon, .sbi_feed_type_hashtag .sbi_header_hashtag_icon').removeAttr('style');

                                    $self.find('.sbi_feed_type_hashtag.sbi_header_style_boxed .sbi_header_hashtag_icon').css({
                                        'background' : '#'+feedOptions.headersecondarycolor,
                                        'color' : '#'+feedOptions.headerprimarycolor
                                    });

                                });

                            } // End get page info
                        } // End header


                        //LOOP THROUGH ITEMS:
                        jQuery.each( imagesArr.data, function( itemNumber, item ) { // itemNumber = index, item = value
                            //Remove photos
                            var removePhoto = false;
                            
                            //Check usernames to see whether this user is blocked
                            jQuery.each( blockUsers, function( index, username ) {
                                //If they are then add the photo ID to the hidePhotos array so that we can keep track of how many photos are being hidden, which is needed when clicking the Load More btn
                                if( item.user.username == jQuery.trim(username) ) {
                                    hidePhotos.push(item.id);
                                    removePhoto=true;
                                }
                            });

                            //Exclude words - check captions (if they exist) to see whether it contains any excluded words
                            if( (excludeWords.length > 0 && excludeWords[0] !== '') && item.caption != null){

                                jQuery.each( excludeWords, function( index, word ) {
                                    word = jQuery.trim(word).toLowerCase();
                                    if( item.caption.text.toLowerCase().indexOf(word) > -1 && word !== '' ){
                                    }
                                });

                                jQuery.each( excludeWords, function( index, word ) {
                                    if(word !== '') {
                                        var workingCaption = item.caption.text,
                                            needle = ' '+jQuery.trim(word).toLowerCase()+' ',
                                            haystack = workingCaption.toLowerCase(),
                                            regex = new RegExp(needle);

                                        haystack = haystack.replace(/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_]+/gi, ' ');
                                        haystack = ' ' + haystack.replace(/[\n\r]+/gi, ' ') + ' ';

                                        if(regex.test(haystack)) {
                                            //This photo caption contains one of the words so show it
                                            hidePhotos.push(item.id);removePhoto=true;//console.log('excluded');
                                            return false;
                                        }
                                    }
                                });
                            }

                            // console.log(includeWords);
                            // console.log(hidePhotos);

                            //Hide photos needs to separate for each feed on the page
                            //NOTE: Can I make 'hidePhotos' unique by using the 'includewords' (all one string minus any punctuation) in the variable name? Eg: hidePhotos_ft
                            //Create a really simple example in codepen with two feeds and the hidephotos variable and see if I can find a solution. If not then might have to just push out the update and stackoverflow this.

                            //Include words - check captions to see whether it contains any included words
                            var tmp_keyword_influencer = '';
                            if(includeWords.length > 0 && includeWords != ''){
                                //If there's no caption then hide the photo
                                if( item.caption == null ){
                                    hidePhotos.push(item.id);removePhoto=true;//console.log('nocaption');
                                } else {
/*
                                    str = "Test String C.S (example)";
                                    var regex = new RegExp("\\b"+search_string+"\\b","g");
                                    if(str.match(regex_search)) != null)
                                    match = true;
                                else
                                    match = false;
                                    */
                                    var containsWord = false,
                                        workingCaption = item.caption.text;

                                    jQuery.each( includeWords, function( index, word ) {
                                        var needle = ' '+jQuery.trim(word).toLowerCase()+' ',
                                            haystack = jQuery.trim(workingCaption).toLowerCase(),
                                            regex = new RegExp(needle);

                                        haystack = haystack.replace(/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_]+/gi, ' ');
                                        haystack = ' ' + haystack.replace(/[\n\r]+/gi, ' ') + ' ';
                                        if(regex.test(haystack)) {
                                            //This photo caption contains one of the words so show it
                                            containsWord = true;
                                            tmp_keyword_influencer = needle;
                                            return false;
                                        }
                                    });

                                    if( containsWord == false && (jQuery.inArray(item.id, hidePhotos) < 1) ){
                                        hidePhotos.push(item.id);removePhoto=true;//console.log(word + ' not including');
                                        // console.log(hidePhotos);
                                    }
                                    else
                                    {
                                    }
                                }

                            }

                            //if(!removePhoto)

                            //Hide photos or videos
                            if( media == 'videos' && item.type !== 'video' ) removePhoto = true;
                            if( media == 'photos' && item.type !== 'image' ) removePhoto = true;

/*
                            //Check the ID of the item to see if it matches any ID in the hidephotos array then skip it and don't iterate the imagesArrCount var
                            jQuery.each( hidePhotos, function( index, id ) {
                                if( item.id == jQuery.trim(id) ) removePhoto = true;
                            });
                            */
                            if(removePhoto){
                                removedPhotosCount++;
                                //Remove photo from imagesArr here so that it isn't cached
                                removePhotoIndexes.push(itemNumber);
                                return;
                            }


                            //Used to make sure we display the right amount of photos
                            itemCount ++;

                            //This makes sure that only the correct number of photos is shown. So if num is set to 10 then it only shows the next 10 in the array. photosAvailable is subtracted from imagesArrCountOrig as imagesArrCountOrig is updated every time and we need to calculate how many photos are currently displayed in the feed in order to calculate how many to show.
                            if(sbiSinceTime != null && (post_style == 'product' || post_style == 'product_influencer')) {
                                if (itemCount <= imagesArrCountOrig) return;
                            }
                            else {
                                if (itemCount > ( (imagesArrCountOrig - photosAvailable ) + num) || itemCount <= imagesArrCountOrig) return;
                            }
                            imagesArrCount++; //Keeps track of where we are in the images array


                            //FILTER:
                            //Video
                            item.likes.video_view = 0;
                            var video_view_html = '';
                            if(post_style == 'product' || post_style == 'product_influencer')
                                video_view_html =  '<span class="sbi_views" style="font-size: '+feedOptions.likessize+'px;"></span>';

                            sbi_item_array.push({user_id:item.user.id, id:item.id, url:item.link, type:item.type, likes:item.likes.count, views:0});

                            if( item.type == 'video' ){
                                var data_video ='';
                                if(typeof item.videos != 'undefined')
                                    data_video = 'data-video="'+item.videos.standard_resolution.url + '"';

                            } else {
                                var data_video = 'data-video=""';
                            }

                            //Image res
                            switch( imgRes ){
                                case 'thumbnail':
                                    data_image = item.images.thumbnail.url;
                                    break;
                                case 'low_resolution':
                                    data_image = item.images.low_resolution.url;
                                    break;
                                default:
                                    data_image = item.images.standard_resolution.url;
                            }
                            data_image = data_image.split("?ig_cache_key")[0];

                            //Date
                            var date = new Date(item.created_time*1000);
                            //Create time for sorting
                            var time = date.getTime();
                            var created_time_raw = item.created_time;
                            //Create pretty date for display
                            m = date.getMonth();
                            d = date.getDate();
                            y = date.getFullYear();
                            var month_names = new Array ( );
                            month_names[month_names.length] = "Jan";
                            month_names[month_names.length] = "Feb";
                            month_names[month_names.length] = "Mar";
                            month_names[month_names.length] = "Apr";
                            month_names[month_names.length] = "May";
                            month_names[month_names.length] = "Jun";
                            month_names[month_names.length] = "Jul";
                            month_names[month_names.length] = "Aug";
                            month_names[month_names.length] = "Sep";
                            month_names[month_names.length] = "Oct";
                            month_names[month_names.length] = "Nov";
                            month_names[month_names.length] = "Dec";
                            var itemDate = d + ' ' + month_names[m] ;

                            //Caption
                            if(item.caption != null){
                                //Replace double quotes in the captions with the HTML symbol
                                var captionText = item.caption.text.replace(/"/g, "&quot;");
                                captionText = captionText.replace(/\n/g, "<br/>");
                            } else {
                                var captionText = '';
                            }

                            //Hover display info
                            if( feedOptions.hoverdisplay.indexOf('location') > -1 ){ var showHoverLocation = true; } else { var showHoverLocation = false; }
                            if( feedOptions.hoverdisplay.indexOf('caption') > -1 ){ var showHoverCaption = true; } else { var showHoverCaption = false; }
                            if( feedOptions.hoverdisplay.indexOf('likes') > -1 ){ var showHoverLikes = true; } else { var showHoverLikes = false; }
                            if( feedOptions.hoverdisplay.indexOf('username') > -1 ){ var showHoverUsername = true; } else { var showHoverUsername = false; }
                            if( feedOptions.hoverdisplay.indexOf('icon') > -1 ){ var showHoverIcon = true; } else { var showHoverIcon = false; }
                            if( feedOptions.hoverdisplay.indexOf('date') > -1 ){ var showHoverDate = true; } else { var showHoverDate = false; }
                            if( feedOptions.hoverdisplay.indexOf('instagram') > -1 ){ var showHoverInstagram = true; } else { var showHoverInstagram = false; }


                            //Location
                            if(item.location != null && showHoverLocation){
                                if(item.location.name == 'undefined' || item.location.name == null){
                                    var locationName = '';
                                } else {
                                    var sbi_lat = (item.location.hasOwnProperty("latitude")) ? 'data-lat="'+item.location.latitude+'"' : '',
                                        sbi_long = (item.location.hasOwnProperty("longitude")) ? 'data-long="'+item.location.longitude+'"' : '',
                                        locationName = '<a href="https://instagram.com/explore/locations/'+item.location.id+'" class="sbi_location" target="_blank" '+sbi_lat+' '+sbi_long+'><i class="fa fa-map-marker"></i>'+item.location.name+'</a>';
                                }
                            } else {
                                var locationName = '';
                            }

                            if(showHoverCaption){
                                var sbiCaptionHTML = '<p class="sbi_caption" '+hovertextstyles+'>'+ captionText.substring(0, feedOptions.captionlength);
                                if( captionText.length > parseInt(feedOptions.captionlength) ) sbiCaptionHTML += '...'
                                sbiCaptionHTML += '</p>';
                            } else {
                                var sbiCaptionHTML = '';
                            }

                            if(showHoverLikes){
                                var sbiMetaHTML = '<div class="sbi_meta" style="color: #'+feedOptions.likescolor+';"><span class="sbi_likes" '+hovertextstyles+'><i class="fa fa-heart" '+hovertextstyles+'></i>'+commaSeparateNumber(item.likes.count)+'</span><span class="sbi_comments" '+hovertextstyles+'><i class="fa fa-comment" '+hovertextstyles+'></i>'+commaSeparateNumber(item.comments.count)+'</span>'+video_view_html+'</div>';
                            } else {
                                var sbiMetaHTML = '';
                            }

                            if(showHoverUsername){
                                var sbiUsernameHTML = '<p class="sbi_username"><a href="http://rank.social/'+item.user.username+'"  '+hovertextstyles+'>'+item.user.username+'</a></p>';
                            } else {
                                var sbiUsernameHTML = '';
                            }

                            if(showHoverIcon){
                                var sbiIconHTML = '<i class="fa fa-arrows-alt"></i>';
                            } else {
                                var sbiIconHTML = '';
                            }

                            if(showHoverDate){
                                var sbiDateHTML = '<span class="sbi_date"><i class="fa fa-clock-o"></i>'+itemDate + '</span>';
                            } else {
                                var sbiDateHTML = '';
                            }



                            if(showHoverInstagram){
                                var sbiInstagramHTML = '<a class="sbi_instagram_link" href="'+item.link+'" target="_blank" title="Instagram" '+hovertextstyles+'><i class="fa fa-instagram"></i></a>';
                            } else {
                                var sbiInstagramHTML = '';
                            }

                            // var sbiHoverEffect = 'sbi_' + feedOptions.hovereffect;
                            var sbiHoverEffect = 'sbi_fade';

                            //If it's a carousel feed then set the image padding directly on the sbi_item as the inherit in the CSS file doesn't work
                            (carousel == true) ? carouselPadding = ' style="padding: '+imagepadding+imagepaddingunit+' !important;"' : carouselPadding = '';




                            //check if the text contains keywords
                            var keyword_contains = ' ';var keyword_contains_list = '';var keyword_influencer = '';var keyword_influencer_origin = '';
                            var includewords_list = '';
                            jQuery.each( sb_instagram_keywords, function( index, keyword ) {
                                if(item.caption != null){
                                    var workingCaption = item.caption.text;
                                    var needle = ' '+jQuery.trim(keyword).toLowerCase()+' ',
                                                haystack = jQuery.trim(workingCaption).toLowerCase(),
                                                regex = new RegExp(needle);
                                    haystack = haystack.replace(/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_]+/gi, ' ');
                                    haystack = ' ' + haystack.replace(/[\n\r]+/gi, ' ') + ' ';
                                    if(regex.test(haystack)) {
                                        keyword_influencer = jQuery.trim(needle).replace(/[@#]+/gi,'');
                                        keyword_influencer_origin = jQuery.trim(needle);
                                        keyword_contains_list +='<a  href="http://rank.social/'+keyword_influencer+'">'+ keyword_influencer_origin + '</a>,';
                                        includewords_list += keyword_influencer_origin + ',';
                                    }
                                }
                            });
                            includewords_list = includewords_list.substr(0,includewords_list.length - 1);
                            var is_red = 0;
                            if(keyword_contains_list != '')
                            {
                                //this means there are some keywords in the post
                                //keyword_contains_list = keyword_contains_list.substring(0,-1);
                                if(post_style !='product' && post_style != 'product_influencer') {
                                    keyword_contains = ' keywords_in ';
                                }
                                keyword_contains_list ='MARCAS: '+ keyword_contains_list.substr(0,keyword_contains_list.length - 1);
                                is_red = 1;
                            }

                            var caption_color = 'color: #c20f11; ';
                            var sbi_user_class= '';

                            if(post_style == 'product') {
                                caption_color = '';
                                keyword_contains_list ='<a  href="http://rank.social/'+item.user.username+ '">@' + item.user.username+'</a>';
                                sbi_user_class = "sbi_user_"+item.user.username.toLowerCase();
                            }
                            else if(post_style == 'product_influencer'){
                                caption_color = '';
                                if(keyword_influencer == '' && tmp_keyword_influencer != '') {
                                    keyword_influencer = jQuery.trim(tmp_keyword_influencer).replace(/[@#]+/gi,'');
                                    keyword_influencer_origin = jQuery.trim(tmp_keyword_influencer);
                                }
                                keyword_contains_list = '<a   href="http://rank.social/'+keyword_influencer+ '">' +keyword_influencer_origin+'</a>';
                                sbi_user_class = "sbi_user_"+keyword_influencer.toLowerCase();
                            }

                            if(!sbiShowHighlight)
                            {
                                keyword_contains_list = '';
                                keyword_contains = '';
                            }
                            sbiFeedToTable(item,includewords_list);

                            var mediaPofileHtml = '';
                            if(sbiShowAvatar){
                                mediaPofileHtml = '<div class="media_profile_outter"><div class="media_profile" style="background-image:url('+item.user.profile_picture+')"></div></div>';
                            }

                            var date = new Date(item.created_time*1000);
                            var today_date = new Date();
                            var yesterday_date = new Date();
                            yesterday_date.setDate(yesterday_date.getDate() - 1);

                            var date_p = '';
                            if(sbiShowLabel)
                            {
                                if(date.toDateString() === today_date.toDateString())
                                    date_p = '<p class="date_p hoy">H<span class="full_view">OY</span></p>';
                                else if(date.toDateString() === yesterday_date.toDateString())
                                    date_p = '<p class="date_p">A<span class="full_view">YER</span></p>';
                            }
                            var data_int =  item.likes.count + item.comments.count;
                            //TEMPLATE:
                            imagesHTML += '<div class="sbi_item '+sbi_user_class+' sbi_type_'+item.type+' sbi_new '+sbiHoverEffect+'" id="sbi_'+item.id+'" data-likes="'+item.likes.count+'" data-comments="'+item.comments.count+'" data-ints="'+data_int+'" data-date="'+created_time_raw+'"'+carouselPadding+'><div class="sbi_photo_wrap'+keyword_contains+'">'+date_p+'<i class="fa fa-play sbi_playbtn"></i><div class="sbi_link" '+hovercolorstyles+'><div class="sbi_hover_top">'+sbiUsernameHTML+sbiCaptionHTML+'</div>'+sbiInstagramHTML+'<div class="sbi_hover_bottom" '+hovertextstyles+'><p>'+sbiDateHTML+locationName+'</p>'+sbiMetaHTML+'</div><a class="sbi_link_area" data-red="'+is_red+'" href="'+item.images.standard_resolution.url+'" data-lightbox-sbi="'+($i+1)+'" data-title="'+captionText+'" '+data_video+' data-id="sbi_'+item.id+'" data-user="'+item.user.username+'" data-url="'+item.link+'" data-avatar="'+item.user.profile_picture+'"><i class="fa fa-play sbi_playbtn" '+hovertextstyles+'></i><span class="sbi_lightbox_link" '+hovertextstyles+'>'+sbiIconHTML+'</span></a></div><a class="sbi_photo" href="'+item.link+'" target="_blank"><img src="'+data_image+'" alt="'+captionText+'" width="200" height="200" /></a></div><div class="sbi_info">'+mediaPofileHtml+'<div class="sbi_meta" style="color: #'+feedOptions.likescolor+'; '+sbiSettings.showlikes+'"><span class="sbi_likes" style="font-size: '+feedOptions.likessize+'px;"><i class="fa fa-heart" style="font-size: '+feedOptions.likessize+'px;"></i>'+commaSeparateNumber(item.likes.count)+'</span><span class="sbi_comments" style="font-size: '+feedOptions.likessize+'px;"><i class="fa fa-comment" style="font-size: '+feedOptions.likessize+'px;"></i>'+commaSeparateNumber(item.comments.count)+'</span>'+video_view_html+'</div><p class="sbi_caption_wrap" '+sbiSettings.showcaption+'><span class="sbi_caption" style="'+caption_color+' font-size: '+feedOptions.captionsize+'px;">'+keyword_contains_list+'</span><span class="sbi_expand"> <a href="#"><span class="sbi_more">...</span></a></span></p></div></div>';
                            //console.log("ImagesHTMLsSS"+item.id);
                            if(post_style == 'product')
                            {
                                var offset = new Date().getTimezoneOffset() * 60;
                                var created_time_fixed = (item.created_time) - parseInt(offset);
                                var ints = item.likes.count + item.comments.count;
                                if(!tmp_post_array.hasOwnProperty(item.user.id))
                                    tmp_post_array[item.user.id]={};
                                if(tmp_post_array[item.user.id].hasOwnProperty(parseInt(created_time_fixed / 86400) * 86400)) {
                                    tmp_post_array[item.user.id][parseInt(created_time_fixed / 86400) * 86400]['likes'] += item.likes.count;
                                    tmp_post_array[item.user.id][parseInt(created_time_fixed / 86400) * 86400]['ints'] += ints;
                                    tmp_post_array[item.user.id][parseInt(created_time_fixed / 86400) * 86400]['post_count'] += 1;
                                    tmp_post_array[item.user.id][parseInt(created_time_fixed / 86400) * 86400]['media_ids'].push(item.id);
                                }
                                else
                                    tmp_post_array[item.user.id][parseInt(created_time_fixed / 86400) * 86400] = {created_time:parseInt(created_time_fixed /  86400) * 86400,likes:item.likes.count,username:item.user.username,post_count:1,media_ids:[item.id], ints:ints};


                                if(user_ids_array.indexOf(item.user.id) == -1)
                                    user_ids_array.push(item.user.id);
                                if(created_times.indexOf(parseInt(created_time_fixed /  86400) * 86400) == -1)
                                    created_times.push(parseInt(created_time_fixed /  86400) * 86400);
                                exact_times[parseInt(created_time_fixed /  86400) * 86400]=created_time_fixed;


                                post_style_global.likes += item.likes.count;
                                post_style_global.ints += ints;
                                post_style_global.posts += 1;


                                if(post_style_info.hasOwnProperty(item.user.id))
                                {
                                    post_style_info[item.user.id]['posts'] ++;
                                    post_style_info[item.user.id]['likes'] += item.likes.count;
                                    post_style_info[item.user.id]['ints'] += ints;
                                }
                                else{
                                    post_style_global.users ++;
                                    var username_org = jQuery.trim(item.user.username).replace(/[#@]+/gi,'');
                                    post_style_info[item.user.id] = {username:username_org,likes:item.likes.count,posts:1,ints:ints};
                                }

                            }
                            if(post_style == 'product_influencer'){
                                var offset = new Date().getTimezoneOffset() * 60;
                                var created_time_fixed = (item.created_time) - parseInt(offset);
                                var ints = item.likes.count + item.comments.count;
                                if(!tmp_post_array.hasOwnProperty(keyword_influencer))//item.user.id to keyword_influencer
                                {
                                    tmp_post_array[keyword_influencer] = {};
                                    tmp_post_array[keyword_influencer]['keyword_origin'] = keyword_influencer_origin;
//                                tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400] = {created_time:parseInt(created_time_fixed /  86400) * 86400,likes:item.likes.count};
                                }
                                if(tmp_post_array[keyword_influencer].hasOwnProperty(parseInt(created_time_fixed / 86400) * 86400))
                                {
                                    tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400]['likes'] += item.likes.count;
                                    tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400]['ints'] += ints;
                                    tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400]['post_count'] += 1;
                                    tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400]['media_ids'].push(item.id);
                                }
                                else
                                    tmp_post_array[keyword_influencer][parseInt(created_time_fixed / 86400) * 86400] = {created_time:parseInt(created_time_fixed /  86400) * 86400,likes:item.likes.count,post_count:1,media_ids:[item.id],ints:ints};

                                if(brands_array.indexOf(keyword_influencer) == -1)
                                    brands_array.push(keyword_influencer);
                                if(created_times.indexOf(parseInt(created_time_fixed /  86400)*86400) == -1)
                                    created_times.push(parseInt(created_time_fixed /  86400)*86400);
                                exact_times[parseInt(created_time_fixed /  86400) * 86400]=created_time_fixed;


                                post_style_influencer_global.likes += item.likes.count;
                                post_style_influencer_global.ints += ints;
                                post_style_influencer_global.posts += 1;


                                if(post_style_influencer_info.hasOwnProperty(keyword_influencer))
                                {
                                    post_style_influencer_info[keyword_influencer]['posts'] ++;
                                    post_style_influencer_info[keyword_influencer]['likes'] +=item.likes.count;
                                    post_style_influencer_info[keyword_influencer]['ints'] +=ints;
                                }
                                else {
                                    post_style_influencer_global.brands++;
                                    post_style_influencer_info[keyword_influencer] = {
                                        likes: item.likes.count,
                                        ints: ints,
                                        posts: 1
                                    };
                                    post_style_influencer_info[keyword_influencer]['keyword_origin'] = keyword_influencer_origin;
                                }
                            }
                        }); //End images.data forEach loop

                        //Loop through and remove any photos from imagesArr which are hidden so that they're not cached
                        removePhotoIndexes.reverse(); //Reverse the indexes in the array so that it takes out the last items first and doesn't affect the order
                        jQuery.each( removePhotoIndexes, function( index, itemNumber ) {
                            imagesArr.data.splice(itemNumber, 1);
                        });

                        var numberOfPhotosDisplayed = $self.find('.sbi_item').length + (imagesHTML.match(/sbi_item /g) || []).length;

                        if( (imagesArrCount - imagesArrCountOrig) < num ) photosAvailable += imagesArrCount - imagesArrCountOrig;

                        //CACHE all of the photos in the imagesArr using ajax call to db after the photos have been displayed
                        if(!feedOptions.disablecache) sbiCachePhotos(imagesArr, transientName);

                        // if(post_style == 'product')
                        //     maxRequests = 20;
                        // if(post_style == "product_influencer")
                        maxRequests = 20;

                        var continueFetch = false;
                        if(sbiSinceTime === null && ((imagesArrCount - imagesArrCountOrig) < num) && (photosAvailable < num) && (apiRequests < maxRequests) && !noMoreData ) //Also check here whether next_url is available. If it's not then don't try to get more photos.
                            continueFetch = true;
                        if(sbiSinceTime != null && !noMoreData)
                            continueFetch = true;
                        if(post_style != 'product' && post_style != 'product_influencer')
                            continueFetch = false;

                        function sbiAddViewCount(view_array){
                            jQuery.each(view_array.data,function(index, entry){
                                var i_icon = "fa-eye";
                                if(entry.type == "video")
                                    i_icon = "fa-play";
                                var inner_view_html = '<i class="fa '+i_icon+'" style="font-size: '+feedOptions.likessize+'px;"></i>'+commaSeparateNumber(entry.views);
                                $self.find('#sbi_images>#sbi_'+index+'>.sbi_info .sbi_views').html(inner_view_html);
                            });
                            if(post_style == 'product')
                            {
                                post_style_global.reps = view_array.total_rep_cnt;
                                post_style_global.views = view_array.total_view_cnt;
                            }else if(post_style == 'product_influencer'){
                                post_style_influencer_global.reps = view_array.total_rep_cnt;
                                post_style_influencer_global.views = view_array.total_view_cnt;
                            }
                        }

                        if(continueFetch){
                            //Get more photos
                            sbiFetchURL = imagesArr.pagination.next_url;
                            sbiFetchData(sbiFetchURL, transientName, sbiSettings, $self);
                            //Set the flag so that we know to add the new photos to the imagesArr
                            sbiNewData = true;

                        } else {
                            //If there are enough photos
                            //Add the images to the feed
                            $self.find('#sbi_images').append(imagesHTML);
                            var sbi_item_str = JSON.stringify(sbi_item_array);

                            if(post_style == 'product' || post_style == 'product_influencer' ) {

                                jQuery.ajax({
                                    method: "POST",
                                    async: false,
                                    url: ajax_video_url,
                                    data: {media: sbi_item_str},
                                    success: function (response) {
                                        var response_json = JSON.parse(response);
                                        sbiAddViewCount(response_json);
                                        post_sytle_view_data = response_json.data;
                                    }
                                });
                            }

                            sbiAfterImagesLoaded();

                            //Reset the photosAvailable var so it can be used again
                            photosAvailable = 0;
                            imagesHTML = '';

                            //Remove the initial loader
                            $self.find('.sbi_loader').remove();

                            //Hide the spinner in the load more button
                            $loadBtn.find('.fa-spinner').hide();
                            $loadBtn.find('.sbi_btn_text').css('opacity', 1);

                        }
                        //AFTER:

                        //Things to add after the photos have been added
                        function sbiAfterImagesLoaded(){

                            if(post_style == 'product') {
                                //get avatar

                                var pagetype = feedOptions.sbiPageType;
                                if(pagetype == 'multi')
                                {
                                    var profile_picture_arr = [];
                                    var profile_username_arr = [];
                                    var followed_by_arr = [];
                                    jQuery.each( looparray, function( index, entry ) {
                                        var sbi_page_url = 'https://api.instagram.com/v1/users/' + entry + '?access_token=' + sb_instagram_js_options.sb_instagram_at;

                                        jQuery.ajax({
                                            method: "GET",
                                            url: sbi_page_url,
                                            dataType: "jsonp",
                                            success: function (data) {
                                                profile_picture_arr[index] = (data.data.profile_picture);
                                                profile_username_arr[index] = (data.data.username);
                                                followed_by_arr[index] = (data.data.counts.followed_by);
                                                if(profile_picture_arr.length == looparray.length)
                                                    sbi_generate_post_header(profile_picture_arr, profile_username_arr, followed_by_arr);
                                            }
                                        });
                                    });
                                }else{
                                    var sbi_page_url = 'https://api.instagram.com/v1/users/search?q=' + includeWords.toString().substr(1) + '&access_token=' + sb_instagram_js_options.sb_instagram_at ;
                                    jQuery.ajax({
                                        method: "GET",
                                        url: sbi_page_url,
                                        dataType: "jsonp",
                                        success: function (data) {
                                            if (data.data.length == 0) {
                                                sbi_generate_post_header(null);
                                                return;
                                            }

                                            var matchingID = data.data[0].id;
                                            var profile_picture = data.data[0].profile_picture;
                                            jQuery.each(data.data, function () {
                                                if (this.username === user_id) {
                                                    matchingID = this.id;
                                                    profile_picture = this.profile_picture;
                                                    return false;
                                                }
                                            });
                                            sbi_generate_post_header(profile_picture,null,null);
                                        }
                                    });
                                }

                                function sbi_generate_post_header(avatar,profile_username, followed_by)
                                {
                                    //sort post_style_info with its keys
                                    var post_style_header = '<div class="post_style_header" >';
                                    if (avatar != null) {
                                        if (profile_username === null) {
                                            post_style_header += '<h2 style="text-align: center;"><img class="aligncenter wp-image-1751" src="' + avatar + '" alt="12534109_445747985636071_317825138_a" height="71" width="71">' + includeWords.toString() + '</h2>';
                                        } else {
                                            post_style_header += '<div class="multi_sibHeader" style="width:' + avatar.length * 200 + 'px;">';
                                            jQuery.each(avatar, function (index, entry) {
                                                post_style_header += '<div class="multi_sibHeaderItem"><a href="http://rank.social/' + profile_username[index] + '"><h2 style="text-align: center;"><img class="aligncenter wp-image-1751" src="' + entry + '" alt="12534109_445747985636071_317825138_a" height="71" width="71">' + kFormatter(followed_by[index]) + '</h2><h2 style="text-align:center;">' + profile_username[index] + '</h2></a></div>';
                                            });
                                            post_style_header += '<div style="clear:both"></div></div>';

                                        }
                                    }
                                    var viewCoutnHtml = post_style_global.reps ? '<span id="dropdown_reps">' + commaSeparateNumber(post_style_global.reps) + '</span> REPS ': '';
                                    viewCoutnHtml += post_style_global.views ? '<span id="dropdown_views">' + commaSeparateNumber(post_style_global.views) + '</span> VIEWS ': '';
                                    if(viewCoutnHtml.length)
                                        viewCoutnHtml = '<span class="view_section">' + viewCoutnHtml + '</span>';

                                    var keys = Object.keys(post_style_info),
                                        i, len = keys.length;

                                    //keys.sort();

                                    var sorted=[];
                                    for(i=0;i<len;i++)
                                    {
                                        if(sbiCustomAnalysis)
                                            sorted.push([post_style_info[keys[i]]['username'],post_style_info[keys[i]]['ints']/post_style_info[keys[i]]['posts'],keys[i],post_style_info[keys[i]]['posts']*CostArr[keys[i]].cost]);
                                        else
                                            sorted.push([post_style_info[keys[i]]['username'],post_style_info[keys[i]]['ints']/post_style_info[keys[i]]['posts'],keys[i]]);
                                    }
                                    sorted.sort(function(a,b){return b[1] - a[1]});

                                    var dropdown_div = '<div class="dropdown" style="display:inline"><button class="btn btn-danger dropdown-toggle dropdown-title-span" type="button" data-toggle="dropdown">' + post_style_global['users'] + ' '+feedOptions.sbiKeywordType +'<i class="caret" style="margin-left:6px"></i></button><ul class="dropdown-menu"  style="list-style-type: none;"><li><a class="jquery-dropdown-item" href="#sb_instagram" data-user-name="" data-user-id="">'+post_style_global['users'] + ' '+feedOptions.sbiKeywordType +'</a></li>';
                                    console.log(sorted);
                                    if(sbiCustomAnalysis)
                                    {
                                        post_style_header_add = '<table><thead><tr><th>Indicador</th>';
                                        for(i=0;i<len;i++){
                                            var tmp_influencer_id = sorted[i][2];
                                            //add usernames and posts of users

                                            post_style_header_add += '<th>'+CostArr[tmp_influencer_id].influencer_name+'</th>';
                                            //now add usernames to dropdown
                                            dropdown_div +='<li><a class="jquery-dropdown-item" href="#sb_instagram" data-user-name="'+sorted[i][0].toLowerCase()+'" data-user-id="'+sorted[i][2]+'">'+sorted[i][0]+'</a></li>'
                                        }

                                        post_style_header_add += '<tr></thead><tbody><tr><td>Int./Post</td>';
                                        //Ineratction
                                        for(i=0;i<len;i++){
                                            post_style_header_add += '<td>'+kFormatter(sorted[i][1]) +'</td>';
                                        }
                                        //Cost
                                        post_style_header_add += '</tr><tr><td>Cost/Int.</td>';
                                        for(i=0;i<len;i++){
                                            var total_int = post_style_info[sorted[i][2]]['ints'];
                                            var cost_int = total_int != 0 ? rFormatter(sorted[i][3]/total_int) : 0;
                                            post_style_header_add += '<td>'+cost_int+'</td>';
                                        }
                                        //Int Dollar
                                        post_style_header_add += '</tr><tr><td>Int./Dolar</td>';
                                        for(i=0;i<len;i++){
                                            var total_int = post_style_info[sorted[i][2]]['ints'];
                                            var int_dolar = sorted[i][3] != 0 ? Math.round(total_int/sorted[i][3]) : 0;
                                            post_style_header_add += '<td>'+int_dolar+'</td>';
                                        }
                                        post_style_header_add += '</tr></tbody>';
                                        post_style_header_add += '</table>';
                                    }else{
                                        post_style_header_add = '';
                                        for(i=0;i<len;i++){
                                            //add usernames and posts of users
                                            post_style_header_add += '<strong>' + sorted[i][0] + '</strong>: ' + kFormatter(sorted[i][1]) +  ' | ';

                                            //now add usernames to dropdown
                                            dropdown_div +='<li><a class="jquery-dropdown-item" href="#sb_instagram" data-user-name="'+sorted[i][0].toLowerCase()+'" data-user-id="'+sorted[i][2]+'">'+sorted[i][0]+'</a></li>'
                                        }
                                    }
                                    
                                    dropdown_div += '</ul></div>';


                                    post_style_header += '<h3 style="text-align:center;font-size:26px;fone-weight:700">' +feedOptions.sbiHeaderTitle+' </h3><h3 style="text-align: center;" >'+dropdown_div+'<span id="dropdown_posts">' + post_style_global['posts'] + '</span> Posts<span id="dropdown_likes">' + commaSeparateNumber(post_style_global['ints']) + '</span> Int. '+ viewCoutnHtml +'</h3><div id="myChart_wrapper_div" style="width:100%;margin:auto;"><canvas id="myChart"></canvas></div><h3 style="text-align:center;font-weight:bold;">RENDIMIENTO </h3><h5 id="dropdown_statistics" style="text-align:center;">' + post_style_header_add;
                                    
/*  
                                    for (i = 0; i < len; i++) {
                                        k = keys[i];
                                        //post_style_header += '<strong>' + post_style_info[k]['username'] + '</strong>: ' + kFormatter(post_style_info[k]['likes']) + ' Likes/Post (' + post_style_info[k]['posts'] + ' Post) || ';
                                        post_style_header += '<strong>' + post_style_info[k]['username'] + '</strong>: ' + kFormatter(post_style_info[k]['likes']) +  ' | ';
                                    }
                                    */
                                    jQuery('.post_style_header').remove();
                                    jQuery('#sb_instagram').prepend(post_style_header.slice(0, -3) + '</h5></div>');
                                    //LINK DROPDOWN ITEM TO HANDLER
                                    jQuery('#sb_instagram').find('.jquery-dropdown-item')
                                        .on('click', function() {
                                            if(!sbiFilterMedia)
                                                return false;
                                            //now modify the chart and photoes
                                            var dd_user_id = jQuery(this).attr('data-user-id');
                                            var dd_user_name = jQuery(this).attr('data-user-name');
                                            jQuery('.dropdown-title-span').html(jQuery(this).html());

                                            var reps = views = 0;
                                            var foreach_Object = null;

                                            if(dd_user_name != '') {
                                                jQuery('#sbi_images .sbi_item').hide();
                                                jQuery('#sbi_images .sbi_user_' + dd_user_name).show();
                                                jQuery('#dropdown_posts').html(post_style_info[dd_user_id]['posts']);
                                                jQuery('#dropdown_likes').html(post_style_info[dd_user_id]['ints']);
                                                // jQuery('#dropdown_statistics').html('<strong>'+dd_user_name+'</strong>: '+kFormatter(post_style_info[dd_user_id]['ints']/post_style_info[dd_user_id]['posts']));

                                                foreach_Object = jQuery('#sbi_images .sbi_user_' + dd_user_name);
                                                draw_chart(dd_user_id);
                                            }
                                            else{
                                                jQuery('#sbi_images .sbi_item').show();
                                                jQuery('#dropdown_posts').html(post_style_global['posts']);
                                                jQuery('#dropdown_likes').html(post_style_global['ints']);
                                                var keys = Object.keys(post_style_info),
                                                    i, len = keys.length;
                                                var sorted=[];
                                                for(i=0;i<len;i++)
                                                    sorted.push([post_style_info[keys[i]]['username'],post_style_info[keys[i]]['ints']/post_style_info[keys[i]]['posts'],keys[i]]);
                                                sorted.sort(function(a,b){return b[1] - a[1]});

                                                // var tmp_stats = '';
                                                // for(i=0;i<len;i++){
                                                //     //add usernames and posts of users
                                                //     tmp_stats += '<strong>' + sorted[i][0] + '</strong>: ' + kFormatter(sorted[i][1]) +  ' | ';
                                                // }
                                                // jQuery('#dropdown_statistics').html(tmp_stats.slice(0,-3));
                                                foreach_Object = jQuery('#sbi_images .sbi_item');

                                                draw_chart();

                                            }

                                            foreach_Object.each(function(key, value){
                                                var sbi_id = jQuery(this).attr('id').substring(4);
                                                var sbi_type = "image";

                                                if(jQuery(this).hasClass('sbi_type_video'))
                                                    var sbi_type = "video";
                                                
                                                if(sbi_type ==  "video")
                                                    reps += post_sytle_view_data[sbi_id]['views'];
                                                else
                                                    views += post_sytle_view_data[sbi_id]['views'];
                                            });
                                            jQuery("#dropdown_reps").html(commaSeparateNumber(reps));
                                            jQuery("#dropdown_views").html(commaSeparateNumber(views));

                                    });

                                    // jQuery('.single-content').append('<h2 style="text-align:center">PARAMETROS</h2><h5 style="text-align:center">Influencers: <a href="http://rank.social/portfolio/items/ranking-de-influencers-hombres/">Top 20 Hombres</a> y <a href="http://rank.social/portfolio/items/ranking-de-influencers-mujeres/">Top 20 Mujeres</a> | Últimos 20 posts donde mencionaron la Marca</h5><h5 style="text-align:center"><a href ="http://rank.social/sugerencias/" >¿MÁS DATA?</a></h5>');

                                    draw_chart();
                                    function draw_chart(dd_user_id ) {
                                        if(dd_user_id == undefined)
                                            dd_user_id = null;
                                        //we draw chart here

                                        //make a temporary data;
                                        var c_colors = ['#3366cc', '#dc3912', '#ff9900', '#e916e2', '#29e83f', '#29e8e6', '#4B2FBF', '#2FBF77', '#E5E530', '#D22121', '#0011FF', '#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF', '#CE7DB3', '#7DCE88', '#CEB97D'];
                                        var c_labels = [];
                                        var c_labels1 = [];
                                        var c_datasets = [];
                                        var c_row = {};
                                        var user_info = {};
                                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                        ];
                                        created_times.sort();
                                        var offset = new Date().getTimezoneOffset() * 60;

                                        var tmp_user_ids_array = [];
                                        for (var i = 0; i < looparray.length; i++) {
                                            if(user_ids_array.indexOf(looparray[i]) > -1)
                                                tmp_user_ids_array.push(looparray[i]);
                                        }
                                        user_ids_array = tmp_user_ids_array;

                                        for (var i = 0; i < created_times.length; i++) {
                                            var dt = new Date((parseInt(exact_times[created_times[i]]) + parseInt(offset) ) * 1000);
                                            c_labels.push(monthNames[dt.getMonth()] + " " + (dt.getDate()) + ', ' + dt.getFullYear().toString().substr(2, 2));
                                            c_labels1.push(created_times[i]);
                                        }
                                        for (var i = 0; i < user_ids_array.length; i++) {
                                            //if (!tmp_datasets.hasOwnProperty(user_ids_array[i]))
                                                tmp_datasets[user_ids_array[i]] = {};
                                            for (var j = 0; j < created_times.length; j++) {
                                                //if (!tmp_datasets[user_ids_array[i]].hasOwnProperty(created_times[j]))
                                                    tmp_datasets[user_ids_array[i]][created_times[j]] = 0;
                                            }
                                        }

                                        //finished format
                                        //now insert the valid values
                                        for (var user_id in tmp_post_array) {
                                            var item = tmp_post_array[user_id];
                                            for (var created_time in item) {
                                                tmp_datasets[user_id][parseInt(item[created_time].created_time)] += item[created_time].ints;
                                                user_info[user_id] = item[created_time].username;
                                            }
                                        }
                                        //console.log(tmp_datasets);

                                        // console.log(tmp_datasets);
                                        // console.log(tmp_post_array);
                                        /*
                                         console.log(created_times);
                                         console.log(tmp_datasets);
                                         console.log(tmp_post_array);console.log(user_info);
                                         console.log(user_ids_array);*/
                                        var c_datasets = [];
                                        var post_count_arr = [];
                                        for (var i = 0; i < user_ids_array.length; i++) {
                                            if(dd_user_id != null && dd_user_id != user_ids_array[i])
                                                continue;
                                            var c_t_label = user_info[user_ids_array[i]] + "(" + post_style_info[user_ids_array[i]]['posts'] + "Posts)";
                                            ;
                                            var c_bgcolor = c_colors[i];
                                            var c_t_data = [];
                                            //console.log(user_ids_array[i]);console.log(tmp_datasets[user_ids_array[i]]);

                                            for (var j = 0; j < created_times.length; j++) {
                                                c_t_data.push(tmp_datasets[user_ids_array[i]][created_times[j]]);
                                            }
                                            if(dd_user_id != null)
                                            {
                                                for(var j=created_times.length - 1;j>=0;j--)
                                                    if(tmp_datasets[user_ids_array[i]][created_times[j]] == 0)
                                                    {
                                                        c_t_data.splice(j,1);
                                                        c_labels.splice(j,1);
                                                        c_labels1.splice(j,1);
                                                    }
                                            }
                                            c_datasets.push({
                                                label: c_t_label,
                                                data: c_t_data,
                                                backgroundColor: c_bgcolor
                                            });
                                            post_count_arr.push({id:user_ids_array[i],name:user_info[user_ids_array[i]]});
                                        }

                                        // console.log(created_times);
                                        // console.log(c_datasets);
                                        //generate chart
                                        var ctx = document.getElementById("myChart").getContext("2d");
                                        var chart_height = 300 + (c_datasets.length / 5) * 50;
                                        jQuery("#myChart_wrapper_div").height(chart_height);

                                        if(myChart != undefined)
                                            myChart.destroy();
                                        myChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: {
                                                labels: c_labels,
                                                datasets: c_datasets
                                            },
                                            options: {
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: true
                                                        }
                                                    }]
                                                },
                                                tooltips: {
                                                    callbacks: {
                                                        label: function(tooltipItem, data) {
                                                            var dataset_index = tooltipItem.datasetIndex;
                                                            var t_index = tooltipItem.index;
                                                            var keyword_index = post_count_arr[dataset_index]['id'];
                                                            return post_count_arr[dataset_index]['name']+"("+ tmp_post_array[keyword_index][c_labels1[t_index]]['post_count'] +" Posts):" + tooltipItem['yLabel'];
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                        document.getElementById("myChart").onclick = function(evt){
                                            if(!sbiFilterMedia)
                                                return false;
                                            var activePoints = myChart.getElementAtEvent(evt);
                                            // use _datasetIndex and _index from each element of the activePoints array
                                            if(activePoints.length) {
                                                var dataset_index = activePoints[0]._datasetIndex;
                                                var t_index = activePoints[0]._index;
                                                var keyword_index = post_count_arr[dataset_index]['id'];
                                                var showMediaIds = [];
                                                jQuery.each(tmp_post_array, function (index, entry) {
                                                    jQuery.each(entry, function (index1, entry1) {
                                                        if (index1 == c_labels1[t_index])
                                                            showMediaIds = showMediaIds.concat(entry1['media_ids']);
                                                    });
                                                });

                                                jQuery('.sbi_item').hide();
                                                jQuery.each(showMediaIds, function (index, entry) {
                                                    jQuery('#sbi_' + entry).show();
                                                })
                                            }else{
                                                jQuery('.sbi_item').show();
                                            }
                                        };
                                    }
                                }
                            }
                            if(post_style == 'product_influencer'){

                                var profile_picture_arr = [];
                                var profile_username_arr = [];
                                var followed_by_arr = [];
                                jQuery.each( looparray, function( index, entry ) {
                                    var sbi_page_url = 'https://api.instagram.com/v1/users/' + entry + '?access_token=' + sb_instagram_js_options.sb_instagram_at;

                                    jQuery.ajax({
                                        method: "GET",
                                        url: sbi_page_url,
                                        dataType: "jsonp",
                                        success: function (data) {
                                            profile_picture_arr.push(data.data.profile_picture);
                                            profile_username_arr.push(data.data.username);
                                            followed_by_arr.push(data.data.counts.followed_by);
                                            if(profile_picture_arr.length == looparray.length)
                                                sbi_generate_post_header(profile_picture_arr, profile_username_arr, followed_by_arr);
                                        }
                                    });
                                });

                                function sbi_generate_post_header(avatar,profile_username,followed_by)
                                {
                                    //sort post_style_influencer_info with its keys

                                    var post_style_influencer_header = '<div class="post_style_influencer_header" >';
                                    if(avatar.length == 1) {
                                            post_style_influencer_header += '<h2 style="text-align: center;"><img class="aligncenter wp-image-1751" src="'+avatar[0]+'" alt="12534109_445747985636071_317825138_a" height="71" width="71">' + kFormatter(followed_by[0]) + '</h2><h2 style="text-align:center;">'+profile_username[0]+'</h2>';
                                    }else
                                    {
                                        post_style_influencer_header += '<div class="multi_sibHeader" style="width:'+avatar.length * 200+'px;">';
                                        jQuery.each(avatar,function(index,entry){
                                            post_style_influencer_header += '<div class="multi_sibHeaderItem"><a href="http://rank.social/'+profile_username[index] +'"><h2 style="text-align: center;"><img class="aligncenter wp-image-1751" src="'+entry+'" alt="12534109_445747985636071_317825138_a" height="71" width="71">' + kFormatter(followed_by[index]) + '</h2><h2 style="text-align:center;">'+profile_username[index]+'</h2></a></div>';
                                        });
                                        post_style_influencer_header += '<div style="clear:both"></div></div>';
                                    }

                                    var viewCoutnHtml = post_style_influencer_global.reps ? '<span id="dropdown_reps">' + commaSeparateNumber(post_style_influencer_global.reps) + '</span> REPS ': '';
                                    viewCoutnHtml += post_style_influencer_global.views ? '<span id="dropdown_views">' + commaSeparateNumber(post_style_influencer_global.views) + '</span> VIEWS ': '';

                                    if(viewCoutnHtml.length)
                                        viewCoutnHtml = '<span class="view_section">' + viewCoutnHtml + '</span>';

                                    var dropdown1 = '<div class="dropdown" style="margin-left:400px"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example<span class="caret"></span></button><ul class="dropdown-menu"><li style="list-style-type: none;"><a href="#">JavaScript</a></li></ul></div>';

                                    var keys = Object.keys(post_style_influencer_info),
                                        i, len = keys.length;

                                    keys.sort();

                                    var sorted=[];
                                    for(i=0;i<len;i++)
                                        sorted.push([keys[i],post_style_influencer_info[keys[i]]['ints']/post_style_influencer_info[keys[i]]['posts'],post_style_influencer_info[keys[i]]['keyword_origin']]);
                                    sorted.sort(function(a,b){return b[1] - a[1]});

                                    //make dropdown
                                    var dropdown_div = '<div class="dropdown" style="display:inline"><button class="btn btn-danger dropdown-toggle dropdown-title-span" type="button" data-toggle="dropdown">' +post_style_influencer_global['brands'] +' '+feedOptions.sbiKeywordType+'<i class="caret" style="margin-left:6px"></i></button><ul class="dropdown-menu"  style="list-style-type: none;"><li><a class="jquery-dropdown-item" href="#sb_instagram" data-user-name="" data-user-id="">'+post_style_influencer_global['brands'] + ' '+feedOptions.sbiKeywordType +'</a></li>';

                                    post_style_influencer_header_add = '';
                                    for(i=0;i<len;i++){
                                        post_style_influencer_header_add += '<strong>' + sorted[i][0] + '</strong>: ' + kFormatter(sorted[i][1]) +  ' | ';

                                        //now add usernames to dropdown

                                        dropdown_div += '<li><a class="jquery-dropdown-item" href="#sb_instagram" data-user-name-origin = "'+sorted[i][2]+'" data-user-name="'+sorted[i][0].toLowerCase()+'" data-user-id="'+sorted[i][0]+'">'+sorted[i][2]+'</a></li>';
                                    }
                                    dropdown_div += '</ul></div>';

                                    post_style_influencer_header += '<h3 style="text-align:center;font-size:26px;">' +feedOptions.sbiHeaderTitle+' </h3><h3 style="text-align: center;">'+dropdown_div+'<span id="dropdown_posts">' + post_style_influencer_global['posts'] + '</span> Posts<span id="dropdown_likes">' + commaSeparateNumber(post_style_influencer_global['ints']) + '</span> INT.'+viewCoutnHtml+'</h3><div id="myChart_wrapper_div" style="width:100%;margin:auto;"><canvas id="myChart"></canvas></div></div><h3 style="text-align:center;">RENDIMIENTO </h3><h5 id="dropdown_statistics" style="text-align:center;">' + post_style_influencer_header_add;


                                    /*
                                                                        for (i = 0; i < len; i++) {
                                                                            k = keys[i];
                                    //                                        post_style_influencer_header += '<strong>' + k + '</strong>: ' + kFormatter(post_style_influencer_info[k]['likes']) + ' Likes/Post (' + post_style_influencer_info[k]['posts'] + ' Post) || ';
                                                                            post_style_influencer_header += '<strong>' + k + '</strong>: ' + kFormatter(post_style_influencer_info[k]['likes']) + ' | ';
                                                                        }*/
                                    jQuery('.post_style_influencer_header').remove();
                                    jQuery('#sb_instagram').prepend(post_style_influencer_header.slice(0, -3) + '</h5></div>');

                                    //LINK DROPDOWN ITEM TO HANDLER
                                    jQuery('#sb_instagram').find('.jquery-dropdown-item')
                                        .on('click', function() {
                                            if(!sbiFilterMedia)
                                                return false;
                                            //now modify the chart and photoes
                                            var dd_user_id = jQuery(this).attr('data-user-id');
                                            var dd_user_name = jQuery(this).attr('data-user-name');
                                            jQuery('.dropdown-title-span').html(jQuery(this).html());
                                            var reps = views = 0;
                                            var foreach_Object = null;

                                            if(dd_user_name != '') {
                                                jQuery('#sbi_images .sbi_item').hide();
                                                jQuery('#sbi_images .sbi_user_' + dd_user_name).show();
                                                jQuery('#dropdown_posts').html(post_style_influencer_info[dd_user_id]['posts']);
                                                jQuery('#dropdown_likes').html(post_style_influencer_info[dd_user_id]['ints']);
                                                jQuery('#dropdown_statistics').html('<strong>'+dd_user_name+'</strong>: '+kFormatter(post_style_influencer_info[dd_user_id]['ints']/post_style_influencer_info[dd_user_id]['posts']));

                                                foreach_Object = jQuery('#sbi_images .sbi_user_' + dd_user_name);
                                                draw_chart_i(dd_user_id);
                                            }
                                            else{
                                                jQuery('#sbi_images .sbi_item').show();
                                                jQuery('#dropdown_posts').html(post_style_influencer_global['posts']);
                                                jQuery('#dropdown_likes').html(post_style_influencer_global['ints']);
                                                var keys = Object.keys(post_style_influencer_info),
                                                    i, len = keys.length;
                                                var sorted=[];
                                                for(i=0;i<len;i++)
                                                    sorted.push([keys[i],post_style_influencer_info[keys[i]]['ints']/post_style_influencer_info[keys[i]]['posts'],keys[i]]);
                                                sorted.sort(function(a,b){return b[1] - a[1]});

                                                var tmp_stats = '';
                                                for(i=0;i<len;i++){
                                                    //add usernames and posts of users
                                                    tmp_stats += '<strong>' + sorted[i][0] + '</strong>: ' + kFormatter(sorted[i][1]) +  ' | ';
                                                }
                                                jQuery('#dropdown_statistics').html(tmp_stats.slice(0,-3));

                                                foreach_Object = jQuery('#sbi_images .sbi_item');

                                                draw_chart_i();

                                            }



                                            foreach_Object.each(function(key, value){
                                                var sbi_id = jQuery(this).attr('id').substring(4);
                                                var sbi_type = "image";

                                                if(jQuery(this).hasClass('sbi_type_video'))
                                                    var sbi_type = "video";
                                                var item_view = post_sytle_view_data[sbi_id]['views'];
                                                if(sbi_type ==  "video")
                                                    reps += item_view;
                                                else
                                                    views += item_view;
                                            });
                                            jQuery("#dropdown_reps").html(commaSeparateNumber(reps));
                                            jQuery("#dropdown_views").html(commaSeparateNumber(views));

                                        });




                                    // jQuery('.single-content').append('<h2 style="text-align:center">PARAMETROS</h2><h5 style="text-align:center">MUESTRA DE 20 POSTS DONDE MENCIONA ALGUNA MARCA</h5><h5 style="text-align:center"><a href ="http://rank.social/sugerencias/" >¿MÁS DATA?</a></h5>');


                                    draw_chart_i();

                                    //we draw chart here
                                    function draw_chart_i(dd_user_id ) {

                                        if(dd_user_id == undefined)
                                            dd_user_id = null;
                                        //make a temporary data;
                                        var c_colors = ['#3366cc', '#dc3912', '#ff9900', '#e916e2', '#29e83f', '#29e8e6', '#4B2FBF', '#2FBF77', '#E5E530', '#D22121', '#0011FF', '#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF', '#CE7DB3', '#7DCE88', '#CEB97D'];

                                        var c_labels = [];
                                        var c_labels1 = [];
                                        var c_datasets = [];
                                        var c_row = {};
                                        var brand_info = {};
                                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                        ];
                                        created_times.sort();
                                        var offset = new Date().getTimezoneOffset() * 60;

                                        for (var i = 0; i < created_times.length; i++) {
                                            var dt = new Date((parseInt(exact_times[created_times[i]]) + parseInt(offset) ) * 1000);
                                            c_labels.push(monthNames[dt.getMonth()] + " " + (dt.getDate()) + ', ' + dt.getFullYear().toString().substr(2, 2)  );
                                            c_labels1.push(created_times[i]);
                                        }

                                        for (var i = 0; i < brands_array.length; i++) {
                                            //if (!tmp_datasets.hasOwnProperty(brands_array[i]))
                                                tmp_datasets[brands_array[i]] = {};
                                            for (var j = 0; j < created_times.length; j++) {
                                                //if (!tmp_datasets[brands_array[i]].hasOwnProperty(created_times[j]))
                                                    tmp_datasets[brands_array[i]][created_times[j]] = 0;
                                            }
                                        }
                                        //finished format
                                        //now insert the valid values
                                        for (var keyword_influencer in tmp_post_array) {
                                            var item = tmp_post_array[keyword_influencer];
                                            for (var created_time in item) {
                                                tmp_datasets[keyword_influencer][parseInt(item[created_time].created_time)] += item[created_time].ints;
                                                brand_info[keyword_influencer] = item['keyword_origin'];
                                            }
                                        }

                                        //console.log(created_times);console.log(tmp_datasets);console.log(tmp_post_array);console.log(brand_info);console.log(brands_array);
                                        var c_datasets = [];
                                        var post_count_arr = [];
                                        for (var i = 0; i < brands_array.length; i++) {
                                            if(dd_user_id != null && dd_user_id != brands_array[i])
                                                continue;
                                            var c_t_label = brand_info[brands_array[i]] + "(" + post_style_influencer_info[brands_array[i]]['posts'] + "Posts)";
                                            var c_bgcolor = c_colors[i];
                                            var c_t_data = [];
                                            //console.log(brands_array[i]);console.log(tmp_datasets[brands_array[i]]);

                                            for (var j = 0; j < created_times.length; j++) {

                                                c_t_data.push(tmp_datasets[brands_array[i]][created_times[j]]);
                                            }
                                            if(dd_user_id != null)
                                            {
                                                for(var j=created_times.length - 1;j>=0;j--)
                                                    if(tmp_datasets[brands_array[i]][created_times[j]] == 0)
                                                    {
                                                        c_t_data.splice(j,1);
                                                        c_labels.splice(j,1);
                                                        c_labels1.splice(j,1);
                                                    }
                                            }


                                            c_datasets.push({
                                                label: c_t_label,
                                                data: c_t_data,
                                                backgroundColor: c_bgcolor
                                            });
                                            post_count_arr.push(brand_info[brands_array[i]]);
                                        }

                                        //console.log(c_datasets);
                                        //generate chart
                                        var ctx = document.getElementById("myChart").getContext("2d");
                                        var chart_height = 300 + (c_datasets.length / 5) * 50;
                                        jQuery("#myChart_wrapper_div").height(chart_height);
                                        if(myChart != undefined)
                                            myChart.destroy();
                                        myChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: {
                                                labels: c_labels,
                                                datasets: c_datasets
                                            },
                                            options: {
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: true
                                                        }
                                                    }]
                                                },
                                                tooltips: {
                                                    callbacks: {
                                                        label: function(tooltipItem, data) {
                                                            var dataset_index = tooltipItem.datasetIndex;
                                                            var t_index = tooltipItem.index;
                                                            var keyword_index = post_count_arr[dataset_index].replace(/[@#]+/gi, '');
                                                            return post_count_arr[dataset_index]+"("+ tmp_post_array[keyword_index][c_labels1[t_index]]['post_count'] +" Posts):" + tooltipItem['yLabel'];
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                        document.getElementById("myChart").onclick = function(evt){
                                            if(!sbiFilterMedia)
                                                return false;
                                            var activePoints = myChart.getElementAtEvent(evt);
                                            // use _datasetIndex and _index from each element of the activePoints array
                                            if(activePoints.length) {
                                                var dataset_index = activePoints[0]._datasetIndex;
                                                var t_index = activePoints[0]._index;
                                                var keyword_index = post_count_arr[dataset_index].replace(/[@#]+/gi, '');

                                                jQuery('.sbi_item').hide();
                                                jQuery.each(tmp_post_array[keyword_index][c_labels1[t_index]]['media_ids'], function (index, entry) {
                                                    jQuery('#sbi_' + entry).show();
                                                })
                                            }else{
                                                jQuery('.sbi_item').show();
                                            }
                                        };
                                    }
                                }


                            }



                            /* Scripts for each feed */
                            $self.find('.sbi_item').each(function(){

                                var $self = jQuery(this),
                                    $sbi_link_area = $self.find('.sbi_link_area'),
                                    linkHref = $sbi_link_area.attr('href');

                                //Change lightbox image to be full size
                                var $sbi_lightbox = jQuery('#sbi_lightbox');
                                $self.find('.sbi_lightbox_link').click(function(){
                                    $sbi_lightbox.removeClass('sbi_video_lightbox');
                                    if( $self.hasClass('sbi_type_video') ){
                                        $sbi_lightbox.addClass('sbi_video_lightbox');
                                        //Add the image as the poster so doesn't show an empty video element when clicking the first video link
                                        jQuery('.sbi_video').attr({
                                            'poster' : jQuery(this).attr('href')
                                        });

                                    }
                                });

                                //Expand post
                                var $post_text = $self.find('.sbi_info .sbi_caption'),
                                    text_limit = feedOptions.captionlength;
                                if (typeof text_limit === 'undefined' || text_limit == '') text_limit = 99999;

                                //Set the full text to be the caption (used in the image alt)
                                //var full_text = $self.find('.sbi_photo img').attr('alt');

                                //Set the full text to be keywords list
                                var full_text = $self.find('.sbi_info .sbi_caption').html();
                                if(full_text == undefined) full_text = '';
                                var short_text = full_text.substr(0,text_limit);

                                //Cut the text based on limits set
                                $post_text.html( short_text );

                                //Show the 'See More' link if needed
                                if (full_text.length > text_limit) $self.find('.sbi_expand').show();
                                //Click function
                                $self.find('.sbi_expand a').unbind('click').bind('click', function(e){
                                    e.preventDefault();
                                    var $expand = jQuery(this),
                                        $more = $expand.find('.sbi_more');
                                    if ( $self.hasClass('sbi_caption_full') ){
                                        $post_text.html( short_text );
                                        $self.removeClass('sbi_caption_full');
                                    } else {
                                        $post_text.html( full_text );
                                        $self.addClass('sbi_caption_full');
                                    }
                                });

                                //Photo links
                                //If lightbox is disabled
                                if( disablelightbox == 'true' ){
                                    if( !sbiTouchDevice ){ //Only apply hover effect if not touch screen device
                                        $self.find('.sbi_photo').hover(function(){
                                            jQuery(this).fadeTo(200, 0.85);
                                        }, function(){
                                            jQuery(this).stop().fadeTo(500, 1);
                                        });
                                    }
                                    //If lightbox is enabled add lightbox links
                                } else {

                                    var $sbi_photo_wrap = $self.find('.sbi_photo_wrap'),
                                        $sbi_link = $sbi_photo_wrap.find('.sbi_link');

                                    if(sbiTouchDevice || feedOptions.hovereffect == 'none'){
                                        //launch lightbox on click
                                        $sbi_link.css('background', 'none').show();
                                        $sbi_link.find('*').hide().end().find('.sbi_link_area').show();
                                    } else {
                                        //Fade in links on hover
                                        $sbi_photo_wrap.hover(function(){
                                            $sbi_link.fadeIn(200);

                                            //Zoom effect
                                            $self.addClass('sbi_animate');
                                        }, function(){
                                            $sbi_link.stop().fadeOut(600);

                                            //Zoom effect
                                            $self.removeClass('sbi_animate');
                                        });

                                    }

                                }

                            }); //End .sbi_item each



                            //Lightbox hide photo function
                            jQuery('.sbi_lightbox_action a').unbind().bind('click', function(){
                                jQuery(this).parent().find('.sbi_lightbox_tooltip').toggle();
                            });


                            //Sort posts by date or likes
                            //only sort the new posts that are loaded in, not the whole feed, otherwise some photos will switch positions due to dates
                            //$self.find('#sbi_images .sbi_item.sbi_new').sort(function (a, b) {
                            $self.find('#sbi_images .sbi_item.sbi_new').sort(function (a, b) {
                                var aComp = jQuery(a).attr("data-date"),
                                    bComp = jQuery(b).attr("data-date");
                                jQuery(a).attr('data-likes');

                                var int1 = jQuery(a).attr('data-ints')
                                var int2 = jQuery(b).attr('data-ints')

                                if(sortby == 'none'){
                                    //Order by date
                                    return bComp - aComp;
                                } else if(sortby == 'most-liked'){
                                    return int2 - int1;

                                }else if(sortby == 'least-liked'){
                                    return int1 - int2;

                                }
                                else{
                                    //Randomize
                                    return (Math.round(Math.random())-0.5);
                                }

                            }).appendTo( $self.find("#sbi_images") );

                            //Remove the new class after 500ms, once the sorting is done
                            setTimeout(function(){
                                jQuery('#sbi_images .sbi_item.sbi_new').removeClass('sbi_new');
                                //Reset the morePosts variable so we can check whether there are more posts every time the Load More button is clicked
                                morePosts = [];
                            }, 500);

                            if(has_to_sort == true) {
                                jQuery('#sbi_images  div.sbi_item').sort(function (a, b) {
                                    var aComp = jQuery(a).attr("data-date"),
                                        bComp = jQuery(b).attr("data-date");
                                    jQuery(a).attr('data-likes');

                                    if (sortby == 'none') {
                                        //Order by date
                                        return bComp - aComp;
                                    } else if (sortby == 'most-liked') {
                                        return jQuery(b).attr('data-likes') - jQuery(a).attr('data-likes');

                                    } else if (sortby == 'least-liked') {
                                        return jQuery(a).attr('data-likes') - jQuery(b).attr('data-likes');

                                    }
                                    else {
                                        //Randomize
                                        return (Math.round(Math.random()) - 0.5);
                                    }

                                }).appendTo('#sbi_images');

                            }


                            var imagesArrLength = imagesArr.data.length;

                            //Adjust the imagesArr length to account for the hidden photos
                            // imagesArrLength = parseInt(imagesArrLength) - parseInt(removedPhotosCount); //June 13 2016 - the imagesArr length is already adjusted earlier and so don't need to adjust it again here

                            //Check initially whether we should show the Load More button. If it's coordinates then if the last API request returns no photos then there are no more to show.
                            if( ( (imagesArrCount >= imagesArrLength) && noMoreData ) || (getType == 'coordinates' && images.data.length == 0) ){
                                $loadBtn.hide();
                            }

                            //Load More button
                            $self.find('#sbi_load .sbi_load_btn').off().on('click', function(){

                                $loadBtn.find('.fa-spinner').show();
                                $loadBtn.find('.sbi_btn_text').css('opacity', 0);

                                //Check the global var to see where we are in the array
                                imagesArrCount = parseInt(imagesArrCount);

                                //Adjust the imagesArr length to account for the hidden photos
                                imagesArrLength = imagesArr.data.length;
                                // imagesArrLength = parseInt(imagesArrLength) - parseInt(removedPhotosCount); //June 13 2016 - the imagesArr length is already adjusted earlier and so don't need to adjust it again here

                                //If there are enough photos left in the array then display them
                                if( (imagesArrCount + num) < imagesArrLength || noMoreData ){

                                    sbiBuildFeed(images, transientName, sbiSettings, $self,true);
                                    //console.log('phase 1');
                                    //Unset the flag so that we know not to add these photos to the imagesArr again
                                    sbiNewData = false;

                                    //If there are no photos left in the array and there's no more data to load then hide the load more button
                                    if( ( (imagesArrCount >= imagesArrLength) && noMoreData ) || (getType == 'coordinates' && images.data.length == 0) ){
                                        $loadBtn.hide();
                                    }

                                    //Else if there aren't enough photos left then hit the api again
                                } else {
                                    sbiFetchURL = imagesArr.pagination.next_url;
                                    sbiFetchData(sbiFetchURL, transientName, sbiSettings, $self,true);

                                    //Set the flag so that we know to add the new photos to the imagesArr
                                    sbiNewData = true;
                                    //Reset this to zero so that we can limit requests to 3 per button click
                                    apiRequests = 0;
                                }
/*
                                setTimeout(function() {

                                    jQuery('#sbi_images  div.sbi_item').sort(function (a, b) {
                                        sortby = feedOptions.sortby;
                                        var aComp = jQuery(a).attr("data-date"),
                                            bComp = jQuery(b).attr("data-date");
                                        jQuery(a).attr('data-likes');

                                        if (sortby == 'none') {
                                            //Order by date
                                            return bComp - aComp;
                                        } else if (sortby == 'most-liked') {
                                            return jQuery(b).attr('data-likes') - jQuery(a).attr('data-likes');

                                        } else if (sortby == 'least-liked') {
                                            return jQuery(a).attr('data-likes') - jQuery(b).attr('data-likes');

                                        }
                                        else {
                                            //Randomize
                                            return (Math.round(Math.random()) - 0.5);
                                        }

                                    }).appendTo('#sbi_images');
                                },100);
*/

                            }); //End click event

                            // Call Custom JS if it exists
                            if (typeof sbi_custom_js == 'function') setTimeout(function(){ sbi_custom_js(); }, 100);

                            if( imgRes !== 'thumbnail' ){
                                //This needs to be here otherwise it results in the following error for some sites: $self.find(...).sbi_imgLiquid() is not a function.
                                /*! imgLiquid v0.9.944 / 03-05-2013 https://github.com/karacas/imgLiquid */
                                var sbi_imgLiquid=sbi_imgLiquid||{VER:"0.9.944"};sbi_imgLiquid.bgs_Available=!1,sbi_imgLiquid.bgs_CheckRunned=!1,function(i){function t(){if(!sbi_imgLiquid.bgs_CheckRunned){sbi_imgLiquid.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(sbi_imgLiquid.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({sbi_imgLiquid:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(c.attr("src")))&&u.css({"background-image":'url("'+encodeURI(c.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,c),u.addClass("sbi_imgLiquid_bgSize"),u.addClass("sbi_imgLiquid_ready"),l()}function o(){function e(){c.data("sbi_imgLiquid_error")||c.data("sbi_imgLiquid_loaded")||c.data("sbi_imgLiquid_oldProcessed")||(u.is(":visible")&&c[0].complete&&c[0].width>0&&c[0].height>0?(c.data("sbi_imgLiquid_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(c.data("oldSrc")&&c.data("oldSrc")!==c.attr("src")){var a=c.clone().removeAttr("style");return a.data("sbi_imgLiquid_settings",c.data("sbi_imgLiquid_settings")),c.parent().prepend(a),c.remove(),c=a,c[0].width=0,void setTimeout(o,10)}return c.data("sbi_imgLiquid_oldProcessed")?void r():(c.data("sbi_imgLiquid_oldProcessed",!1),c.data("oldSrc",c.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),c.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),c.on("error",n),c[0].onerror=n,e(),void d())}function d(){(g.responsive||c.data("sbi_imgLiquid_oldProcessed"))&&c.data("sbi_imgLiquid_settings")&&(g=c.data("sbi_imgLiquid_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(d,g.responsiveCheckTime))}function n(){c.data("sbi_imgLiquid_error",!0),u.addClass("sbi_imgLiquid_error"),g.onItemError&&g.onItemError(t,u,c),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-sbi_imgLiquid-fill"),e=u.attr("data-sbi_imgLiquid-horizontalAlign"),o=u.attr("data-sbi_imgLiquid-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===o||"top"!==o&&"bottom"!==o&&"center"!==o&&-1===o.indexOf("%")||(i.verticalAlign=o)}return sbi_imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,o,d,n,s,r,m=0,h=0,f=u.width(),v=u.height();void 0===c.data("owidth")&&c.data("owidth",c[0].width),void 0===c.data("oheight")&&c.data("oheight",c[0].height),g.fill===f/v>=c.data("owidth")/c.data("oheight")?(i="100%",e="auto",a=Math.floor(f),o=Math.floor(f*(c.data("oheight")/c.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(c.data("owidth")/c.data("oheight"))),o=Math.floor(v)),d=g.horizontalAlign.toLowerCase(),s=f-a,"left"===d&&(h=0),"center"===d&&(h=.5*s),"right"===d&&(h=s),-1!==d.indexOf("%")&&(d=parseInt(d.replace("%",""),10),d>0&&(h=s*d*.01)),n=g.verticalAlign.toLowerCase(),r=v-o,"left"===n&&(m=0),"center"===n&&(m=.5*r),"bottom"===n&&(m=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(m=r*n*.01)),g.hardPixels&&(i=a,e=o),c.css({width:i,height:e,"margin-left":Math.floor(h),"margin-top":Math.floor(m)}),c.data("sbi_imgLiquid_oldProcessed")||(c.fadeTo(g.fadeInTime,1),c.data("sbi_imgLiquid_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("sbi_imgLiquid_nobgSize"),u.addClass("sbi_imgLiquid_ready")),g.onItemFinish&&g.onItemFinish(t,u,c),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),c=i("img:first",u);return c.length?(c.data("sbi_imgLiquid_settings")?(u.removeClass("sbi_imgLiquid_error").removeClass("sbi_imgLiquid_ready"),g=i.extend({},c.data("sbi_imgLiquid_settings"),a.options)):g=i.extend({},a.settings,s()),c.data("sbi_imgLiquid_settings",g),g.onItemStart&&g.onItemStart(t,u,c),void(sbi_imgLiquid.bgs_Available&&g.useBackgroundSize?e():o())):void n()})}})}(jQuery);

                                // Use imagefill to set the images as backgrounds so they can be square
                                !function () {
                                    var css = sbi_imgLiquid.injectCss,
                                        head = document.getElementsByTagName('head')[0],
                                        style = document.createElement('style');
                                    style.type = 'text/css';
                                    if (style.styleSheet) {
                                        style.styleSheet.cssText = css;
                                    } else {
                                        style.appendChild(document.createTextNode(css));
                                    }
                                    head.appendChild(style);
                                }();
                                $self.find(".sbi_photo").sbi_imgLiquid({fill:true});
                            }

                            //Only check the width once the resize event is over
                            var sbi_delay = (function(){
                                var sbi_timer = 0;
                                return function(sbi_callback, sbi_ms){
                                    clearTimeout (sbi_timer);
                                    sbi_timer = setTimeout(sbi_callback, sbi_ms);
                                };
                            })();


                            jQuery(window).resize(function(){
                                sbi_delay(function(){
                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();
                                }, 500);
                            });

                            //Resize image height
                            function sbiSetPhotoHeight(){

                                if( imgRes !== 'thumbnail' ){
                                    var sbi_photo_width = $self.find('.sbi_photo').eq(0).innerWidth();

                                    //Figure out number of columns for either desktop or mobile
                                    var sbi_num_cols = parseInt(cols);

                                    if( !$self.hasClass('sbi_disable_mobile') ){
                                        var sbiWindowWidth = jQuery(window).width();
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7 ) ) sbi_num_cols = 2;
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11 ) ) sbi_num_cols = 4;
                                        if( sbiWindowWidth <= 480 && parseInt(cols) > 2 ) sbi_num_cols = 1;
                                    }

                                    //Figure out what the width should be using the number of cols
                                    var sbi_photo_width_manual = ( $self.find('#sbi_images').width() / sbi_num_cols ) - (imagepadding*2);

                                    //If the width is less than it should be then set it manually
                                    if( sbi_photo_width <= (sbi_photo_width_manual) ) sbi_photo_width = sbi_photo_width_manual;

                                    $self.find('.sbi_photo').css('height', sbi_photo_width);
                                }

                            }
                            if(carousel == false) sbiSetPhotoHeight();

                            /* Detect when element becomes visible. Used for when the feed is initially hidden, in a tab for example. https://github.com/shaunbowe/jquery.visibilityChanged */
                            !function(i){var n={callback:function(){},runOnLoad:!0,frequency:100,sbiPreviousVisibility:null},c={};c.sbiCheckVisibility=function(i,n){if(jQuery.contains(document,i[0])){var e=n.sbiPreviousVisibility,t=i.is(":visible");n.sbiPreviousVisibility=t,null==e?n.runOnLoad&&n.callback(i,t):e!==t&&n.callback(i,t),setTimeout(function(){c.sbiCheckVisibility(i,n)},n.frequency)}},i.fn.sbiVisibilityChanged=function(e){var t=i.extend({},n,e);return this.each(function(){c.sbiCheckVisibility(i(this),t)})}}(jQuery);

                            //If the feed is initially hidden (in a tab for example) then check for when it becomes visible and set then set the height
                            jQuery(".sbi").filter(':hidden').sbiVisibilityChanged({
                                callback: function(element, visible) {
                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();
                                },
                                runOnLoad: false
                            });

                            if(carousel == true){
                                setTimeout(function(){
                                    //Initiate carousel
                                    if( !carouselautoplay ) carouseltime = false;

                                    //Set defaults for responsive breakpoints
                                    var itemsDesktop = false; itemsDesktopSmall = false; itemsTablet = false; itemsTabletSmall = [639,2]; itemsMobile = [480,1];

                                    //Disable mobile layout
                                    if( $self.hasClass('sbi_disable_mobile') ){
                                        itemsTabletSmall = false; itemsMobile = false;
                                    } else {
                                        var sbiWindowWidth = jQuery(window).width();
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7 ) ) itemsTabletSmall = [639,2];
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11 ) ) itemsTabletSmall = [639,4];
                                        if( sbiWindowWidth <= 480 && parseInt(cols) != 2 ) itemsMobile = [480,1];
                                        if( sbiWindowWidth <= 480 && parseInt(cols) == 2 ) itemsMobile = [480,2]; //If the cols are set to 2 then don't change to 1 col on mobile
                                    }

                                    $self.find(".sbi_carousel").sbi_owlCarousel({
                                        items: cols,
                                        navigation: carouselarrows,
                                        navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
                                        pagination: carouselpag,
                                        autoPlay: carouseltime,
                                        stopOnHover: true,
                                        itemsDesktop: itemsDesktop,
                                        itemsDesktopSmall: itemsDesktopSmall,
                                        itemsTablet: itemsTablet,
                                        itemsTabletSmall: itemsTabletSmall,
                                        itemsMobile: itemsMobile
                                    });

                                    //Fade in the carousel items
                                    jQuery('#sb_instagram #sbi_images.sbi_carousel .sbi_item').fadeIn();

                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();

                                    //Set the position of the arrows
                                    var sbi_arrows_top = ($self.find('.sbi_photo').eq(0).innerWidth()/2);
                                    if(imagepaddingunit == 'px') sbi_arrows_top += parseInt(imagepadding)*2;
                                    $self.find('.sbi_owl-buttons div').css('top', sbi_arrows_top);

                                }, 500);
                            } // End carousel

                            function sbiGetItemSize(){
                                $self.removeClass('sbi_small sbi_medium');
                                var sbiItemWidth = $self.find('.sbi_item').innerWidth();
                                if( sbiItemWidth > 120 && sbiItemWidth < 240 ){
                                    $self.addClass('sbi_medium');
                                } else if( sbiItemWidth <= 120 ){
                                    $self.addClass('sbi_small');
                                }
                            }
                            if(carousel !== true) sbiGetItemSize();

                        } // End sbiAfterImagesLoaded() function


                    } //End buildFeed function
                    function getCDate(timestamp)
                    {
                        var date = new Date(timestamp);
                        var theyear = date.getFullYear();
                        var themonth=(date.getMonth()+1 < 10) ? '0' + (date.getMonth()+1): date.getMonth()+1;
                        var thetoday=(date.getDate() < 10) ? '0'+date.getDate(): date.getDate();
                        return thetoday+"/"+themonth+"/"+theyear;
                    }
                    function getCTime(timestamp)
                    {
                        var date = new Date(timestamp);
                        var thehour = (date.getHours() < 10) ? '0'+date.getHours():date.getHours();
                        var theminute = (date.getMinutes() < 10) ? '0'+date.getMinutes():date.getMinutes();
                        var txt = (thehour < 12) ? " am" : " pm";
                        thehour = (thehour < 13) ? thehour : thehour - 12 ;
                        return thehour+":"+theminute + txt;
                    }
                    function sbiFeedToTable(feedItem, brands)
                    {
                        var curtime = getCDate(new Date().getTime());
                        if(post_style == "product_influencer")
                            export_file_name = "Influencer-@" + feedItem.user.username;
                        else if(post_style == "product"){
                            export_file_name = "Brand-" + brands.split(",")[0];
                        }else{
                            if(sb_instagram_js_options['sb_page_id'] == 3046)
                                export_file_name = "Search";
                            else
                                export_file_name = "Ranking";
                        }
                        export_file_name += "-" + curtime;
                        var offset = new Date().getTimezoneOffset() * 60;
                        var created_tiem = parseInt(feedItem.created_time);
                        var ctimestamp = (created_tiem - offset) * 1000;
                        var date = getCDate(ctimestamp);
                        var time =  getCTime(ctimestamp);
                        var influencer = feedItem.user.username;
                        var comments = feedItem.comments.count;
                        var likes = feedItem.likes.count;
                        var type = feedItem.type;
                        var link = feedItem.link;
                        var contents = feedItem.caption != null?feedItem.caption.text:'';
                        contents = contents.replace(/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_.,;:\/\\-]+/gi, ' ');
                        contents = contents.replace(/[\n\r]+/gi, ' ');
                        contents = contents;
                        brands = brands;

                        var t_array = [date,time,influencer,comments,likes,type,link,brands,contents];
                        export_table_data.push(t_array);
                    }
                    function commaSeparateNumber(val){
                        while (/(\d+)(\d{3})/.test(val.toString())){
                            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                        }
                        return val;
                    }
                    function kFormatter(num) {
                        num = parseFloat(num);
                        var result =  num > 999 ? (num/1000).toFixed(1) : num.toFixed(1);
                        if((result * 10) % 10 == 0)
                            result = parseInt(result);
                        if(num > 999) result += 'K';
                        return result;
                    }
                    function rFormatter(num) {
                        num = parseFloat(num);
                        var result =  num.toFixed(3);
                        if((result * 100) % 100 == 0)
                            result = num.toFixed(2);
                        return result
                    }
                    function sbiBuildHeader(data, sbiSettings){

                        var feedOptions = sbiSettings.feedOptions,
                            headerStyles = '';
                        if(feedOptions.headercolor.length) headerStyles = 'style="color: #'+feedOptions.headercolor+'"';

                        $header_url = (feedOptions.sbiPermalink == "") ? "http://rank.social/"+data.data.username : feedOptions.sbiPermalink;

                        // $header = '<h3 style="float:right;font-size:32px;"> RANK #'+sbiSettings.rank+' </h3>';
                        // //$header += '<a href="http://rank.social/'+data.data.username+'" title="Click para ver estadísticas de @'+data.data.username+'" class="sbi_header_link" '+headerStyles+'>';
                        // $header += '<a href="' + $header_url + '" class="sbi_header_link" '+headerStyles+'>';
                        // $header += '<div class="sbi_header_text';
                        // if( data.data.bio.length < 1 || feedOptions.showbio != 'true' ) $header += ' sbi_no_bio';
                        // if( (data.data.bio.length == 0 || feedOptions.showbio != 'true') && feedOptions.showfollowers != 'true' ) $header += ' sbi_no_info';
                        // $header += '">';

                        // $header += '<h3 '+headerStyles+'>'+data.data.username+' <i class="fa fa-bar-chart" aria-hidden="true"></i></h3>';

                        // //Compile and add the header info
                        // $headerInfo = '<p class="sbi_bio_info" ';
                        // if(feedOptions.headerstyle == 'boxed'){
                        //     $headerInfo += 'style="color: #' + feedOptions.headerprimarycolor + ';"';
                        // } else {
                        //     $headerInfo += headerStyles;
                        // }

                        // //$headerInfo += '><span class="sbi_posts_count"><i class="fa fa-photo"></i>'+commaSeparateNumber(data.data.counts.media)+'</span><span class="sbi_followers"><i class="fa fa-user" style="margin-right: 3px;"></i>'+commaSeparateNumber(data.data.counts.followed_by)+'</span></p>';
                        // $headerInfo += '><span title="Número actual de seguidores" class="sbi_followers">FOLLOWERS : '+kFormatter(data.data.counts.followed_by)+'</span><span> | </span><span class="sbi_followers" title="Interacciones por post promedio">ÍNDICE : '+sbiSettings.todos+' Likes/Post</span>';
                        // if(sbiShowHighlight)                           
                        //     $headerInfo += '<span> | </span><span title="Porcentaje de posts donde mencionan marcas" class="sbi_posts_count">POSTS DE MARCAS : '+sbiSettings.percentage+'%</span><span> | </span><span title="Interacciones por post promedio donde mencionan marcas" class="sbi_followers">ÍNDICE DE MARCAS : '+sbiSettings.marcas+' Likes/Post</span></p>';
                        // if(feedOptions.showfollowers != '' && feedOptions.showfollowers != 'false' && feedOptions.headerstyle !== 'boxed') $header += $headerInfo;

                        // //Add the bio
                        // if( data.data.bio.length > 1 && feedOptions.showbio != '' && feedOptions.showbio != 'false' ) $header += '<p class="sbi_bio" '+headerStyles+'>'+data.data.bio+'</p>';

                        // $header += '</div>';
                        // $header += '<div class="sbi_header_img">';
                        // $header += '<div class="sbi_header_img_hover"><i class="sbi_new_logo"></i></div>';
                        // $header += '<img src="'+data.data.profile_picture+'" alt="'+data.data.full_name+'" width="50" height="50">';
                        // $header += '</div>';
                        // $header += '</a>';
                        // if(feedOptions.headerstyle == 'boxed') {
                        //     $header += '<div class="sbi_header_bar" style="background: #'+feedOptions.headersecondarycolor+'">';
                        //     if(feedOptions.showbio != 'false') $header += $headerInfo
                        //     $header += '<a class="sbi_header_follow_btn" href="https://instagram.com/'+data.data.username+'" target="_blank" style="color: #'+feedOptions.headercolor+'; background: #'+feedOptions.headerprimarycolor+';"><i class="sbi_new_logo"></i><span></span></div></div>';
                        // }
/** New **/

                        $header = '<a href="' + $header_url + '" class="sbi_header_link" '+headerStyles+'>';
                        $header += '<div class="sbi_header_text';
                        if( data.data.bio.length < 1 || feedOptions.showbio != 'true' ) $header += ' sbi_no_bio';
                        if( (data.data.bio.length == 0 || feedOptions.showbio != 'true') && feedOptions.showfollowers != 'true' ) $header += ' sbi_no_info';
                        $header += '">';

                        $header += '<div><div class="div1">';
                        $header += '<p class="rank_p" '+headerStyles+'>#'+sbiSettings.rank+'</p>';
                        $header += '<p class="user_name" '+headerStyles+'><span>@</span>'+data.data.username+'</p>';
                        $header += '</div>';
                        $header += '<div class="div2" ' + (!sbiShowHighlight?'style="bottom:0px"':'') +'>';
                        $header += '<i class="fa fa-bar-chart" aria-hidden="true"></i><p>VER PERFIL</p>';
                        $header += '</div><div style="clear:both"></div></div>';
                        //Compile and add the header info

                        $headerInfo = '<div class="header_index_info"><p class="sbi_bio_info" ';
                        if(feedOptions.headerstyle == 'boxed'){
                            $headerInfo += 'style="color: #' + feedOptions.headerprimarycolor + ';"';
                        } else {
                            $headerInfo += headerStyles;
                        }

                        $headerInfo += '><span class="sbi_followers" title="Interacciones por post promedio">ÍNDICE : '+kFormatter(sbiSettings.todos)+' Int . / Post</span><span> | </span><span title="Número actual de seguidores" class="sbi_followers">FOLLOWERS : <b>'+kFormatter(data.data.counts.followed_by)+'</b></span></p>';

                        if(sbiShowHighlight)
                            $headerInfo += '<p class="sbi_bio_info1"><span title="Porcentaje de posts donde mencionan marcas" class="sbi_posts_count"><span class="full_view">POSTS DE </span>MARCAS : <b>'+kFormatter(sbiSettings.percentage)+'%</b></span><span> | </span><span title="Interacciones por post promedio donde mencionan marcas" class="sbi_followers">ÍNDICE<span class="full_view"> DE MARCAS</span> : <b>'+kFormatter(sbiSettings.marcas)+' Int . / Post</></span><span class="marcas_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></span></p>';
                        $headerInfo += '</div>';
                        if(feedOptions.showfollowers != '' && feedOptions.showfollowers != 'false' && feedOptions.headerstyle !== 'boxed') $header += $headerInfo;

                        $header += '</div>';
                        $header += '<div class="sbi_header_img">';
                        $header += '<div class="sbi_header_img_hover"><i class="sbi_new_logo"></i></div>';
                        $header += '<img src="'+data.data.profile_picture+'" alt="'+data.data.full_name+'" width="82" height="82">';
                        $header += '</div>';
                        $header += '</a>';
                        if(feedOptions.headerstyle == 'boxed') {
                            $header += '<div class="sbi_header_bar" style="background: #'+feedOptions.headersecondarycolor+'">';
                            if(feedOptions.showbio != 'false') $header += $headerInfo
                            $header += '<a class="sbi_header_follow_btn" href="https://instagram.com/'+data.data.username+'" target="_blank" style="color: #'+feedOptions.headercolor+'; background: #'+feedOptions.headerprimarycolor+';"><i class="sbi_new_logo"></i><span></span></div></div>';
                        }
/** End**/
                        var export_header_row = [sbiSettings.rank,data.data.username,data.data.counts.followed_by,sbiSettings.todos,sbiSettings.percentage/100,sbiSettings.marcas];
                        export_table_header_data.push(export_header_row);

                        //Add the header to the feed
                        if( $self.find('.sbi_header_link').length == 0 ) $self.find('.sb_instagram_header').prepend( $header );

                        //Change the URL of the follow button
                        if( $self.find('.sbi_follow_btn').length ) $self.find('.sbi_follow_btn a').attr('href', 'https://instagram.com/' + data.data.username );
                        //Change the text of the header follow button
                        if( feedOptions.headerstyle == 'boxed' && $self.find('.sbi_header_follow_btn').length ) $self.find('.sbi_header_follow_btn span').text( $self.find('.sb_instagram_header').attr('data-follow-text').replace(/\\/g, "") );


                        //Header profile pic hover
                        $self.find('.sb_instagram_header .sbi_header_link').hover(function(){
                            $self.find('.sb_instagram_header .sbi_header_img_hover').fadeIn(200);
                        }, function(){
                            $self.find('.sb_instagram_header .sbi_header_img_hover').stop().fadeOut(600);
                        });

                    } // End sbiBuildHeader()


                    function sbiFetchData(next_url, transientName, sbiSettings, $self,has_to_sort ) {
                        if(has_to_sort == undefined)
                            has_to_sort = false;

                        apiURLs = next_url;
                        var urlCount = apiURLs.length,
                            feedOptions = sbiSettings.feedOptions,
                            getType = sbiSettings.getType;

                        //If the apiURLs array is empty then this means that there's no more next_urls and so hide the load more button
                        if( urlCount == 0 ){

                            //Don't hit the API any more
                            //If there's no more photos to retrieve then hide the load more button
                            if( imagesArrCount + parseInt(sbiSettings.num) >= imagesArr.data.length ){
                                //Hide the Load More button
                                jQuery('#sbi_load .sbi_load_btn').hide();
                            }

                        } else {

                            var returnedImages = [],
                                numberOfRequests = urlCount;
                            // console.log(numberOfRequests);
                            console.log(apiURLs);
                            jQuery.each(apiURLs, function(index, entry){

                                jQuery.ajax({
                                    method: "GET",
                                    url: entry,
                                    dataType: "jsonp",
                                    timeout: 180000,
                                    error: function (parsedjson, textStatus, errorThrown) {
                                        jQuery('#sb_instagram').empty().append("<h3 class=\"expire_h\">En estos momentos estamos experimentando una alta demanda debido al tráfico.  Intente nuevamente dentro de un rato.</h3>");
                                    },
                                    success: function(data) {
                                        //Pretty error messages
                                        var sbiErrorResponse = data.meta.error_message,
                                            sbiErrorMsg = '',
                                            sbiErrorDir = '';
                                        var sbiErrorCode = data.meta.code;
                                        numberOfRequests--;

                                        if(typeof sbiErrorResponse !== 'undefined'){

                                            // if( sbiErrorResponse.indexOf('access_token') > -1 ){
                                            //     sbiErrorMsg += '<p><b>Error: Access Token is not valid or has expired</b><br /><span>This error message is only visible to WordPress admins</span>';
                                            //     sbiErrorDir = "<p>There's an issue with the Instagram Access Token that you are using. Please obtain a new Access Token on the plugin's Settings page.<br />If you continue to have an issue with your Access Token then please see <a href='https://smashballoon.com/my-instagram-access-token-keep-expiring/' target='_blank'>this FAQ</a> for more information.";
                                            // } else if( sbiErrorResponse.indexOf('user does not exist') > -1 || sbiErrorResponse.indexOf('you cannot view this resource') > -1 ){
                                            //     sbiErrorMsg += '<p><b>Error: User IDs does not exist, is invalid, or private</b><br /><span>This error is only visible to WordPress admins</span>';
                                            //     sbiErrorDir = "<p>Please double check the Instagram User ID that you are using and ensure that it is valid and not from a private account. To find your User ID simply enter your Instagram user name into this <a href='https://smashballoon.com/instagram-feed/find-instagram-user-id/' target='_blank'>tool</a>.</p>";
                                            // } else if( sbiErrorResponse.indexOf('invalid media id') > -1 ){
                                            //     sbiErrorMsg += '<p><b>Error: Post Id does not exist or is invalid</b><br /><span>This error is only visible to WordPress admins.</span>';
                                            //     sbiErrorDir = "<p>Please double check the media (post) id is correct.</p>";
                                            // }

                                            //Add the error message to the feed
                                            // jQuery('#sb_instagram').empty().append( '<p style="text-align: center;">Unable to show Instagram photos</p><div id="sbi_mod_error">' + sbiErrorMsg + sbiErrorDir + '</div>');
                                            if( sbiErrorResponse.indexOf('access_token') > -1 || sbiErrorCode == "409") {
                                                jQuery('#sb_instagram').empty().append("<h3 class=\"expire_h\">En estos momentos estamos experimentando una alta demanda debido al tráfico.  Intente nuevamente dentro de un rato.</h3>");

                                            }
                                            //Exit and don't continue running the script
                                            return;

                                        }

                                        //If it's a coordinates type then add the existing URL to the object so that we can use it to create the next URL for pagination
                                        if( getType == 'coordinates' ) data.pagination = {'previous_url':entry};

                                        returnedImages.push(data);
/*                                      console.log(numberOfRequests);
                                        console.log(data);
                                        console.log(returnedImages);
*/
                                        //numberOfRequests--;
                                        if(numberOfRequests == 0) sbiImagesReady(getType,has_to_sort);

                                    }
                                })
                            });

                            //When all of the images have been returned then pass them to the buildFeed function
                            function sbiImagesReady(getType,has_to_sort ){

                                if(has_to_sort == undefined)
                                    has_to_sort = false;
                                var paginationArr = [],
                                    returnedImagesArr = [];
                                //Loop through the array of returned sets of data from the Instagram API
                                jQuery.each( returnedImages, function( index, object ) {

                                    if(getType == 'single') {
                                        object.data = [ object.data ] ;
                                    }

                                    if( typeof object.data !== 'undefined' ){ //Check whether the returned object has data in it as error may be returned it
                                        //Loop through each image object in the array and add it to the returnedImagesArr for sorting
                                        var isAddPagination = true;
                                        jQuery.each( object.data, function( index, image ) {
                                            //Filter out duplicate images here. This is after the items have been counted (used below for coordinates pagination) but before being cached as duplicate images don't need to be cached.
                                            if( jQuery.inArray(image.id, photoIds) > -1 ){
                                                //Duplicate image
                                            } else {
                                                if(sbiSinceTime != null && sbiSinceTime > image.created_time)
                                                {
                                                    isAddPagination = false;
                                                    return true;
                                                }
                                                photoIds.push(image.id);
                                                returnedImagesArr.push(image);
                                            }
                                        });

                                        if(getType == 'coordinates'){
                                            //If it's a coordinates then need to create the next_url string manually by using max_timestamp and then push it onto the array

                                            //Get the created_date of the last object so we can use it to create the next_url
                                            var lastCreatedTime = object.data[ object.data.length - 1 ].created_time,
                                                existing_url = object.pagination.previous_url,
                                                existing_url_parts = existing_url.split('max_timestamp='),
                                                new_url = existing_url_parts[0] + 'max_timestamp=' + lastCreatedTime;

                                            //If the number of photos returned (eg: 10) is less than the number the user wants to display (eg: 20) then there are no more photos to load for this coordinates
                                            paginationArr.push( new_url );

                                        } else {
                                            //If there's a next_url then add it to the pagination array
                                            if( typeof object.pagination !== 'undefined' && typeof object.pagination.next_url !== 'undefined' && isAddPagination)
                                                paginationArr.push( object.pagination.next_url );
                                        }
                                    }
                                });

                                //Sort the images by date if not set to random
                                if(sortby == 'most-liked')
                                {

                                    returnedImagesArr.sort(function(x, y){
                                        return (y.likes.count+y.comments.count) - (x.likes.count + x.comments.count);
                                    });
                                    //console.log(returnedImagesArr);
                                }
                                else if(sortby == 'least-liked') {
                                    returnedImagesArr.sort(function(x, y){
                                        return (x.likes.count + x.comments.count)  - (y.likes.count + y.comments.count);
                                    });
                                }
                                else if(sortby !== 'random') {
                                    returnedImagesArr.sort(function(x, y){
                                        return y.created_time - x.created_time;
                                    });
                                }
                                else {
                                    returnedImagesArr.sort(function (a, b) {
                                        //Randomize
                                        return (Math.round(Math.random())-0.5);
                                    });
                                    transientName += '!';
                                }

                                //Add the data and pagination objects to the first object in the array so that we can create a super object to send back
                                returnedImages[0].data = returnedImagesArr;
                                //Replace the next_url string with an array of URLs
                                //If it's a coordinates type then we need to create the pagination object here as it doesn't exist yet
                                if( typeof returnedImages[0].pagination !== 'undefined') {
                                    if( typeof returnedImages[0].pagination.next_url !== 'undefined' ) {
                                        returnedImages[0].pagination.next_url = paginationArr;
                                    }else{
                                        returnedImages[0].pagination = {
                                            "next_url" : paginationArr
                                        };
                                    }
                                } else {
                                    returnedImages[0].pagination = {
                                        "next_url" : paginationArr
                                    };
                                }
                                var allImages = returnedImages[0];
                                //Pass the returned images to the buildFeed function
                                //console.log(allImages);
                                sbiBuildFeed(allImages, transientName, sbiSettings, $self,has_to_sort);

                                //console.log('phase 2');
                                //Iterate the API request variable so that we can limit of the number of subsequent API requests when the Load More button is clicked
                                apiRequests++;
                            } // End sbiImagesReady()
                        }

                    } //End sbiFetchData()
                    //Cache the likes and comments counts by sending an array via ajax to the main plugin file which then stores it in a transient
                    function sbiGetCache(transientName, sbiSettings, $self, cacheWhat, apiURLs){
                        getCacheOpts = {
                            url: sbiajaxurl,
                            type: 'POST',
                            async: true,
                            cache: false,
                            data:{
                                action: 'get_cache',
                                transientName: transientName
                            },
                            success: function(data) {

                                //Decode the JSON to that it can be used again
                                data = decodeURI(data);

                                //Replace any escaped single quotes as it results in invalid JSON
                                data = data.replace(/\\'/g, "'");

                                //Convert the cached JSON string back to a JSON object
                                var jsonobj = JSON.parse( data );
                                //Pass the returned images to the buildFeed function
                                if( cacheWhat == 'header' ){
                                    sbiBuildHeader(jsonobj, sbiSettings);
                                } else {
                                    sbiBuildFeed(jsonobj, transientName, sbiSettings, $self);

                                }

                            },
                            error: function(xhr,textStatus,e) {
                                console.log(e);
                                return;
                            }
                        };

                        jQuery.ajax(getCacheOpts);
                    }


                    function sbiCachePhotos(images, transientName){

                        //Convert the JSON object to a string
                        var jsonstring = JSON.stringify( images );

                        //Encode the JSON string so that it can be stored in the database
                        jsonstring = encodeURI(jsonstring);

                        if (jsonstring.indexOf('%7B%22') === 0) {
                            setCacheOpts = {
                                url: sbiajaxurl,
                                type: 'POST',
                                async: true,
                                cache: false,
                                data:{
                                    action: 'cache_photos',
                                    photos: jsonstring,
                                    transientName: transientName
                                },
                                success: function(response) {
                                    return;
                                },
                                error: function(xhr,textStatus,e) {
                                    console.log(e);
                                    return;
                                }
                            };
                            jQuery.ajax(setCacheOpts);
                        }

                    }


                } // sbiCreateFeed
            }); // End jQuery('#sb_instagram.sbi').each
        }
	} // sb_init

	jQuery( document ).ready(function() {
		sbi_init();
        jQuery('.influencer_select').selectpicker({
          style: 'btn-danger',
          size: 10
        });

        jQuery('.influencer_select').on('change',function(e){
            if(e.isTrigger != 3)
                return false;
            var influencer_id =  jQuery('.influencer_select option:selected').data('id'),
                influencer_name = jQuery('.influencer_select option:selected').data('tokens'),
                influencer_list = [];
            if(influencer_id == 0)
                e.preventDefault();
            var appendItem = '<tr>'+
                '<td>@'+influencer_name+'</td>'+
                '<td><input class="influcner_sel_item" data-id="'+influencer_id+'" name="cost_'+influencer_id+'" type="text" value=""></td>'+
                '<td><button type="button" data-id="'+influencer_id+'" class="remove_influencer_btn btn btn-danger btn-xs btn-custom-xs"><i class="fa fa-close"></i></button></td>'+
                '</tr>';
            if(jQuery('input[name="cost_'+influencer_id+'"').length == 0)
                jQuery('tbody',influcnerModal).append(appendItem)

            influencer_list = jQuery(document).find(".influcner_sel_item").map( function() { return jQuery(this).data('id'); } ).get();
            influencer_list_str = influencer_list.join(',');
            jQuery('[name="influencer_list"]').val(influencer_list_str);
        });
        jQuery(document).on('click','.remove_influencer_btn',function(){
            var influencer_id = jQuery(this).data('id');
            jQuery('input[name="cost_'+influencer_id+'"').parents('tr').remove();
            influencer_list = jQuery(document).find(".influcner_sel_item").map( function() { return jQuery(this).data('id'); } ).get();
            influencer_list_str = influencer_list.join(',');
            jQuery('[name="influencer_list"]').val(influencer_list_str);
        });
        jQuery(".export_but").click(function(){
            var tmp_arr = {};
            tmp_arr['header'] = export_table_header_data;
            tmp_arr['data'] = export_table_data;
            var tmp_str = JSON.stringify(tmp_arr); 
            var time = new Date().getTime();
            jQuery("#instagram-loading-div1").show();
            exportAjax = {
                url: sbiajaxurl,
                type: 'POST',
                async: true,
                dataType: 'json',
                data:{
                    index: time,
                    data_table: tmp_str,
                    action: 'save_export_data'
                },
                success: function(data) {
                    jQuery("#instagram-loading-div1").fadeOut('hide');
                    var download_url = sbiajaxurl+"?action=export_file&index="+time+"&filename="+export_file_name;
                    window.location.href = download_url;
                },
                error: function(xhr,textStatus,e) {
                    console.log(e);
                    return;
                }
            };
            jQuery.ajax(exportAjax);
        });

        jQuery("#instagram-loading-div").fadeOut('slow');
        jQuery('.single-content').tooltip({track:true});

        var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

        if (sb_instagram_js_options['sb_page_id'] == 3046 && typeof wcloud_txt_arr !== 'undefined' && wcloud_txt_arr !='') {
            var default_font_size = 15;
            var max_font_size = 100;

            if(isMobile){
                default_font_size = 10;
                max_font_size = 60
            }
            var max_count = 1;
            jQuery.each(wcloud_txt_arr,function(index,value){
                max_count = value;
                return false;
            });

            var scale_rate = (max_font_size - default_font_size) / max_count;

            var cloud_div = jQuery("#search_word_cloud");
            var cloud_width = cloud_div.width();
            var cloud_height = cloud_width/5*3;

            var words = wcloud_txt_arr;

            function wordCloud(selector) {

                var fill = d3.scale.category20();
                width = cloud_div.width();
                //Construct the word cloud's SVG element
                var svg = d3.select(selector).append("svg")
                    .attr("width", cloud_width)
                    .attr("height", cloud_height)
                    .append("g")
                    .attr("transform", "translate("+cloud_width/2+","+cloud_height/2+")");


                //Draw the word cloud
                function draw(words) {
                    var cloud = svg.selectAll("g text")
                                    .data(words, function(d) { return d.text; })

                    //Entering words
                    cloud.enter()
                        .append("text")
                        .style("font-family", "Impact")
                        .style("fill", function(d, i) { return fill(i); })
                        .attr("text-anchor", "middle")
                        .attr('font-size', 1)
                        .style("cursor", "pointer")
                        .text(function(d) { return d.text; });

                    //Entering and existing words
                    cloud
                        .transition()
                            .duration(600)
                            .style("font-size", function(d) { return d.size + "px"; })
                            .attr("transform", function(d) {
                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                            })
                            .style("fill-opacity", 1);

                    //Exiting words
                    cloud.exit()
                        .transition()
                            .duration(200)
                            .style('fill-opacity', 1e-6)
                            .attr('font-size', 1)
                            .remove();

                     cloud.on("click", function (d, i){
                        on_keyword_click(d,i);
                    });
                }
                return {
                    update: function(words) {
                        d3.layout.cloud().size([cloud_width, cloud_height])
                            .words(words)
                            .padding(1)
                            .rotate(function() {
                                return (~~(Math.random() * 6) - 2.5) * 20;
                            })
                            .font("Impact")
                            .fontSize(function(d) { return d.size; })
                            .on("end", draw)
                            .start();
                    }
                }

            }
            var myWordCloud = wordCloud('#search_word_cloud');

            function on_keyword_click(d,i){
                var value = jQuery("[name='input_keywords']").val();
                var val_arr = value.split(',');

                if(jQuery.inArray(d.text, val_arr) != -1 )
                    return true;

                if((d.text).toLowerCase().indexOf(val_arr[val_arr.length-1]) == 0)
                    val_arr[val_arr.length-1] = d.text;
                else
                    val_arr.push(d.text);
                jQuery("[name='input_keywords']").val(val_arr.join());
                jQuery("[name='input_keywords']").focus();
            }

            function getWords(word_arr,keyword) {
                var ret = new Array();
                jQuery.each(word_arr,function(index,value){
                    if(keyword !='' && index.toLowerCase().indexOf(keyword) != 0)
                        return true;
                    var font_size = (default_font_size + (value * scale_rate)) > max_font_size ? max_font_size : (default_font_size + (value * scale_rate));
                    ret.push({text: index, size: font_size});
                });
                return ret;
            }


            function showNewWords(vis) {
                var textfilter = jQuery("[name='input_keywords']").val().split(',');
                textfilter = textfilter[textfilter.length-1];
                // console.log(textfilter);
                vis.update(getWords(words,textfilter))
                // setTimeout(function() { showNewWords(vis)}, 2000)
            }


            setTimeout(function(){showNewWords(myWordCloud);},1000);
            jQuery("[name='input_keywords']").keyup(function(){
                showNewWords(myWordCloud)
            });
        }



//        console.log(jQuery(".sbi_my_instagram"));
//        console.log(jQuery(".sbi_my_instagram"));
        /*
        jQuery(".sbi_my_instagram:lt(10)").show();
        if (jQuery(".sbi_my_instagram:hidden").length == 0) {
            jQuery("#sbi_my_load").hide();
        }

        jQuery("#sbi_my_load").on('click', function (e) {
            e.preventDefault();
            jQuery(".sbi_my_instagram:hidden:lt(10)").show();

            if (jQuery(".sbi_my_instagram:hidden").length == 0) {
                jQuery("#sbi_my_load").hide();
            }

        });
*/
        // jQuery('.search-input-container form').valid({ // initialize the plugin
        //     rules: {
        //         input_keywords: {
        //             required: true,
        //             minlength: 2
        //         }
        //     }
        // });
        jQuery("select[name='follower_min_select']").change(function(){
            var min = parseInt(jQuery(this).val());
            var max = parseInt(jQuery("select[name='follower_max_select']").val());
            if((min > max || min == 1) && max !=1)
            {
                alert('You have chosen invalid!');
                return false;
            }

        })
        jQuery("select[name='follower_max_select']").change(function(){
            var min = parseInt(jQuery("select[name='follower_min_select']").val());
            var max = parseInt(jQuery(this).val());
            if((min > max || min == 1) && max !=1)
            {
                alert('You have chosen invalid!');
                return false;
            }

        })
        jQuery(".search-input-container form").submit(function(){
            var form = this;
            keyword = jQuery("[name='input_keywords']",form).val();
            keyword = keyword.trim();
            var error = jQuery(".search-input-container .danger");
            var genearte_keyword = jQuery(this).find("[name='generate_keyword']").val();

            if(genearte_keyword == 0 && (keyword == '' || keyword.length < 2))
            {
                jQuery(".search-input-container form");
                error.show();
                setTimeout(function(){error.hide()},2500);
                return false;
            }
            return true;
        })
        jQuery(".search-input-container [name='category_select']").change(function(){
            jQuery(".search-input-container form [name='input_keywords']").val('.....');
            jQuery(".search-input-container form").submit();
        })
        jQuery(".search-input-container form .button").click(function(){
            jQuery(".search-input-container form").submit();
        });

        jQuery(document).on('click','.btn-generate-keyword',function(){
            jQuery(".search-input-container [name='generate_keyword']").val(1);
            jQuery(this).parents('form').submit();
        })

        sidFoldButton 	= jQuery('.sidebar-fold-btn');
        sidFoldButton.on('click',function(){
            if(typeof myChart !== 'undefined')
                setTimeout(function(){myChart.resize();},100);
        })

	});


} // end sbi_js_exists check