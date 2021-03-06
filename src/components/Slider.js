import React from "react";
import PureRenderMixin from "react/lib/ReactComponentWithPureRenderMixin";
import cx from "classnames";
import DraggableMixin from "./DraggableMixin";


const Slider = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    value: React.PropTypes.number.isRequired,
    vertical: React.PropTypes.bool,
    background : React.PropTypes.string
  },

  getDefaultProps() {
    return {
      value : 0,
      vertical : false,
      background : ""
    };
  },

  updatePosition(clientX, clientY) {
    const { rect } = this.state;
    let value;

    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    this.props.onChange(
      this.getScaledValue(value)
    );
  },

  getCss() {
    const attr = this.props.vertical ? "bottom" : "left";

    return {
      [attr] : this.getPercentageValue(this.props.value)
    };
  },

  render() {
    const classes = cx("slider", (this.props.vertical ? "vertical" : "horizontal"));
    const background = this.props.background;

    return (
      <div
        className={classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}>
        <div className="track" style={{ background }} />
        {this.state.rect && <div className="pointer" style={this.getCss()} />}
      </div>
    );
  }

});

export default Slider;
