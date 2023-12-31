import React from 'react';
import {Grid,Typography,Box,IconButton} from '@mui/material';
import DyButton from '../../GlobalComponents/DyButton/DyButton';
import DyTextField from '../../GlobalComponents/DyTextField/DyTextField';
import {useState,useEffect} from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const EmployeeCompletingRegistraton = ({setContentState}:any) => {
  const initialValues={
    fName:'',
    lName:'',
    profileName:'',
    password:'',
    confirmPass:''

  }
const [registerInfo,setRegisterInfo]=useState(initialValues);
const handleBack=()=>{
  setContentState((prev:any)=>({...prev,content:'typeofMembership'}))
}

const handleRegister=()=>{
console.log(registerInfo)
}
  return (
    <Grid container >
   
    <Grid item xs={10} md={8}  mx={'auto'} bgcolor={'white'}  borderRadius={4}  >
       <Grid container  rowGap={2} >
       <Grid item xs={12} >
        <Box px={2}>
      <IconButton  onClick={handleBack} >
        <ArrowForwardIcon/>
      </IconButton>
        </Box>
       </Grid>

       <Grid item xs={12} >
       <Typography fontWeight={900} fontSize={'1.2rem'} sx={{p:1}} color={'red'} textAlign={'center'} mt={2} >
       تکمیل ثبت نام
       </Typography>
       </Grid>

       <Grid item xs={12}  >
       <Box textAlign={'center'} py={1}>
        <Typography fontWeight={800} fontSize={'1.05rem'} color={'primary'} variant='caption'  >برای تکمیل ثبت نام لطفا فرم زیر را تکمیل نمایید.</Typography>
       </Box>
      </Grid>

       <Grid item xs={12} px={3}  >
        <DyTextField 
        label={'نام'}
        onchangee={setRegisterInfo}
        name='fName'
        value={registerInfo.fName}
        />
       </Grid>


       <Grid item xs={12} px={3}  >
        <DyTextField 
        label={'نام خانوادگی'}
        onchangee={setRegisterInfo}
        name='lName'
        value={registerInfo.lName}
        />
       </Grid>

       <Grid item xs={12} px={3}  >
        <DyTextField 
        label={'نام پروفایل'}
        onchangee={setRegisterInfo}
        name='profileName'
        value={registerInfo.profileName}
        />
       </Grid>

       <Grid item xs={12} px={3}  >
        <DyTextField 
        label={'کلمه عبور'}
        onchangee={setRegisterInfo}
        name='password'
        value={registerInfo.password}
        type={'password'}
        />
       </Grid>

       
       <Grid item xs={12} px={3}  >
        <DyTextField 
        label={'تکرار کلمه عبور'}
        onchangee={setRegisterInfo}
        name='confirmPass'
        value={registerInfo.confirmPass}
        type={'password'}
        />
       </Grid>

       {/* type='password' */}

     

       <Grid item xs={12} >
       <Box px={3} py={5} >
       <DyButton 
        caption={'ثبت نام '}
        color={'primary'} 
        onClick={handleRegister}
        // disbled={phoneNum.length<11}
        variant={'contained'}
        />
       </Box>
       </Grid>



       </Grid>
      
      

   </Grid>

   


</Grid>
  )
}

export default EmployeeCompletingRegistraton