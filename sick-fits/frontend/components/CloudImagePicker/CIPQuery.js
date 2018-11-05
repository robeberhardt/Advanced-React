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
  choose = () => {
    console.log("choosed!");
  };
  render() {
    return (
      <Query query={CLOUD_IMAGE_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>LOADING...</p>;
          return (
            <>
              <Error error={error} />
              <CIPGrid data={data} />
              <SickButton onClick={this.choose}>Choose</SickButton>
            </>
          );
        }}
      </Query>
    );
  }
}

export default CloudImagePicker;
