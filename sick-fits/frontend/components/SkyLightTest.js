import React, { Component } from "react";
import SkyLight from "react-skylight";
import CloudImagePicker from "./CloudImagePicker/CIPQuery";

class SkyLightTest extends Component {
  componentDidMount() {
    console.log(process.browser);
  }
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
            title="Hi, I'm a simple modal"
          >
            <CloudImagePicker />
          </SkyLight>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default SkyLightTest;
