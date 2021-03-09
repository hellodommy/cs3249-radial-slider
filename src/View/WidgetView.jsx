import React from "react";
import RadialSliderView from './RadialSliderView';

class WidgetView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{marginTop: 50 }}>
        <RadialSliderView />
      </div>
    );
  }
}

export default WidgetView;
