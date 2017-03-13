/*
 *
 * Wijmo Library 3.20163.110
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Licensed under the Wijmo Commercial License. Also available under the GNU GPL Version 3 license.
 * licensing@wijmo.com
 * http://wijmo.com/widgets/license/
 *
 */
/// <reference path="../wijgauge/jquery.wijmo.wijgauge.ts"/>
/*globals $, Raphael, jQuery, document, window*/
/*
* Depends:
*  jQuery.1.5.1.js
*  jQuery.ui.core.js
*  jQuery.ui.widget.js
*	raphael.js
*	globalize.min.js
*	jquery.wijmo.raphael.js
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (gauge) {
        var _zeroOffset = 180, interpMinPoints = 9, interJump = 5;

        /**
        * @widget
        */
        var wijradialgauge = (function (_super) {
            __extends(wijradialgauge, _super);
            function wijradialgauge() {
                _super.apply(this, arguments);
            }
            wijradialgauge.prototype._create = function () {
                var self = this;
                _super.prototype._create.call(this);
                self.element.addClass(this.options.wijCSS.radialGauge);
            };

            wijradialgauge.prototype._set_radius = function () {
                var self = this;
                self._autoCalculate();
                self.redraw();
            };

            wijradialgauge.prototype._set_startAngle = function () {
                var self = this;
                self._redrawMarksAndLabels();
                self._setPointer();
            };

            wijradialgauge.prototype._set_sweepAngle = function (value) {
                var self = this;
                if (value > 360) {
                    self.options.endAngle = 360;
                }
                self._redrawMarksAndLabels();
                self._setPointer();
            };

            wijradialgauge.prototype._set_width = function () {
                var self = this;
                self._autoCalculate();
                _super.prototype._set_width.call(this);
            };

            wijradialgauge.prototype._set_height = function () {
                var self = this;
                self._autoCalculate();
                _super.prototype._set_height.call(this);
            };

            wijradialgauge.prototype._set_origin = function () {
                var self = this;
                self._autoCalculate();
            };

            wijradialgauge.prototype._set_cap = function () {
                var self = this;
                self._removeCap();
                self._paintCap();
                self._positionCapWithBehindPointer();
            };

            wijradialgauge.prototype._removeCap = function () {
                var self = this;
                if (self.cap) {
                    self._destroyRaphaelElement(self.cap);
                    self.cap = null;
                }
            };

            wijradialgauge.prototype._set_pointer = function () {
                var self = this;
                self._removePointer();
                self._paintPointerExcludeCap();
                self._setPointer();
                self._positionCapWithBehindPointer();
            };

            wijradialgauge.prototype._clearState = function () {
                _super.prototype._clearState.call(this);
                this.markBbox = null;
            };

            wijradialgauge.prototype._clearElements = function () {
                _super.prototype._clearElements.call(this);
                this._removeCap();
            };

            wijradialgauge.prototype._valueToAngleIncludeOffset = function (value) {
                return gauge.GaugeUtil.mod360(this._valueToAngle(value) + _zeroOffset);
            };

            wijradialgauge.prototype._valueToAngle = function (value) {
                var self = this, alpha = self._valueToLogical(value);
                return self._logicalToAngle(alpha);
            };

            wijradialgauge.prototype._angleToValue = function (angle) {
                var self = this, alpha = self._angleToLogical(angle);
                return self._logicalToValue(alpha);
            };

            wijradialgauge.prototype._logicalToAngle = function (alpha) {
                var self = this, o = self.options, startAngle = o.startAngle, sweepAngle = o.sweepAngle, isInverted = o.isInverted;

                if (isInverted) {
                    return startAngle * alpha + (startAngle + sweepAngle) * (1 - alpha);
                } else {
                    return startAngle * (1 - alpha) + (startAngle + sweepAngle) * alpha;
                }
            };

            wijradialgauge.prototype._angleToLogical = function (angle) {
                var self = this, o = self.options, startAngle = o.startAngle, isInverted = o.isInverted, relativeAngle = gauge.GaugeUtil.mod360(angle - startAngle), absSweepAngle = o.sweepAngle, overflow, underflow;

                if (absSweepAngle === 0 || relativeAngle === 0) {
                    return isInverted ? 1 : 0;
                }
                if (absSweepAngle < 0) {
                    relativeAngle = 360 - relativeAngle;
                    absSweepAngle = -absSweepAngle;
                }
                overflow = relativeAngle - absSweepAngle;
                if (overflow > 0) {
                    underflow = 360 - relativeAngle;
                    return overflow < underflow ? 1 : 0;
                }
                if (isInverted) {
                    return 1 - relativeAngle / absSweepAngle;
                } else {
                    return relativeAngle / absSweepAngle;
                }
            };

            wijradialgauge.prototype._generatePoints = function (fromAngle, toAngle, fromLength, toLength) {
                var self = this, isInverted = self.options.isInverted, max = parseInt((interpMinPoints + interpMinPoints * (Math.abs(parseInt((toAngle - fromAngle).toString(), 10)) / (interpMinPoints * interJump))).toString(), 10), points = [], alpha, length, value, angle, i;

                for (i = 0; i < max; i++) {
                    alpha = i / (max - 1);
                    length = fromLength + (toLength - fromLength) * alpha;
                    angle = fromAngle + (toAngle - fromAngle) * alpha;
                    value = self._angleToValue(angle);
                    points.push(self._valueToPoint(value, length));
                }
                return points;
            };

            wijradialgauge.prototype._valueToPoint = function (value, offset) {
                var self = this, angle = self._valueToAngleIncludeOffset(value) * Math.PI / 180, radius = offset;
                return {
                    x: radius * Math.cos(angle),
                    y: radius * Math.sin(angle)
                };
            };

            wijradialgauge.prototype._pointToValue = function (point) {
                var angle = gauge.GaugeUtil.mod360(Math.atan2(point.x, -point.y) * 180 / Math.PI);
                return this._angleToValue(angle);
            };

            wijradialgauge.prototype._radiusScreen = function (offset) {
                return Math.max(this.options.radius * offset, 0);
            };

            wijradialgauge.prototype._autoCalculate = function () {
                var self = this, o = self.options, width = o.width, height = o.height, majorMarkWidth, minorMarkWidth, labelWidth, maxText = gauge.GaugeUtil.formatString(o.max, o.labels.format), offset = 0, faceBorder, innerHeight = height - o.marginTop - o.marginBottom, innerWidth = width - o.marginLeft - o.marginRight;

                self.centerPoint = {
                    x: o.marginLeft + innerWidth * o.origin.x,
                    y: o.marginTop + innerHeight * o.origin.y
                };
                self.radius = o.radius;
                if (o.radius === "auto") {
                    self.faceRadius = Math.min(innerWidth, innerHeight) / 2;
                    faceBorder = self._getFaceBorder();
                    self.faceRadius -= faceBorder;

                    majorMarkWidth = self._getMarkerbbox(o.tickMajor).width;
                    minorMarkWidth = self._getMarkerbbox(o.tickMinor).width;
                    labelWidth = self._getLabelBBox(maxText).width;
                    if (o.tickMajor.position === "center") {
                        offset -= majorMarkWidth / 2;
                        offset -= labelWidth;
                    } else if (o.tickMajor.position === "outside") {
                        offset -= majorMarkWidth;
                        offset -= labelWidth;
                    }
                    if (o.tickMinor.position === "center") {
                        offset = Math.min(offset, -minorMarkWidth / 2);
                    } else if (o.tickMinor.position === "outside") {
                        offset = Math.min(offset, -minorMarkWidth);
                    }
                    self.radius = self.faceRadius + offset;
                    if (o.tickMajor.position !== "inside") {
                        self.faceRadius += offset;
                    }
                }
            };

            wijradialgauge.prototype._getFaceBorder = function () {
                var self = this, face = self._paintFace(), width = face.attr("stroke-width") || 1;

                if (face.type === "set") {
                    width = face[0].attr("stroke-width") || 1;
                }
                face.wijRemove();
                return width;
            };

            wijradialgauge.prototype._getMaxRangeWidth = function () {
                var self = this, o = self.options, maxWidth = 0;
                $.each(o.ranges, function (i, n) {
                    maxWidth = Math.max(maxWidth, n.width || 0, n.startWidth || 0, n.endWidth || 0);
                });
                return maxWidth;
            };

            wijradialgauge.prototype._getMarkerbbox = function (opt) {
                var self = this, mark = self._paintMarkEle(opt), bbox = mark.wijGetBBox();
                mark.wijRemove();
                return { width: bbox.width, height: bbox.height };
            };

            wijradialgauge.prototype._paintMark = function (value, opt, isMajor) {
                var self = this, mark, position = opt.position || "inside", offset = opt.offset || 0;

                mark = self._paintMarkEle(opt);
                mark.attr(opt.style);
                $.wijraphael.addClass($(mark.node), self.options.wijCSS.radialGaugeMarker);
                $(mark.node).data("value", value);
                self._applyAlignment(mark, position, offset);
                self._setMarkValue(value, mark);
                return mark;
            };

            wijradialgauge.prototype._applyAlignment = function (ele, alignment, offset) {
                if (!ele) {
                    return;
                }
                var Bbox = ele.wijGetBBox(), halfWidth = Bbox.width / 2, left = 0;

                switch (alignment) {
                    case "outside":
                        left -= (halfWidth + offset);
                        break;
                    case "inside":
                        left += (halfWidth + offset);
                        break;
                }
                ele.transform("t" + left + "," + 0);
            };

            wijradialgauge.prototype._paintMarkEle = function (opt) {
                var self = this, o = self.options, startLocation = {
                    x: self.centerPoint.x - self.radius,
                    y: self.centerPoint.y
                }, marker = opt.marker || "circle", baseLength = marker === "rect" ? 5 : 2, width = 2, length, strokeWidth = opt.style["stroke-width"] || 0;

                if (marker === "tri" || marker === "invertedTri") {
                    baseLength = 5;
                    width = 3;
                }

                if (marker === "cross") {
                    opt.style.fill = opt.style.stroke || opt.style.fill;
                }

                if (isNaN(startLocation.x)) {
                    startLocation.x = 0;
                }

                length = baseLength * opt.factor;

                width += strokeWidth * 2;
                length += strokeWidth * 2;

                if ($.isFunction(marker)) {
                    return marker.call(self, self.canvas, startLocation, o);
                } else {
                    if (marker === "tri") {
                        return self.canvas.isoTri(startLocation.x, startLocation.y, length, width, 1 /* west */);
                    } else if (marker === "invertedTri") {
                        return self.canvas.isoTri(startLocation.x, startLocation.y, length, width, 0 /* east */);
                    }
                    return gauge.GaugeUtil.paintMarker(self.canvas, marker, startLocation.x, startLocation.y, length, width, true);
                }
            };

            wijradialgauge.prototype._setMarkValue = function (value, mark) {
                var self = this, angle = self._valueToAngle(value);

                mark.transform(Raphael.format("r{0},{1},{2}...", angle, self.centerPoint.x, self.centerPoint.y));
            };

            wijradialgauge.prototype._paintLabel = function (value, labelInfo) {
                var self = this, angle = self._valueToAngle(value), format = labelInfo.format, style = labelInfo.style, offset = labelInfo.offset, text = value.toString(), markOption = self.options.tickMajor, position = markOption.position || "inside", point, textEle, markBbox, newRadius, maxLabelBBox;

                if (format !== "") {
                    text = gauge.GaugeUtil.formatString(value, format);
                }

                markBbox = self._getMarkerBbox();
                maxLabelBBox = self._getLabelBBox(text);
                switch (position) {
                    case "inside":
                        newRadius = markBbox.x + markBbox.width + maxLabelBBox.width / 2;
                        break;
                    case "outside":
                        newRadius = markBbox.x - maxLabelBBox.width / 2;
                        break;
                    default:
                        newRadius = markBbox.x - maxLabelBBox.width / 2;
                        break;
                }
                newRadius = self.centerPoint.x - newRadius + offset;

                point = gauge.GaugeUtil.getPositionByAngle(self.centerPoint.x, self.centerPoint.y, newRadius, angle);
                textEle = self.canvas.text(point.x, point.y, text);
                textEle.attr(style);
                $.wijraphael.addClass($(textEle.node), self.options.wijCSS.radialGaugeLabel);
                return textEle;
            };

            wijradialgauge.prototype._getLabelBBox = function (value) {
                var self = this, o = self.options, text, bbox;

                text = self.canvas.text(0, 0, value);
                text.attr(o.gaugeLableStyle);
                bbox = text.wijGetBBox();
                text.wijRemove();
                return bbox;
            };

            wijradialgauge.prototype._getMarkerBbox = function () {
                var self = this, o = self.options, markOption = o.tickMajor, markEle;

                if (!self.markBbox) {
                    markEle = self._paintMarkEle(markOption);
                    self._applyAlignment(markEle, markOption.position, markOption.offset || 0);
                    self.markBbox = markEle.wijGetBBox();
                    markEle.wijRemove();
                }
                return self.markBbox;
            };

            wijradialgauge.prototype._paintFace = function () {
                var self = this, o = self.options, r = Math.min(o.width, o.height) / 2, face, ui;
                if (self.faceRadius) {
                    r = self.faceRadius;
                }

                if (o.face && o.face.template && $.isFunction(o.face.template)) {
                    ui = {
                        canvas: self.canvas,
                        r: r,
                        origin: { x: self.centerPoint.x, y: self.centerPoint.y }
                    };
                    return o.face.template.call(self, ui);
                }

                face = self.canvas.circle(self.centerPoint.x, self.centerPoint.y, r);
                if (o.face && o.face.style) {
                    face.attr(o.face.style);
                }
                $.wijraphael.addClass($(face.node), o.wijCSS.radialGaugeFace);
                return face;
            };

            wijradialgauge.prototype._paintPointer = function () {
                var self = this, o = self.options;
                self._paintPointerExcludeCap();
                if (o.cap && o.cap.visible) {
                    self._paintCap();
                    self._positionCapWithBehindPointer();
                }
            };

            wijradialgauge.prototype._paintPointerExcludeCap = function () {
                var self = this, o = self.options, pointerInfo = o.pointer, length = self.radius * pointerInfo.length, startLocation = {
                    x: self.centerPoint.x - length + pointerInfo.offset * self.radius,
                    y: self.centerPoint.y - pointerInfo.width / 2
                }, point;

                if (!pointerInfo.visible) {
                    return;
                }

                if (pointerInfo.template && $.isFunction(pointerInfo.template)) {
                    point = pointerInfo.template.call(self.canvas, startLocation, $.extend({}, pointerInfo, { length: length }));
                } else {
                    if (pointerInfo.shape === "rect") {
                        point = self.canvas.rect(startLocation.x - pointerInfo.width / 2, startLocation.y, length, pointerInfo.width);
                    } else {
                        point = self.canvas.isoTri(startLocation.x - pointerInfo.width / 2, startLocation.y, length, pointerInfo.width);
                    }
                    if (pointerInfo.style) {
                        point.attr(pointerInfo.style);
                    }
                }

                self.pointer = point;
                $.wijraphael.addClass($(point.node), o.wijCSS.radialGaugePointer);
            };

            wijradialgauge.prototype._paintCap = function () {
                var self = this, o = self.options, capInfo = o.cap, ui;

                if (!capInfo) {
                    return;
                }
                if (capInfo.template && $.isFunction(capInfo.template)) {
                    ui = {
                        canvas: self.canvas,
                        origin: { x: self.centerPoint.x, y: self.centerPoint.y }
                    };
                    return capInfo.template.call(self, ui);
                }

                self.cap = self.canvas.circle(self.centerPoint.x, self.centerPoint.y, capInfo.radius);
                if (capInfo.style) {
                    self.cap.attr(capInfo.style);
                }
                $.wijraphael.addClass($(self.cap.node), o.wijCSS.radialGaugeCap);
            };

            wijradialgauge.prototype._positionCapWithBehindPointer = function () {
                var self = this, o = self.options;
                if (o.cap && o.cap.visible) {
                    if (!o.cap.behindPointer) {
                        if (self.cap) {
                            self.cap.toFront();
                        }
                    } else {
                        if (self.pointer) {
                            self.pointer.toFront();
                        }
                    }
                }
            };

            wijradialgauge.prototype._paintRange = function (range) {
                var self = this, o = self.options, calculateFrom = isNaN(range.startValue) ? 0 : range.startValue, calculateTo = isNaN(range.endValue) ? 0 : range.endValue, calculateStartWidth = isNaN(range.startWidth) ? (isNaN(range.width) ? 0 : range.width) : range.startWidth, calculateEndWidth = isNaN(range.endWidth) ? (isNaN(range.width) ? 0 : range.width) : range.endWidth, startDistance = range.startDistance || 1, endDistance = range.endDistance || 1, coercedFrom, coercedTo;

                if (calculateFrom !== calculateTo) {
                    if (calculateTo > calculateFrom) {
                        coercedFrom = Math.max(calculateFrom, o.min);
                        coercedTo = Math.min(o.max, calculateTo);
                    } else {
                        coercedFrom = Math.max(o.min, calculateTo);
                        coercedTo = Math.min(o.max, calculateFrom);
                    }
                    startDistance = startDistance * self.radius;
                    endDistance = endDistance * self.radius;
                    self._drawRange(coercedFrom, coercedTo, startDistance, endDistance, calculateStartWidth, calculateEndWidth, range);
                }
            };

            // fix the issue 42503, in the previous version, here will use math.round to convert the float value to int value, and in this case,
            // concat the points, the path looks not smooth. here I convert the float value to two decimal.
            wijradialgauge.prototype._drawRange = function (from, to, startDistance, endDistance, startWidth, endWidth, range) {
                var self = this, startAngle = self._valueToAngle(from), endAngle = self._valueToAngle(to), outerPointers = self._generatePoints(startAngle, endAngle, startWidth + startDistance, endWidth + endDistance), innerPointers = self._generatePoints(startAngle, endAngle, startDistance, endDistance), i, rangeEl, path = [];

                $.each(outerPointers, function (idx, n) {
                    path.push(idx === 0 ? "M" : "L");
                    path.push($.round(n.x + self.centerPoint.x), ",", $.round(n.y + self.centerPoint.y));
                });

                for (i = innerPointers.length - 1; i >= 0; i--) {
                    path.push("L", $.round(innerPointers[i].x + self.centerPoint.x), ",", $.round(innerPointers[i].y + self.centerPoint.y));
                }
                path.push("Z");

                rangeEl = self.canvas.path(path.join());
                rangeEl.attr(range.style);
                self.ranges.push(rangeEl);
                $.wijraphael.addClass($(rangeEl.node), self.options.wijCSS.radialGaugeRange);
            };

            wijradialgauge.prototype._setOffPointerValue = function () {
                var self = this, angle = self._valueToAngle(0);
                self.pointer.transform(Raphael.format("r{0},{1},{2}", angle, self.centerPoint.x, self.centerPoint.y));
            };

            wijradialgauge.prototype._setPointer = function () {
                var self = this, o = self.options, angle = self._valueToAngle(o.value), animation = o.animation, transform = Raphael.format("r{0},{1},{2}", angle, self.centerPoint.x, self.centerPoint.y);

                if (!self.pointer) {
                    return;
                }
                _super.prototype._setPointer.call(this);

                if (animation.enabled) {
                    self.pointer.stop().wijAnimate({
                        transform: transform
                    }, animation.duration, animation.easing);
                } else {
                    self.pointer.transform(transform);
                }
            };

            /**
            * Remove the functionality completely. This will return the element back to its pre-init state.
            */
            wijradialgauge.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                this.element.removeClass(this.options.wijCSS.radialGauge);
            };

            wijradialgauge.prototype._clearVariables = function () {
                _super.prototype._clearVariables.call(this);
                var self = this;
                self.radius = null;
                self.centerPoint = null;
                self.faceRadius = null;
            };
            return wijradialgauge;
        })(gauge.wijgauge);
        gauge.wijradialgauge = wijradialgauge;

        wijradialgauge.prototype.widgetEventPrefix = "wijradialgauge";

        var wijradialgauge_options = (function () {
            function wijradialgauge_options() {
                /**
                * @ignore
                */
                this.initSelector = ":jqmData(role='wijradialgauge')";
                /**
                * @ignore
                */
                this.wijCSS = {
                    radialGauge: "wijmo-wijradialgauge",
                    radialGaugeLabel: "wijmo-wijradialgauge-label",
                    radialGaugeMarker: "wijmo-wijradialgauge-mark",
                    radialGaugeFace: "wijmo-wijradialgauge-face",
                    radialGaugePointer: "wijmo-wijradialgauge-pointer",
                    radialGaugeCap: "wijmo-wijradialgauge-cap",
                    radialGaugeRange: "wijmo-wijradialgauge-range"
                };
                /**
                * A value that indicates the radius of the radial gauge in pixels, or use "auto" to have the gauge indicators fill the
                * gauge area.
                * @remarks
                * Values between 50 and 200 are most useful when you use the default size for the gauge area.
                * @type {number|string}
                */
                this.radius = "auto";
                /**
                * A value that indicates in degrees where to start the lowest number in the numeric labels and tickMarks around the face
                * of the RadialGauge.
                * @remarks
                * The default value of 0 degrees renders the lowest number to the left of the origin.
                * A value of -90 degrees renders the lowest number below the origin.
                * A value of 90 degrees renders the lowest number above the origin.
                * A value of 180 degrees renders the lowest number to the right of the origin.
                */
                this.startAngle = 0;
                /**
                * A value that indicates in degrees where to render the highest number in the numeric labels and tickMarks in relation
                * to the startAngle.
                * @example
                * // This code example renders the labels and tickmarks from a starting angle of -45 degrees to a sweep angle of 270
                * degrees, so that the numbers render three quarters of the way around the face
                *    $(document).ready(function () {
                *        $("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			startAngle: -45,
                *			sweepAngle: 270
                *		});
                *	});
                */
                this.sweepAngle = 180;
                /**
                * A value that includes all settings of the gauge pointer.
                * @example
                * // The example above renders the pointer as a purple-outlined blue rectangle of 125% the length of the radius by 10
                * // pixels wide, offset back through the cap by 50% of the length of the radius.
                *    $(document).ready(function () {
                *        $("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			cap: {visible: true},
                *			pointer: {
                *				length: 1.25,
                *				offset: 0.5,
                *				shape: "rect",
                *				style: { fill: "blue", stroke: "purple"},
                *				width: 10
                *			}
                *		});
                *	});
                */
                this.pointer = {
                    /**
                    * Sets the length of the pointer as a percentage of the radius of the gauge.
                    * @remarks
                    * You can set the length to be greater than the radius.
                    */
                    length: 0.8,
                    /**
                    * Sets the fill and outline (stroke) colors of the pointer.
                    */
                    style: {
                        fill: "#1E395B",
                        stroke: "#1E395B"
                    },
                    /**
                    * Sets the width of the pointer in pixels.
                    */
                    width: 8,
                    /**
                    * Sets the percentage of the pointer that is shoved backward through the cap.
                    */
                    offset: 0.15,
                    shape: "tri",
                    visible: true,
                    template: null
                };
                /**
                * Sets the starting point for the center of the radial gauge.
                */
                this.origin = {
                    x: 0.5,
                    y: 0.5
                };
                /**
                * Sets all of the appearance options of the numeric labels that appear around the edge of the gauge.
                * @example
                * // This example sets the color for the labels to purple, and the font to 14 point, bold, Times New Roman.
                *    $(document).ready(function () {
                *        $("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			labels: {
                *			style: {
                *				fill: "purple",
                *					"font-size": "14pt",
                *					"font-weight": "bold",
                *					"font-family": "Times New Roman"
                *				}
                *			}
                *		});
                *	});
                */
                this.labels = {
                    format: "",
                    /**
                    * A value that indicates the color, weight, and size of the numeric labels.
                    * To use a different font, add "font-family" to the style
                    */
                    style: {
                        fill: "#1E395B",
                        "font-size": 12,
                        "font-weight": "800"
                    },
                    /**
                    * A value in pixels that indicates the distance of the numeric labels from the outer reach of the pointer.
                    */
                    offset: 30,
                    visible: true
                };
                /**
                * Sets appearance options for the minor tick marks that appear between  the numeric labels around the face of the gauge,
                * indicating numeric values between the major tick marks.
                * @example
                * // This example renders the minor tick marks as purple crosses, at an interval of once every 2 numbers
                *	$(document).ready(function () {
                *		$("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			tickMinor: {
                *				position: "inside",
                *				style: { fill: "#1E395B", stroke: "purple"},
                *				factor: 2,
                *				marker: 'cross',
                *				visible: true,
                *				offset: 30,
                *				interval: 2
                *			}
                *		});
                *	});
                */
                this.tickMinor = {
                    /**
                    * A value that indicates the position of the minor tick marks in relation to the edge of the face.
                    * @remarks
                    *  Valid Values:
                    *		"inside" -- Draws the minor tick marks inside the edge of the face.
                    *		"outside" -- Draws the minor tick marks outside the edge of the face.
                    *		"cross" -- Draws the minor tick marks centered on the edge of the face.
                    */
                    position: "inside",
                    /**
                    * A value that indicates the distance in pixels from the edge of the face to draw the minor tick marks.
                    */
                    offset: 30,
                    /**
                    * A value that indicates the fill color and outline (stroke) of the minor tick mark.
                    */
                    style: {
                        fill: "#1E395B"
                    },
                    /**
                    * A value that indicates whether to show the minor tick mark.
                    */
                    visible: true,
                    factor: 1,
                    marker: "rect",
                    interval: 5
                };
                /**
                * Sets appearance options for the major tick marks that appear next to the numeric labels around the face of the gauge.
                * @example
                * // This example renders the major tick marks as slightly larger purple filled diamonds with blue outlines, at an interval
                * // of once every 20 numbers
                *	$(document).ready(function () {
                *		$("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			tickMajor: {
                *				position: "inside",
                *				style: { fill: "purple", stroke: "#1E395B"},
                *				factor: 2.5,
                *				marker: 'diamond',
                *				visible: true,
                *				offset: 27,
                *				interval: 20
                *			}
                *		});
                *	});
                */
                this.tickMajor = {
                    /**
                    * A value that indicates the position of the major tick marks in relation to the edge of the face.
                    * @remarks
                    * Valid Values:
                    *		"inside" -- Draws the major tick marks inside the edge of the face.
                    *		"outside" -- Draws the major tick marks outside the edge of the face.
                    *		"cross" -- Draws the major tick marks centered on the edge of the face.
                    */
                    position: "inside",
                    /**
                    * A value that indicates the distance in pixels from the edge of the face to draw the major tick marks.
                    * @remarks
                    * The numeric labels are drawn a few pixels outside of the major tick marks.
                    */
                    offset: 27,
                    /**
                    * A value that indicates the fill color and outline (stroke) of the major tick mark.
                    */
                    style: {
                        fill: "#1E395B",
                        stroke: "#1E395B",
                        "stroke-width": 1
                    },
                    /**
                    * A value that indicates whether to show the major tick mark.
                    */
                    visible: true,
                    interval: 10,
                    factor: 2,
                    marker: "rect"
                };
                /**
                * Sets the size, color, and other properties of the circle at the center of the gauge that anchors the pointer.
                * @example
                * // This example creates a rectangular cap that begins 10 pixels to the left of and 10 pixels above the origin, and is 20
                * // pixels wide by 20 pixels tall. The cap is filled with purple and has no outline (stroke).
                *	$(document).ready(function () {
                *		$("#radialgauge1").wijradialgauge({
                *			value: 180,
                *			max: 200,
                *			min: 0,
                *			cap: {
                *				template: function (ui) {
                *					var origin = ui.origin;
                *					return ui.canvas.rect(origin.x -10, origin.y -10, 20, 20).attr({fill: "purple", stroke: "none"});
                *				}
                *			}
                *		});
                *	});
                */
                this.cap = {
                    /**
                    * A value that indicates the radius of the cap in pixels.
                    */
                    radius: 15,
                    /**
                    * A value that contains the fill color and outline color (stroke) of the cap.
                    */
                    style: {
                        fill: "#1E395B",
                        stroke: "#1E395B"
                    },
                    /**
                    * A value that indicates whether the cap shows behind the pointer or in front.
                    */
                    behindPointer: false,
                    /**
                    * A value that indicates whether to show the cap.
                    */
                    visible: true,
                    /**
                    * A JavaScript callback value that returns a Raphael element (or set) that draws the cap for the pointer.
                    * @remarks
                    * If you are only using one shape, the function returns a Raphael element. If you define multiple shapes,  have the function
                    * create a Raphael set object push all of the Raphael elements to the set, and return the set to wijradialgauge.
                    * In order to use the template, you must know how to draw Raphael graphics. For more information, see the Raphael documentation.
                    * The cap template's callback contains one argument with two properties:
                    *		origin -- The starting point from which to draw the center of the cap.
                    *			This argument is defined by x and y coordinates.
                    *		canvas -- A Raphael paper object that you can use to draw the custom
                    *			graphic to use as the cap.
                    */
                    template: null
                };
                /// <summary>
                /// Sets or draws the image or shape to use for the face of the gauge and the
                /// background area. The origin is the center of the gauge, but the image
                /// draws from the top left, so we first calculate the starting point of the
                /// top left based on the origin, and we calculate the width and height based
                /// on the radius of the face. The radius of the face is half of the min of
                /// the width and height.
                /// Note: The fill property is defined using the Raphael framework. Please
                /// see the Raphael Element attr method for more information. The face can be
                /// filled with a simple color, or a gradient. The default fill is a radial
                /// gradient, indicated by the r in the fill property.
                /// Default: {fill: ""r(0.9, 0.60)#FFFFFF-#D9E3F0"", stroke: "#7BA0CC",
                /// "stroke-width": "4"}, template: null}.
                /// Type: Object.
                /// Code example:
                /// This example uses a custom image for the face of the gauge. The argument
                /// that we name ui in the example is a JSON object. This object has a canvas,
                /// which is a Raphael paper object, and we use the image method of the
                /// Raphael paper that takes five parameters: source, x, y, width, and height.
                /// See the Raphael documentation for more information.
                ///    $(document).ready(function () {
                ///        $("#radialgauge1").wijradialgauge({
                ///			value: 90,
                ///			radius: 120,
                ///			face: {
                ///			style: {},
                ///			template: function (ui) {
                ///                    var url = "images/customGaugeFace.png";
                ///                    return ui.canvas.image(url, ui.origin.x -ui.r, ui.origin.y -ui.r, ui.r * 2, ui.r * 2);
                ///			}
                ///			}
                ///			});
                ///			});
                /// </summary>
                /**
                * Sets or draws the image or shape to use for the face of the gauge and the background area.
                * @remarks
                * The origin is the center of the gauge, but the image draws from the top left, so we first calculate the starting point of the
                * top left based on the origin, and we calculate the width and height based on the radius of the face. The radius of the face is
                * half of the min of the width and height.
                * Note: The fill property is defined using the Raphael framework. Please see the Raphael Element attr method for more information.
                * The face can be filled with a simple color, or a gradient. The default fill is a radial gradient, indicated by the r in the
                * fill property.
                * @example
                * // This example uses a custom image for the face of the gauge. The argument that we name ui in the example is a JSON object.
                * // This object has a canvas, which is a Raphael paper object, and we use the image method of the Raphael paper that takes five
                * // parameters: source, x, y, width, and height. See the Raphael documentation for more information.
                *	$(document).ready(function () {
                *		$("#radialgauge1").wijradialgauge({
                *			value: 90,
                *			radius: 120,
                *			face: {
                *				style: {},
                *				template: function (ui) {
                *					var url = "images/customGaugeFace.png";
                *					return ui.canvas.image(url, ui.origin.x -ui.r, ui.origin.y -ui.r, ui.r * 2, ui.r * 2);
                *				}
                *			}
                *		});
                *	});
                */
                this.face = {
                    /**
                    * A value that indicates the fill color (or gradient), and the outline color  and width of the gauge face
                    */
                    style: {
                        fill: "r(0.9, 0.60)#FFFFFF-#D9E3F0",
                        stroke: "#7BA0CC",
                        "stroke-width": 4
                    },
                    template: null
                };
            }
            return wijradialgauge_options;
        })();
        wijradialgauge.prototype.options = $.extend(true, {}, gauge.wijgauge.prototype.options, new wijradialgauge_options());

        //$.widget("wijmo.wijradialgauge", WijRadialGauge.prototype);
        $.wijmo.registerWidget("wijradialgauge", wijradialgauge.prototype);
    })(wijmo.gauge || (wijmo.gauge = {}));
    var gauge = wijmo.gauge;
})(wijmo || (wijmo = {}));
