import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';
import {heart} from '../assets';
import {CustomButton, FormField, Loader} from '../components';
import {checkIfImage} from '../utils';
import { useStateContext } from '../context';
const CreateCampaign = () => {
  const navigate = useNavigate;
  const [isLoading, setisLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description:'',
    target:'',
    deadline:'',
    image:''
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if(exists)
      {
        setisLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)})
        setisLoading(false);
        navigate('/');
      }
      else
      {
        alert('Image URL is invalid')
        setForm({...form, image: ''});
      }
    })
    //await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)})
    console.log(form);
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] mt-[50px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName='Your name *'
            placeholder='Input Your Full Name'
            inputType='text'
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName='Campaign Title *'
            placeholder='Title for your campaign'
            inputType='text'
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName='Campaign Description *'
            placeholder='Write the description and the story of your campaign'
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={heart} alt="money" className='w-[40px] h-[40px] object-contain ml-[10px]'/>
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the raised amount</h4>
          </div>

          <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName='Goal *'
            placeholder='ETH 0.50'
            inputType='text'
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName='End Date *'
            placeholder='Title for your campaign'
            inputType='date'
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
          <FormField 
            labelName='Campaign Image *'
            placeholder='Place image URL of your campaign'
            inputType='url'
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        </div>

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton 
            btnType='submit'
            title='Submit new campaign'
            styles='bg-[#1dc071]'
          />
        </div>
      </form>

    </div>
  )
}

export default CreateCampaign