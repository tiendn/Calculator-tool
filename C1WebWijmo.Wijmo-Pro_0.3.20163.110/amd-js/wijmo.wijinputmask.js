var wijmo;define(["./wijmo.wijstringinfo","./wijmo.wijinputcore","./wijmo.wijinpututility","./wijmo.wijinputmaskcore","./wijmo.wijinputmaskformat"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(t){var n=jQuery,r=function(r){function i(){r.apply(this,arguments),this._imMask=null,this._advanceMode=!1}return e(i,r),i.prototype._createTextProvider=function(){this._textProvider=new t.wijMaskedTextProvider(this,this.options.mask,!1)},i.prototype._checkMaskAndPassword=function(){var e=!this.options.mask||this.options.mask.length<0;if(e&&this._isPassword())throw'Option "passwordChar" requires a mask'},i.prototype._updateIsPassword=function(){var e=this.options.passwordChar.length>0&&this.element.attr("type")!=="password";this.element.data("isPassword",e),this._checkMaskAndPassword()},i.prototype._beginUpdate=function(){var e=this.element;e.addClass(this.options.wijCSS.wijinputmask),e.attr("aria-label","wijinputmask"),this._updateIsPassword(),e.data("defaultText",this.options.text)},i.prototype._setOption=function(e,t){switch(e){case"maskFormat":this._super(e,t),e="mask"}r.prototype._setOption.call(this,e,t);if(this._advanceMode)if(i._imMaskAssociatedoptions.indexOf)i._imMaskAssociatedoptions.indexOf(e)!==-1&&this._syncProperties();else for(var n=0;n<i._imMaskAssociatedoptions.length;n++)if(i._imMaskAssociatedoptions[n]===e){this._syncProperties();break}switch(e){case"text":this._advanceMode&&this.options.textWithPromptAndLiterals&&(t=this.options.textWithPromptAndLiterals),this.setText(t);break;case"mask":case"culture":if(typeof t=="undefined"||t.length<=0)t="";this._checkMaskAndPassword();var s=this.getText();s===this._getNullText()&&(s="");if(e==="mask"){if(!this._isAdvanceMode()&&t instanceof RegExp)return;this._textProvider.mask=t}this._checkFormatPattern(t),this._advanceMode?(this._imMask.SetText(s),this._updateText()):(this._textProvider.initialize(),this._textProvider.setText(s),this._updateText());break;case"promptChar":case"nullText":this._textProvider&&(this._textProvider.updatePromptChar(),this._updateText());break;case"hidePromptOnLeave":case"resetOnPrompt":this._updateText();break;case"passwordChar":this._updateIsPassword(),this._updateText()}},i.prototype._isAdvanceMode=function(){return typeof t.MaskControl!="undefined"},i.prototype._checkFormatPattern=function(e){if(e instanceof RegExp||this.options.formatMode==="advanced"){this._advanceMode||(this._detachInputEvent(),this._imMask||(this._imMask=new t.MaskControl,this._addimMaskCustomEvent()),this._imMask.AttachInput(this.element.get(0)),this._attachKeyEventForDropDownList(),this._advanceMode=!0);if(e instanceof RegExp){var n=e;this._imMask.SetFormatPattern(n.source)}else this._imMask.SetFormatPattern(e);this._syncProperties()}else this._advanceMode&&(this._imMask.DetachInput(),this._detachEventForDropDownList(),r.prototype._attachInputEvent.call(this)),this._advanceMode=!1},i.prototype._attachKeyEventForDropDownList=function(){this.element.bind({"keydown.wijinput":n.proxy(this._onKeyDownForDropDownList,this)})},i.prototype._detachEventForDropDownList=function(){this.element.unbind(".wijinput")},i.prototype._onKeyDownForDropDownList=function(e){r.prototype._processKeyForDropDownList.call(this,e)},i.prototype._syncProperties=function(){this._imMask.SetEnabled(!this._isDisabled()),this._imMask.SetReadOnly(!!this.options.disableUserInput),this._imMask.SetExitOnLastChar(!!this.options.blurOnLastChar),this._imMask.SetImeMode(this.options.imeMode),this._imMask.SetExitOnLeftRightKey(this._convertExistOnLeftRightKey(this.options.blurOnLeftRightKey)),this._imMask.SetTabAction(this._convertTabAction(this.options.tabAction)),this._imMask.SetDisplayNull(this.options.nullText),this._imMask.SetHideEnter(!!this.options.hideEnter),this._imMask.SetPromptChar(this.options.promptChar),this._imMask.SetAutoConvert(!!this.options.autoConvert),this._imMask.SetHidePromptOnLeave(!!this.options.hidePromptOnLeave),this._imMask.SetHighlightText(this._convertHighlightText(this.options.highlightText))},i.prototype._convertExistOnLeftRightKey=function(e){e||(e="none"),e=e.toLowerCase();if(e==="none")return 0;if(e==="left")return 1;if(e==="right")return 2;if(e==="both")return 3},i.prototype._convertHighlightText=function(e){return e?(e=e.toLowerCase(),e==="field"?1:e==="all"?2:0):0},i.prototype._convertTabAction=function(e){return e||(e="control"),e=e.toLowerCase(),e==="control"?0:1},i.prototype._addimMaskCustomEvent=function(){var e=this;this._imMask.OnInvalidInput(function(t){e._fireIvalidInputEvent("")}),this._imMask.OnTextChanged(function(t){e._raiseTextChanged()}),this._imMask.OnEditingTextChanged(function(t){e._updateText(!0)}),this._imMask.OnKeyExit(function(t){e._trigger("keyExit")})},i.prototype._processClearButton=function(){this._textProvider.clear(new t.wijInputResult),this._updateText();var e=this._textProvider.findEditPositionFrom(0,!0);this.selectText(e,e)},i.prototype._resetData=function(){var e=this.element.data("defaultText");if(e===undefined||e===null)e=this.element.data("elementValue");if(e===undefined||e===null)e="";this.setText(e)},i.prototype._isPassword=function(){return!!this.element.data("isPassword")},i.prototype._getTextWithPrompts=function(){return this._isInitialized()?this._textProvider.toString(!0,!0,!1):this.element.val()},i.prototype._getTextWithLiterals=function(){return this._isInitialized()?this._textProvider.toString(!0,!1,!0):this.element.val()},i.prototype._getTextWithPromptAndLiterals=function(){return this._isInitialized()?this._textProvider.toString(!0,!0,!0):this.element.val()},i.prototype._getTextWithPromptAndLiteralsAndPassword=function(){return this._isInitialized()?this._textProvider.toString(!1,!0,!0):this.element.val()},i.prototype._onChange=function(){if(!this.element)return;var e=this.element.val();this.getText()!==e&&this._getTextWithPrompts()!==e&&this._getTextWithPromptAndLiterals()!==e&&(this._textProvider.getPasswordChar()!==""?this._getTextWithPromptAndLiteralsAndPassword()!==e&&(this.element.data("customRaiseChange")!=1||!this.options.hidePromptOnLeave)&&this.setText(e):this.setText(e))},i.prototype._onMouseDown=function(e){r.prototype._onMouseDown.call(this,e),this.element.data("prevSelection",null)},i.prototype._afterFocused=function(){(this._isNullText()||!!this.options.hidePromptOnLeave)&&this._doFocus();if(this.options.highlightText==="none"){var e=this.element.data("prevSelection");e&&this.element.wijtextselection(e.start,e.end)}else if(this.options.highlightText==="field"){var t=this._getCurrentField(),n=t.currentField,r=t.fieldList;n>=r.length&&(n=r.length-1);var i=r[n];i&&this.selectText(i.start,i.end+1)}else if(this.options.highlightText==="all"){var s=this.element.get(0);this.selectText(0,s.value.length)}},i.prototype._processTabKey=function(e){var t=this,n=this.options.tabAction;return n=n?n.toLowerCase():"control",n==="control"?(setTimeout(function(){t._trigger("keyExit")},0),!1):this._moveField(!e.shiftKey)},i.prototype._getCurrentField=function(){var e=this._textProvider._getFieldList(),t=this.element.wijtextselection(),n=t.start,r=-1;e.length>0&&n>e[e.length-1].end&&(r=e.length);if(r===-1)for(var i=0;i<e.length;i++){if(n>=e[i].start&&n<=e[i].end){r=i;break}if(n<e[i].start){i!=0?r=i:r=-1;break}}var s={};return s.currentField=r,s.fieldList=e,s},i.prototype._moveField=function(e){var t=this._getCurrentField(),n=t.currentField,r=t.fieldList;if(e){if(n===r.length-1)return!1;this.element.wijtextselection(r[n+1].start,r[n+1].start)}else{if(n<=0)return!1;this.element.wijtextselection(r[n-1].start,r[n-1].start)}return!0},i.prototype._processLeftRightKey=function(e){var t=this.element.wijtextselection(),n=this.options.blurOnLeftRightKey?this.options.blurOnLeftRightKey.toLowerCase():"none";if(e&&t.start===0){if(n==="both"||n==="left")return this._moveControl(this.element.get(0),!1,!0),!0}else{var r=n==="both"||n==="right",i=!1;this._textProvider.noMask&&t.start===this.options.text.length?i=!0:!this._textProvider.noMask&&t.start===this._textProvider.testString.length&&(i=!0);if(!e&&r&&i)return this._moveControl(this.element.get(0),!0,!0),!0}return!1},i.prototype._onKeyPress=function(e){if(!this._textProvider.noMask&&this.options.blurOnLastChar)var t=this._textProvider._isLastCharAssigned();r.prototype._onKeyPress.call(this,e);if(!this._textProvider.noMask&&this.options.blurOnLastChar){var n=this._textProvider._isLastCharAssigned();!t&&n&&this._moveControl(this.element.get(0),!0,!0)}},i.prototype.setText=function(e){if(e===undefined)return;this._advanceMode?e==this.options.textWithPromptAndLiterals?(this.options.textWithPromptAndLiterals=undefined,this._imMask.SetText(e)):this._imMask.SetValue(e):r.prototype.setText.call(this,e)},i.prototype.getText=function(){return this._advanceMode?this._imMask.GetTextOnSimpleMode():r.prototype.getText.call(this)},i.prototype.selectText=function(e,t){typeof e=="undefined"&&(e=0),typeof t=="undefined"&&(t=this.getText().length),isNaN(e)&&(e=0),isNaN(t)&&(t=0),this._advanceMode?(this._imMask.SetSelectionStart(e),this._imMask.SetSelectionLength(Math.abs(t-e)),this._imMask.SetFocus()):r.prototype.selectText.call(this,e,t)},i.prototype.getSelectedText=function(){return this._advanceMode?this._imMask.GetSelectedText():r.prototype.getSelectedText.call(this)},i.prototype._attachInputEvent=function(){this._advanceMode?this._imMask.AttachInput(this.element.get(0)):r.prototype._attachInputEvent.call(this)},i.prototype._detachInputEvent=function(){this._advanceMode?this._imMask.DetachInput():r.prototype._detachInputEvent.call(this)},i.prototype.getPostValue=function(){return this._advanceMode?this._imMask.GetPostValueOnSimpleMode():r.prototype.getPostValue.call(this)},i.prototype._initialize=function(){this.options.maskFormat&&(this.options.mask=this.options.maskFormat),r.prototype._initialize.call(this)},i.prototype._init=function(){r.prototype._init.call(this);var e=this.options.text||this.element.val();this.options.mask&&this._setOption("mask",this.options.mask),e&&e!==this._getNullText()&&this._setOption("text",e),t.CoreUtility.IsIE()||this.element.data("prevSelection",{start:0,end:0})},i.prototype._updateText=function(e){typeof e=="undefined"&&(e=!1);if(!this.element.data("initialized"))if(this.options.mask instanceof RegExp||this.options.formatMode==="advanced")return;if(this._advanceMode){if(!this._isInitialized())return;if(this.element.is(":disabled"))return;var t=this._imMask.GetTextOnSimpleMode();this.options.advancedText=this._imMask.GetText(),t!==this.options.text&&(this.options.text=t,this._raiseTextChanged())}else r.prototype._updateText.call(this,e),this.options.text===this._getNullText()&&(this.options.text="")},i.prototype.isFocused=function(){return this._advanceMode?this._imMask.IsFocused():r.prototype.isFocused.call(this)},i.prototype._getAllowPromptAsInput=function(){return this.options.allowPromptAsInput},i.prototype._getPasswordChar=function(){return this.options.passwordChar},i.prototype._getResetOnPrompt=function(){return this.options.resetOnPrompt},i.prototype._getResetOnSpace=function(){return this.options.resetOnSpace},i.prototype._getSkipLiterals=function(){return this.options.skipLiterals},i.prototype._getHidePromptOnLeave=function(){return this.options.hidePromptOnLeave},i.prototype._getPromptChar=function(){return this.options.promptChar},i.prototype._getAutoConvert=function(){return this.options.autoConvert},i.prototype._getNullText=function(){return this.options.nullText},i._imMaskAssociatedoptions=["disabled","disableUserInput","blurOnLastChar","imeMode","blurOnLeftRightKey","tabAction","nullText","placeholder","readonly","promptChar","autoConvert","showNullText","hideEnter","hidePromptOnLeave","highlightText"],i}(t.wijinputcore);t.wijinputmask=r;var i=function(){function e(){this.wijCSS={wijinputmask:t.wijinputcore.prototype.options.wijCSS.wijinput+"-mask"},this.autoConvert=!0,this.text=null,this.highlightText="none",this.mask="",this.maskFormat="",this.promptChar="_",this.hidePromptOnLeave=!1,this.resetOnPrompt=!0,this.allowPromptAsInput=!1,this.passwordChar="",this.resetOnSpace=!0,this.skipLiterals=!0,this.blurOnLastChar=!1,this.tabAction="control",this.imeMode="auto",this.allowSpinLoop=!1,this.spinnerAlign="verticalRight",this.showSpinner=!1}return e}();r.prototype.options=n.extend(!0,{},t.wijinputcore.prototype.options,new i),n.wijmo.registerWidget("wijinputmask",r.prototype)})(t.input||(t.input={}));var n=t.input})(wijmo||(wijmo={}))});