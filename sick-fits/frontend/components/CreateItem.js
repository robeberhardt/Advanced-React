import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import SkyLight from "react-skylight";
import SickButton from "./styles/SickButton";
import CloudImagePicker from "../components/CloudImagePicker/CIPQuery";
import { auto } from "async";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const myBigGreenDialog = {
  backgroundColor: "white",
  color: "black",
  width: "80%",
  margin: "0 auto"
  // height: "800px",
  // marginTop: "-300px",
  // marginLeft: "-35%"
};

// const SkyLightModal = () => {
//   if (process.browser) {
//     return (
//       <SkyLight
//         hideOnOverlayClicked
//         ref={ref => (this.simpleDialog = ref)}
//         title="Hi, I'm a simple modal"
//       >
//         Hello, I dont have any callback.
//       </SkyLight>
//     );
//   } else {
//     return null;
//   }
// };

class CreateItem extends Component {
  state = {
    title: "Cool Shoes",
    description: "These shoes are the coolest",
    image: "",
    largeImage: "",
    price: 12399
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/reallygoodsmell/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
  pickImage = async e => {
    console.log("pick image");
    this.simpleDialog.show();
  };
  afterModalClose() {
    console.log("modal closed!");
  }
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <>
            <Form
              onSubmit={async e => {
                // stop the form submitting
                e.preventDefault();
                // call the mutation
                const res = await createItem();
                // change to the single item page
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Upload New Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      width={200}
                      src={this.state.image}
                      alt="Upload Preview"
                    />
                  )}
                </label>
                <label htmlFor="pick">
                  Choose Existing Image
                  <input
                    type="button"
                    id="pick"
                    name="pick"
                    value="Pick Image"
                    placeholder="Pick an image"
                    onClick={this.pickImage}
                  />
                  {this.state.image && (
                    <img
                      width={200}
                      src={this.state.image}
                      alt="Image Preview"
                    />
                  )}
                </label>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter A Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
            {process.browser ? (
              <SkyLight
                hideOnOverlayClicked
                ref={ref => (this.simpleDialog = ref)}
                title="Choose wisely!"
              >
                <CloudImagePicker />
              </SkyLight>
            ) : null}
          </>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
