var InputTime = React.createClass({
    getInitialState: function () {
        var today = new Date();
        return {
            theDateTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
            minDate: new Date(today.getFullYear(), 0, 1),
            maxDate: new Date(today.getFullYear(), 11, 31),
            minTime: new Date(today.getFullYear(), 0, 1, 7, 0),
            maxTime: new Date(today.getFullYear(), 11, 31, 17, 0)
        };
    },
    // Wijmo event handlers
    dateTimeChanged: function (s, e) {
        this.setState({ theDateTime: s.value });
    },
    render: function () {
        return React.createElement("div", null, 
            React.createElement("h2", null, "InputDate, InputTime and InputDateTime Controls"), 
            React.createElement("p", null, 
                "Similar to the InputDate control, the InputTime control allows you to modify the time portion of" + ' ' + "a JavaScript date. The InputTime control shares many of the same properties as the InputDate control," + ' ' + "including ", 
                React.createElement("b", null, "format"), 
                ", ", 
                React.createElement("b", null, "min"), 
                ", ", 
                React.createElement("b", null, "max"), 
                ", and ", 
                React.createElement("b", null, "value"), 
                ". The InputTime control also offers a", 
                React.createElement("b", null, "step"), 
                " property that allows you to specify the number of minutes between entries in its drop-down" + ' ' + "list."), 
            React.createElement("p", null, "The InputDateTime control combines the InputDate and InputTime controls, allowing you to set the date" + ' ' + "and time portions of a JavaScript date. The InputDateTime control has two drop-downs: a Calendar" + ' ' + "for picking dates, and a list for picking times."), 
            React.createElement("p", null, 
                "The example below illustrates how to use the InputTime control in conjunction with the InputDate" + ' ' + "control. Notice that these controls work together to edit the same JavaScript ", 
                React.createElement("b", null, "Date"), 
                " object" + ' ' + "and only update the part of the DateTime that they are responsible for."), 
            React.createElement("p", null, 
                "The example also shows an InputDateTime that updates both the date and time parts of the" + ' ' + "JavaScript ", 
                React.createElement("b", null, "Date"), 
                " object."), 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("div", null, 
                        React.createElement("ul", {className: "nav nav-tabs", role: "tablist"}, 
                            React.createElement("li", {className: "active"}, 
                                React.createElement("a", {href: "#itJsx", role: "tab", "data-toggle": "tab"}, "JSX")
                            ), 
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#itJs", role: "tab", "data-toggle": "tab"}, "JS")
                            )), 
                        React.createElement("div", {className: "tab-content"}, 
                            React.createElement("div", {className: "tab-pane active pane-content", id: "itJsx"}, 
                                '<div className="app-input-group">\n', 
                                '    <label>Bound InputDate with min, max, format: </label>\n', 
                                '    <Wj.InputDate\n', 
                                '        value={ this.state.theDateTime }\n', 
                                '        min={ this.state.minDate }\n', 
                                '        max={ this.state.maxDate }\n', 
                                '        format="MMM dd, yyyy" \n', 
                                '        valueChanged={ this.dateTimeChanged }/>\n', 
                                '</div>\n', 
                                '<div className="app-input-group">\n', 
                                '    <label>Bound InputTime with min, max, step: </label>\n', 
                                '    <Wj.InputTime\n', 
                                '        value={ this.state.theDateTime }\n', 
                                '        step={ 30 }\n', 
                                '        min={ this.state.minTime }\n', 
                                '        max={ this.state.maxTime }\n', 
                                '        valueChanged={ this.dateTimeChanged }/>\n', 
                                '</div>\n', 
                                '<div class="app-input-group">\n', 
                                '    <label>Bound InputDateTime with min, max, format, and step: </label>\n', 
                                '    <Wj.InputDateTime \n', 
                                '        value={ this.state.theDateTime }\n', 
                                '        format="MMM dd, yyyy hh:mm tt"\n', 
                                '        min={ this.state.minDate }\n', 
                                '        max={ this.state.maxDate }\n', 
                                '        timeStep={ 30 }\n', 
                                '        timeMin={ this.state.minTime }\n', 
                                '        timeMax={ this.state.maxTime }\n', 
                                '        valueChanged={ this.dateTimeChanged }/>\n', 
                                '</div>\n', 
                                '<p>\n', 
                                '    Selected Date/Time: <b> { Util.format(this.state.theDateTime, \'f\') }</b>\n', 
                                '</p>'), 
                            React.createElement("div", {className: "tab-pane pane-content", id: "itJs"}, 
                                'getInitialState: function () {\n', 
                                '    var today = new Date();\n', 
                                '    return {\n', 
                                '        theDateTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),\n', 
                                '        minDate: new Date(today.getFullYear(), 0, 1),\n', 
                                '        maxDate: new Date(today.getFullYear(), 11, 31),\n', 
                                '        minTime: new Date(today.getFullYear(), 0, 1, 7, 0),\n', 
                                '        maxTime: new Date(today.getFullYear(), 11, 31, 17, 0)\n', 
                                '    }\n', 
                                '},\n', 
                                '\n', 
                                '// Wijmo event handlers\n', 
                                'dateTimeChanged: function (s, e) {\n', 
                                '    this.setState({ theDateTime: s.value });\n', 
                                '}\n')))
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("h4", null, "Result (live):"), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", null, "Bound InputDate with min, max, format: "), 
                        React.createElement(Wj.InputDate, {value: this.state.theDateTime, min: this.state.minDate, max: this.state.maxDate, format: "MMM dd, yyyy", valueChanged: this.dateTimeChanged})), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", null, "Bound InputTime with min, max, step: "), 
                        React.createElement(Wj.InputTime, {value: this.state.theDateTime, step: 30, min: this.state.minTime, max: this.state.maxTime, valueChanged: this.dateTimeChanged})), 
                    React.createElement("div", {class: "app-input-group"}, 
                        React.createElement("label", null, "Bound InputDateTime with min, max, format, and step: "), 
                        React.createElement(Wj.InputDateTime, {value: this.state.theDateTime, format: "MMM dd, yyyy hh:mm tt", min: this.state.minDate, max: this.state.maxDate, timeStep: 30, timeMin: this.state.minTime, timeMax: this.state.maxTime, valueChanged: this.dateTimeChanged})), 
                    React.createElement("p", null, 
                        "Selected Date/Time: ", 
                        React.createElement("b", null, 
                            " ", 
                            Util.format(this.state.theDateTime, 'f'))))));
    }
});
//# sourceMappingURL=InputTime.js.map