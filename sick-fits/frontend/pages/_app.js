import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import { observable, decorate, action } from "mobx";
import { Provider } from "mobx-react";

// set up the store
class State {
  public_id = [];
  setSelection = val => {
    console.log("setting selection in store");
    this.public_id = val;
    console.log("public_id: ", this.public_id);
  };
}
decorate(State, { public_id: observable, setSelection: action });
const appState = new State();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <Provider store={appState}>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
        </Provider>
      </Container>
    );
  }
}

export default withData(MyApp);
