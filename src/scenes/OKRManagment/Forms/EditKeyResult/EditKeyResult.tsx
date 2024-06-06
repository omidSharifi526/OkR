import React, { useState,useEffect } from 'react';
import {Button, CircularProgress} from '@mui/material';
import {InputLabel,Select,MenuItem} from '@mui/material';
import moment from "jalali-moment";
import DYToastMessage from '../../../../components/GlobalComponents/DyToastMessage/DYToastMessage';
import { useParams,useLocation } from 'react-router-dom';
import NewMultiSelect from '../../../../components/FormikControls/NewMultiSelect/NewMultiSelect';
import { addKeyResultSchema } from '../../StaticData/index';
import FormikControl from '../../../../components/FormikControls/FormikControl';
import { Box, Grid, TextField, Typography,FormControl } from '@mui/material';
import MultiSelect from '../../../../components/FormikControls/MultiSelect/MultiSelect';
import DyButton from '../../../../components/GlobalComponents/DyButton/DyButton';
import { Formik, Form } from 'formik';
import { addKrValues } from '../../StaticData/index';
import { DatePicker } from '@mui/x-date-pickers';
import { useGetAllObjectiveDefinitionLevelByTenantId } from '../../Hooks';
import MultiSel from '../../../../components/MultiSel/MultiSel';

import { useGetAllActivePersonByTenantId,
    useGetAllHorizontalAlignmentByTenantId,
    useGetAllOKRStateByTenantId,
    useGetAllScoreLevelsByTenantId,
    useAddKeyResult
 } from '../../Hooks';
import AccordionLyt from '../../../../components/Layouts/AccordionLyt/AccordionLyt';
import { useSelector } from 'react-redux';
import {pointSystem,keyResultTypeOptions} from '../../StaticData/index';
import { useGetKeyResultDetailsById,useEditKeyResult} from '../../Hooks';

interface createKrFace{
    // addKrSuccess
    editKrSuccess:() => any,
    setShowToastMessage:(show:boolean) => void
    setAddKrState:(show:any) => void,
    setShowEditKeyResult:(show:boolean)=>void,
    krId:string|null

  }



export const EditKeyResult = ({editKrSuccess,setShowToastMessage,setAddKrState,setShowEditKeyResult,krId}:createKrFace) => {
    const tenantId: any = useSelector((state: any) => state.meetings.profileTenantId);
    const location:any=useLocation();
   const[krDetailInitValues,setKrDetailInitValues]=useState<any>();
   const[krHorizontalAlignments,setHorizontalAlignments]=useState<any[]>([]);
   const[tval,setTval]=useState<any>(null);
   const[showLToastMessage,setLShowToastMessage]=useState<boolean>(false);
   const[okrStateId,setOkrStateId]=useState<null|string>('');
   const[lstartDate,setlStartDate]=useState<any>('')
   const[lforceEndDate,setlForceEndDate]=useState<any>('');
   const[jlStartDate,setJlStartDate]=useState('');
   const[jlForecDate,setJlForceDate]=useState('')
    let{state:{objectiveId}}:any=location;
    const[pointingSystemType,setPointingSystemType]=useState<string>('Regularly');
    const[idsValue,setIdsValue]=useState<any>([]);
    const[showLtoastMessage,setShowLtoastMessage]=useState<any>(false);
    const[editAsyncData,setEditAsyncData]=useState<any>(null)

  
    const{data:teamsOptions,isLoading:teamOPloading}:any=useGetAllObjectiveDefinitionLevelByTenantId(tenantId);
    const {data:acPersOptions}:any=useGetAllActivePersonByTenantId(tenantId);
    const{data:HorzinalAlignData}:any=useGetAllHorizontalAlignmentByTenantId(tenantId);
    const{data:submitFormOptions}:any=useGetAllOKRStateByTenantId(tenantId);
    const{data:levelIds,isFetched:getLevelsIds}:any=useGetAllScoreLevelsByTenantId(tenantId);
    const[hundredValue,setHundredValue]=useState<any>({value:'',scoreLevelId:'',tenantId:tenantId})
    const{data:krDetailsData,isLoading:krDetLoading,isFetched:kerDetFetched}:any=useGetKeyResultDetailsById(krId);

    const localEditKrSuccess=()=>{
        setHorizontalAlignments([])
        
    }


    const{data:editKrData,mutate:callEditKR,isSuccess,isError}=useEditKeyResult(localEditKrSuccess)
    // const[teamAsynOpcState,setTeamAsyncOpState]=useState<any>(null);

    const initialEditKr = (data: any) => {
        let ids=pointingSystemType==='Regularly'?[{...hundredValue}]:idsValue;

       let horval=krHorizontalAlignments?.map(({value}:any)=>value)
        let{forceEndDate,startDate,horizontalAlignments,...rest}=data;
        
            let totalData={tenantId:tenantId,
                objectiveId:objectiveId,
                horizontalAlignments:[...horval],
                onValue:'',
                forceEndDate:jlForecDate,
                startDate:jlStartDate,
                oKRStateId:okrStateId,
                ...rest};
            totalData.valuesDetailCommandDtos=ids; 
            totalData.onValue='';     
            console.log(totalData)
     
           callEditKR(totalData)



         

      
       
 
     
    }

    const[showAdvanceOptions,setShowAdvanceOptions]=useState<Boolean>(false);



    useEffect(() => {
      
    setIdsValue(levelIds?.map((item:any)=>{
      return {...item,tenantId:tenantId}
    }))
    
    }, [getLevelsIds]);

    useEffect(() => {
        let finded:any = levelIds?.find((o:any) => o.name === "1")?.scoreLevelId;
        setTval(finded)
       setHundredValue((prev:any)=>{
       return {...prev,scoreLevelId:finded}
       })
       
        
        }, [levelIds]);



     useEffect(() => {
       
   if (lforceEndDate!=='') {
    setJlForceDate(moment(lforceEndDate).format('jYYYY/jM/jD'))
   }
     
     }, [lforceEndDate])

     useEffect(() => {
       
     if (lstartDate!=='') {
        setJlStartDate(moment(lstartDate).format('jYYYY/jM/jD'))
     }
        
        }, [lstartDate])
     


    



    useEffect(() => {
      

        if (editKrData) {
            console.log(editKrData?.data.isSuccess);

            if (editKrData?.data.isSuccess) {
                setShowEditKeyResult(false)
                setAddKrState(editKrData?.data)
                editKrSuccess()
                setShowToastMessage(true)
            } else {
                setLShowToastMessage(true);
                setEditAsyncData(editKrData?.data)
            }
         
        }
            }, [editKrData,isSuccess]);


    useEffect(() => {
      setHorizontalAlignments([])
    if (krDetailsData) {
        let{name,
            responsibleId,
            startValue,
            // pointingSystemTypeValue,
            okR_KeyResultTypeValue,
            oneValue,
            weight,
            forceEndDateRealDate,
            id,description,
            startDateRealDate,
            okR_GradeDetails,
            pointingSystemTypeValue,
            horizontalAlignments
             }=krDetailsData;
            if (forceEndDateRealDate!==null) {
                setlForceEndDate(new Date(forceEndDateRealDate));
            }

            if (startDateRealDate!==null) {
                setlStartDate(new Date(startDateRealDate));
            }

             setHundredValue((prev:any)=>{
              return {...prev,value:oneValue}
             });

             setPointingSystemType(pointingSystemTypeValue);
             if (horizontalAlignments!==null) {
                setHorizontalAlignments(horizontalAlignments?.map(({managerId,name}:any)=>{
                    return{value:managerId,key:name}
                     }))
             }

           if (pointingSystemTypeValue==='Tensile') {
            setIdsValue(okR_GradeDetails?.map(({scoreLevelId,value,tenantId,...rest}:any)=>{
                return {tenantId,value,scoreLevelId}
                 }))
           }

        
        let initValue={
            name:name,
            responsibleId:responsibleId,
            startValue:startValue,
            pointingSystemType:pointingSystemTypeValue,
            keyResultType:okR_KeyResultTypeValue,
            onValue:oneValue,
            weight:String(weight),
            forceEndDate:forceEndDateRealDate?new Date(forceEndDateRealDate):'',
            startDate:startDateRealDate?new Date(startDateRealDate):'',
            id:id,
            description:description
            
        }
       
        setKrDetailInitValues(initValue)
    }
     
    }, [krDetailsData])

    useEffect(() => {
        let finded:any = levelIds?.find((o:any) => o.name === "1");
        setTval(finded?.scoreLevelId)
    }, [levelIds])


  

    useEffect(() => {
        
        if (isError) {   
          setLShowToastMessage(true);
        }
          }, [isError,editKrData]);



          

    
         
            


  

    const initialUpdateIdsValue=(i:number,item:any)=>{
   setIdsValue((prev:any) => 
    prev.map((o:any, index:number) => index ===i
      ? { ...o, value:item }
      : o
    )
  )
    }

    const initialSetHunderdvalue=(value:any)=>{
        let iniVal={
          scoreLevelId:tval,
          value:value,
          tenantId:tenantId
        }
          // console.log(iniVal)
          setHundredValue(iniVal)
      }


    if (krDetLoading) {
        return <Box py={6} textAlign={'center'}   >
          <CircularProgress/>
        </Box>
    }
    
    
    

    return (
        <>
            <Box width={'100%'} maxHeight={'50em'}  >
               
           {
            false?<Box py={6} textAlign={'center'} >
                <CircularProgress/>
            </Box>: <Formik enableReinitialize
            initialValues={krDetailInitValues}
            // validationSchema={addKeyResultSchema}
            onSubmit={(data) => {
                initialEditKr(data)
            }}
       


        >
            {
                ({ values, setFieldValue, dirty, isValid, touched, errors, setFieldTouched }: any) =>
                    <Form>
                        <Grid container  >


                            <Grid item xs={12} md={3}  >

                            <Box sx={{padding:'8px'}}  >
                            <TextField
                            size='small'
                            fullWidth
                            label={'نام'}
                            value={values?.name || ''}
                            onChange={({target}:any)=>{
                            let{value}=target;
                            setFieldValue('name',value)
                            }}
                            />

                            </Box>
                            </Grid>

                            <Grid item xs={12} md={3}  >
                                <FormikControl
                                    control='select'
                                    options={acPersOptions||[]}
                                    label='مسئول'
                                    name='responsibleId'
                                    fullWidth
                                    value={values?.responsibleId || ''}
                                />

                            </Grid>


                        



                            <Grid item xs={12} md={3}  >
                                      <Box sx={{padding:'8px'}}>
                                   <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">سیستم امتیاز دهی </InputLabel>
                                    <Select
                                    sx={{'& .muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select' :{py:'1px'}}}
                                    size='small'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values?.pointingSystemType || ''}
                                    label="سیستم امتیاز دهی "
                                    onChange={({target}:any,)=>{
                                       let{value}=target;
                                    //    setFieldValue('pointingSystemType',value)
                                       setPointingSystemType(value)
                                        setFieldValue('pointingSystemType',value)
                                    }}
                                    >
                                        {
                                            pointSystem.map((item:any,i:number)=>{
                                                let{key,value,desc}=item
                                                return <MenuItem 
                                                key={i}
                                                sx={{ fontSize: "0.7rem", bgcolor: "transparent" }}
                                                value={value}>
                                                    {key}
                                                    {'\u00A0'}
                                                     <Typography fontSize={'0.5rem'}   >{desc}</Typography>
                                                  
                                                       </MenuItem>
                                            })
                                        }
                     
                                    </Select>
                                </FormControl>
                                </Box>
                                </Grid>






                            <Grid item xs={12} md={3}  >
                                <FormikControl
                                    control='select'
                                    options={keyResultTypeOptions}
                                    label='نوع نتیجه کلیدی '
                                    name='keyResultType'
                                    fullWidth
                                    value={values?.keyResultType || ''}
                                />
                            </Grid>



           





                            {/* مقدار شروع */}
                      
                               <Grid item xs={12} md={3}  >

                                <Box sx={{padding:'8px'}}  >
                                <TextField
                                size='small'
                                fullWidth
                                label={'مقدار شروع '}
                                value={values?.startValue || ''}
                                onChange={({target}:any)=>{
                                let{value}=target;
                                setFieldValue('startValue',value)
                                }}
                                />

                                </Box>
                                </Grid>
                            
                          {
                            pointingSystemType==='Regularly'?
                
                        <Grid item xs={12} md={3}  >

                        <Box sx={{padding:'8px'}} width={'100%'}  >
                        <TextField
                        size='small'
                        fullWidth
                        type='text'
                        label={'چه زمانی به 100% میرسد؟ '}
                        value={hundredValue.value}
                        onChange={({target}:any)=>{
                        let{value}=target;
                        initialSetHunderdvalue(value)
                        }}
                        />

                        </Box>

                        </Grid>
                        
                        :<>
                        {
                            idsValue?.map((item:any,i:number)=>{
                            return <Grid item  key={i} xs={12} md={3} padding={'8px'} >
                              <TextField 
                              fullWidth
                              size='small'
                             
                              value={idsValue[i]?.value || ''}
                              onChange={({target}:any)=>{
                                let{value}:any=target;
                                // console.log(value)
                                initialUpdateIdsValue(i,value)
                              }}
                              label={i==0?'چه زمانی به 30% میرسد؟':i==1?'چه زمانی به 70% میرسد؟':'چه زمانی به 100% میرسد؟'}   />
                            </Grid>
                            })
                        }
                       
                        </>
                        
                          }


                      <Grid item xs={12} >
                      <AccordionLyt 
                      collapse={setShowAdvanceOptions}
                      title={' تنظیمات پیشرفته ( اختیاری)'} 
                    //   showAdvanceOptions,setShowAdvanceOptions
                      expanded={showAdvanceOptions}  >
                      <Grid container  >
        

                            <Grid item xs={12} md={3}  >

                            <Box sx={{padding:'8px'}}  >
                            <TextField
                            size='small'
                            fullWidth
                            label={'وزن'}
                            value={values?.weight || 0}
                            onChange={({target}:any)=>{
                            let{value}=target;
                             if (value) {
                                setFieldValue('weight',value)
                             }
                             else{
                                setFieldValue('weight',null)
                             }
                            }}
                            />

                            </Box>
                            </Grid>



                                       <Grid item xs={12} md={3} >         
                                        <Box sx={{padding:'8px'}}   >
                                        <MultiSel 
                                            data={teamsOptions||[]}
                                            extractTag={setHorizontalAlignments}
                                            label={'همسویی افقی'}
                                            editMode={true}
                                            tagSelected={krHorizontalAlignments}
                                            />
                                        </Box>
                                            </Grid>


                                        

                          <Grid item xs={12} md={3}>

        <FormControl sx={{p:'8px'}} fullWidth  >
        <DatePicker 

        slotProps={{ textField: { size: 'small' } }}
        label={"تاریخ شروع نتایج کلیدی"}
        value={lstartDate || ''}
        onChange={(newValue:any)=>{
            var persianDate = moment(newValue).format('jYYYY/jM/jD');
        setlStartDate(newValue)
        }}
        />
        </FormControl>


                         </Grid>

                         <Grid item xs={12} md={3}>
                         <FormControl sx={{p:'8px'}} fullWidth  >
                         <DatePicker 
                         
                         slotProps={{ textField: { size: 'small' } }}
                         label={"حداکثر تاریخ انجام"}
                           value={lforceEndDate || ''}
                           onChange={(newValue:any)=>{
                               var persianDate = moment(newValue).format('jYYYY/jM/jD');
                            //    console.log(persianDate)
                               setlForceEndDate(newValue)
                            // console.log(lforceEndDate)
                           }}
                           />
                         </FormControl>
                         </Grid> 


                         

                            <Grid item xs={12} md={12}  >
                            <Box sx={{padding:'8px'}}  >
                            <TextField
                            size='small'
                            fullWidth
                            label={'توضیحات'}
                            value={values?.description || ''}
                            onChange={({target}:any)=>{
                            let{value}=target;
                            setFieldValue('description',value)
                            }}
                            />

                            </Box>
                            </Grid>

                      </Grid>
                            </AccordionLyt>
                      </Grid>

                    
                            <Grid item xs={12} md={12} mt={3} >
                                <Box width={'100%'} display={'flex'} 
                                justifyContent={'end'} 
                                flexDirection={'row-reverse'}   
                                columnGap={2}
                                >

                                   
                                 {
                                    submitFormOptions && submitFormOptions?.map((item:any,i:number)=>{
                                        let{label,id}=item;
                                        // console.log(item)
                                        return   <Box width={'20%'}>
                                        <DyButton
                                        key={i}
                                        // disabled={dirty || !isValid}
                                             type={'submit'}
                                             variant={'contained'}
                                             bgColor={'info'}
                                             caption={label}
                                             onClick={() => {
                                                // console.log(id)
                                                setOkrStateId(id)
                                              }}
                                         />
                                        </Box> 
                                    })
                                 }

                              </Box>

                             
                            </Grid>
                        </Grid>

                    </Form>
            }

        </Formik>
           } 

               {
                showLToastMessage && <DYToastMessage
                isSuccess={editAsyncData?.isSuccess}
                message={editAsyncData?.metaData.message}
                setShow={setLShowToastMessage}
                show={showLToastMessage}
                
                />
                
                }
               
            </Box>
        </>
    )
}
