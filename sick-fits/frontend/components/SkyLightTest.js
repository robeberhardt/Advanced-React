import React, { Component } from "react";
import SkyLight from "react-skylight";
import CloudImagePicker from "./CloudImagePicker/CIPQuery";

class SkyLightTest extends Component {
  state = {
    selection: []
  };
  updateSelection = newSelection => {
    this.setState({ selection: newSelection });
  };
  render() {
    // if (!process.browser) return <></>;
    return (
      <div>
        <section>
          <h1>React SkyLight</h1>
          <button onClick={() => this.simpleDialog.show()}>Open Modal</button>
        </section>
        {process.browser ? (
          <SkyLight
            ref={ref => (this.simpleDialog = ref)}
            title="Choose an image:"
            beforeOpen={() => {
              this.cloudImagePicker.clearSelection();
            }}
          >
            <CloudImagePicker
              onUpdate={selection => {
                console.log("selection: ", selection);
              }}
              onChoose={() => {
                console.log("you choosed! good jerb");
                this.simpleDialog.hide();
              }}
              ref={ref => (this.cloudImagePicker = ref)}
            />
          </SkyLight>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default SkyLightTest;
