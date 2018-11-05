import React, { Component } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";

const CloudImageButton = styled.input`
  border: ${props => (props.selected ? "4px solid red" : "4px solid white")};
  width: 108px !important;
  margin: 0;
  &:focus {
    outline: none;
  }
`;

class CloudImage extends Component {
  onButtonClick = () => {
    this.props.handleClick(this.props.publicId);
  };
  render() {
    return (
      <CloudImageButton
        type="image"
        src={this.props.url}
        onClick={this.onButtonClick}
        selected={this.props.selected}
      />
    );
  }
}

export default CloudImage;
