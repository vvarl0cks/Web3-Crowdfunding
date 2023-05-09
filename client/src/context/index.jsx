import React, {useContext, createContext, useState, useEffect} from "react";
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
import {useNavigate} from 'react-router-dom';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const navigate = useNavigate();
    const {contract} = useContract(`0x9ff57A6dEA86a298718CA9b16276400A7a07d22f`);
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');
    const metamaskAddress = useAddress();
    const [address, setAddress] = useState(metamaskAddress);
    const connect = useMetamask();
    
    useEffect(() => {
        setAddress(metamaskAddress);
    }, [metamaskAddress]);

    const clearWallet = () => {
        setAddress(null);
        connect.reset();
        navigate("/");
    };

    const publishCampaign = async (form) => {
        try
        {
            const data = await createCampaign({ args:[
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]})

            console.log("Contract call is successful", data)
        }
        catch(error)
        {
            console.log("Contract call has failed", error)
        }  
    };

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i,
            //donate,
            //getDonations,
        }));

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    };

    const donate = async (pId, amount) => {
        const data = await contract.call("donateToCampaign", [pId], {
          value: ethers.utils.parseEther(amount),
        });
      };

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;
        const parsedDonations=[];

        for(let i = 0; i < numberOfDonations; i++)
        {
            parsedDonations.push({
                donator: donations[0][i],
                donations: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    };

    const withdrawFunds = async (campaignId) => {
        try {
          const tx = await contract.call("withdrawFunds", [campaignId]);
          await tx.wait();
          alert("Funds withdrawn successfully!");
        } catch (error) {
          console.error("Error withdrawing funds:", error);
          alert("Error withdrawing funds. Check console for details.");
        }
      };

    return (
        <StateContext.Provider value={{address, contract, connect, createCampaign: publishCampaign, getCampaigns,getUserCampaigns, getDonations, donate, withdrawFunds, clearWallet}}>
           {children} 
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);