var wijmo;define(["./wijmo.widget","./wijmo.wijcombobox","./wijmo.wijcheckbox","./wijmo.wijdropdown","./wijmo.wijradio","./wijmo.wijtextbox"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(n){var r=jQuery,i=function(t){function n(){t.apply(this,arguments)}return e(n,t),n.prototype._create=function(){this._super.apply(this,arguments),this._initialized=!1,this.element.addClass(this.options.wijCSS.widget+" "+"wijmo-wijfilter")},n.prototype._init=function(){this._initialized||this._recreate()},n.prototype._setOptions=function(){this._super.apply(this,arguments);try{this._initialized=!1,this._recreate()}finally{this._initialized=!0}},n.prototype._recreate=function(){var e=this;this._searchTimer=0,this._searchKey=undefined,this._ignoreEvents=!1,this._elements={},this._dialog&&(this._dialog.remove(),this._dialog=null),this.options.filterValue=r.map(this.options.filterValue,function(e,t){return r.isArray(e)?[e]:[[e]]}),this._originalOptions=r.extend(!0,{},{sortDirection:this.options.sortDirection,filterValue:this.options.filterValue,filterOperator:this.options.filterOperator}),this._distinctDataValues=this._getDistinctDataValues(this.options.data,this.options.dataKey),this._distinctDataValuesCI=[],r.each(this._distinctDataValues,function(t,n){e._distinctDataValuesCI.push(typeof n=="string"?n.toLowerCase():n)}),this.element.append(this._dialog=this._createRoughDialog()),this._attachElements(this._distinctDataValues,this.options.availableOperators),this._fillDialog()},n.prototype._destroy=function(){this._dialog&&(this._dialog.remove(),this._dialog=null),this.element.removeClass(this.options.wijCSS.widget+" "+"wijmo-wijfilter")},n.prototype.triggerClose=function(e){this._trigger("close",null,e?{sortDirection:this.options.sortDirection,filterValue:this.options.filterValue,filterOperator:this.options.filterOperator}:null)},n.prototype._getDisplayValue=function(e){return e===null?this.options.nullDisplayText:e},n.prototype._onApplyButtonClick=function(e,t){if(this._isSettingsChanged(this.options,this._originalOptions)){var n=this._elements.$radioButtons.eq(0).is(":checked")?"and":"or";r.each(this.options.filterOperator,function(e,t){t.condition=n}),this.triggerClose(!0)}else this.triggerClose(!1)},n.prototype._onClearButtonClick=function(){this._resetFilterOptions(),this._onApplyButtonClick()},n.prototype._onAscendingButtonClick=function(e,t){var n=r(e.target);n.is(":checked")?(this.options.sortDirection="ascending",this._elements.$descendingBtn.prop("checked",!1).button("refresh")):this.options.sortDirection="none"},n.prototype._onDescendingButtonClick=function(e,t){var n=r(e.target);n.is(":checked")?(this.options.sortDirection="descending",this._elements.$ascendingBtn.prop("checked",!1).button("refresh")):this.options.sortDirection="none"},n.prototype._onCheckboxChange=function(e,t){if(this._ignoreEvents)return;var n=r(e.target),i=n.is(":checked"),s=[],o=this;n.is(".wijmo-wijfilter-selectAll")?this._elements.$checkboxes.each(function(e,t){return e&&r(t).prop("checked",i).wijcheckbox("refresh"),!0}):this._elements.$checkboxes.each(function(e,t){return e?r(t).is(":checked")&&s.push(o._distinctDataValues[e-1]):r(t).prop("checked",!1).wijcheckbox("refresh"),!0}),s.length?(this.options.filterOperator=[{name:"Equals"}],this.options.filterValue=[s]):this._resetFilterOptions(),this._resetFilterArea()},n.prototype._onFilterAreaChanged=function(e,t){if(this._ignoreEvents)return;var n=this;this._resetCheckboxes(),this.options.filterOperator=[{name:this._elements.$filterOperatorsDdl.eq(0).val()},{name:this._elements.$filterOperatorsDdl.eq(1).val()}],this.options.filterValue=r.map(this._elements.$filterValuesDdl,function(e,t){var i=r(e),s=i.wijcombobox("option","selectedIndex");return s>=0?[[n._distinctDataValues[s]]]:[[i.val()||undefined]]})},n.prototype._onRadioButtonChanged=function(e,t){if(this._ignoreEvents)return;var n=this._elements.$radioButtons.eq(0).is(":checked")?"and":"or";r.each(this.options.filterOperator,function(e,t){t.condition=n})},n.prototype._onSearchTextboxKeyUp=function(e,t){if(this._ignoreEvents)return;var n=this;this._searchTimer>0&&window.clearTimeout(this._searchTimer),this._searchTimer!==-1&&(this._searchTimer=window.setTimeout(function(){n._searchTimer=-1;try{n._doSearch(e.target.value)}finally{n._searchTimer=0}},300))},n.prototype._doSearch=function(e){if(this._searchKey!==e)if(!e&&e!==0)this._elements.$checkboxes.closest("li").show();else{var t=[],n=0,i=this;r.each(this._distinctDataValues,function(n,r){r=r||r===0?r.toString().toLowerCase():"",r.indexOf(e)>=0&&t.push(n+1)}),t.length?this._elements.$checkboxes.each(function(e,i){return e&&(e===t[n]?(n++,r(i).closest("li").show()):r(i).closest("li").hide()),!0}):this._elements.$checkboxes.closest("li").hide()}this._searchKey=e},n.prototype._resetFilters=function(){try{this._ignoreEvents=!0,this._resetFilterOptions(),this._resetFilterArea(),this._elements.$searchTb.val(""),this._resetCheckboxes()}finally{this._ignoreEvents=!1}},n.prototype._resetFilterArea=function(){this._searchKey=undefined,this._elements.$filterOperatorsDdl.prop("selectedIndex",0).wijdropdown("refresh"),this._elements.$radioButtons.eq(1).prop("checked",!0).wijradio("refresh"),this._elements.$filterValuesDdl.val("").wijcombobox("option","selectedIndex",-1)},n.prototype._resetCheckboxes=function(){this._elements.$checkboxes.closest("li").show().end().prop("checked",!1).wijcheckbox("refresh"),this._elements.$searchTb.val("")},n.prototype._isSettingsChanged=function(e,t){return e.sortDirection!==t.sortDirection||this._compareArrays(e.filterValue,t.filterValue)||this._compareArrays(e.filterOperator,t.filterOperator,function(e,t){return e.name.toLowerCase()!==t.name.toLowerCase()||(e.condition||"or")!==(t.condition||"or")})},n.prototype._compareArrays=function(e,t,n){if(r.isArray(e)&&r.isArray(t)){if(e.length!==t.length)return!0;var i=!1,s,o;for(s=0,o=e.length;s<o&&!i;s++)i=this._compareArrays(e[s],t[s],n);return i}return n?n(e,t):e!==t},n.prototype._getDistinctDataValues=function(e,t){var n=[],i={};return e&&r.each(e,function(e,s){var o=s[t];r.isFunction(o)&&(o=o()),i[o]===undefined&&(i[o]=!0,n.push(o))}),n.sort(function(e,t){return e instanceof Date&&(e=e.getTime()),t instanceof Date&&(t=t.getTime()),e===t?0:e<t?-1:1})},n.prototype._createRoughDialog=function(){var e=this.options.wijCSS,t='<div class="wijmo-wijfilter-container"><div class="wijmo-wijfilter-headerContainer '+e.header+" "+e.cornerAll+" "+e.helperClearFix+'">'+'<span class="wijmo-wijfilter-headerText"></span>'+'<a class="wijmo-wijfilter-closeButton" href="#">Close</a>'+"</div>"+"<h3>Sort</h3>"+'<div class="wijmo-wijfilter-sortContainer">'+'<input type="checkbox" class="wijmo-wijfilter-ascendingButton" id="{0}" /><label for="{0}">Ascending</label>'+'<input type="checkbox" class="wijmo-wijfilter-descendingButton" id="{1}" /><label for="{1}">Descending</label>'+"</div>"+"<h3>Filter</h3>"+'<div class="wijmo-wijfilter-filterContainer">'+'<select class="wijmo-wijfilter-dropdown">'+"</select>"+'<input type="text" class="wijmo-wijfilter-combobox" />'+"</div>"+'<div class="wijmo-wijfilter-radioContainer">'+'<input type="radio" id="{2}" name="{4}" /><label for="{2}">And</label>'+'<input type="radio" id="{3}" name="{4}" checked="checked" /><label for="{3}">Or</label>'+"</div>"+'<div class="wijmo-wijfilter-filterContainer">'+'<select class="wijmo-wijfilter-dropdown">'+"</select>"+'<input type="text" class="wijmo-wijfilter-combobox" />'+"</div>"+'<div class="wijmo-wijfilter-searchContainer">'+'<input class="wijmo-wijfilter-text" type="text" /><span class="ui-icon ui-icon-search"></span>'+"</div>"+'<div class="wijmo-wijfilter-checkboxContainer ui-state-default">'+'<div><input id="{5}" type="checkbox" class="wijmo-wijfilter-selectAll" /><label for="{5}">(Select All)</label></div>'+"</div>"+'<a class="wijmo-wijfilter-clearButton" href="#">Clear Filter</a>'+'<div class="wijmo-wijfilter-actionContainer">'+'<a class="wijmo-wijfilter-applyButton" href="#">Apply</a>'+'<a class="wijmo-wijfilter-cancelButton" href="#">Cancel</a>'+"</div>"+"</div>";return t=function(e){var t=arguments;return e.replace(/{\d+}/g,function(e){return t[parseInt(e.replace(/[{}]/g,""),10)+1]})}(t,this._guid("ascBtn"),this._guid("descBtn"),this._guid("radioAnd"),this._guid("radioOr"),this._guid("radioGroup"),this._guid("selectAll")),r(t)},n.prototype._attachElements=function(e,t){var n=this._dialog,i=this.options.wijCSS,s=this,o;o=this._elements.$headerContainer=n.find(".wijmo-wijfilter-headerContainer"),this._elements.$headerText=o.find(".wijmo-wijfilter-headerText"),this._elements.$headerCloseBtn=o.find(".wijmo-wijfilter-closeButton"),o=this._elements.$sortContainer=n.find(".wijmo-wijfilter-sortContainer"),this._elements.$ascendingBtn=o.find(".wijmo-wijfilter-ascendingButton"),this._elements.$descendingBtn=o.find(".wijmo-wijfilter-descendingButton"),o=this._elements.$filterContainer=n.find(".wijmo-wijfilter-filterContainer"),this._elements.$filterOperatorsDdl=o.find(".wijmo-wijfilter-dropdown"),this._elements.$filterValuesDdl=o.find(".wijmo-wijfilter-combobox"),this._elements.$radioButtons=n.find(".wijmo-wijfilter-radioContainer input"),this._elements.$searchTb=n.find(".wijmo-wijfilter-searchContainer input"),this._elements.$checkboxContainer=n.find(".wijmo-wijfilter-checkboxContainer"),this._elements.$clearBtn=n.find(".wijmo-wijfilter-clearButton"),o=n.find(".wijmo-wijfilter-actionContainer"),this._elements.$applyBtn=o.find(".wijmo-wijfilter-applyButton"),this._elements.$cancelBtn=o.find(".wijmo-wijfilter-cancelButton"),this._elements.$headerCloseBtn.button({text:!1,icons:{primary:i.iconClose}}).click(function(){s.triggerClose(!1)}),this._elements.$ascendingBtn.button({text:!0,icons:{primary:"ui-icon-arrowthickstop-1-n"}}).click(r.proxy(s._onAscendingButtonClick,this)),this._elements.$descendingBtn.button({text:!0,icons:{primary:"ui-icon-arrowthickstop-1-s"}}).click(r.proxy(s._onDescendingButtonClick,this)),this._elements.$filterOperatorsDdl.append(r.map(t||[],function(e,t){var n=e.name.toLowerCase(),i=e.displayName||e.name;return r(new Option(i||e.name,n)).html(i)})).change(r.proxy(this._onFilterAreaChanged,this)).wijdropdown(),this._elements.$radioButtons.change(r.proxy(this._onRadioButtonChanged,this)).wijradio(),o=r.map(e,function(e,t){return{label:s._getDisplayValue(e)+"",value:s._getDisplayValue(e)}}),this._elements.$filterValuesDdl.change(r.proxy(this._onFilterAreaChanged,this)).wijcombobox({autoComplete:!1,data:o,changed:r.proxy(this._onFilterAreaChanged,this)}),this._elements.$searchTb.keyup(r.proxy(this._onSearchTextboxKeyUp,this)).wijtextbox(),this._elements.$checkboxContainer.append("<ul />").find("> ul").append(r.map(e,function(e,t){var n=s._guid("cb"),i=r("<li />"),o;return i.append(r('<input type="checkbox" id="'+n+'" dataidx="'+t+'" />')),i.append(o=r('<label for="'+n+'">'+"</label>")),o.text(s._getDisplayValue(e)+""),i[0]})),this._elements.$checkboxes=this._elements.$checkboxContainer.find("input").change(r.proxy(s._onCheckboxChange,this)).wijcheckbox(),this._elements.$clearBtn.button().click(function(){s._onClearButtonClick()}),this._elements.$applyBtn.button().click(function(){s._onApplyButtonClick()}),this._elements.$cancelBtn.button().click(function(){s.triggerClose(!1)})},n.prototype._fillDialog=function(){var e=this.options.filterOperator,t=this.options.filterValue,n=this,i;this.options.showHeader||this._elements.$headerContainer.hide(),this._elements.$headerText.html(this.options.title),this._elements.$sortContainer.find(".wijmo-wijfilter-"+this.options.sortDirection+"Button").prop("checked",!0),this._elements.$sortContainer.find("input").button("option","disabled",!this.options.enableSortButtons).button("refresh");var s=!0;r.each(e,function(e,t){return s=s&&(t.name||"").toLowerCase()==="equals"&&(t.condition||"or").toLowerCase()==="or"}),s&&t.length>1?r.each(t,function(e,t){r.isArray(t)&&(t=t[0]),typeof t=="string"&&(t=t.toLowerCase()),(i=r.inArray(t,n._distinctDataValuesCI))>=0&&r(n._elements.$checkboxes[i+1]).prop("checked",!0).wijcheckbox("refresh")}):(r.each(e,function(e,t){e<2&&n._elements.$filterOperatorsDdl.eq(e).val(t.name.toLowerCase()).wijdropdown("refresh")}),r.each(t,function(e,t){if(e<2){var r=t[0],i=n._elements.$filterValuesDdl.eq(e);if(r!==undefined){var s=n._getDisplayValue(r);i.wijcombobox("option","selectedValue",s),i.val()||i.val(s+"")}}}),e.length>1&&e[1].condition==="and"&&this._elements.$radioButtons.eq(0).prop("checked",!0).wijradio("refresh"))},n.prototype._guid=function(e){return"wijfilter_"+(e||"")+n.prototype.guidValue++},n.prototype._resetFilterOptions=function(){this.options.filterValue=[[undefined]],this.options.filterOperator=[{name:"NoFilter"}]},n}(t.wijmoWidget);n.wijfilter=i,i.prototype.widgetEventPrefix="wijfilter",r.extend(i.prototype,{guidValue:0});var s=function(){function e(){this.wijCSS=undefined,this.data=undefined,this.dataKey=undefined,this.nullDisplayText="<null>",this.title="",this.enableSortButtons=!1,this.availableOperators=undefined,this.showHeader=!0,this.sortDirection=undefined,this.filterValue=[],this.filterOperator=[],this.close=null}return e}();i.prototype.options=r.extend(!0,{},t.wijmoWidget.prototype.options,new s),r.wijmo.registerWidget("wijfilter",i.prototype)})(t.filter||(t.filter={}));var n=t.filter})(wijmo||(wijmo={}))});