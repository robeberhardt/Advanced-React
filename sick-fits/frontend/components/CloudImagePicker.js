import React, { Component } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import CloudImage from "./CloudImage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import styled from "styled-components";
import SickButton from "./styles/SickButton";

const PickerContainer = styled.div`
  border: 1px solid purple;
`;

const PickerImageGrid = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-auto-flow: row;
  grid-gap: 8px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  justify-content: space-between;
`;

const Blarg = styled.div`
  width: 100px;
  height: 80px;
  border: 1px dashed red;
`;

const CLOUD_IMAGE_QUERY = gql`
  query CLOUD_IMAGE_QUERY {
    cloudImages {
      public_id
      url
    }
  }
`;

class CloudImagePicker extends Component {
  state = {
    selectedId: "",
    thumbs: []
  };
  handleClick = id => {
    console.log("blarg! ", id);
    console.log("this: ", this);
    console.log("this.props", this.props);
    this.setState({
      selectedId: id
    });
  };
  updateThings = data => {
    console.log("updating things - data ", data);
  };
  render() {
    return (
      <Query query={CLOUD_IMAGE_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>LOADING...</p>;
          this.updateThings(data);
          return (
            <>
              <Error error={error} />
              <PickerContainer>
                <PickerImageGrid>
                  {data.cloudImages.map(image => (
                    <CloudImage
                      publicId={image.public_id}
                      key={image.public_id}
                      url={image.url}
                      handleClick={this.handleClick}
                    />
                  ))}
                </PickerImageGrid>
                <SickButton>Cancel</SickButton>
                <SickButton>OK</SickButton>
              </PickerContainer>
            </>
          );
        }}
      </Query>
    );
  }
}

export default CloudImagePicker;
