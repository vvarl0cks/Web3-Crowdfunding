import React, { useState } from 'react';
import { ethers } from 'ethers';

const Take = ({ contractAddress, abi, signer }) => {
  const [campaignId, setCampaignId] = useState('');

  const withdrawFunds = async () => {
    if (!signer || !campaignId) return;

    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.withdrawFunds(campaignId);
      await tx.wait();
      alert('Funds withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert('Error withdrawing funds. Check console for details.');
    }
  };

  return (
    <div>
      <h1>Withdraw</h1>
      <input
        type="number"
        value={campaignId}
        onChange={(e) => setCampaignId(e.target.value)}
        placeholder="Campaign ID"
      />
      <button onClick={withdrawFunds}>Withdraw Funds</button>
    </div>
  );
};

export default Take;