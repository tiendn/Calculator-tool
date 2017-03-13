var wijmo;define(["./wijmo.data"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(t){var n=jQuery,r=function(){function e(e){this._originalReader=e}return e.prototype.read=function(e){e.items=null,this._originalReader&&n.isFunction(this._originalReader.read)&&this._originalReader.read(e),n.isArray(e.items)||(n.isArray(e.data)?e.items=e.data:e.data&&n.isArray(e.data.rows)?e.items=e.data.rows:e.items=[]);if(e.dynamic)if(!e.data||isNaN(e.data.totalRows))throw"totalRows value is missing"},e}(),i=function(i){function s(e){var t=this;i.call(this),this.dataSource=e,this.isRemote=!0,this.localPaging=!0,this._origLoaded=e.loaded,this._origReader=e.reader,e.loaded=function(e,r){t._loaded(),n.isFunction(t._origLoaded)&&t._origLoaded.apply(t,arguments)},e.reader=new r(e.reader);var s=e.items&&e.items.length>0;n.isArray(e.data)&&!s&&e.read(),e.items&&this._loaded()}return e(s,i),s.prototype.dispose=function(){this.dataSource.loaded=this._origLoaded,this.dataSource.reader=this._origReader,i.prototype.dispose.call(this)},s.prototype.getProperties=function(){return this.sourceArray&&this.sourceArray.length?t.ArrayDataViewBase._getProps(this.sourceArray[0]):[]},s.prototype._loaded=function(){this.sourceArray=this.dataSource.items,this.dataSource.data&&t.util.isNumeric(this.dataSource.data.totalRows)&&this._totalItemCount(this.dataSource.data.totalRows);var e=i.prototype._localRefresh.call(this,!this.dataSource.dynamic);this._currentDeferred&&e.then(this._currentDeferred.resolve)},s.prototype._remoteRefresh=function(){this._currentDeferred&&this._currentDeferred.state()==="pending"&&this._currentDeferred.fail(),this._currentDeferred=n.Deferred();var e={},t=!1;return this.dataSource.dynamic&&(t=!0,e.data=this._prepareRequest(),this.dataSource.proxy&&(this._origDataOption||(this._origDataOption=n.extend({},this.dataSource.proxy.options.data)),this.dataSource.proxy.options.data=n.extend({},this._origDataOption,e.data))),this.dataSource.load(e,t),this._currentDeferred},s.prototype._prepareRequest=function(){return{filtering:this._prepareFilterRequest(),paging:this._preparePageRequest(),sorting:this._prepareSortRequest()}},s.prototype._prepareFilterRequest=function(){var e=[];return!this._shape._compiledFilter.isEmpty&&this._shape._compiledFilter.normalized&&n.each(this._shape._compiledFilter.normalized,function(t,n){e.push({dataKey:t,filterOperator:n.op.Name,filterValue:n.value})}),e},s.prototype._preparePageRequest=function(){return{pageIndex:this._shape.pageIndex(),pageSize:this._shape.pageSize()}},s.prototype._prepareSortRequest=function(){return this._shape._compiledSort.isEmpty||!this._shape._compiledSort.normalized||this._shape._compiledSort.normalized.length==0?[]:n.map(this._shape._compiledSort.normalized,function(e){return{dataKey:e.property,sortDirection:e.asc?"ascending":"descending"}})},s}(t.ArrayDataViewBase);t.registerDataViewFactory(function(e){if(typeof wijdatasource=="function"&&e instanceof wijdatasource)return new i(e);return})})(t.data||(t.data={}));var n=t.data})(wijmo||(wijmo={}))});