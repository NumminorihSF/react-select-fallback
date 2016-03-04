/**
 * Created by numminorihsf on 03.03.16.
 */
var React = require('react');
var SPLIT_LENGTH = 100;
var UPDATE_TIMEOUT = 100;

var globalState = {
  isMobile: false,
  subscribers: [],
  addSubscriber: function(subs){
    if (globalState.subscribers.indexOf(subs) === -1){
      globalState.subscribers.push(subs);
    }
  },
  removeSubscriber: function(subs){
    var index = globalState.subscribers.indexOf(subs);
    if (index !== -1){
      globalState.subscribers.splice(index, 1);
    }
  },
  setMobileState: function(val, elem){
    var value = !!val;
    globalState.isMobile = !!value;
    elem.setTouchDevice(value);
    globalState._setMobileState(globalState.subscribers, value, elem);
  },
  _setMobileState: function(array, value, elem){
    var arrs = array.reduce(function(res, val){
      res.result[res.currentIndex] = res.result[res.currentIndex] || [];
      if (res.result[res.currentIndex].length + 1 > SPLIT_LENGTH){
        res.currentIndex++;
        res.result[res.currentIndex] = [];
      }
      if (val === elem) return res;
      res.result[res.currentIndex].push(val);
      return res;
    }, {currentIndex: 0, result: []}).result;
    globalState._setMobileStateAsync(arrs, value, 0);
  },
  _setMobileStateAsync: function(arr, val, i){
    i = i || 0;
    setTimeout(function(){
      globalState._smallSetMobileState(arr[i], val);
      if (++i >= arr.length) return;
      globalState._setMobileStateAsync(arr, val, i);
    }, UPDATE_TIMEOUT);

  },
  _smallSetMobileState: function(smallArray, value){
    smallArray.forEach(function(s){
      s.setTouchDevice(value)
    });
  }
};

var FallbackSelect = React.createClass({
  getDefaultProps: function(){
    return {
      options: []
    };
  },
  render: function(){
    var options = this.props.options.map(function(opt, i){
      return <option key={i} value={opt.value}>{opt.name}</option>;
    });
    return <select onChange={this.props.onChange}
                   autoFocus={this.props.autoFocus}
                   disabled={this.props.disabled}
                   form={this.props.form}
                   multiple={this.props.multiple}
                   name={this.props.name}
                   required={this.props.required}
                   size={this.props.size}
                   tabIndex={this.props.tabIndex}
                   accessKey={this.props.accessKey}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}>
      {options}
      </select>

  }
});

var Select = React.createClass({
  getInitialState: function(){
    return {
      jsEnabled: false,
      touchDevice: globalState.isMobile
    };
  },
  getDefaultProps: function(){
    return {
      className: '',
      onChange: function(){},
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
  componentDidMount: function(){
    if (this.props.optimiseForMobile !== false){
      globalState.addSubscriber(this);
    }
    this.setState({jsEnabled: true});
  },
  componentWillUnmount: function(){
    if (this.props.optimiseForMobile !== false){
      globalState.removeSubscriber(this);
    }
  },
  onTouchStart: function(){
    globalState.setMobileState(true, this);
  },
  setTouchDevice: function(val){
    this.setState({touchDevice: val});
  },
  renderFallback: function(){
    return <FallbackSelect className={this.props.className}
                           onChange={this.props.onChange}
                           options={this.props.options}
                           autoFocus={this.props.autoFocus}
                           disabled={this.props.disabled}
                           form={this.props.form}
                           multiple={this.props.multiple}
                           name={this.props.name}
                           required={this.props.required}
                           size={this.props.size}
                           tabIndex={this.props.tabIndex}
                           accessKey={this.props.accessKey}
                           value={this.props.value}
                           defaultValue={this.props.defaultValue}/>;
  },
  render: function(){
    if (!this.props.children){
      return this.renderFallback();
    }
    if (!this.state.jsEnabled) {
      return this.renderFallback();

    }
    if (this.state.touchDevice && this.props.optimiseForMobile) {
      return this.renderFallback();
    }

    return <div style={{display: "inline-block"}} onTouchStart={this.onTouchStart}>
      <input type="hidden" value={this.props.value}/>
      {this.props.children}
    </div>;
  }
});

module.exports = Select;
