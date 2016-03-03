/**
 * Created by numminorihsf on 03.03.16.
 */
var React = require('react');

var globalState = {
  isMobile: false,
  subscribers: [],
  addSubscriber: function (subs) {
    if (globalState.subscribers.indexOf(subs) === -1) {
      globalState.subscribers.push(subs);
    }
  },
  removeSubscriber: function (subs) {
    var index = globalState.subscribers.indexOf(subs);
    if (index !== -1) {
      globalState.subscribers.splice(index, 1);
    }
  },
  setMobileState: function (val) {
    var value = !!val;
    globalState.isMobile = !!value;
    globalState.subscribers.forEach(function (s) {
      s.setTouchDevice(value);
    });
  }
};

var FallbackSelect = React.createClass({
  displayName: 'FallbackSelect',

  getDefaultProps: function () {
    return {
      options: []
    };
  },
  render: function () {
    var options = this.props.options.map(function (opt, i) {
      return React.createElement(
        'option',
        { key: i, value: opt.value },
        opt.name
      );
    });
    return React.createElement(
      'select',
      { onChange: this.props.onChange,
        autoFocus: this.props.autoFocus,
        disabled: this.props.disabled,
        form: this.props.form,
        multiple: this.props.multiple,
        name: this.props.name,
        required: this.props.required,
        size: this.props.size,
        tabIndex: this.props.tabIndex,
        accessKey: this.props.accessKey,
        value: this.props.value,
        defaultValue: this.props.defaultValue },
      options
    );
  }
});

var Select = React.createClass({
  displayName: 'Select',

  getInitialState: function () {
    return {
      jsEnabled: false,
      touchDevice: globalState.isMobile
    };
  },
  getDefaultProps: function () {
    return {
      className: '',
      onChange: function () {},
      options: [],
      autoFocus: false,
      disabled: false,
      multiple: false,
      name: 'select',
      required: false,
      size: 1,
      optimiseForMobile: true
    };
  },
  componentDidMount: function () {
    if (this.props.optimiseForMobile !== false) {
      globalState.addSubscriber(this);
    }
    this.setState({ jsEnabled: true });
  },
  componentWillUnmount: function () {
    if (this.props.optimiseForMobile !== false) {
      globalState.removeSubscriber(this);
    }
  },
  onTouchStart: function () {
    globalState.setMobileState(true);
  },
  setTouchDevice: function (val) {
    this.setState({ touchDevice: val });
  },
  renderFallback: function () {
    return React.createElement(FallbackSelect, { className: this.props.className,
      onChange: this.props.onChange,
      options: this.props.options,
      autoFocus: this.props.autoFocus,
      disabled: this.props.disabled,
      form: this.props.form,
      multiple: this.props.multiple,
      name: this.props.name,
      required: this.props.required,
      size: this.props.size,
      tabIndex: this.props.tabIndex,
      accessKey: this.props.accessKey,
      value: this.props.value,
      defaultValue: this.props.defaultValue });
  },
  render: function () {
    if (!this.state.children) {
      return this.renderFallback();
    }
    if (!this.state.jsEnabled) {
      return this.renderFallback();
    }
    if (this.state.touchDevice && this.props.optimiseForMobile) {
      return this.renderFallback();
    }

    if (this.props.children instanceof Array) {
      var props = this.props;
      return React.createElement(
        'div',
        { style: { display: "inline" }, onTouchStart: this.onTouchStart },
        this.props.children.map(function (child, i) {
          return React.createElement('child', { key: i,
            onChange: props.onChange,
            options: props.options,
            autoFocus: props.autoFocus,
            disabled: props.disabled,
            form: props.form,
            multiple: props.multiple,
            name: props.name,
            required: props.required,
            size: props.size,
            tabIndex: props.tabIndex,
            accessKey: props.accessKey,
            value: props.value,
            defaultValue: props.defaultValue });
        })
      );
    }
    return React.createElement(
      'div',
      { style: { display: "inline" }, onTouchStart: this.onTouchStart },
      React.createElement(this.props.children, { onChange: this.props.onChange,
        options: this.props.options,
        autoFocus: this.props.autoFocus,
        disabled: this.props.disabled,
        form: this.props.form,
        multiple: this.props.multiple,
        name: this.props.name,
        required: this.props.required,
        size: this.props.size,
        tabIndex: this.props.tabIndex,
        accessKey: this.props.accessKey,
        value: this.props.value,
        defaultValue: this.props.defaultValue })
    );
  }
});

module.exports = Select;