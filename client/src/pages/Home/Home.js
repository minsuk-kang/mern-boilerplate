import React, { useState } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import CollectionList from '../../components/CollectionList/CollectionList';
import MessageForm from '../../components/MessageForm/MessageForm';
import { reseedDatabase } from '../../store/actions/authActions';
import Collection from '../../components/Collection/Collection';

import './styles.css';

const ReseedMessage = ({ handleReseed }) => {
  return (
    <div>
      <span style={{ marginRight: '10px' }}>
        If the app has been vandalized just reseed the database by clicking this button
      </span>
      <button onClick={handleReseed} className="btn reseed-btn">
        Reseed Database
      </button>
    </div>
  );
};

let latestRequest = null;

const Home = ({ auth, reseedDatabase }) => {
  const handleReseed = () => {
    reseedDatabase();
  };
  const [results, setResults] = useState([]);

  const onChange = async (e) => {
    const query = e.target.value;
    latestRequest = query;
    if (query) {
      const response = await axios.post(
        'https://i-o-optimized-deployment-8a14a8.ent.westus2.azure.elastic-cloud.com/api/as/v1/engines/mm2b-search-engine/search.json',
        JSON.stringify({
          query,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer search-2e45zmttpfnywx5j7tdkckck',
          },
        },
      );
      if (latestRequest === query) {
        setResults(response.data.results);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Layout>
      <div className="home-page">
        <h1>Products</h1>
        <div style={{ width: '1000px' }}>
          <div style={{ display: 'flex' }}>
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
          </div>
          <div style={{ display: 'flex' }}>
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
          </div>
          <div style={{ display: 'flex' }}>
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
            <iframe
              type="text/html"
              width="640"
              height="360"
              src="https://mm2b.azurewebsites.net/three"
              frameborder="0"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
