import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Profile, CreateCampaign, CampaignDetails, Payment, Withdraw } from './pages';
import Layout from './components/Layout';
import {navlinks} from './constants';
const App = () => {
  return (
    <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/payment" element={<Payment />}/>
            <Route path="/withdraw" element={<Withdraw />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/create-campaign" element={<CreateCampaign />}/>
            <Route path="/campaign-details/:id" element={<CampaignDetails />}/>
          </Routes>
        </Layout>
      </div>
    </div>
  );
};

export default App;