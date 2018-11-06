import React, { Component } from "react";
import { Query } from "react-apollo";
import CIPGrid from "./CIPGrid.js";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import SickButton from "../styles/SickButton";

const CLOUD_IMAGE_QUERY = gql`
  query CLOUD_IMAGE_QUERY {
    cloudImages {
      public_id
      url
    }
  }
`;

class CloudImagePicker extends Component {
  handleChoose = () => {
    this.props.onChoose();
  };
  clearSelection = () => {
    console.log("root: clearing selection...");
    this.cloudImageGrid.clearSelection();
  };
  render() {
    return (
      <Query query={CLOUD_IMAGE_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>LOADING...</p>;
          return (
            <>
              <Error error={error} />
              <CIPGrid
                {...this.props}
                data={data}
                ref={ref => (this.cloudImageGrid = ref)}
              />
              <SickButton onClick={this.handleChoose}>Choose</SickButton>
            </>
          );
        }}
      </Query>
    );
  }
}

export default CloudImagePicker;
