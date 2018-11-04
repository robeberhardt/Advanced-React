import React, { Component } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";

const CloudImageButton = styled.input`
  border: ${props => (props.selected ? "4px solid red" : "none")};
  width: 108px;
  margin: 0;
`;

class CloudImage extends Component {
  state = {
    selected: false
  };
  onButtonClick = () => {
    const isSelected = this.state.selected;
    this.setState({ selected: !isSelected });
    this.props.handleClick(this.props.publicId);
  };
  render() {
    return (
      <CloudImageButton
        type="image"
        src={this.props.url}
        onClick={this.onButtonClick}
        selected={this.state.selected}
      />
    );
  }
}

export default CloudImage;
