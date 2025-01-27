import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import "./App.css"
import App from './App';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <ApolloProvider client={client}>
    <Navbar/>
    <App></App>
    <Footer/>
  </ApolloProvider>,
);