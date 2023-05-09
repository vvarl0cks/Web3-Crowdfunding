import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);

  const { address, contract, getUserCampaigns } = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);

    const total = data.reduce((accumulator, campaign) => accumulator + campaign.amountCollected, 0);
    setTotalRaised(total);

    setIsLoading(false);
  };

  const goToWithdraw = () => {
    navigate('/withdraw', { state: { totalRaised } });
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  
  return (
    <>
      <DisplayCampaigns
        title="My campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      
    </>
  );
};

export default Profile;