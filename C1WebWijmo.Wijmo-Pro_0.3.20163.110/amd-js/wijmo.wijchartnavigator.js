var wijmo;define(["./wijmo.widget","./wijmo.wijlinechart","./wijmo.wijslider"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(n){var r=2,i=function(e,t){var r,i,s;return e&&e.length?(r=n.ChartUtil.getFirstValidListValue(e),i=r=t?r[t]:r,typeof r=="string"?{min:0,max:e.length-1}:(s=n.ChartUtil.isDate(r),$.each(e,function(e,n){n=t?n[t]:n,r>n&&(r=n),i<n&&(i=n)}),r=s?$.toOADate(r):r,i=s?$.toOADate(i):i,{min:r,max:i,isTime:s})):undefined},s=function(e,t){var r=n.ChartDataUtil,i=e-t,s="d";return i>2*r.tmInc.year?s="yy":i>r.tmInc.year?s="MMM yy":i>r.tmInc.month?s="MMM d":i>r.tmInc.week?s="ddd d":i>r.tmInc.day?s="ddd H":i>r.tmInc.hour&&(s="H:mm"),s},o=function(t){function o(){t.apply(this,arguments)}return e(o,t),o.prototype._create=function(){t.prototype._create.call(this),this.element.addClass(this.options.wijCSS.chartNavigator),this.isInitialized=!0,this._render()},o.prototype._render=function(){var e=this;e._initialXDataRange(),e.isInitialized?e._initialTargetCharts():e._updateTargetCharts(),e._initialNavigator(),e.isInitialized=!1},o.prototype._setOption=function(e,n){var r=this,i=r.options,s=i.xAxis,o;if(e==="targetSelector")i.targetSelector!==n&&(i.targetSelector=n,r._initialTargetCharts());else if(e==="data"||e==="dataSource"||e==="seriesList")i[e]=n,r._render();else if(e==="seriesStyles")i.seriesStyles=n,r.element.wijlinechart("option","seriesStyles",n);else if(e==="xAxis")i.xAxis=n,n.min!=null&&n.min!==s.min||n.max!=null&&n.max!==s.max?r._render():r.element.wijlinechart("option","axis",{x:n});else if(e==="culture")r.element.wijlinechart("option","culture",n),r.indicatorCulture=$.wijGetCulture(n,"");else if(e==="indicator")i.indicator=n,r._initialNvIndicator();else if(e==="rangeMin"||e==="rangeMax")o=r._getCurrentRange(),e==="rangeMin"?r._triggerRangeUpdated(n,o.max):r._triggerRangeUpdated(o.min,n),r._updateNvSlider("values");else if(e==="disabled"||e==="step")t.prototype._setOption.call(this,e,n),r._updateNvSlider(e);t.prototype._setOption.call(this,e,n)},o.prototype._initialXDataRange=function(){var e=this,t=e.options.xAxis,r;t&&(t.min&&(e.xFieldIsTime=n.ChartUtil.isDate(t.min),e.nvMin=t.min),t.max&&(e.xFieldIsTime=n.ChartUtil.isDate(t.max),e.nvMax=t.max));if(e.nvMin==null||e.nvMax==null)r=e._getNavigatorXRange(),r&&(e.nvMin=e.nvMin===undefined?r.min:e.nvMin,e.nvMax=e.nvMax===undefined?r.max:e.nvMax,e.xFieldIsTime=r.isTime)},o.prototype._getNavigatorXRange=function(){var e=this,t=e.options,n=t.dataSource,r=t.data,s=t.seriesList,o,u=!1,a,f;return s&&s.length>0?(n&&n.length?(r&&r.x&&r.x.bind?o=r.x.bind.toString():s[0].data&&s[0].data.x&&(o=s[0].data.x.bind),o&&(a=i(n,o))):(r&&r.x&&$.isArray(r.x)&&(a=i(r.x)),$.each(s,function(e,t){t.data&&t.data.x&&(f=i(t.data.x),f&&(a=a?{min:Math.min(a.min,f.min),max:Math.max(a.max,f.max),isTime:a.isTime&&f.isTime}:f))})),a):undefined},o.prototype._initialTargetCharts=function(){var e=this,t=e.options,n=t.targetSelector,r,i,s,o=0,u,a;if(n===undefined||n===null)return;r=e.targetChartInfos||[],i=e.targetCharts||[],s=$(n);while(o<r.length)u=r[o],$.inArray(u.chartObj.element[0],s)<0?(e._recoverTarget(u),r.splice(o,1)):o++;for(o=0;o<s.length;o++)$.inArray(s[o],i)<0&&(a=e._getChartObj($(s[o])),a&&r.push(a));e.targetChartInfos=r,e.targetCharts=s,e._updateTargetCharts()},o.prototype._getChartObj=function(e){var t=this,n=undefined,r,i,s=!1,o,u,a,f,l,c;return $.each(t.targetChartTypes,function(h,p){n=e.data("wijmo-"+p);if(n)return i=p,r=n.options,c=n.axisInfo&&n.axisInfo.x.isTime,o=r.dataSource,u=r.data,a=r.seriesList,s=o!==undefined&&o!==null&&$.isArray(o),l=f=undefined,r.axis.x.autoMin||(f=r.axis.x.min,f=t._getActualValue(f)),r.axis.x.autoMax||(l=r.axis.x.max,l=t._getActualValue(l)),!1}),n?{type:i,chartObj:n,isDataBind:s,dataSource:o,data:u,seriesList:a,axisXMax:l,axisXMin:f}:undefined},o.prototype._initialNavigator=function(){var e=this;e._initialNvChart(),e._initialNvSlider()},o.prototype._initialNvChart=function(){var e=this,t=e.options,n;n={dataSource:t.dataSource,data:t.data,marginTop:r,marginBottom:r,marginLeft:r,marginRight:r,axis:{y:{visible:!1,textVisible:!1,gridMajor:{visible:!1},gridMinor:{visible:!1}}},showChartLabels:!1,legend:{visible:!1},hint:{enable:!1},animation:{enabled:!1},seriesTransition:{enabled:!1},culture:t.culture},t.seriesList&&t.seriesList.length>0&&(n.seriesList=$.arrayClone(t.seriesList)),t.seriesStyles&&t.seriesStyles.length>0&&(n.seriesStyles=$.arrayClone(t.seriesStyles)),n.axis.x=$.extend(!0,{},{min:e._getActualValue(e.nvMin),max:e._getActualValue(e.nvMax)},e.options.xAxis),e.element.wijlinechart(n)},o.prototype._initialNvSlider=function(){var e=this,t=e.options,n,i,s,o,u,a=e.element.offset(),f,l,c,h=t.indicator,p=!h||h.visible!==!1,d=e._getCurrentRange(),v=d.max,m=d.min;e.isSliding=!1,i=e.element.data("wijmo-wijlinechart").canvasBounds,e.nvSliderEle?s=e.nvSliderEle:(n=$("<div class='"+t.wijCSS.navigatorSliderContainer+"'></div>").appendTo(e.element),f=a.top-n.offset().top,n.css("top",f+"px"),s=$("<div class='"+t.wijCSS.navigatorSlider+"'></div>").appendTo(n)),s.css({height:i.endY-i.startY+r+"px"}),e.nvSliderLayout={width:s.width(),height:s.height(),offset:s.offset()},u={disabled:this._isDisabled(),min:e.nvMin||0,max:e.nvMax||100,values:[m,v],step:t.step,range:!0},u.start=function(){p&&(e.nvSliderLayout.offset=e.nvSliderEle.offset(),e.nvIndicateTooltips[0].show(),e.nvIndicateTooltips[1].show()),e.isSliding=!0},u.slide=function(t,n){o=e._triggerRangeUpdating(n.values[0],n.values[1],!1,t)},u.change=function(t,n){e.isSliding&&(o=e._triggerRangeUpdating(n.values[0],n.values[1],!0,t))},u.stop=function(t,n){o!==!1&&e._triggerRangeUpdated(n.values[0],n.values[1],t),e.nvIndicateTooltips[0].hide(),e.nvIndicateTooltips[1].hide(),e.isSliding=!1},e.nvSliderEle=s.wijslider(u),e._initialNvIndicator()},o.prototype._triggerRangeUpdating=function(e,t,n,r){var i=this,s=i.options,o=s.updating,u=s.indicator,a=!u||u.visible!==!1,f=u?u.content:"",l=i._getCurrentRange(),c,h=!0;return i._updateNvIndicateTooltips(e,t,f),c=t!==l.max||e!==l.min,c=n?c&&t-e===l.max-l.min:c,c?(o&&typeof o=="function"&&(h=o.call(i,r,{rangeMin:i._getActualValue(e),rangeMax:i._getActualValue(t)})),h):!1},o.prototype._triggerRangeUpdated=function(e,t,n){var r=this,i=r.options.updated,s=r._getCurrentRange(),o=t!==s.max||e!==s.min;if(!o)return;r.options.rangeMax=t,r.options.rangeMin=e,r._updateTargetCharts(),i&&typeof i=="function"&&i.call(r,n,{rangeMin:r._getActualValue(e),rangeMax:r._getActualValue(t)})},o.prototype._initialNvIndicator=function(){var e=this,t,n,r=e.options,i=r.indicator;if(!e.nvIndicateTooltips||e.nvIndicateTooltips.length===0)t=$("<div></div>").addClass(r.wijCSS.navigatorIndicator).appendTo("body"),n=$("<div></div>").addClass(r.wijCSS.navigatorIndicator).appendTo("body"),e.nvIndicateTooltips=[t,n];e._bindSliderHandlerEvents()},o.prototype._bindSliderHandlerEvents=function(){var e=this,t=e.options,n=e.nvSliderEle,r=t.indicator,i=!r||r.visible!==!1,o=r?r.content:"",u,a=r?r.format:"",f=n.find(".ui-slider-handle"),l;e.xFieldIsTime&&(!a||a.length===0)&&(a=s(e.nvMax,e.nvMin)),e.indicatorContentFormat=a,e.indicatorCulture=$.wijGetCulture(t.culture,""),e._unbindSliderHandlerEvents(),n.on("wijmouseover."+e.widgetName,".ui-slider-handle",function(t){i&&!e.isSliding&&!e._isDisabled()&&(e.nvSliderLayout.offset=e.nvSliderEle.offset(),l=e._getCurrentRange(),e._updateNvIndicateTooltips(l.min,l.max,o),u=t.target===f[0]?0:1,e.nvIndicateTooltips[u].show())}).on("wijmouseout."+e.widgetName,".ui-slider-handle",function(t){e.isSliding||(u=t.target===f[0]?0:1,e.nvIndicateTooltips[u].hide())})},o.prototype._unbindSliderHandlerEvents=function(){var e=this;e.nvSliderEle.off("."+e.widgetName,".ui-slider-handle")},o.prototype._updateNvSlider=function(e){var t=this,n=t.options,r=t._getCurrentRange(),i=r.max,s=r.min,o=n.step,u=t.nvSliderEle;u&&(e==="values"?u.wijslider({values:[s,i]}):e==="step"?u.wijslider({step:o}):e==="disabled"&&u.wijslider({disabled:t._isDisabled()}))},o.prototype._updateNvIndicateTooltips=function(e,t,n){var r=this,i,s,o,u="",a="",f=r.nvSliderLayout,l=r.nvMax-r.nvMin,c=f.width,h=f.height,p=f.offset,d,v=r.indicatorContentFormat;e=e===undefined?r.nvMin:e,t=t===undefined?r.nvMax:t,i={left:p.left,top:p.top},s={left:p.left,top:p.top},i.top+=h/2,s.top+=h/2,i.left+=(e-r.nvMin)/l*c,s.left+=(t-r.nvMin)/l*c,r._updateIndicatorsContent(e,t,n),r._updateIndicatorsPosition(i,s)},o.prototype._updateIndicatorsContent=function(e,t,n){var r=this,i=n,s,o,u,a=r.indicatorContentFormat;typeof n=="function"&&(s={rangeMin:r._getActualValue(e),rangeMax:r._getActualValue(t)},i=n.call(r,s)),typeof i=="string"&&i.length>0&&(i=i.split(",")),$.isArray(i)&&i.length>0?(o=i[0].toString(),u=(i[1]||i[0]).toString()):(o=r._getActualValue(e),u=r._getActualValue(t),a&&(o=Globalize.format(o,a,r.indicatorCulture),u=Globalize.format(u,a,r.indicatorCulture))),r.nvIndicateTooltips[0].html(o),r.nvIndicateTooltips[1].html(u)},o.prototype._updateIndicatorsPosition=function(e,t){var n=this,r=n.nvIndicateTooltips[0],i=n.nvIndicateTooltips[1],s,o,u;r.css("float","left"),o=r.width(),u=r.height(),s=parseInt(e.left)-(o+15),r.css("left",s),r.css("top",e.top-u/2),i.css("float","left"),o=i.width(),u=i.height(),s=parseInt(t.left)+15,i.css("left",s),i.css("top",t.top-u/2)},o.prototype._updateTargetCharts=function(){var e=this,t=e.options,n=e._getCurrentRange(),r=n.max,i=n.min;if(!e.targetChartInfos)return;$.each(e.targetChartInfos,function(t,n){e.isInitialized&&e._clearTargetInitialAnimation(n.chartObj),e._updateTarget(n,i,r)})},o.prototype._updateTarget=function(e,t,r){var i=this,s=e.type,o=s.indexOf("candlestickchart")>-1,u=e.chartObj,a=u.element.data("wijmo-"+s),f=e.isDataBind,l=e.seriesList,c,h,p=0,d="",v=!1,m=0,g=!1,y,b,w,E=e.rangeMin,S=e.rangeMax,x,T=[],N=function(e,n){var i;return f&&d?i=e[d]:i=T[n],i!==null&&i!==undefined?(typeof i=="string"&&(i=n),i>=t&&i<=r):!0};if(!(l&&l.length>0))return;if(t===E&&r===S)return;e.rangeMin=t,e.rangeMax=r,t=i._getActualValue(t),r=i._getActualValue(r),x=o?undefined:{x:{min:t,max:r}};if(!a||u!==a){i._removeInvalidTarget(e);return}if(f){c=e.dataSource,h=e.data;if(h&&h.x)d=h.x.bind;else while(d=="")l[m].data&&l[m].data.xField&&(d=l[m].data.xField),m++;d&&(y=$.grep(c,N),u.beginUpdate(),u.element[s]({dataSource:y,axis:x}),u.endUpdate())}else h=e.data,w=$.arrayClone(l),g=h&&h.x&&$.isArray(h.x),g&&(T=h.x,b={x:$.grep(h.x,N)}),$.each(w,function(e,t){if(!t.data)return!0;T=t.data.x||T,$.each(t.data,function(e,n){n&&n.length>0&&(t.data[e]=$.grep(n,N))})}),v=typeof n.ChartUtil.getFirstValidListValue(T)=="string",x=v?undefined:x,u.beginUpdate(),u.element[s]({data:b,seriesList:w,axis:x}),u.endUpdate()},o.prototype._clearTargetInitialAnimation=function(e){var t=e.element.data("fields");e.aniPathsAttr=null,t&&(t.aniBarsAttr=null)},o.prototype._recoverTargetCharts=function(){var e=this;e.targetChartInfos&&e.targetChartInfos.length>0&&$.each(e.targetChartInfos,function(t,n){e._recoverTarget(n),e.targetChartInfos[t]=null}),e.targetChartInfos=null},o.prototype._recoverTarget=function(e){var t=e.type,n=e.chartObj,r=n.element.data("wijmo-"+t),i=e.isDataBind,s=e.seriesList,o=e.dataSource,u=e.data,a={min:e.axisXMin,max:e.axisXMax};if(!r||n!==r){this._removeInvalidTarget(e);return}n.beginUpdate(),i?n.element[t]({dataSource:o,data:u,axis:{x:a}}):n.element[t]({data:u,seriesList:s,axis:{x:a}}),n.endUpdate()},o.prototype._removeInvalidTarget=function(e){var t=this,n=-1;if(!t.targetChartInfos)return;n=t.targetChartInfos.indexOf(e),t.targetChartInfos.splice(n,1)},o.prototype.destroy=function(){var e=this;e.element.removeClass(e.options.wijCSS.chartNavigator),e._recoverTargetCharts(),e._removeNvIndicator(),e.nvSliderEle.remove(),e.element.wijlinechart("destroy"),t.prototype.destroy.call(this)},o.prototype._removeNvIndicator=function(){var e=this;e._unbindSliderHandlerEvents(),e.nvIndicateTooltips[0].remove(),e.nvIndicateTooltips[0]=null,e.nvIndicateTooltips[1].remove(),e.nvIndicateTooltips[1]=null,e.nvIndicateTooltips=null},o.prototype._getActualValue=function(e){return this.xFieldIsTime?$.fromOADate(e):e},o.prototype._getCurrentRange=function(){var e=this,t=e.options,n=t.rangeMax,r=t.rangeMin;return r=r===undefined?e.nvMin:Math.max(r,e.nvMin),n=n===undefined?e.nvMax:Math.min(n,e.nvMax),n=Math.max(n,r),{min:r,max:n}},o}(t.wijmoWidget);n.wijchartnavigator=o,o.prototype.targetChartTypes=["wijbarchart","wijcandlestickchart","wijlinechart"],o.prototype.widgetEventPrefix="wijchartnavigator";var u=function(t){function n(){t.apply(this,arguments),this.chartNavigator="wijmo-wijchartnavigator",this.navigatorSliderContainer="wijmo-wijchartnavigator-sliderContainer",this.navigatorSlider="wijmo-wijchartnavigator-slider",this.navigatorIndicator="wijmo-wijchartnavigator-indicator"}return e(n,t),n}(t.wijmo_css);n.wijchartnavigator_css=u;var a=function(){function e(){this.initSelector=":jqmData(role='wijchartnavigator')",this.wijCSS=new u,this.targetSelector="",this.seriesList=[],this.updating=null,this.updated=null}return e}();n.wijchartnavigator_options=a,o.prototype.options=$.extend(!0,{},t.wijmoWidget.prototype.options,new a),$.wijmo.registerWidget("wijchartnavigator",o.prototype)})(t.chart||(t.chart={}));var n=t.chart})(wijmo||(wijmo={}))});