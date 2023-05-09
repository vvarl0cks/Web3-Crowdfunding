import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {CustomButton} from './';
import {logo, menu, search, thirdweb} from '../assets';
import Blockies from 'react-blockies';
//import {navlinks} from '../constants';
import './Layout';
import { useStateContext } from '../context';
const Navbar = ({isActive, setIsActive, navlinks}) => {
  const navigate = useNavigate();
  //const [isActive, setIsActive] = useState('dashboard');
  const [showTooltip, setShowTooltip] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const {connect, address} = useStateContext();
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row w-full md:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] mx-auto'>
        <input type='text' placeholder='Search for campaigns' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'/>
        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt="search" className='w-[15px] h-[15px] object-contain'/>
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect();
          }}
        />

<Link to='/profile'>
  <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
    {address ? (
      <Blockies seed={address} className="w-[60%] h-[60%] rounded-full" />
    ) : (
      <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
    )}
  </div>
</Link>
      </div>
      <div className='sm:hidden flex justify-between items-center relative'>
      <Link to='/profile'>
            <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
            {address ? (
      <Blockies seed={address} className="w-[60%] h-[60%] rounded-[6px]" />
    ) : (
      <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
    )}
            </div>
            </Link>
            <Link to="/">
              <div className='w-[34px] h-[34px] flex justify-center items-center hover:bg-[#3a3d42] transition-colors duration-200 rounded-[5px]'>
                <img src={logo} alt="logo" className='w-[30px] h-[30px] object-contain'/>
              </div>
            </Link>
          <img src={menu} alt="menu" className='w-[34px] h-[34px] object-contain cursor-pointer' onClick={() => setToggleDrawer((prev) => !prev)}/>

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-[10px] ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0' } transition-all duration-700`}>
            <ul className='mb-4'>
            {navlinks.map((link) => (
  <li
    key={link.name}
    className={`relative flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
    onClick={() => {
      if (link.disabled) return;
      setIsActive(link.name);
      setToggleDrawer(false);
      navigate(link.link);
    }}
    onMouseEnter={() => setShowTooltip(link.name === 'logout')}
    onMouseLeave={() => setShowTooltip(false)}
  >
    <img
      src={link.imgUrl}
      alt={link.name}
      className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
    />
    <p className={`ml-[20px] py-1 font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
      {capitalizeFirstLetter(link.name)}
    </p>
    {showTooltip && link.name === 'logout' && (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg">
        Logout has to be done manually on the MetaMask wallet
      </div>
    )}
  </li>
))}
            </ul>

            <div className='flex mx-4 justify-center'>
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
          }}
        />
            </div>
            </div> 
      </div>
    </div>
  )
}

export default Navbar