import React, { Component } from "react";
import SkyLight from "react-skylight";

class CIPModal extends Component {
  render() {
    return (
      <SkyLight
        hideOnOverlayClicked
        ref={ref => (this.simpleDialog = ref)}
        title="Hi, I'm a simple modal"
      >
        Hello, I dont have any callback.
      </SkyLight>
    );
  }
}

export default CIPModal;
