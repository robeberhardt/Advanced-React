import React, { Component } from "react";
import CloudImage from "./CloudImage";

class CIPGrid extends Component {
  state = {
    multiple: false,
    images: [],
    selection: null
  };
  componentDidMount() {
    console.log("grid - did mount - props ", this.props);
    let images = this.props.data.cloudImages.map(image =>
      Object.assign(image, { selected: false })
    );
    this.setState({ multiple: this.props.multiple || false, images: images });
  }
  componentDidUpdate() {
    console.log("selection: ", this.state.selection);
  }
  handleClick = id => {
    let updatedSelection = [];
    let updatedImages = this.state.images;
    updatedImages.forEach(image => {
      // if we don't have multiple selections, make everything false
      if (!this.state.multiple && image.public_id !== id) {
        image.selected = false;
      }
      // toggle the selected property on clicked image
      if (image.public_id === id) {
        image.selected = !image.selected;
      }
      if (image.selected) {
        updatedSelection.push(image.public_id);
      }
    });
    this.setState({ selection: updatedSelection, images: updatedImages });
  };
  render() {
    if (this.state.images.length < 1) return <p>Loading...</p>;
    return (
      <div>
        {this.state.images.map(image => (
          <CloudImage
            publicId={image.public_id}
            key={image.public_id}
            url={image.url}
            selected={image.selected}
            handleClick={this.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default CIPGrid;
