import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from "react-redux";
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, DefaultOptions,
} from "@apollo/client";

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <ApolloProvider client={client}>
            <App />
              </ApolloProvider>,
          </PersistGate>
      </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

