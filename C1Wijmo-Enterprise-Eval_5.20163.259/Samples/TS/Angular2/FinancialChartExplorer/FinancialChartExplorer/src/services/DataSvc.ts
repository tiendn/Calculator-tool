

import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/Rx';
import {map} from 'rxjs/operator/map';

// Common data service
@Injectable()
export class DataSvc {
    http: Http;

    constructor( @Inject(Http) http: Http) {
        this.http = http;
    }

    // get data by symbol
    getData(symbol: string, strings = true) {
        var data;

        if (!strings) {
            //// transform string dates to real dates
            //return $http({
            //    url: 'data/' + symbol + '.json',
            //    method: 'GET',
            //    transformResponse: function (value) {
            //        return JSON.parse(value, function (key, value) {
            //            if (key === 'date' && value !== null && !wijmo.isUndefined(value)) {
            //                return new Date(value);
            //            } else {
            //                return value;
            //            }
            //        });
            //    }
            //});
            return [];
        } else {
            //data = this.http.get('data/' + symbol + '.json').map(res => res.json());
            data = map.call(this.http.get('data/' + symbol + '.json'), res => res.json());

        }
        return data;
    }

    getDataList(): any[] {
        return [
            { name: "Box Inc", symbol: "box" },
            { name: "Wix.Com Ltd", symbol: "wix" },
            { name: "Facebook Inc", symbol: "fb" },
            { name: "Google Inc", symbol: "goog" },
            { name: "Twitter Inc", symbol: "twtr" },
            { name: "Zendesk Inc", symbol: "zen" }
        ];
    }
    getIndicatorList(): any[] {
        return [
            { name: 'Average True Range', abbreviation: 'atr' },
            { name: 'Relative Strength Index', abbreviation: 'rsi' },
            { name: 'Commodity Channel Index', abbreviation: 'cci' },
            { name: 'Williams %R', abbreviation: 'williamsR' },
            { name: 'MACD', abbreviation: 'macd' },
            { name: 'Stochastic', abbreviation: 'stoch' }
        ];
    }
    
    getOverlayList(): any[] {
        return [
            { name: 'Bollinger Bands', abbreviation: 'bollinger' },
            { name: 'Envelopes', abbreviation: 'envelopes' }
        ];
    }
    
    // helper method to calculate (upper) percentage of total range
    // the default will show the top 20% of the available range
    findApproxRange(min, max, percent?) {
        var pctToShow = wjcCore.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2,
            range = {
                min: NaN,
                max: NaN
            };

        if (wjcCore.isDate(min) && wjcCore.isDate(max)) {
            range.max = max.valueOf();
            range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
        } else if (wjcCore.isNumber(min) && wjcCore.isNumber(max)) {
            range.max = max;
            range.min = (max - min) * (1 - pctToShow) + min;
        }

        return range;
}

    // assumes High, Low, Open, Close, and Volume data
    // also assumes category axis
    findRenderedYRange(data, xmin, xmax) {
        var item, i, ymin = null, ymax = null;

        for (i = 0; i < data.length; i++) {
            item = data[i];

            if (xmin > i || i > xmax) {
                continue;
            }

            if (ymax === null || item.high > ymax) {
                ymax = item.high;
            }
            if (ymin === null || item.low < ymin) {
                ymin = item.low;
            }
        }

        return {
            min: ymin,
            max: ymax
        };
    }
}
