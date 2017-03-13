var wijmo;define(["./wijmo.widget","./wijmo.wijsuperpanel","jquery.cookie"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(n){var r=jQuery,i=0,s=0,o=r.effects?r.effects:r,u=o.save,a=o.restore,f=o.createWrapper,l=o.removeWrapper,c="scrollWrap-collapsed",h=function(){return++i},p=function(){return++s},d=function(t){function n(){t.apply(this,arguments)}return e(n,t),n.prototype._setOption=function(e,n){t.prototype._setOption.call(this,e,n);switch(e){case"selected":if(this.options.collapsible&&n===this.options.selected)return;this.select(n);break;case"alignment":this._innerDestroy(!0),this._tabify(!0);break;case"scrollable":n||this._removeScroller(),this._tabify(!1);break;default:this._tabify(!1)}},n.prototype._create=function(){var e=this,n=this.options;this.originalStyle=this.element.attr("style"),this.element.is(":hidden")&&this.element.wijAddVisibilityObserver&&this.element.wijAddVisibilityObserver(function(){e.element.wijRemoveVisibilityObserver&&e.element.wijRemoveVisibilityObserver();var t=e.element.data("wijtabs"),n=e.element.data("wijmo-wijtabs");e._innerDestroy(!0),e.element.data("wijtabs",t),e.element.data("wijmo-wijtabs",n),e._tabify(!0)},"wijtabs"),this._tabify(!0),t.prototype._create.call(this)},n.prototype.destroy=function(){this._innerDestroy(),t.prototype.destroy.call(this)},n.prototype._tabify=function(e){this.list=this.scrollWrap?this.scrollWrap.find(".wijmo-wijsuperpanel-statecontainer .wijmo-wijsuperpanel-templateouterwrapper ol, ul"):this.element.children("ol,ul").eq(0),this.lis=r("li:has(a)",this.list),this.originalListStyle=this.list.attr("style"),this.anchors=this.lis.map(function(){return r("a",this)[0]}),this.panels=r([]);var t=this,n=t.options,i=/^#.+/,s,o,u,a,f,l,c,h,p;r.each(t.anchors,function(e,s){var o=r(s).attr("href")||"",u=o.split("#")[0],a,f,l;u&&(u===location.toString().split("#")[0]||(a=r("base")[0])&&u===a.href)&&(o=s.hash,s.href=o),i.test(o)?t.panels=t.panels.add(t._sanitizeSelector(o),t.element):o!=="#"?(r.data(s,"href.tabs",o),r.data(s,"load.tabs",o.replace(/#.*$/,"")),f=t._tabId(s),s.href="#"+f,l=r("#"+f),l.length||(l=r(n.panelTemplate||t._defaults.panelTemplate).attr("id",f).addClass(n.wijCSS.tabsPanel).addClass(n.wijCSS.content).addClass(n.wijCSS.cornerBottom).insertAfter(t.panels[e-1]||t.list),l.data("destroy.tabs",!0)),t.panels=t.panels.add(l)):n.disabledIndexes.push(e),r(s).prop("tabindex","-1")}),s=this._getAlignment(!0),o=this._getAlignment(!1);if(e){this.list.attr("role","tablist"),this.lis.attr("role","tab"),this.panels.attr("role","tabpanel"),this.element.addClass(n.wijCSS.tabs).addClass(n.wijCSS.wijtabs).addClass(n.wijCSS.widget).addClass(n.wijCSS.content).addClass(n.wijCSS.cornerAll).addClass(n.wijCSS.helperClearFix).addClass(n.wijCSS.tabsPanel).addClass(n.wijCSS.tabsPanel).addClass(n.wijCSS["tabs"+s]),this.list.addClass(n.wijCSS.tabsNav).addClass(n.wijCSS.helperReset).addClass(n.wijCSS.helperClearFix).addClass(n.wijCSS.header).addClass(n.wijCSS.cornerAll),this.lis.addClass(n.wijCSS.stateDefault).addClass(n.wijCSS["corner"+s]),this.panels.addClass(n.wijCSS.tabsPanel).addClass(n.wijCSS.content).addClass(n.wijCSS["corner"+o]);switch(s){case"Bottom":this.list.appendTo(this.element);break;case"Left":u=r("<div/>").addClass(n.wijCSS.wijtabsContent).appendTo(this.element),this.panels.appendTo(u);break;case"Right":u=r("<div/>").addClass(n.wijCSS.wijtabsContent).insertBefore(this.list),this.panels.appendTo(u);break;case"Top":this.list.prependTo(this.element)}n.sortable&&this.list.sortable&&this._createSortable(s),n.selected===undefined?(location.hash&&r.each(this.anchors,function(e,t){if(t.hash===location.hash)return n.selected=e,!1}),typeof n.selected!="number"&&n.cookie&&(n.selected=parseInt(t._cookie(undefined,undefined),10)),typeof n.selected!="number"&&this.lis.filter("."+n.wijCSS.tabsActive).length&&(n.selected=this.lis.index(this.lis.filter("."+n.wijCSS.tabsActive))),n.selected=n.selected||(this.lis.length?0:-1)):n.selected===null&&(n.selected=-1),n.selected=n.selected>=0&&this.anchors[n.selected]||n.selected<0?n.selected:0,n.disabledIndexes=r.unique(n.disabledIndexes.concat(r.map(this.lis.filter("."+n.wijCSS.stateDisabled),function(e,n){return t.lis.index(e)}))).sort(),r.inArray(n.selected,n.disabledIndexes)!==-1&&n.disabledIndexes.splice(r.inArray(n.selected,n.disabledIndexes),1),this.panels.css("display","none").attr("aria-hidden",!0),this.lis.removeClass(n.wijCSS.tabsActive).removeClass(n.wijCSS.stateActive).attr("aria-selected",!1),n.selected>=0&&this.anchors.length&&(this.panels.eq(n.selected).css("display","block").attr("aria-hidden",!1),this.lis.eq(n.selected).addClass(n.wijCSS.tabsActive).addClass(n.wijCSS.stateActive).attr("aria-selected",!0),t.element.queue("tabs",function(){t.element.wijTriggerVisibility&&r(t.panels[n.selected]).wijTriggerVisibility(),t._trigger("show",null,t._ui(t.anchors[n.selected],t.panels[n.selected]))}),this.load(n.selected)),r(window).bind("unload.wijtabs",function(){t.lis&&t.lis.add(t.anchors).unbind(".tabs"),t.lis=t.anchors=t.panels=null}),n.selected===-1&&t._saveLayout()}else n.selected=this.lis.index(this.lis.filter("."+n.wijCSS.tabsActive)),this.list.data("ui-sortable")?this.list.sortable&&(n.sortable?this.list.sortable("enable"):this.list.sortable("disable")):n.sortable&&this.list.sortable&&this._createSortable(s);this.element[n.collapsible?"addClass":"removeClass"](n.wijCSS.tabsCollapsible),n.cookie&&this._cookie(n.selected,n.cookie);for(a=0;a<this.lis.length;a++)f=this.lis[a],r(f)[r.inArray(a,n.disabledIndexes)!==-1&&!r(f).hasAllClasses(n.wijCSS.tabsActive)?"addClass":"removeClass"](n.wijCSS.stateDisabled),r(f).hasAllClasses(n.wijCSS.stateDisabled)&&r(f).attr("aria-disabled",!0);n.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs"),!t._isDisabled()&&n.event!=="mouseover"&&(l=function(e,t){t.is(":not(."+n.wijCSS.stateDisabled+")")&&t.addClass(e)},c=function(e,t){t.removeClass(e)},this.lis.bind("mouseover.tabs",function(){l(n.wijCSS.stateHover,r(this))}),this.lis.bind("mouseout.tabs",function(){c(n.wijCSS.stateHover,r(this))}),this.anchors.bind("focus.tabs",function(){t.lis.filter("."+n.wijCSS.stateFocus).removeClass(n.wijCSS.stateFocus),l(n.wijCSS.stateFocus,r(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){c(n.wijCSS.stateFocus,r(this).closest("li"))}));if(n.showOption===undefined||n.showOption===null)n.showOption={};this._normalizeBlindOption(n.showOption);if(n.hideOption===undefined||n.hideOption===null)n.hideOption={};this._normalizeBlindOption(n.hideOption),h=(n.showOption.blind||n.showOption.fade)&&n.showOption.duration>0?function(e,i){r(e).closest("li").addClass(n.wijCSS.tabsActive).addClass(n.wijCSS.stateActive).attr("aria-selected",!0),t._showContent(),i.css("display","block").attr("aria-hidden",!1);if(s==="Top"||s==="Bottom"){var o={duration:n.showOption.duration,height:"toggle",opacity:"toggle"};n.showOption.blind||delete o.height,n.showOption.fade||delete o.opacity,i.hide().css("display","block").attr("aria-hidden",!1).animate(o,n.showOption.duration||"normal",function(){t._resetStyle(i),i.css("display","block"),i.wijTriggerVisibility&&i.wijTriggerVisibility(),t._trigger("show",null,t._ui(e,i[0]))})}else t._showContent(),t._scrollWrapCollapsed(!1),t._blindPanel(i,"show")}:function(e,i){r(e).closest("li").addClass(n.wijCSS.tabsActive).addClass(n.wijCSS.stateActive).attr("aria-selected",!0),t._showContent(),t._scrollWrapCollapsed(!1),i.css("display","block").attr("aria-hidden",!1),i.wijTriggerVisibility&&i.wijTriggerVisibility(),t._trigger("show",null,t._ui(e,i[0]))},p=(n.hideOption.blind||n.hideOption.fade)&&n.hideOption.duration>0?function(e,r){if(s==="Top"||s==="Bottom"){var i={duration:n.hideOption.duration,height:"toggle",opacity:"toggle"};n.hideOption.blind||delete i.height,n.hideOption.fade||delete i.opacity,r.animate(i,n.hideOption.duration||"normal",function(){t.lis.removeClass(n.wijCSS.tabsActive).removeClass(n.wijCSS.stateActive).attr("aria-selected",!1),t._resetStyle(r),r.css("display","none").attr("aria-hidden",!0),t.element.dequeue("tabs")})}else t._saveLayout(),t._scrollWrapCollapsed(!0),t._blindPanel(r,"hide")}:function(e,i,s){t.lis.removeClass(n.wijCSS.tabsActive).removeClass(n.wijCSS.stateActive).attr("aria-selected",!1),t._hideContent(),t._scrollWrapCollapsed(!0),i.css("display","none").attr("aria-hidden",!0),n.sortable&&r.browser.msie&&r.browser.version&&parseFloat(r.browser.version)>=11&&r.contains(i[0],document.activeElement)&&r(document.activeElement).is(":hidden")&&r(document.activeElement).blur(),t.element.dequeue("tabs")},t._isDisabled()||this.anchors.bind(n.event+".tabs",function(){var e=this,i=r(this).closest("li"),s=t.panels.filter(function(e){return this.style.display==="block"}),o=r(t._sanitizeSelector(this.hash),t.element);if(i.hasAllClasses(n.wijCSS.tabsActive)&&!n.collapsible||i.hasAllClasses(n.wijCSS.stateDisabled)||i.hasAllClasses(n.wijCSS.tabsLoading)||t._trigger("select",null,t._ui(this,o[0]))===!1)return this.blur(),!1;n.selected=t.anchors.index(this),t.abort();if(n.collapsible){if(i.hasAllClasses(n.wijCSS.tabsActive))return n.selected=-1,n.cookie&&t._cookie(n.selected,n.cookie),t.element.queue("tabs",function(){p(e,s)}).dequeue("tabs"),this.blur(),!1;if(!s.length)return n.cookie&&t._cookie(n.selected,n.cookie),t.element.queue("tabs",function(){h(e,o)}),t.load(t.anchors.index(this)),this.blur(),!1}n.cookie&&t._cookie(n.selected,n.cookie);if(!o.length)throw"jQuery UI Tabs: Mismatching fragment identifier.";s.length&&t.element.queue("tabs",function(){p(e,s)}),t.element.queue("tabs",function(){h(e,o)}),t.load(t.anchors.index(this)),r.browser.msie&&this.blur()}),this._initScroller(),this.anchors.bind("click.tabs",function(){return!1})},n.prototype._scrollWrapCollapsed=function(e){var t=this,n=t.options,r=t._getAlignment(!0),i=r==="Left"||r==="Right";t.scrollWrap&&n.collapsible&&n.scrollable&&i&&t.scrollWrap.toggleClass(c,e)},n.prototype._createSortable=function(e){var t=this;t.list.sortable({activate:function(e,n){if(r.browser.mozilla){var i=r(document.activeElement),s,o;i.is("iframe")&&(s=n.item.find("a").attr("href"),o=t.panels.filter(s),i.parents().index(o)>-1&&i.blur())}},update:function(n,i){t.lis=r("li:has(a)",t.list),t.anchors=t.lis.map(function(){return r("a",this)[0]});var s=t.options,o=i.item.find("a").attr("href"),u=t.panels.filter(o),a=t.panels.index(u),f=t.lis.index(i.item),l=e==="Left"||e==="Right"?t.element.children("."+s.wijCSS.wijtabsContent):t.element;a>f?r(t.panels[f]).before(u):r(t.panels[f]).after(u),t.panels=l.children("."+s.wijCSS.tabsPanel)},axis:e==="Top"||e==="Bottom"?"x":"y"})},n.prototype._blindPanel=function(e,t){var n=this,i=n.options,s=e.parent("."+i.wijCSS.wijtabsContent),o=["position","top","left","width"],a=t==="show"?i.showOption:i.hideOption,c,h,p;if(!s.length)return;n.list.width(n.list.width()),u&&u(e,o),e.show(),t==="show"?(e.css("display","block").attr("aria-hidden",!1),e.width(n.element.data("panel.width"))):e.width(e.width()),f?c=f(e).css({overflow:"hidden"}):c=r("<div></div>"),t==="show"&&c.css(r.extend({width:0},a.fade?{opacity:0}:{})),h=r.extend({width:t==="show"?n.element.data("panel.outerWidth"):0},a.fade?{opacity:t==="show"?1:0}:{}),p=n.list.outerWidth(!0),c.animate(h,{duration:a.duration,step:function(){var e=c.outerWidth(!0);n.element.width(p+e),s.width(Math.max(0,n.element.innerWidth()-p-6))},complete:function(){t==="hide"?(n.lis.removeClass(i.wijCSS.tabsActive).removeClass(i.wijCSS.stateActive).attr("aria-selected",!1),e.css("display","none").attr("aria-hidden",!0)):e.css("width",""),l&&l(e),t==="show"&&n._restoreLayout(),n._resetStyle(e),e.dequeue(),n.element.dequeue("tabs")}})},n.prototype._hideContent=function(){var e=this.options.wijCSS,t=this.element.find("."+e.wijtabsContent);t.length&&(this._saveLayout(),t.css("display","none").attr("aria-hidden",!0),this.element.width(this.list.outerWidth(!0)))},n.prototype._showContent=function(){var e=this.options.wijCSS,t=this.element.find("."+e.wijtabsContent);t.length&&(this._restoreLayout(),t.css("display","block").attr("aria-hidden",!1))},n.prototype._saveLayout=function(){var e=this,t=e.options.wijCSS,n=["width","height","overflow"],r=e.panels.filter(":visible"),i=e.element.find("."+t.wijtabsContent);u&&(u(e.element,n),e.list.length&&u(e.list,n),i.length&&u(i,n)),e.list.length&&e.list.width(e.list.width()),e.element.data("panel.width",r.width()),e.element.data("panel.outerWidth",r.outerWidth(!0))},n.prototype._restoreLayout=function(){var e=this,t=e.options.wijCSS,n=["width","height","overflow"],r=e.element.find("."+t.wijtabsContent);a&&(a(e.element,n),e.list.length&&a(e.list,n),r.length&&a(r,n))},n.prototype._resetStyle=function(e){e.css({display:""}),r.support.opacity||e[0].style.removeAttribute("filter")},n.prototype._normalizeBlindOption=function(e){e.blind===undefined&&(e.blind=!1),e.fade===undefined&&(e.fade=!1),e.duration===undefined&&(e.duration=200);if(typeof e.duration=="string")try{e.duration=parseInt(e.duration,10)}catch(t){e.duration=200}},n.prototype._initScroller=function(){var e=this,t=r.inArray(this._getAlignment(!0),["Top","Bottom"])!==-1,n=0,i;r.each(this.lis,function(t,i){var s=r(i),o,u=0,a=0;r.browser.msie&&!!e.options.scrollable&&(r.each(s.children(),function(e,t){var n=r(t);n.is("a")&&n.width(n.width()),u+=n.outerWidth(!0)}),a=u-s.width(),s.width(u)),n+=e._getLiWidth(r(i))+a}),i=this.list.outerHeight(),this._removeScroller(),this.list.css("width",""),!!this.options.scrollable&&t&&this.element.innerWidth()<n?(this.scrollWrap===undefined&&(this.list.wrap("<div class='scrollWrap'></div>"),this.scrollWrap=this.list.parent(),u&&u(this.list,["width","height","overflow"])),this.list.width(Math.ceil(n)+2),this.scrollWrap.height(this.list.outerHeight(!0)),this.scrollWrap.wijsuperpanel({allowResize:!1,hScroller:{scrollMode:"edge"},vScroller:{scrollBarVisibility:"hidden"}})):!!this.options.scrollable&&!t&&this.element.height()<i&&(this.scrollWrap===undefined&&(this.list.wrap("<div class='scrollWrap ui-helper-clearfix'></div>"),this.scrollWrap=this.list.parent(),u&&u(this.list,["width","height","overflow"])),this.scrollWrap.setOutHeight(this.element.height()),this.scrollWrap.wijsuperpanel({allowResize:!1,vScroller:{scrollMode:"edge"},hScroller:{scrollBarVisibility:"hidden"}}))},n.prototype._ui=function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},n.prototype._tabId=function(e){var t=r(e),n,i;if(t.data&&t.data("tabid"))return t.data("tabid");if(e.href&&e.href.length){i=this._getURLParameters(e.href);if(i.tabId)return n=i.tabId,t.data("tabid",n),n}return n=e.title&&e.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+h(),t.data("tabid",n),n},n.prototype._getURLParameters=function(e){var t={},n,i;return e.indexOf("?")>-1&&(n=e.split("?")[1],i=n.split("&"),r.each(i,function(e,n){var r=n.split("=");r.length>1&&(t[r[0]]=r[1])})),t},n.prototype._getAlignment=function(e){var t=this.options.alignment||"top";if(e)return t.charAt(0).toUpperCase()+t.substr(1);switch(t){case"top":t="Bottom";break;case"bottom":t="Top";break;case"left":t="Right";break;case"right":t="Left"}return t},n.prototype._sanitizeSelector=function(e){return e.replace(/:/g,"\\:")},n.prototype._innerDestroy=function(e){var t=this.options,n=r("."+t.wijCSS.wijtabsContent);return this.abort(),this._removeScroller(),this.element.unbind(".tabs").removeClass(t.wijCSS.wijtabs).removeClass(t.wijCSS.tabsTop).removeClass(t.wijCSS.tabsBottom).removeClass(t.wijCSS.tabsLeft).removeClass(t.wijCSS.tabsRight).removeClass(t.wijCSS.tabs).removeClass(t.wijCSS.widget).removeClass(t.wijCSS.content).removeClass(t.wijCSS.cornerAll).removeClass(t.wijCSS.tabsCollapsible).removeClass(t.wijCSS.helperClearFix).removeData("tabs").removeAttr("role").attr("style",this.originalStyle||""),this.list.removeClass(t.wijCSS.tabsNav).removeClass(t.wijCSS.helperReset).removeClass(t.wijCSS.helperClearFix).removeClass(t.wijCSS.header).removeClass(t.wijCSS.cornerAll).removeAttr("role").attr("style",this.originalListStyle||""),r.each(this.anchors,function(e,t){var n=r(t),i=n.data("href.tabs");i&&(t.href=i),n.unbind(".tabs"),r.each(["href","load","cache"],function(e,t){n.removeData(t+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(n,i){var s=r(i);s.data("destroy.tabs")&&!e?s.remove():s.removeClass(t.wijCSS.stateDefault).removeClass(t.wijCSS.cornerTop).removeClass(t.wijCSS.cornerBottom).removeClass(t.wijCSS.cornerLeft).removeClass(t.wijCSS.cornerRight).removeClass(t.wijCSS.tabsActive).removeClass(t.wijCSS.stateActive).removeClass(t.wijCSS.stateHover).removeClass(t.wijCSS.stateFocus).removeClass(t.wijCSS.stateDisabled).removeClass(t.wijCSS.tabsPanel).removeClass(t.wijCSS.content).css({position:"",left:"",top:""}).removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-selected").removeAttr("aria-disabled")}),n.length&&n.replaceWith(n.contents()),t.cookie&&this._cookie(null,t.cookie),this.list=null,this.anchors=null,this.lis=null,this.panels=null,r(window).unbind("unload.wijtabs"),this},n.prototype._cleanup=function(){var e=this.options.wijCSS;this.lis.filter("."+e.tabsLoading).removeClass(e.tabsLoading).find("span:data(label.tabs)").each(function(){var e=r(this);e.html(e.data("label.tabs")).removeData("label.tabs")})},n.prototype._removeScroller=function(){if(!this.scrollWrap)return;this.scrollWrap.wijsuperpanel("destroy").replaceWith(this.scrollWrap.contents()),this.scrollWrap=undefined,a&&a(this.list,["width","height","overflow"])},n.prototype._cookie=function(e,t){var n=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+p());return r.cookie.apply(null,[n].concat(r.makeArray(arguments)))},n.prototype._getLiWidth=function(e){return this._parsePxToNumber(e.css("margin-left"))+this._parsePxToNumber(e.css("border-left-width"))+this._parsePxToNumber(e.css("padding-left"))+this._parsePxToNumber(e.css("width"))+this._parsePxToNumber(e.css("margin-right"))+this._parsePxToNumber(e.css("border-right-width"))+this._parsePxToNumber(e.css("padding-right"))},n.prototype._parsePxToNumber=function(e){var t=e.indexOf("px");return!t||t===-1?0:parseFloat(e.substr(0,t))},n.prototype.abort=function(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this},n.prototype.select=function(e){return typeof e=="string"?e=this.anchors.index(this.anchors.filter("[href$="+e+"]")):e===null&&(e=-1),e===-1&&this.options.collapsible&&(e=this.options.selected),this.anchors.eq(e).trigger(this.options.event+".tabs"),this},n.prototype.load=function(e){var t=this,n=t.options,i=t.anchors.eq(e)[0],s=r.data(i,"load.tabs"),o=r("span",i);t.abort();if(!1===t._trigger("beforeShow",null,t._ui(t.anchors[e],t.panels[e]))){t.element.dequeue("tabs");return}if(!s||t.element.queue("tabs").length!==0&&r.data(i,"cache.tabs")){t.element.dequeue("tabs");return}return t.lis.eq(e).addClass(n.wijCSS.tabsLoading),(n.spinner||t._defaults.spinner)&&o.data("label.tabs",o.html()).html(n.spinner||t._defaults.spinner),t.xhr=r.ajax(r.extend({},n.ajaxOptions,{url:s,success:function(s,o){r(t._sanitizeSelector(i.hash),t.element).html(s),t._cleanup(),n.cache&&r.data(i,"cache.tabs",!0),t._trigger("load",null,t._ui(t.anchors[e],t.panels[e]));try{n.ajaxOptions.success(s,o)}catch(u){}},error:function(r,s,o){t._cleanup(),t._trigger("load",null,t._ui(t.anchors[e],t.panels[e]));try{n.ajaxOptions.error(r,s,e,i)}catch(u){}}})),t.element.dequeue("tabs"),t},n.prototype.add=function(e,t,n){n===undefined&&(n=this.anchors.length);var i=this,s=i.options,o=r((s.tabTemplate||i._defaults.tabTemplate).replace(/#\{href\}/g,e).replace(/#\{label\}/g,t)),u=e.indexOf("#")?i._tabId(r("a",o)[0]):e.replace("#",""),a=i._getAlignment(!0),f=i._getAlignment(!1),l=r("#"+u),c;return o.addClass(s.wijCSS.stateDefault).addClass(s.wijCSS["corner"+a]).data("destroy.tabs",!0).attr("role","tab").attr("aria-selected",!1),l.length||(l=r(s.panelTemplate||i._defaults.panelTemplate).attr("id",u).data("destroy.tabs",!0).attr("role","tabpanel")),l.addClass(s.wijCSS.tabsPanel).addClass(s.wijCSS.content).addClass(s.wijCSS["corner"+f]).css("display","none").attr("aria-hidden",!0),n>=i.lis.length?(o.appendTo(i.list),i.panels.length>0?l.insertAfter(i.panels[i.panels.length-1]):(c=i.element.find("."+s.wijCSS.wijtabsContent),c.length===0&&(c=i.element),l.appendTo(c))):(o.insertBefore(i.lis[n]),l.insertBefore(i.panels[n])),s.disabledIndexes=r.map(s.disabledIndexes,function(e,t){return e>=n?++e:e}),i._removeScroller(),i._tabify(!1),i.anchors.length===1&&(s.selected=0,o.addClass(s.wijCSS.tabsActive).addClass(s.wijCSS.stateActive).attr("aria-selected",!0),l.css("display","block").attr("aria-hidden",!1),i.element.queue("tabs",function(){i.element.wijTriggerVisibility&&r(i.panels[0]).wijTriggerVisibility(),i._trigger("show",null,i._ui(i.anchors[0],i.panels[0]))}),i.load(0)),i._trigger("add",null,i._ui(i.anchors[n],i.panels[n])),i},n.prototype.remove=function(e){var t=this.options,n=this.lis.eq(e).remove(),i=this.panels.eq(e).remove();return n.hasAllClasses(t.wijCSS.tabsActive)&&this.anchors.length>1&&this.select(e+(e+1<this.anchors.length?1:-1)),t.disabledIndexes=r.map(r.grep(t.disabledIndexes,function(t,n){return t!==e},!1),function(t,n){return t>=e?--t:t}),this._removeScroller(),this._tabify(!1),this._trigger("remove",null,this._ui(n.find("a")[0],i[0])),this},n.prototype.enableTab=function(e){var t=this.options;if(r.inArray(e,t.disabledIndexes)===-1)return;return this.lis.eq(e).removeClass(t.wijCSS.stateDisabled).removeAttr("aria-disabled"),t.disabledIndexes=r.grep(t.disabledIndexes,function(t,n){return t!==e},!1),this._trigger("enable",null,this._ui(this.anchors[e],this.panels[e])),this},n.prototype.disableTab=function(e){var t=this.options;return e!==t.selected&&(this.lis.eq(e).addClass(t.wijCSS.stateDisabled).attr("aria-disabled",!0),t.disabledIndexes.push(e),t.disabledIndexes.sort(),this._trigger("disable",null,this._ui(this.anchors[e],this.panels[e]))),this},n.prototype.url=function(e,t){return this.anchors.eq(e).removeData("cache.tabs").data("load.tabs",t),this},n.prototype.length=function(){return this.anchors.length},n}(t.wijmoWidget);n.wijtabs=d,d.prototype._defaults={panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'};var v=function(){function e(){this.wijCSS={wijtabs:"wijmo-wijtabs",wijtabsContent:"wijmo-wijtabs-content"},this.wijMobileCSS={header:"ui-header ui-bar-b",content:"ui-content ui-body ui-body-b",stateDefault:"ui-btn ui-btn-a",stateActive:"ui-btn-down-b"},this.alignment="top",this.sortable=!1,this.scrollable=!1,this.ajaxOptions=null,this.cache=!1,this.cookie=null,this.collapsible=!1,this.hideOption=null,this.showOption=null,this.disabledIndexes=[],this.event="click",this.idPrefix="ui-tabs-",this.panelTemplate="",this.spinner="",this.tabTemplate="",this.add=null,this.remove=null,this.select=null,this.beforeShow=null,this.show=null,this.load=null,this.disable=null,this.enable=null}return e}();d.prototype.options=r.extend(!0,{},t.wijmoWidget.prototype.options,new v),r.wijmo.registerWidget("wijtabs",d.prototype)})(t.tabs||(t.tabs={}));var n=t.tabs})(wijmo||(wijmo={}))});