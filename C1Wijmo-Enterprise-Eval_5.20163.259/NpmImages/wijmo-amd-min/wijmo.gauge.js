﻿/*
    *
    * Wijmo Library 5.20163.259
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports",'wijmo/wijmo','wijmo/wijmo.gauge'],function(n,t,i,r){"use strict";var f,o,u,s,h,c,e;window.wijmo=window.wijmo||{};window.wijmo.gauge=r,function(n){n[n.None=0]="None";n[n.Value=1]="Value";n[n.MinMax=2]="MinMax";n[n.All=3]="All"}(t.ShowText||(t.ShowText={}));f=t.ShowText;o=function(n){function t(r,u){var o=this,s;n.call(this,r,null,!0);this._ranges=new i.ObservableArray;this._rngElements=[];this._format='n0';this._showRanges=!0;this._shadow=!0;this._animated=!0;this._readOnly=!0;this._step=1;this._showText=f.None;this._showTicks=!1;this._thickness=.8;this._initialized=!1;this.valueChanged=new i.Event;this._getPercent=function(n){var t=this.max>this.min?(n-this.min)/(this.max-this.min):0;return Math.max(0,Math.min(1,t))};t._ctr++;s=this.getTemplate();this.applyTemplate('wj-control wj-gauge',s,{_dSvg:'dsvg',_svg:'svg',_filter:'filter',_gFace:'gface',_gRanges:'granges',_gPointer:'gpointer',_gCover:'gcover',_pFace:'pface',_pPointer:'ppointer',_cValue:'cvalue',_tValue:'value',_tMin:'min',_tMax:'max',_pTicks:'pticks'});this._filterID='wj-gauge-filter-'+t._ctr.toString(36);this._filter.setAttribute('id',this._filterID);this.face=new e;this.pointer=new e;this._ranges.collectionChanged.addHandler(function(){for(var r,t=o._ranges,n=0;n<t.length;n++)if(r=i.tryCast(t[n],e),!r)throw'ranges array must contain Range objects.';o._rangesDirty=!0;o.invalidate()});this.addEventListener(this.hostElement,'keydown',this._keydown.bind(this));this.addEventListener(this.hostElement,'click',function(n){n.button==0&&(o.focus(),o._applyMouseValue(n))});this.addEventListener(this.hostElement,'mousedown',function(n){n.button==0&&(o.focus(),o._applyMouseValue(n))});this.addEventListener(this.hostElement,'mousemove',function(n){n.buttons==1&&o._applyMouseValue(n,!0)});'ontouchstart'in window&&(this.addEventListener(this.hostElement,'touchstart',function(n){o.focus();n.defaultPrevented||o.isReadOnly||!o._applyMouseValue(n,!0)||n.preventDefault()}),this.addEventListener(this.hostElement,'touchmove',function(n){n.defaultPrevented||o.isReadOnly||!o._applyMouseValue(n,!0)||n.preventDefault()}));this.addEventListener(this.hostElement,'wheel',function(n){if(!n.defaultPrevented&&!o.isReadOnly&&o.containsFocus()&&o.value!=null&&o.hitTest(n)){var t=i.clamp(-n.deltaY,-1,1);o.value=i.clamp(o.value+(o.step||1)*t,o.min,o.max);n.preventDefault()}});this.initialize(u);this.invalidate()}return __extends(t,n),Object.defineProperty(t.prototype,"value",{get:function(){return this._pointer.max},set:function(n){n!=this._pointer.max&&(this._pointer.max=i.asNumber(n,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"min",{get:function(){return this._face.min},set:function(n){this._face.min=i.asNumber(n)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"max",{get:function(){return this._face.max},set:function(n){this._face.max=i.asNumber(n)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"origin",{get:function(){return this._origin},set:function(n){n!=this._origin&&(this._origin=i.asNumber(n,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isReadOnly",{get:function(){return this._readOnly},set:function(n){this._readOnly=i.asBoolean(n);this._setAttribute(this._svg,'cursor',this._readOnly?null:'pointer');i.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"step",{get:function(){return this._step},set:function(n){this._step=i.asNumber(n,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"format",{get:function(){return this._format},set:function(n){n!=this._format&&(this._format=i.asString(n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"getText",{get:function(){return this._getText},set:function(n){n!=this._getText&&(this._getText=i.asFunction(n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"thickness",{get:function(){return this._thickness},set:function(n){n!=this._thickness&&(this._thickness=i.clamp(i.asNumber(n,!1),0,1),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"face",{get:function(){return this._face},set:function(n){n!=this._face&&(this._face&&this._face.propertyChanged.removeHandler(this._rangeChanged),this._face=i.asType(n,e),this._face&&this._face.propertyChanged.addHandler(this._rangeChanged,this),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pointer",{get:function(){return this._pointer},set:function(n){if(n!=this._pointer){var t=null;this._pointer&&(t=this.value,this._pointer.propertyChanged.removeHandler(this._rangeChanged));this._pointer=i.asType(n,e);this._pointer&&(t&&(this.value=t),this._pointer.propertyChanged.addHandler(this._rangeChanged,this));this.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showText",{get:function(){return this._showText},set:function(n){n!=this._showText&&(this._showText=i.asEnum(n,f),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showTicks",{get:function(){return this._showTicks},set:function(n){n!=this._showTicks&&(this._showTicks=i.asBoolean(n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"thumbSize",{get:function(){return this._thumbSize},set:function(n){n!=this._thumbSize&&(this._thumbSize=i.asNumber(n,!0,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showRanges",{get:function(){return this._showRanges},set:function(n){n!=this._showRanges&&(this._showRanges=i.asBoolean(n),this._animColor=null,this._rangesDirty=!0,this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasShadow",{get:function(){return this._shadow},set:function(n){n!=this._shadow&&(this._shadow=i.asBoolean(n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAnimated",{get:function(){return this._animated},set:function(n){n!=this._animated&&(this._animated=i.asBoolean(n))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ranges",{get:function(){return this._ranges},enumerable:!0,configurable:!0}),t.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},t.prototype.refresh=function(t){var r,o,u,e,i;if(t===void 0&&(t=!0),n.prototype.refresh.call(this,t),this._rangesDirty){for(this._rangesDirty=!1,r=this._gRanges,i=0;i<this._rngElements.length;i++)o=this._rngElements[i],o.rng.propertyChanged.removeHandler(this._rangeChanged);while(r.lastChild)r.removeChild(r.lastChild);if(this._rngElements=[],this._showRanges)for(i=0;i<this.ranges.length;i++)u=this.ranges[i],u.propertyChanged.addHandler(this._rangeChanged,this),this._rngElements.push({rng:u,el:this._createElement('path',r)})}for(this._showElement(this._tValue,(this.showText&f.Value)!=0),this._showElement(this._tMin,(this.showText&f.MinMax)!=0),this._showElement(this._tMax,(this.showText&f.MinMax)!=0),this._showElement(this._cValue,(this.showText&f.Value)!=0||this._thumbSize>0),this._updateText(),e=this._getFilterUrl(),this._setAttribute(this._pFace,'filter',e),this._setAttribute(this._pPointer,'filter',e),this._updateRange(this._face),this._updateRange(this._pointer),this._updateTicks(),i=0;i<this.ranges.length;i++)this._updateRange(this.ranges[i]);this._initialized=!0},t.prototype.hitTest=function(n,t){i.isNumber(n)&&i.isNumber(t)?n=new i.Point(n,t):n instanceof i.Point||(n=i.mouseToPage(n));n=i.asType(n,i.Point);var r=i.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect());return n.x-=r.left+pageXOffset,n.y-=r.top+pageYOffset,this._getValueFromPoint(n)},t._getBBox=function(n){try{return n.getBBox()}catch(t){return{x:0,y:0,width:0,height:0}}},t.prototype._getFilterUrl=function(){return this.hasShadow?'url(#'+this._filterID+')':null},t.prototype._getRangeElement=function(n){var t,i;if(n==this._face)return this._pFace;if(n==this._pointer)return this._pPointer;for(t=0;t<this._rngElements.length;t++)if(i=this._rngElements[t],i.rng==n)return i.el;return null},t.prototype._rangeChanged=function(n,t){var r=this;if(n==this._pointer&&t.propertyName=='max'&&(this.onValueChanged(),this._updateText()),n==this._face){this.invalidate();return}if(n==this._pointer&&t.propertyName=='max'&&(this._animInterval&&clearInterval(this._animInterval),this.isAnimated&&!this.isUpdating&&this._initialized)){var u=this._getPointerColor(t.oldValue),f=this._getPointerColor(t.newValue),e=u?new i.Color(u):null,o=f?new i.Color(f):null;this._animInterval=i.animate(function(u){r._animColor=e&&o?i.Color.interpolate(e,o,u).toString():null;r._updateRange(n,t.oldValue+u*(t.newValue-t.oldValue));u>=1&&(r._animColor=null,r._animInterval=null,r._updateRange(n),r._updateText())});return}this._updateRange(n)},t.prototype._createElement=function(n,i,r){var u=document.createElementNS(t._SVGNS,n);return r&&u.setAttribute('class',r),i.appendChild(u),u},t.prototype._centerText=function(n,r,u){var f,e;if(n.getAttribute('display')!='none'){f=i.Globalize.format(r,this.format);i.isFunction(this.getText)&&(e=n==this._tValue?'value':n==this._tMin?'min':n==this._tMax?'max':null,i.assert(e!=null,'unknown element'),f=this.getText(this,e,r,f));n.textContent=f;var o=i.Rect.fromBoundingRect(t._getBBox(n)),s=u.x-o.width/2,h=u.y+o.height/4;n.setAttribute('x',this._fix(s));n.setAttribute('y',this._fix(h))}},t.prototype._copy=function(n,t){var u,r,f;if(n=='ranges'){for(u=i.asArray(t),r=0;r<u.length;r++)f=new e,i.copy(f,u[r]),this.ranges.push(f);return!0}return n=='pointer'?(i.copy(this.pointer,t),!0):!1},t.prototype._showElement=function(n,t){this._setAttribute(n,'display',t?'':'none')},t.prototype._setAttribute=function(n,t,i){i?n.setAttribute(t,i):n.removeAttribute(t)},t.prototype._updateRange=function(n,t){var i,r;t===void 0&&(t=n.max);n==this._pointer&&(n.min=this.origin!=null?this.origin:this.min<0&&this.max>0?0:this.min);i=this._getRangeElement(n);i&&(this._updateRangeElement(i,n,t),r=n.color,n==this._pointer&&(r=this._animColor?this._animColor:this._getPointerColor(n.max)),this._setAttribute(i,'style',r?'fill:'+r:null))},t.prototype._getPointerColor=function(n){var t,r,i;if(!this._showRanges){for(r=0;r<this._ranges.length;r++)i=this._ranges[r],n>=i.min&&n<=i.max&&(t==null||t.max-t.min>i.max-i.min)&&(t=i);if(t)return t.color}return this._pointer.color},t.prototype._keydown=function(n){if(!this._readOnly&&this._step){var r=this._getKey(n.keyCode),t=!0;switch(r){case i.Key.Left:case i.Key.Down:this.value=i.clamp(this.value-this.step,this.min,this.max);break;case i.Key.Right:case i.Key.Up:this.value=i.clamp(this.value+this.step,this.min,this.max);break;case i.Key.Home:this.value=this.min;break;case i.Key.End:this.value=this.max;break;default:t=!1}t&&n.preventDefault()}},t.prototype._getKey=function(n){return n},t.prototype._applyMouseValue=function(n,t){var r,u;return!this.isReadOnly&&this.containsFocus()&&(r=this.hitTest(n),r!=null)?(u=this._animated,t&&(this._animated=!1),this._step!=null&&(r=Math.round(r/this._step)*this._step),this.value=i.clamp(r,this.min,this.max),this._animated=u,!0):!1},t.prototype._updateRangeElement=function(){i.assert(!1,'Gauge is an abstract class.')},t.prototype._updateText=function(){i.assert(!1,'Gauge is an abstract class.')},t.prototype._updateTicks=function(){i.assert(!1,'Gauge is an abstract class.')},t.prototype._getValueFromPoint=function(){return null},t.prototype._fix=function(n){return i.isNumber(n)?parseFloat(n.toFixed(4)).toString():this._fix(n.x)+' '+this._fix(n.y)},t._SVGNS='http://www.w3.org/2000/svg',t._ctr=0,t.controlTemplate='<div wj-part="dsvg" style="width:100%;height:100%"><svg wj-part="svg" width="100%" height="100%" style="overflow:visible"><defs><filter wj-part="filter"><feOffset dx="3" dy="3"><\/feOffset><feGaussianBlur result="offset-blur" stdDeviation="5"><\/feGaussianBlur><feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"><\/feComposite><feFlood flood-color="black" flood-opacity="0.2" result="color"><\/feFlood><feComposite operator="in" in="color" in2="inverse" result="shadow"><\/feComposite><feComposite operator="over" in="shadow" in2="SourceGraphic"><\/feComposite><\/filter><\/defs><g wj-part="gface" class="wj-face" style="cursor:inherit"><path wj-part="pface"/><\/g><g wj-part="granges" style="cursor:inherit"/><g wj-part="gpointer" class="wj-pointer" style="cursor:inherit"><path wj-part="ppointer"/><\/g><g wj-part="gcover" style="cursor:inherit"><path wj-part="pticks" class="wj-ticks"/><circle wj-part="cvalue" class="wj-pointer wj-thumb"/><text wj-part="value" class="wj-value"/><text wj-part="min" class="wj-min"/><text wj-part="max" class="wj-max"/><\/g><\/svg><\/div>',t}(i.Control);t.Gauge=o,function(n){n[n.Right=0]="Right";n[n.Left=1]="Left";n[n.Up=2]="Up";n[n.Down=3]="Down"}(t.GaugeDirection||(t.GaugeDirection={}));u=t.GaugeDirection;s=function(n){function t(t,r){n.call(this,t,null);this._direction=u.Right;i.addClass(this.hostElement,'wj-lineargauge');this.initialize(r)}return __extends(t,n),Object.defineProperty(t.prototype,"direction",{get:function(){return this._direction},set:function(n){n!=this._direction&&(this._direction=i.asEnum(n,u),this.invalidate())},enumerable:!0,configurable:!0}),t.prototype._updateRangeElement=function(n,t,r){var e=this._getRangeRect(t,r),s,a,h,c;if(this._updateSegment(n,e),s=t==this._pointer&&(this.showText&f.Value)!=0,a=s||t==this._pointer&&this.thumbSize>0,s||a){h=e.left+e.width/2;c=e.top+e.height/2;switch(this._getDirection()){case u.Right:h=e.right;break;case u.Left:h=e.left;break;case u.Up:c=e.top;break;case u.Down:c=e.bottom}}if(s&&this._centerText(this._tValue,r,new i.Point(h,c)),s||a){e=i.Rect.fromBoundingRect(o._getBBox(this._tValue));var v=this._animColor?this._animColor:this._getPointerColor(t.max),y=this.thumbSize!=null?this.thumbSize/2:Math.max(e.width,e.height)*.8,l=this._cValue;this._setAttribute(l,'cx',this._fix(h));this._setAttribute(l,'cy',this._fix(c));this._setAttribute(l,'style',v?'fill:'+v:null);this._setAttribute(l,'r',this._fix(y))}},t.prototype._updateText=function(){var n=this._getRangeRect(this._face);switch(this._getDirection()){case u.Right:this._setText(this._tMin,this.min,n,'left');this._setText(this._tMax,this.max,n,'right');break;case u.Left:this._setText(this._tMin,this.min,n,'right');this._setText(this._tMax,this.max,n,'left');break;case u.Up:this._setText(this._tMin,this.min,n,'bottom');this._setText(this._tMax,this.max,n,'top');break;case u.Down:this._setText(this._tMin,this.min,n,'top');this._setText(this._tMax,this.max,n,'bottom')}},t.prototype._updateTicks=function(){var f='',n,t,i,r;if(this.showTicks&&this.step)for(n=this._getRangeRect(this._face),t=this.min+this.step;t<this.max;t+=this.step)switch(this._getDirection()){case u.Right:i=this._fix(n.left+n.width*this._getPercent(t));f+='M '+i+' '+this._fix(n.top)+' L '+i+' '+this._fix(n.bottom)+' ';break;case u.Left:i=this._fix(n.right-n.width*this._getPercent(t));f+='M '+i+' '+n.top.toFixed(2)+' L '+i+' '+n.bottom.toFixed(2)+' ';break;case u.Up:r=(n.bottom-n.height*this._getPercent(t)).toFixed(2);f+='M '+this._fix(n.left)+' '+r+' L '+this._fix(n.right)+' '+r+' ';break;case u.Down:r=(n.top+n.height*this._getPercent(t)).toFixed(2);f+='M '+n.left.toFixed(2)+' '+r+' L '+n.right.toFixed(2)+' '+r+' '}this._pTicks.setAttribute('d',f)},t.prototype._updateSegment=function(n,t){var r={p1:this._fix(new i.Point(t.left,t.top)),p2:this._fix(new i.Point(t.right,t.top)),p3:this._fix(new i.Point(t.right,t.bottom)),p4:this._fix(new i.Point(t.left,t.bottom))},u=i.format('M {p1} L {p2} L {p3} L {p4} Z',r);n.setAttribute('d',u)},t.prototype._setText=function(n,t,r,u){if(n.getAttribute('display')!='none'){n.textContent=i.Globalize.format(t,this.format);var e=i.Rect.fromBoundingRect(o._getBBox(n)),f=new i.Point(r.left+r.width/2-e.width/2,r.top+r.height/2+e.height/2);switch(u){case'top':f.y=r.top-4;break;case'left':f.x=r.left-4-e.width;break;case'right':f.x=r.right+4;break;case'bottom':f.y=r.bottom+4+e.height}n.setAttribute('x',this._fix(f.x));n.setAttribute('y',this._fix(f.y))}},t.prototype._getRangeRect=function(n,t){var r,s;t===void 0&&(t=n.max);r=new i.Rect(0,0,this.hostElement.clientWidth,this.hostElement.clientHeight);s=this.thumbSize?Math.ceil(this.thumbSize/2):0;this.showText!=f.None&&(s=Math.max(s,3*parseInt(getComputedStyle(this.hostElement).fontSize)));switch(this._getDirection()){case u.Right:case u.Left:r=r.inflate(-s,-r.height*(1-this.thickness*n.thickness)/2);break;case u.Up:case u.Down:r=r.inflate(-r.width*(1-this.thickness*n.thickness)/2,-s)}var h=n==this._face,e=h?0:this._getPercent(n.min),o=h?1:this._getPercent(t);switch(this._getDirection()){case u.Right:r.left+=r.width*e;r.width*=o-e;break;case u.Left:r.left=r.right-r.width*o;r.width=r.width*(o-e);break;case u.Down:r.top+=r.height*e;r.height*=o-e;break;case u.Up:r.top=r.bottom-r.height*o;r.height=r.height*(o-e)}return r},t.prototype._getValueFromPoint=function(n){var t=this._getRangeRect(this._face),i=0;switch(this._getDirection()){case u.Right:i=t.width>0?(n.x-t.left)/t.width:0;break;case u.Left:i=t.width>0?(t.right-n.x)/t.width:0;break;case u.Up:i=t.height>0?(t.bottom-n.y)/t.height:0;break;case u.Down:i=t.height>0?(n.y-t.top)/t.height:0}return this.min+i*(this.max-this.min)},t.prototype._getDirection=function(){var n=this._direction;if(this.rightToLeft)switch(n){case u.Left:n=u.Right;break;case u.Right:n=u.Left}return n},t.prototype._getKey=function(n){switch(this._getDirection()){case u.Left:switch(n){case i.Key.Left:n=i.Key.Right;break;case i.Key.Right:n=i.Key.Left}break;case u.Down:switch(n){case i.Key.Up:n=i.Key.Down;break;case i.Key.Down:n=i.Key.Up}}return n},t}(o);t.LinearGauge=s;h=function(n){function t(t,r){n.call(this,t,null);this._startAngle=0;this._sweepAngle=180;this._autoScale=!0;i.addClass(this.hostElement,'wj-radialgauge');this._thickness=.4;this.showText=f.All;this.initialize(r)}return __extends(t,n),Object.defineProperty(t.prototype,"startAngle",{get:function(){return this._startAngle},set:function(n){n!=this._startAngle&&(this._startAngle=i.clamp(i.asNumber(n,!1),-360,360),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sweepAngle",{get:function(){return this._sweepAngle},set:function(n){n!=this._sweepAngle&&(this._sweepAngle=i.clamp(i.asNumber(n,!1),-360,360),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"autoScale",{get:function(){return this._autoScale},set:function(n){n!=this._autoScale&&(this._autoScale=i.asBoolean(n),this.invalidate())},enumerable:!0,configurable:!0}),t.prototype.refresh=function(t){var r,e,u;t===void 0&&(t=!0);this._setAttribute(this._svg,'viewBox',null);this._rcSvg=i.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect());n.prototype.refresh.call(this,t);this._ctmInv=null;this._ptSvg=null;this._autoScale&&(this._setAttribute(this._svg,'viewBox',''),r=i.Rect.fromBoundingRect(o._getBBox(this._pFace)),(this.showText&f.Value)!=0&&(r=i.Rect.union(r,i.Rect.fromBoundingRect(o._getBBox(this._tValue)))),(this.showText&f.MinMax)!=0&&(r=i.Rect.union(r,i.Rect.fromBoundingRect(o._getBBox(this._tMin))),r=i.Rect.union(r,i.Rect.fromBoundingRect(o._getBBox(this._tMax)))),e=[this._fix(r.left),this._fix(r.top),this._fix(r.width),this._fix(r.height)].join(' '),this._setAttribute(this._svg,'viewBox',e),u=this._pFace.getCTM(),this._ctmInv=u?u.inverse():null,this._ptSvg=this._svg.createSVGPoint())},t.prototype._updateRangeElement=function(n,t,r){if(this._rcSvg){var u=this._rcSvg,s=new i.Point(u.width/2,u.height/2),h=Math.min(u.width,u.height)/2,c=h*this.thickness,l=c*t.thickness,e=h-(c-l)/2,a=e-l,v=this.startAngle+180,o=this.sweepAngle,y=t==this._face,p=y?0:this._getPercent(t.min),k=y?1:this._getPercent(r),d=v+o*p,g=o*(k-p);if(this._updateSegment(n,s,e,a,d,g),t==this._pointer&&this.thumbSize>0){var w=this._animColor?this._animColor:this._getPointerColor(t.max),b=this._getPoint(s,v+o*this._getPercent(r),(e+a)/2),f=this._cValue;this._setAttribute(f,'cx',this._fix(b.x));this._setAttribute(f,'cy',this._fix(b.y));this._setAttribute(f,'style',w?'fill:'+w:null);this._setAttribute(f,'r',this._fix(this.thumbSize/2))}}},t.prototype._updateText=function(){var u,e;if(this._rcSvg){var n=this._rcSvg,t=new i.Point(n.width/2,n.height/2),r=Math.min(n.width,n.height)/2,o=Math.max(0,r*(1-this.thickness)),s=this.startAngle+180,h=this.sweepAngle;this._showElement(this._cValue,this.thumbSize>0);u=(this.showText&f.MinMax)!=0&&Math.abs(h)<=300;this._showElement(this._tMin,u);this._showElement(this._tMax,u);this._centerText(this._tValue,this.value,t);e=10*(this.sweepAngle<0?-1:1);this._centerText(this._tMin,this.min,this._getPoint(t,s-e,(r+o)/2));this._centerText(this._tMax,this.max,this._getPoint(t,s+h+e,(r+o)/2))}},t.prototype._updateTicks=function(){var r='',t;if(this.showTicks&&this.step){var n=this._rcSvg,u=new i.Point(n.width/2,n.height/2),f=Math.min(n.width,n.height)/2,e=f*this.thickness,o=e*this._face.thickness,s=f-(e-o)/2,c=s-o;for(t=this.min+this.step;t<this.max;t+=this.step){var h=this.startAngle+180+this.sweepAngle*this._getPercent(t),l=this._fix(this._getPoint(u,h,c)),a=this._fix(this._getPoint(u,h,s));r+='M '+l+' L '+a+' '}}this._pTicks.setAttribute('d',r)},t.prototype._updateSegment=function(n,t,r,u,f,e){e=Math.min(Math.max(e,-359.99),359.99);var o=this._getPoint(t,f,u),s=this._getPoint(t,f,r),h=this._getPoint(t,f+e,r),c=this._getPoint(t,f+e,u),l={large:Math.abs(e)>180?1:0,cw:e>0?1:0,ccw:e>0?0:1,or:this._fix(r),ir:this._fix(u),p1:this._fix(o),p2:this._fix(s),p3:this._fix(h),p4:this._fix(c)},a=i.format("M {p1} L {p2} A {or} {or} 0 {large} {cw} {p3} L {p4} A {ir} {ir} 0 {large} {ccw} {p1} Z",l);n.setAttribute('d',a)},t.prototype._getPoint=function(n,t,r){return t=t*Math.PI/180,new i.Point(n.x+r*Math.cos(t),n.y+r*Math.sin(t))},t.prototype._getValueFromPoint=function(n){var a;if(this.autoScale&&this._ctmInv&&(this._ptSvg.x=n.x,this._ptSvg.y=n.y,this._ptSvg=this._ptSvg.matrixTransform(this._ctmInv),n.x=this._ptSvg.x,n.y=this._ptSvg.y),!this._rcSvg)return null;var u=this._rcSvg,h=new i.Point(u.width/2,u.height/2),e=Math.min(u.width,u.height)/2,c=e*(1-this.thickness),o=n.x-h.x,s=n.y-h.y,l=s*s+o*o;if(l>e*e+16||l<c*c-16)return null;var t=(Math.PI-Math.atan2(-s,o))*180/Math.PI,r=this.startAngle,f=this.sweepAngle;if(f>0){while(t<r)t+=360;while(t>r+f)t-=360}else{while(t<r+f)t+=360;while(t>r)t-=360}return a=Math.abs(t-r)/Math.abs(f),this.min+a*(this.max-this.min)},t}(o);t.RadialGauge=h;c=function(n){function t(t,r){n.call(this,t,null);i.addClass(this.hostElement,'wj-bulletgraph');this._pointer.thickness=.35;this._rngTarget=new e('target');this._rngTarget.thickness=.8;this._rngTarget.color='black';this._rngGood=new e('good');this._rngGood.color='rgba(0,0,0,.15)';this._rngBad=new e('bad');this._rngBad.color='rgba(0,0,0,.3)';this.ranges.push(this._rngBad);this.ranges.push(this._rngGood);this.ranges.push(this._rngTarget);this.initialize(r)}return __extends(t,n),Object.defineProperty(t.prototype,"target",{get:function(){return this._rngTarget.max},set:function(n){this._rngTarget.max=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"good",{get:function(){return this._rngGood.max},set:function(n){this._rngGood.max=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bad",{get:function(){return this._rngBad.max},set:function(n){this._rngBad.max=n},enumerable:!0,configurable:!0}),t.prototype._getRangeRect=function(t,i){i===void 0&&(i=t.max);var r=n.prototype._getRangeRect.call(this,t,i);if(t==this._rngTarget)switch(this.direction){case u.Right:r.left=r.right-1;r.width=3;break;case u.Left:r.width=3;break;case u.Up:r.height=3;break;case u.Down:r.top=r.bottom-1;r.height=3}return r},t}(s);t.BulletGraph=c;e=function(){function n(n){this._min=0;this._max=100;this._thickness=1;this.propertyChanged=new i.Event;this._name=n}return Object.defineProperty(n.prototype,"min",{get:function(){return this._min},set:function(n){this._setProp('_min',i.asNumber(n,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"max",{get:function(){return this._max},set:function(n){this._setProp('_max',i.asNumber(n,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(n){this._setProp('_color',i.asString(n))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(n){this._setProp('_thickness',i.clamp(i.asNumber(n),0,1))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name},set:function(n){this._setProp('_name',i.asString(n))},enumerable:!0,configurable:!0}),n.prototype.onPropertyChanged=function(n){this.propertyChanged.raise(this,n)},n.prototype._setProp=function(n,t){var r=this[n],u;if(t!=r){this[n]=t;u=new i.PropertyChangedEventArgs(n.substr(1),r,t);this.onPropertyChanged(u)}},n._ctr=0,n}();t.Range=e})