import React, { useState,useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import DyButton from '../../../../../components/GlobalComponents/DyButton/DyButton';
import { ReactComponent as AddMeetingVector } from '../../../Statics/Svg/CreateMeeting.svg';
import { useGetAllTeamsForSelByTenantId, useGetAllMeetingsTypeByTenantId,useAddMeeting } from '../../../Hooks/index'
import FormikControl from '../../../../../components/FormikControls/FormikControl';
import MultiSelect from '../../../../../components/FormikControls/MultiSelect/MultiSelect';
import DateFieldValue from '../../../../../components/FormikControls/DateField/DateField';
import { useSelector } from 'react-redux';
import{FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import AddMeetingSuccess from '../../AddMeetingSuccess/AddMeetingSuccess';
import {CircularProgress} from '@mui/material';
import { addMeetingSchema } from '../../../MeetingCard/StaticData';
import MultiSel from '../../../../../components/MultiSel/MultiSel';
// import 

interface Values {
  name: string,
  periodId: string,
  meetingTypeId: string,
  tenantId: string,
  meetingDate: string | any,
  fromTime: any,
  toTime: any,
  meetingRepeatType: string,
  description: string,
  teamIds: any,
  personIds: any
  // email: string;
}








const AddMeeting = ({hideModal,meetingLenght,setReloadMeetingData,setMeetingAsyncState,setShowToastMessage}:any) => {
  const profileTenantId: any = useSelector((state: any) => state.meetings.profileTenantId);
  const licenseType : any = useSelector((state: any) => state.meetings.meetingsList?.licenseType);
  // console.log(licenseType)
  const priodId: any = useSelector((state: any) => state.meetings.priodId);

  const meetingData: Values = {
    name: 'Check_in',
    description: '',
    meetingTypeId: "22e56360-33aa-432f-8c50-034e6c2008d1",
    periodId: priodId,
    tenantId: profileTenantId,
    meetingDate: '',
    fromTime: '',
    toTime: '',
    meetingRepeatType: '',
    teamIds: [],
    personIds: []

  }
  const [confrimForm, setConfrimForm] = useState<string>(licenseType);
  const[addMeetingStatus,setAddMeetingStatus]=useState<any>(null)
  const[addMeetingMessage,setAddMeetingMessage]=useState<any|null>(null)
  const addMeetingSuccess=()=>{
    setReloadMeetingData((prev:any):any=>!prev)
    hideModal((prev:any):any=>!prev)
  }
const {mutate:addMeeting,isLoading:AddLoading,data:addMeetData,status,isSuccess}=useAddMeeting(addMeetingSuccess)
  const { data: allTeamsData, isLoading } = useGetAllTeamsForSelByTenantId(profileTenantId);
  
  const { data: allmeetingTypeData } = useGetAllMeetingsTypeByTenantId(profileTenantId);
  const[teamIds,setTeamIds]=useState<any[]>([])
  const repeatTypeData = [
    { key: 'بدون تکرار', value: 'none' },
    { key: 'هفتگی', value: 'OnOneWeekDay' },
    { key: 'دو هفته یکبار', value: 'OneTwoWeekDay' },
    { key: 'چهار هفته یکبار', value: 'OneOneMonthDay' }]

  const initialCreateMeeting = () => {
    setConfrimForm('Premium')
  }

  useEffect(() => {
    
 if (AddLoading) {
  setConfrimForm('loading')
 }
    
  }, [AddLoading]);


  useEffect(() => {
    
 console.log(teamIds)
    
  }, [teamIds])
  



  // useEffect(() => {
  //  if (isSuccess) {
  //   let{data}:any=addMeetData;
  //   let{isSuccess:isSuccesss}:any=data;
  //   setAddMeetingStatus(isSuccesss);
  //   let{metaData}:any=data;
  //   let{message}=metaData;
  //   setAddMeetingMessage(message)
  //  }
   
  // }, [addMeetData])

  useEffect(() => {
      

    if (addMeetData) {
        console.log(addMeetData?.data.isSuccess);

        if (addMeetData?.data.isSuccess) {
          hideModal((prev:any):any=>!prev)
          setMeetingAsyncState(addMeetData?.data)
          setShowToastMessage(true)
 
        } else {
            // setLShowToastMessage(true);
            // setEditAsyncData(editKrData?.data)
        }
     
    }
        }, [addMeetData,isSuccess]);




  
  

 

  
  

  const initialCancel=()=>{
   hideModal(false)
  }

  const initialAddMeeting=(data:any)=>{
    data.teamIds=teamIds.map(({value})=>value)
    console.log(data)
    addMeeting(data)
    // if(isSuccess){
    //   console.log(addMeetData)
    //   let{data}:any=addMeetData;
    //   console.log(data)
    //   setAddMeetingMessage(data) // data here!
    //   }
  }



  const renderContent = () => {
    switch (confrimForm) {
      case 'Free':
        return (
          // <AddMeetingSuccess/>
          <Box width={'100%'} display={'flex'} flexDirection={'column'} >
            <Box p={2}  >
              <Typography fontWeight={800} variant='h6'   >
                توجه در مورد تعداد جلسات:
              </Typography>
            </Box>
            <Box px={2}>
              <Typography variant='body1'   >
                شما اکانت رایگان در اختیار دارید و تنها یک جلسه در هر دوره زمانی میتوانید ایجاد کنید. با ورود به سایت میتوانید برای ارتقا اکانت خود اقدام نمایید.
              </Typography>
            </Box>
            <Box py={3} mx={'auto'} columnGap={3}   display={'flex'} justifyContent={'center'} textAlign={'center'}  >
        
             {
                meetingLenght===0 && <DyButton
                caption={'جلسه جدید'}
                color={'#00387C'}
                onClick={initialCreateMeeting}
                disbled={false}
                variant={'contained'}
                bgColor={'#00387C'}
                type={'submit'}
                
              />
             }

                       
                            
                            <a target='_blank'
                          style={{ textDecoration: 'none', }}
                          rel='noopener noreferrer' 
                          href="https://okrcoach.ir/">

                        <Button variant={'contained'} sx={{bgcolor:'#00387C',width:'130px',px:3,py:0.5}}  >
                        ورود به سایت     
                        </Button>
                        
                        </a>
                          
                        
                   
           
            </Box>

          </Box>
        )


      case 'Premium':
        return (
          <Formik enableReinitialize
            initialValues={meetingData}
            validationSchema={addMeetingSchema}
            onSubmit={(data) => {
              
              initialAddMeeting(data)
              // console.log(data)
            }}


          >
            {
              ({ values, setFieldValue, dirty, isValid, touched, errors, setFieldTouched }) =>
                <Form>
                  <Grid container   >



          






                    <Grid item xs={12} md={12} >

                      {/* <MultiSelect
                        options={allTeamsData || []}
                        isLoading={isLoading}
                        onChangee={setFieldValue}
                        propName='teamIds'
                        label={'انتخاب سطح'}
                      /> */}

                    
                    <Box sx={{padding:'8px'}}   >
                    <MultiSel
                      data={allTeamsData}
                      label={'انتخاب سطح'}
                      extractTag={setTeamIds}

                      />
                    </Box>

                  
                    </Grid>

                    <Grid item xs={12} md={6} >
                      <FormikControl
                        control='select'
                        type='select'
                        label='نحوه تکرار جلسه '
                        options={repeatTypeData}
                        name='meetingRepeatType'
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {/* <DateFieldValue/> */}
                      <FormikControl
                        control="date"
                        label="تاریخ جلسه"
                        name="meetingDate"
                        value={meetingData.meetingDate || ''}
                      />
                    </Grid>


                    <Grid item xs={12} md={6}>
                      <FormikControl
                        control="timePicker"
                        name="fromTime"
                        label='ساعت شروع جلسه '
                        value={meetingData.fromTime}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormikControl
                        control="timePicker"
                        name="toTime"
                        label='ساعت پایان جلسه '
                        value={meetingData.toTime}
                      />
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                      <FormikControl
                        control="timePicker"
                      
                        name="toTime"
                        label='ساعت پایان جلسه '
                        value={meetingData.toTime}
                      />
                    </Grid> */}




                    {/* multiSelect */}
                    <Grid item xs={12}  >
                      <FormikControl
                        control='textField'
                        type='text'
                        label='توضیحات'

                        name='description'
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mt={1}  >
                      <Box px={1} columnGap={2} display={'flex'} justifyContent={'center'} flexDirection={'row-reverse'}  >
                        <Box >
                          <DyButton
                            caption={'ذخیره'}
                            color={'#00387C'}
                            onClick={()=>{}}
                            disbled={!dirty || !isValid}
                            variant={'contained'}
                            bgColor={'#00387C'}
                            type={'submit'}
                          />
                        </Box>

                        <Box>
                          <DyButton
                            caption={'انصراف'}
                            // color={'#00387C'}
                            // onClick={loginHandler}
                            disbled={false}
                            variant={'outlined'}
                            onClick={initialCancel}
                          />
                        </Box>

                      </Box>
                    </Grid>


                  </Grid>


                  {/* <Button color='info' type='submit'  >
                    test
                  </Button> */}
                </Form>
            }

          </Formik>



        )

        break;

      

        case 'loading':
          return <Box textAlign={'center'}  py={4}  >
           {
            <Typography  variant='body1' fontWeight={700} color={addMeetingStatus?'green':'red'}  >{addMeetingMessage}</Typography>
           }
          </Box>
      
      
      
        // default:
        // return <AddMeetingSuccess   
        // formName={'جلسه'}
        // resetButton={true}
        // resetForm={setConfrimForm}   />
        // break;
    }
  }

  if (AddLoading) {
    return <Box width={'100%'} py={5} textAlign={'center'}  >
      <CircularProgress/>
    </Box>
  }

  return (
    <Box minHeight={'30rem'}>
      <Grid container  >
        <Grid item xs={12}   >
          <Box alignSelf={'center'} textAlign={'center'}   >
            <AddMeetingVector style={{ width: '300px', height: '100%', alignSelf: 'center', textAlign: 'center' }} />
          </Box>
        </Grid>

        <Grid item xs={12}   >
          {
            renderContent()
          }

        </Grid>
        
       {
        addMeetingMessage &&  <Grid item xs={12 }  >
        <Box width={'100%'} textAlign={'center'} py={1}  >
        <Button variant='contained'  sx={{bgcolor:'#00387C'}}  onClick={()=>{
           if (addMeetingStatus) {
            hideModal((prev:any):any=>!prev)
           } else {
            setConfrimForm('Premium')
            setAddMeetingMessage(null)
           }
         }}  >
          {addMeetingStatus?'تایید':'تلاش مجدد'}
         </Button>
        </Box>
         </Grid>
       }

        {/* {
         addMeetingMessage?.isSuccess==false?<Box>
          <Typography color={addMeetingMessage?.isSuccess===true?'blue':'red'} >{addMeetingMessage?.message}</Typography>
        </Box>:''
        } */}




      </Grid>
    </Box>
  )
}

export default AddMeeting