import React, { useState } from 'react';
import { ReactComponent as AddTeamVector } from '../../StaticData/Vectors/addTeamVector.svg';
import { Grid, Box, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { addTeamValues } from '../../../OKRManagment/StaticData';
import DyButton from '../../../../components/GlobalComponents/DyButton/DyButton';
import FormikControl from '../../../../components/FormikControls/FormikControl';
import { addTeamsinintialValues } from '../../StaticData';
import { useAddTeam } from '../../Hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addTeamSchema } from '../../StaticData';
import { useGetAllActivePersonByTenantId } from '../../Hooks';
import MultiSelect from '../../../../components/FormikControls/MultiSelect/MultiSelect';
// import { useSelector } from 'react-redux';
import {Button} from '@mui/material';


const AddTeam = (props:any) => {
  let {setShowToastMessage,setAddTeamState,onClose}=props;
  const tenantId: any = useSelector((state: any) => state.meetings.profileTenantId);
 const{data:activePersonData,isLoading:getActivePersonLoading}=useGetAllActivePersonByTenantId(tenantId);
 const[personIdData,setPersonIdData]=useState([])
  const { data: addTeamData, mutate: addTeam,isSuccess} = useAddTeam();
  const[addTeamMesaage,setAddTeamMessage]=useState<string>('');
  const[successAddTeam,setSuccessAddTeam]=useState<Boolean>(false)


  useEffect(() => {
    setPersonIdData(activePersonData?.map((item:any)=>{
      let{key,value}=item;
      return {year:value,title:key}
    }))
  }, [activePersonData]);


  useEffect(() => {
    // setAddTeamMessage(addTeamData?.data?.metaData.message)
    // setSuccessAddTeam(isSuccess)
   if (addTeamData) {
    setShowToastMessage(true)
    setAddTeamState(addTeamData?.data)
    onClose(false)
   }
    
  }, [addTeamData,isSuccess])
  


  const initialSubmitForm = (data: any) => {
    addTeam({...data,tenantId:tenantId})
    // console.log(data)
  }


  return (
    <Grid container>
      <Grid item xs={12}  >
        <Box width={'100%'} textAlign={'center'}   >
          <AddTeamVector style={{ height: '150px' }} />
        </Box>
      </Grid>
      <Grid item xs={12}   >

      
    
     <Formik 
      enableReinitialize
      initialValues={addTeamsinintialValues}
      validationSchema={addTeamSchema}
      onSubmit={(data: any) => {
        initialSubmitForm(data)

      }}
    >
      {
        ({ values, setFieldValue, dirty, isValid, touched, errors, setFieldTouched }) =>
          <Form>
            <Grid container columnSpacing={1} sx={{ bgcolor: 'background.paper', mx: 'auto', borderRadius: 3 }}   >

              <Grid item xs={12}   >

              </Grid>
              <Grid item xs={4}  >
                <FormikControl
                  control='textField'
                  type='text'
                  label='نام'
                  name='name'
                  fullWidth
                  value={values.name || ''}
                />
              </Grid>



              <Grid item xs={12} md={4}  >
                <FormikControl
                  control='select'
                  options={activePersonData||[]}
                  label='مدیر'
                  name='managerId'
                  fullWidth
                  values={values?.managerId || ''}
                />
              </Grid>

              <Grid item xs={12} md={4} >

              <MultiSelect
                options={personIdData || []}
                isLoading={getActivePersonLoading}
                onChangee={setFieldValue}
                propName='personIds'
                label={'انتخاب اعضا'}
              />

              </Grid>        



              <Grid item xs={12} mt={1}  >
                <Box px={1} columnGap={2} display={'flex'} justifyContent={'end'} flexDirection={'row-reverse'}  >
                  <Box >
                    <DyButton
                      caption={'ذخیره'}
                      color={'#00387C'}
                      onClick={() => { }}
                      disbled={!dirty || !isValid}
                      variant={'contained'}
                      bgColor={'#00387C'}
                      type={'submit'}
                    />
                  </Box>

                  <Box>
                    <DyButton
                      caption={'انصراف'}
                      disbled={false}
                      variant={'outlined'}
                      onClick={()=>{
                        onClose(false)
                      }}
                    />
                  </Box>

                </Box>
              </Grid>


            </Grid>


          </Form>
      }

    </Formik>
   


      

      </Grid>

    </Grid>
  )
}

export default AddTeam