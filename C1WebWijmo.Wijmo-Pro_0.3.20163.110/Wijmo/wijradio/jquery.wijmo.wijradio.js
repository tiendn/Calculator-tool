/*
 *
 * Wijmo Library 3.20163.110
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/widgets/license/
 * ----
 * Credits: Wijmo includes some MIT-licensed software, see copyright notices below.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    /// <reference path="../Base/jquery.wijmo.widget.ts" />
    /*globals jQuery*/
    /*
    * Depends:
    *  jquery-1.4.2.js
    * 	jquery.ui.core.js
    *  jquery.ui.widget.js
    *
    */
    (function (_radio) {
        var $ = jQuery, widgetName = "wijradio", _radiobuttonPre = "wijmo-wijradio", radiobuttonId = 0;

        /** @widget */
        var wijradio = (function (_super) {
            __extends(wijradio, _super);
            function wijradio() {
                _super.apply(this, arguments);
            }
            wijradio.prototype._create = function () {
                var self = this, ele = self.element, wijCSS = self.options.wijCSS, eleChkState, radiobuttonElement, label, targetLabel, boxElement, iconElement;

                // enable touch support:
                if (window.wijmoApplyWijTouchUtilEvents) {
                    $ = window.wijmoApplyWijTouchUtilEvents($);
                }

                if (ele.is(":radio")) {
                    if (!ele.attr("id")) {
                        ele.attr("id", _radiobuttonPre + radiobuttonId);
                        radiobuttonId += 1;
                    }
                    if (ele.parent().is("label")) {
                        radiobuttonElement = ele.parent().wrap($("<div></div>").addClass(wijCSS.wijradioInputwrapper)).parent().wrap("<div></div>").parent().addClass(wijCSS.wijradio).addClass(wijCSS.widget);

                        label = ele.parent();
                        label.attr("for", ele.attr("id"));
                        radiobuttonElement.find("." + wijCSS.wijradioInputwrapper).append(ele);
                        radiobuttonElement.append(label);
                    } else {
                        radiobuttonElement = ele.wrap($("<div></div>").addClass(wijCSS.wijradioInputwrapper)).parent().wrap("<div></div>").parent().addClass(wijCSS.wijradio).addClass(wijCSS.widget);
                    }
                    targetLabel = $("label[for='" + ele.attr("id") + "']");
                    if (targetLabel.length > 0) {
                        radiobuttonElement.append(targetLabel);
                        targetLabel.attr("labelsign", "wij");
                        //targetLabel.attr("tabindex", 0);
                    }

                    if (ele.is(":disabled") || self._isDisabled()) {
                        self._setOption("disabled", true);
                    }

                    boxElement = $("<div></div>").addClass(wijCSS.wijradioBox).addClass(wijCSS.widget).addClass(wijCSS.stateDefault).addClass(wijCSS.cornerAll).append($("<span></span>").addClass(wijCSS.wijradioIcon));
                    iconElement = boxElement.children("." + wijCSS.wijradioIcon);
                    radiobuttonElement.append(boxElement);
                    iconElement.addClass(wijCSS.icon).addClass(wijCSS.iconRadioOn);
                    ele.data("iconElement", iconElement);
                    ele.data("boxElement", boxElement);
                    ele.data("radiobuttonElement", radiobuttonElement);

                    boxElement.removeClass(wijCSS.wijradioRelative).attr("role", "radio").bind("mouseover", function () {
                        ele.mouseover(null);
                    }).bind("mouseout", function () {
                        ele.mouseout(null);
                    });
                    if (targetLabel.length === 0 || targetLabel.html() === "") {
                        boxElement.addClass(wijCSS.wijradioRelative);
                    }
                    self._setDefaul();

                    // boxElement.css("margin-top", "9px");
                    ele.bind("click.radio", function () {
                        //fixed bug:
                        //the "focus()" event fires twice when the radio is clicked
                        //ele.focus();
                        if (self._isDisabled()) {
                            return;
                        }
                        eleChkState = self.options.checked;
                        self._refresh();
                        if (eleChkState !== self.element.is(":checked")) {
                            self._trigger("changed", null, {
                                checked: self.options.checked
                            });
                        }
                    }).bind("focus.radio", function () {
                        if (self._isDisabled()) {
                            return;
                        }
                        boxElement.addClass(wijCSS.stateFocus);
                    }).bind("blur.radio", function () {
                        if (self._isDisabled()) {
                            return;
                        }
                        boxElement.removeClass(wijCSS.stateFocus);
                    });

                    radiobuttonElement.click(function () {
                        if (self._isDisabled()) {
                            return;
                        }
                        if (targetLabel.length === 0 || targetLabel.html() === "") {
                            //fixed bug:
                            //the "focus()" event fires twice when the radio is clicked
                            eleChkState = self.options.checked;
                            ele.prop("checked", true);

                            //ele.attr("checked", true).focus();
                            self._refresh();
                            ele.change();
                            if (eleChkState !== self.element.is(":checked")) {
                                self._trigger("changed", null, {
                                    checked: self.options.checked
                                });
                            }
                        }
                    });

                    radiobuttonElement.bind("mouseover.radio", function () {
                        if (self._isDisabled()) {
                            return;
                        }
                        boxElement.addClass(wijCSS.stateHover);
                    }).bind("mouseout.radio", function () {
                        if (self._isDisabled()) {
                            return;
                        }
                        boxElement.removeClass(wijCSS.stateHover);
                    });

                    //update for fixed tooltip can't take effect
                    radiobuttonElement.attr("title", ele.attr("title"));
                }

                _super.prototype._create.call(this);
            };

            wijradio.prototype._setOption = function (key, value) {
                var self = this, wijCSS = self.options.wijCSS, originalCheckedState = self.options.checked;
                _super.prototype._setOption.call(this, key, value);

                if (key === 'checked') {
                    self.element.prop("checked", value);
                    if (value) {
                        self._refresh();
                    } else {
                        self._uncheckRadio(self.element);
                    }
                    if (originalCheckedState !== value) {
                        self._trigger("changed", null, {
                            checked: value
                        });
                    }
                } else if (key === "disabled") {
                    self.element.closest("." + wijCSS.widget).toggleClass(wijCSS.stateDisabled, self._isDisabled());
                }
            };

            wijradio.prototype._setDefaul = function () {
                var self = this, o = self.options;

                if (o.checked !== undefined && o.checked !== null) {
                    this.element.prop("checked", o.checked);
                }
                if (this.element.prop("checked")) {
                    this.element.parents("." + o.wijCSS.wijradio).find("." + o.wijCSS.wijradioBox).children().removeClass(o.wijCSS.iconRadioOn).addClass(o.wijCSS.iconRadioOff);
                    this.element.data("boxElement").addClass(o.wijCSS.stateActive).attr("aria-checked", true);
                    this.element.data("radiobuttonElement").addClass(o.wijCSS.stateChecked);
                }
            };

            wijradio.prototype._uncheckRadio = function (radio) {
                var self = this, wijCSS = self.options.wijCSS, radioEle;
                radio.parents("." + wijCSS.wijradio).find("." + wijCSS.wijradioBox).children().removeClass(wijCSS.iconRadioOff).addClass(wijCSS.iconRadioOn);
                radio.parents("." + wijCSS.wijradio).find("." + wijCSS.wijradioBox).removeClass(wijCSS.stateActive).attr("aria-checked", false);

                radio.parents("." + wijCSS.wijradio).removeClass(wijCSS.stateChecked);

                radioEle = radio.parents("." + wijCSS.wijradio).find(":radio");
                if (radioEle.wijradio("option", "checked") && radioEle[0] !== self.element[0]) {
                    radioEle.wijradio("setCheckedOption", false);
                }
            };

            wijradio.prototype._refresh = function () {
                var self = this, name = self.element.attr("name") || "", wijCSS = self.options.wijCSS;
                if (name === "") {
                    return;
                }
                $("[name='" + name + "']").each(function (i, n) {
                    self._uncheckRadio($(n));
                    return this;
                });

                if (self.element.is(":checked")) {
                    self.element.data("iconElement").removeClass(wijCSS.iconRadioOn).addClass(wijCSS.iconRadioOff);
                    self.element.data("boxElement").addClass(wijCSS.stateActive).attr("aria-checked", true);
                    self.element.data("radiobuttonElement").addClass(wijCSS.stateChecked);
                }

                self.options.checked = self.element.is(":checked");
            };

            /** @ignore */
            wijradio.prototype.setCheckedOption = function (value) {
                var self = this, o = self.options;

                if (o.checked !== null && o.checked !== value) {
                    o.checked = value;
                    self._trigger("changed", null, {
                        checked: value
                    });
                }
            };

            /** Use the refresh method to set the radio button's style.
            */
            wijradio.prototype.refresh = function () {
                this._refresh();
            };

            /**
            * Remove the functionality completely. This will return the element back to its pre-init state.
            */
            wijradio.prototype.destroy = function () {
                var self = this, boxelement = self.element.parent().parent();
                boxelement.children("div." + self.options.wijCSS.wijradioBox).remove();
                self.element.unwrap();
                self.element.unwrap();
                _super.prototype.destroy.call(this);
            };
            return wijradio;
        })(wijmo.wijmoWidget);
        _radio.wijradio = wijradio;

        var wijradio_options = (function () {
            function wijradio_options() {
                /** Selector option for auto self initialization.  This option is internal.
                * @ignore
                */
                this.initSelector = ":jqmData(role='wijradio')";
                /** wijradio css, extend from $.wijmo.wijCSS
                * @ignore
                */
                this.wijCSS = {
                    wijradio: "wijmo-wijradio",
                    wijradioBox: "wijmo-wijradio-box",
                    wijradioIcon: "wijmo-wijradio-icon",
                    wijradioInputwrapper: "wijmo-wijradio-inputwrapper",
                    wijradioRelative: "wijmo-wijradio-relative"
                };
                /** Causes the radio button to appear in the selected state.*/
                this.checked = null;
                /** A function called when checked state is changed.
                * @event
                * @dataKey {boolean} checked The state of the radio button.
                */
                this.changed = null;
            }
            return wijradio_options;
        })();
        ;
        wijradio.prototype.options = $.extend(true, {}, wijmo.wijmoWidget.prototype.options, new wijradio_options());
        $.wijmo.registerWidget(widgetName, wijradio.prototype);
    })(wijmo.radio || (wijmo.radio = {}));
    var radio = wijmo.radio;
})(wijmo || (wijmo = {}));
