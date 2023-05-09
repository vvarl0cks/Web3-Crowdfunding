import React from 'react';
import { useStateContext } from '../context';
import QRCode from 'react-qr-code';

const Payment = () => {
  const { connect, address } = useStateContext();
  console.log(address);

  if (!address) {
    const sampleAddress = "0xAC0275A21b2fb717083B4EEd46408f1e0881C004";

    return (
      <div className="text-white bg-[#1c1c24] mt-[50px] rounded-[20px] p-6 flex flex-col items-center">
        <h3 className="font-epilogue text-[20px] font-semibold">
          Please connect your wallet
        </h3>
        <h3 className="font-epilogue my-[10px]">
          This is a sample view for a logged-in user:
        </h3>
        <div className="bg-[#1c1c33] px-3 py-1.5 rounded-[20px] text-center">
          <div className="font-mono text-[14px] sm:text-base md:text-lg lg:text-xl">
            {sampleAddress}
          </div>
        </div>
        <h3 className="font-epilogue my-[10px]">
          Copy it or scan the QR code below
        </h3>
        <div className="p-5 bg-white rounded-[16px] flex items-center justify-center w-full max-w-[150px]">
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <QRCode
              className="absolute top-0 left-0 w-full h-full"
              size={256}
              value={sampleAddress}
              viewBox="0 0 256 256"
            />
          </div>
        </div>
        <h4 className="font-epilogue my-[10px] py-[20px] text-[#808080]">
          This is a sample view for a logged-in user. When you connect your wallet, this QR code and address will update to your own personal ETH deposit address. Please note that you must deposit ETH only to this address, if you would deposit non ECR-20 tokens to this address, you will lose them. The website does not take any responsibility for lost tokens during the deposit process, perhaps the website does fetch your own wallet address and this feature is done for the purpose of comfort.
        </h4>
      </div>
    );
  }

  return (
    <div className="text-white bg-[#1c1c24] mt-[50px] rounded-[10px] p-6 flex flex-col items-center">
      <h3 className="font-epilogue text-[20px] font-semibold">
        Payment
      </h3>
      <h3 className="font-epilogue my-[10px]">
        This is your own personal ETH deposit address:
      </h3>
      <div className="bg-[#1c1c33] px-3 py-1.5 rounded-[20px] text-center">
        <div className="font-mono text-[14px] sm:text-base md:text-lg lg:text-xl">
          {address}
        </div>
      </div>
      <h3 className="font-epilogue my-[10px]">
        Copy it or scan the QR code below
      </h3>
      <div className="p-5 bg-white rounded-[16px] flex items-center justify-center w-full max-w-[150px]">
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <QRCode
            className="absolute top-0 left-0 w-full h-full"
            size={256}
            value={address}
            viewBox="0 0 256 256"
          />
        </div>
      </div>
      <h4 className="font-epilogue my-[10px] py-[20px] text-[#808080]">
        Please note that you must deposit ETH only to this address, if you would deposit non ECR-20 tokens to this address, you will lose them. The website does not take any responsibility for lost tokens during the deposit process, perhaps the website does fetch your own wallet address and this feature is done for the purpose of comfort.
      </h4>
    </div>
  );
};

export default Payment;