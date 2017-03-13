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
var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports",'wijmo/wijmo','wijmo/wijmo.odata'],function(n,t,i,r){"use strict";function o(){var n;return(n=window.wijmo)&&n.grid}function f(){var n,t;return(n=window.wijmo)&&(t=n.grid)&&t.filter}var u,e;window.wijmo=window.wijmo||{};window.wijmo.odata=r;u=function(n){function t(t,r,u){var f=this;n.call(this);this._count=0;this._sortOnServer=!0;this._pageOnServer=!0;this._filterOnServer=!0;this._inferDataTypes=!0;this.loading=new i.Event;this.loaded=new i.Event;this.error=new i.Event;this._url=i.asString(t,!1);this._tbl=i.asString(r);u&&i.copy(this,u);this.sortDescriptions.collectionChanged.addHandler(function(){f.sortOnServer&&f._getData()});this._getData()}return __extends(t,n),Object.defineProperty(t.prototype,"tableName",{get:function(){return this._tbl},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fields",{get:function(){return this._fields},set:function(n){this._fields!=n&&(this._fields=i.asArray(n),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"requestHeaders",{get:function(){return this._requestHeaders},set:function(n){this._requestHeaders=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"keys",{get:function(){return this._keys},set:function(n){this._keys=i.asArray(n)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataTypes",{get:function(){return this._dataTypes},set:function(n){this._dataTypes=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inferDataTypes",{get:function(){return this._inferDataTypes},set:function(n){this._inferDataTypes=i.asBoolean(n)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sortOnServer",{get:function(){return this._sortOnServer},set:function(n){n!=this._sortOnServer&&(this._sortOnServer=i.asBoolean(n),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pageOnServer",{get:function(){return this._pageOnServer},set:function(n){n!=this._pageOnServer&&(this._pageOnServer=i.asBoolean(n),this.pageSize&&this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterOnServer",{get:function(){return this._filterOnServer},set:function(n){n!=this._filterOnServer&&(this._filterOnServer=i.asBoolean(n),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterDefinition",{get:function(){return this._filterDef},set:function(n){n!=this._filterDef&&(this._filterDef=i.asString(n),this._getData())},enumerable:!0,configurable:!0}),t.prototype.updateFilterDefinition=function(n){this.filterOnServer&&o()&&f()&&n instanceof f().FlexGridFilter&&(this.filterDefinition=this._asODataFilter(n))},Object.defineProperty(t.prototype,"oDataVersion",{get:function(){return this._odv},set:function(n){this._odv=i.asNumber(n)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isLoading",{get:function(){return this._loading},enumerable:!0,configurable:!0}),t.prototype.onLoading=function(n){this.loading.raise(this,n)},t.prototype.onLoaded=function(n){this.loaded.raise(this,n)},t.prototype.load=function(){this._getData()},t.prototype.onError=function(n){return this.error.raise(this,n),!n.cancel},t.prototype.commitNew=function(){var u=this,f={Accept:'application/json'},r,t,e;if(this.requestHeaders)for(r in this.requestHeaders)f[r]=this.requestHeaders[r];t=this.currentAddItem;t&&(e=this._getWriteUrl(),i.httpRequest(e,{method:'POST',requestHeaders:f,data:this._stringifyNumbers(t),success:function(n){var i=JSON.parse(n.response);u.keys.forEach(function(n){t[n]=i[n]});u.refresh()},error:this._error.bind(this)}));n.prototype.commitNew.call(this)},t.prototype.commitEdit=function(){var t=this.currentEditItem,r;!t||this.currentAddItem||this._sameContent(t,this._edtClone)||(r=this._getWriteUrl(this._edtClone),i.httpRequest(r,{method:'PUT',requestHeaders:this.requestHeaders,data:this._stringifyNumbers(t),error:this._error.bind(this)}));n.prototype.commitEdit.call(this)},t.prototype.remove=function(t){if(t&&t!=this.currentAddItem){var r=this._getWriteUrl(t);i.httpRequest(r,{method:'DELETE',requestHeaders:this.requestHeaders,error:this._error.bind(this)})}n.prototype.remove.call(this,t)},Object.defineProperty(t.prototype,"totalItemCount",{get:function(){return this.pageOnServer?this._count:this._view.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pageCount",{get:function(){return this.pageSize?Math.ceil(this.totalItemCount/this.pageSize):1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pageSize",{get:function(){return this._pgSz},set:function(n){n!=this._pgSz&&(this._pgSz=i.asInt(n),this.pageOnServer?(this._pgIdx=i.clamp(this._pgIdx,0,this.pageCount-1),this._getData()):this.refresh())},enumerable:!0,configurable:!0}),t.prototype.onPageChanging=function(t){return n.prototype.onPageChanging.call(this,t),!t.cancel&&this.pageOnServer&&this._getData(),!t.cancel},t.prototype._getPageView=function(){return this.pageOnServer?this._view:n.prototype._getPageView.call(this)},t.prototype._performRefresh=function(){var t=this._canFilter,i=this._canSort;this._canFilter=!this._filterOnServer;this._canSort=!this._sortOnServer;n.prototype._performRefresh.call(this);this._canFilter=t;this._canSort=i},t.prototype._storeItems=function(n,t){t?Array.prototype.push.apply(this.sourceCollection,n):this.sourceCollection=n},t.prototype._getReadUrl=function(n){var t=this._url;return t[t.length-1]!='/'&&(t+='/'),n?t=n.indexOf('http')==0?n:t+n:this._tbl&&(t+=this._tbl),t},t.prototype._getReadParams=function(n){var t={$format:'json'},i,r,u;if(this._tbl&&!n){if(this._odv<4?t.$inlinecount='allpages':t.$count=!0,this.fields&&(t.$select=this.fields.join(',')),this.sortOnServer&&this.sortDescriptions.length){for(i='',r=0;r<this.sortDescriptions.length;r++)u=this.sortDescriptions[r],i&&(i+=','),i+=u.property,u.ascending||(i+=' desc');t.$orderby=i}this.pageOnServer&&this.pageSize>0&&(t.$skip=this.pageIndex*this.pageSize,t.$top=this.pageSize);this.filterDefinition&&(t.$filter=this.filterDefinition)}return t},t.prototype._getData=function(n){var t=this;this._toGetData&&clearTimeout(this._toGetData);this._toGetData=setTimeout(function(){if(t._odv==null){t._getSchema();return}t._loading=!0;t.onLoading();var r=t._getReadUrl(n);i.httpRequest(r,{requestHeaders:t.requestHeaders,data:t._getReadParams(n),success:function(i){var r=JSON.parse(i.response),u=r.d?r.d.results:r.value,o=r.d?r.d.__count:r['odata.count']||r['@odata.count'],e,f;if(o!=null&&(t._count=parseInt(o)),n||t.inferDataTypes&&!t._dataTypesInferred&&(t._dataTypesInferred=t._getInferredDataTypes(u)),e=t.dataTypes?t.dataTypes:t._dataTypesInferred,e)for(f=0;f<u.length;f++)t._convertItem(e,u[f]);t._storeItems(u,n!=null);t.refresh();n=r.d?r.d.__next:r['odata.nextLink']||r['@odata.nextLink'];n?t._getData(n):(t._loading=!1,t.onLoaded())},error:function(n){if(t._loading=!1,t.onLoaded(),t.onError(new i.RequestErrorEventArgs(n)))throw'HttpRequest Error: '+n.status+' '+n.statusText;}})},100)},t.prototype._stringifyNumbers=function(n){var r,u,t;if(this._odv>=4)return n;r={};for(u in n)t=n[u],r[u]=i.isNumber(t)?t.toString():t;return r},t.prototype._convertItem=function(n,t){var u,f,r;for(u in n)f=n[u],r=t[u],r!=undefined&&(f===i.DataType.Date&&r&&r.indexOf('/Date(')==0&&(r=new Date(parseInt(r.substr(6)))),t[u]=i.changeType(r,f,null))},t.prototype._getInferredDataTypes=function(n){var u=null,f,r,e,o;if(n.length>0){for(f={},r=0;r<n.length&&r<10;r++)this._extend(f,n[r]);for(e in f)o=f[e],i.isString(o)&&o.match(t._rxDate)&&(u||(u={}),u[e]=i.DataType.Date)}return u},t.prototype._getServiceUrl=function(){var n=this._url;return n[n.length-1]!='/'&&(n+='/'),n},t.prototype._getSchema=function(){var r=this,n=this._getServiceUrl()+'$metadata';this._odv=t._odvCache[n];this._odv?this._getData():i.httpRequest(n,{requestHeaders:this.requestHeaders,success:function(i){var u=i.response.match(/<.*Version\s*=\s*"(.*)"\s*>/i),f=u?parseFloat(u[1]):4;t._odvCache[n]=r._odv=f},error:function(){t._odvCache[n]=r._odv=4},complete:function(){r._getData()}})},t.prototype._getWriteUrl=function(n){var t=this._getServiceUrl(),r;return t+=this._tbl,n&&(i.assert(this.keys&&this.keys.length>0,'write operations require keys.'),r=[],this.keys.forEach(function(t){i.assert(n[t]!=null,'key values cannot be null.');r.push(t+'='+n[t])}),t+='('+r.join(',')+')'),t},t.prototype._asODataFilter=function(n){for(var u,t,i='',r=0;r<n.grid.columns.length;r++)u=n.grid.columns[r],t=n.getColumnFilter(u,!1),t&&t.isActive&&(i&&(i+=' and '),t.conditionFilter&&t.conditionFilter.isActive?i+=this._asODataConditionFilter(t.conditionFilter):t.valueFilter&&t.valueFilter.isActive&&(i+=this._asODataValueFilter(t.valueFilter)));return i},t.prototype._asODataValueFilter=function(n){var t=n.column,e=t.binding,r='',u,f;for(u in n.showValues)f=i.changeType(u,t.dataType,t.format),r&&(r+=' or '),r+='('+e+' eq '+this._asODataValue(f,t.dataType)+')';return'('+r+')'},t.prototype._asODataConditionFilter=function(n){var t=this._asODataCondition(n,n.condition1);return n.condition2.operator!=null&&(t+=(n.and?' and ':' or ')+this._asODataCondition(n,n.condition2)),'('+t+')'},t.prototype._asODataCondition=function(n,t){var i=n.column.binding,r=this._asODataValue(t.value,n.column.dataType);switch(t.operator){case 0:return i+' eq '+r;case 1:return i+' ne '+r;case 2:return i+' gt '+r;case 3:return i+' gt '+r;case 4:return i+' lt '+r;case 5:return i+' le '+r;case 6:return'startswith('+i+','+r+')';case 7:return'endswith('+i+','+r+')';case 8:return this._odv>=4?'contains('+i+','+r+')':'substringof('+r.toLowerCase()+', tolower('+i+'))';case 9:return this._odv>=4?'not contains('+i+','+r+')':'not substringof('+r.toLowerCase()+', tolower('+i+'))'}},t.prototype._asODataValue=function(n,t){return i.isString(n)?"'"+n.replace(/'/g,"\'")+"'":i.isDate(n)?"datetime'"+n.toISOString()+"'":n!=null?n.toString():t==i.DataType.String?"''":null},t.prototype._error=function(n){if(this.onError(new i.RequestErrorEventArgs(n))){this._getData();throw'HttpRequest Error: '+n.status+' '+n.statusText;}},t._odvCache={},t._rxDate=/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/,t}(i.CollectionView);t.ODataCollectionView=u;e=function(n){function t(t,i,r){r==null&&(r={});r.pageOnServer=!0;r.sortOnServer=!0;r.canGroup=!1;r.pageSize||(r.pageSize=100);n.call(this,t,i,r);this._data=[];this.sourceCollection=this._data;this._skip=0;this.setWindow(0,this.pageSize)}return __extends(t,n),t.prototype.setWindow=function(n,t){var i=this;this._toSetWindow&&clearTimeout(this._toSetWindow);this._toSetWindow=setTimeout(function(){i._toSetWindow=null;i._performSetWindow(n,t)},50)},Object.defineProperty(t.prototype,"pageOnServer",{get:function(){return!0},set:function(n){if(!n)throw'ODataVirtualCollectionView requires pageOnServer = true.';},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sortOnServer",{get:function(){return!0},set:function(n){if(!i.asBoolean(n))throw'ODataVirtualCollectionView requires sortOnServer = true.';},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterOnServer",{get:function(){return!0},set:function(n){if(!i.asBoolean(n))throw'ODataVirtualCollectionView requires filterOnServer = true.';},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canGroup",{get:function(){return this._canGroup},set:function(n){if(i.asBoolean(n))throw'ODataVirtualCollectionView does not support grouping.';},enumerable:!0,configurable:!0}),t.prototype._performRefresh=function(){this.isLoading||(this._refresh=!0);n.prototype._performRefresh.call(this)},t.prototype._getReadParams=function(t){var i=n.prototype._getReadParams.call(this,t);return i.$skip=this._skip||0,i.$top=this.pageSize,i},t.prototype._storeItems=function(n,t){var r,i;if(this._refresh||this._data.length!=this.totalItemCount){for(this._data.length=this.totalItemCount,i=0;i<this._data.length;i++)this._data[i]=null;this._refresh=!1}for(t||(this._loadOffset=0),r=this._loadOffset+(this._skip||0),i=0;i<n.length;i++)this._data[i+r]=n[i];this._loadOffset+=n.length},t.prototype._performSetWindow=function(n,t){var e,u,f,r;for(n=i.asInt(n),t=i.asInt(t),i.assert(t>=n,'Start must be smaller than end.'),e=i.isNumber(this._start)&&n>this._start,this._start=n,this._end=t,u=!1,r=n;r<t&&r<this._data.length&&!u;r++)u=this._data[r]==null;if(u){for(f=Math.max(0,e?n:t-this.pageSize),r=f;r<this._data.length&&this._data[r]!=null;r++)f++;this._skip=f;this._getData()}},t}(u);t.ODataVirtualCollectionView=e})