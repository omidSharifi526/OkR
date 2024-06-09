import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box, Typography, IconButton, Tooltip, Button } from '@mui/material';
import ModalLyt from '../../../components/Layouts/ModalLyt/ModalLyt';
import KrDetails from '../LComponents/KrDetails/KrDetails';
import { useGetWebObjectiveDetailsCheckinMeetingByTeamId2 } from '../../Meeting/Hooks/index';
import { useGetKeyResultMeetingHistory } from '../Hooks/index';
import KrHistoryModalContent from '../LComponents/KrHistoryModalContent/KrHistoryModalContent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddKrEvaluation from '../LComponents/Forms/AddKrEvaluation/AddKrEvaluation';
import { ObjectiveSelectedFace,krSelectedFace } from '../Interfaces/interfaces';
import DyDataGrid from '../../../components/GlobalComponents/DyDataGrid/DyDataGrid';
import { useSelector } from 'react-redux';
import { EmptyDataIcon } from '../StataicData/index';
import TeamsNavigations from '../LComponents/TeamsNavigation/TeamsNavigations';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DYToastMessage from '../../../components/GlobalComponents/DyToastMessage/DYToastMessage';

import smil from '../../../Asset/Svgs/Emojys/smil.png';
import meh from '../../../Asset/Svgs/Emojys/meh.png';
import sad from '../../../Asset/Svgs/Emojys/sad.png';
import { changeTreeViewStateR } from '../../Meeting/MeetingsSlice/MeetingsSlice'
import { useDispatch } from 'react-redux';
import AddMeetingSuccess from '../../Meeting/LComponents/AddMeetingSuccess/AddMeetingSuccess';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DyLoadingCircular from '../../../components/GlobalComponents/DyLoadingCircular/DyLoadingCircular';
import {CircularProgress} from '@mui/material';
import { CreateKReval } from '../LComponents/Forms/CreateKReval/CreateKReval';

import LyBackdrop from '../../../components/Layouts/BackDrop/BackDrop';

const ObjectiveKeyResults: React.FC = () => {
  const dispatch = useDispatch()
  const treeView = useSelector((state: any) => state.meetings.treeViewState?.treeView);
  const priodId: any = useSelector((state: any) => state.meetings.priodId);
  const meetingId: any = useSelector((state: any) => state.meetings.meetingId);
  const nodeId: any = useSelector((state: any) => state.meetings.teamInfo?.id);
  const companyNode:any=useSelector((state:any)=>state.meetings.companyList);
  const KRinitialStatee=useSelector((state:any)=>state.loign.kRinitialState);
  const ObjctivieInitialState=useSelector((state:any)=>state.loign.ObjctivieInitialState);

  const objectivies = useSelector((state: any) => state.meetings.objectivie);
  const objUpdated = useSelector((state: any) => state.meetings.objUpdated);
  const teamInfo = useSelector((state: any) => state.meetings.teamInfo);
  const [teameInfo, setTeameInfo] = useState(null);
  const [teameInfoo, setTeameInfoo] = useState(teameInfo ? teameInfo : teamInfo);
  const [keyR, setKeyR] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false)
  const [krRowData, setKrRowData] = useState(null);
  const [showToolbarModal, setShowToolbarModal] = useState<Boolean|null>(false);
  const [addEvalSuccessModal,setAddEvalSuccessModal]=useState<Boolean|null>(false);
  const [showAddEvalModal, setShowAddEvalModal]=useState<Boolean>(false);
  const [SuccessState,setSuccessState] = useState<boolean>(false);
  const[pointingSystem,setPointingSystem]=useState<string|null>(null);
  
  const[rowSelectedData,setRowSelectedData]=useState<any>(null);
  const[objectiveSelectedData,setObjectiveSelectedData]=useState<any>(null);
  const[objectiveManiInfo,setObjectiveMainInfo]=useState<ObjectiveSelectedFace|null>(null);
  const[krMainInfo,setKrMainInfo]=useState<krSelectedFace|null>(null);
  const[showToastMessage,setShowToastMessage]=useState<any>(false);
  const[addEvalAsyncData,setAddEvalAsyncData]=useState<any>(null);
  // const[object]
  const getObjectiveSuccess=()=>{

  }
  const getObjectiveError=()=>{

  }
  
  const{data,isError:getObjectiveErrorFlag,isFetched:getObjectiveAgainFetched,isLoading:getObjLoading,refetch:callAgain}=useGetWebObjectiveDetailsCheckinMeetingByTeamId2(getObjectiveSuccess,getObjectiveError,nodeId,priodId,meetingId);
  const [objectivee, setObjectivee] = useState<any>(objectivies?.length > 4 ? 'fb7cc4ea-7162-4916-9aa8-834b14308e10' : null);

  useEffect(() => {
    
if (getObjectiveAgainFetched) {
  setSuccessState(false)
}

  }, [getObjectiveAgainFetched])

  useEffect(() => {
    
    if (addEvalAsyncData) {
      callAgain()
      setSuccessState(true)
    }
   
  }, [addEvalAsyncData])
  
  const [objcSelectionModel, setObjSelectionModel] = useState<string|any>(localStorage.getItem('objcSelectionModel'))
  const [krSelectionModel, setKrSelectionModel] = useState<string|any>(localStorage.getItem('krSelectionModel'));


  const [getCustomerBody, setGetCustomerBody] = useState<any>({
    pageSize: 10,
    page: 1,
    searchTerm: "",
  });
  const [krId, setKrId] = useState(null)
  const { data: KrHistoryData, isLoading: KRHLoading, isError: KRHError, isFetched: KRHFetched } = useGetKeyResultMeetingHistory(krId, priodId, meetingId);


  useEffect(() => {

if (objectiveSelectedData) {
  // console.log(objectiveSelectedData)
  let{name,id}=objectiveSelectedData;
  let ObjSelected={
    name:name,
    id:id
  }
  setObjectiveMainInfo(ObjSelected)
}

  // objectiveManiInfo,setObjectiveMainInfo
  }, [objectiveSelectedData])

  useEffect(() => {
    
  console.log(krSelectionModel)
  localStorage.setItem('krSelectionModel',krSelectionModel);
  console.log(localStorage.getItem('krSelectionModel'))
   
  }, [krSelectionModel])

  useEffect(() => {
    localStorage.setItem('objcSelectionModel',objcSelectionModel);    
    }, [objcSelectionModel])

  useEffect(() => {
    const krSelectionModel = localStorage.getItem('krSelectionModel');
    // console.log(krSelectionModel)
    if (krSelectionModel) {
      setKrSelectionModel(krSelectionModel)
    }
  }, [addEvalAsyncData]);

  useEffect(() => {
    const objcSelectionModel = localStorage.getItem('objcSelectionModel');
    console.log(objcSelectionModel)
    // const storedAge = localStorage.getItem('age');

    if (krSelectionModel) {
      setObjSelectionModel(objcSelectionModel)
    }
  }, [addEvalAsyncData]);

  
  


  useEffect(() => {
if (rowSelectedData) {
  let{name,id,responsibleName,startDate,startValue,threeTenthsValue,sevenTenthsValue,oneValue,currentValue,problems,predict,currentStateValue,description,score,okR_KeyResultType}=rowSelectedData;
  let krSelected:krSelectedFace={
    name:name,
    id:id,
    responsibleName:responsibleName,
    startDate:startDate,
    startValue:startValue,
    threeTenthsValue:threeTenthsValue,
    sevenTenthsValue:sevenTenthsValue,
    oneValue:oneValue,
    currentValue:currentValue,
    problems:problems,
    nextState:predict,
    currentState:currentStateValue,
    description:description,
    score:score,
    okR_KeyResultType:okR_KeyResultType
  }
  setKrMainInfo(krSelected)
// console.log(rowSelectedData)
}
  
  }, [rowSelectedData]);

  

  




  const objectiveColumns: any = 
    [
      {
        field: "rowid",
        headerName: "ردیف",
        width: 35,

        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => params.api.getAllRowIds().indexOf(params.id) + 1
      },
      {
        field: 'name',
        align: 'left',
        headerName: 'شرح هدف',
        headerAlign: 'center',
        sortable: false,
        wrap: 'wrap',
        minWidth: 250,
        fontsize: '12px !important',
        renderCell: ({ value }: any) => {
          return <Box>


            {
              value.length > 40 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
                {value}
              </Tooltip> :
                <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
            }
          </Box>
        }
      },

      {
        field: 'responsibleName',
        headerName: 'مسئول',
        align: 'center',
        sortable: false,
        headerAlign: 'center',
        width: 150
      },

      {
        field: 'keyResultCount',
        headerName: 'تعداد  نتایج',
        align: 'center',
        sortable: false,
        headerAlign: 'center',
        width: 100
      },

      {
        field: 'objectivesStateName',
        headerName: 'وضعیت هدف',
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: ({ value }: any) => {
          return <Box m={3}

            borderRadius={2}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'75%'}
            bgcolor={value === 'فعال' ? '#D5F7D4' : '#E5F1FF'}  >

            <Typography fontSize={'0.8rem'} px={8}  >
              {value}
            </Typography>
          </Box>
        }

      },

      {
        field: 'weight',
        headerName: 'وزن',
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        width: 80,


      },
      {
        field: 'evaluationPercentage',
        headerName: 'درصد ارزیابی',
        align: 'center',
        sortable: false,
        headerAlign: 'center',
        width: 120,
      }
      ,
      {
        field: 'score',
        headerName: 'امتیاز',
        align: 'center',
        sortable: false,
        headerAlign: 'center',
        width: 75,
        renderCell: (par: any) => {
          let value: number = par?.row?.score;

          //  console.log(par.row.score)
          let color = '';
          let fColor = ''
          switch (true) {
            case value > 70:
              color = '#D5F7D4';
              fColor = '#125610'
              break;
            case value < 70 && value > 30:
              color = '#FFF8D0';
              fColor = '#6B6440'
              break
            default:
              color = '#FFEEE5'
              fColor = '#993600'
              break;
          }
          return <Box m={3}
            borderRadius={2}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'75%'}
            bgcolor={color}
          >

            <Typography px={8} color={fColor} fontSize={'0.8rem'} fontWeight={400} >
              {value}
            </Typography>
          </Box>

        }

      }
    ];

  const keyResultColumn: any = [
    {
      field: "rowid",
      headerName: "ردیف",
      width: 35,

      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => params.api.getAllRowIds().indexOf(params.id) + 1
    }
    ,


    {
      field: 'name',
      headerName: 'شرح نتیجه کلیدی',
      align: 'left',
      headerAlign: 'center',
      sortable: false,
      minWidth: 300,
      // fontsize:'12px',

      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 40 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }
    },
    {
      field: 'responsibleName',
      headerName: 'مسئول ',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 120,
      fontsize: '14px',
    },
    {
      field: 'okrStateName',
      headerName: 'وضعیت نتیجه',
      align: 'center',
      sortable: false,

      headerAlign: 'center',
      width: 140,
      renderCell: ({ value }: any) => {
        return <Box

          borderRadius={2}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'75%'}
          bgcolor={value === 'فعال' ? '#D5F7D4' : '#E5F1FF'}  >

          <Typography   >
            {value}
          </Typography>
        </Box>
      }
    },
    {
      field: 'okR_KeyResultType',
      align: 'center',
      headerName: 'نوع',
      headerAlign: 'center',
      sortable: false,
      width: 110,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        return (
          <Typography fontSize={'12px'}  >{value}</Typography>
        )

      }


    },
    {
      field: 'pointingSystemType',
      align: 'center',
      headerName: 'سیستم امتیازدهی',
      headerAlign: 'center',
      sortable: false,
      width: 120,
      hideable: true,
      hide: true

    }
    ,
    {
      field: 'startValue',
      align: 'left',
      headerName: 'شروع',
      headerAlign: 'center',
      sortable: false,
      width: 50,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 5 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }

    }
    ,
    {
      field: 'threeTenthsValue',
      align: 'left',
      headerName: '30%',
      headerAlign: 'center',
      sortable: false,
      width: 70,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 5 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }

    }
    ,


    {
      field: 'sevenTenthsValue',
      align: 'left',
      headerName: '70%',
      headerAlign: 'center',
      sortable: false,
      width: 70,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 5 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }

    },
    {
      field: 'oneValue',
      align: 'left',
      headerName: '100%',
      headerAlign: 'center',
      sortable: false,
      width: 80,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 5 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }

    }
    ,
    {
      // name:'startDate',
      field: 'startDate',
      headerName: 'تاریخ شروع',
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 100,

    }
    ,
    {
      // name:'startDate',
      field: 'forceEndDate',
      headerName: 'حداکثر تاریخ انجام',
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 100,

    }
    ,
    {
      field: 'oldValue',
      headerName: 'مقدار قبلی',
      align: 'right',
      sortable: false,
      headerAlign: 'right',
      width: 100,
      renderCell: ({ value }: any) => {
        if (typeof value === 'string') {
          return <Box>
            {
              value.length > 10 ? <Tooltip sx={{ fontSize: '12px !important' }} title={value}>
                <Typography fontSize={'12px'}  >  {value}</Typography>
              </Tooltip> :
                <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
            }
          </Box>

        }
        else {
          return <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
        }
      }
    }
    ,
    {
      field: 'oldScore',
      headerName: 'امتیاز قبلی',
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 80,
      renderCell: (par: any) => {
        // console.log(par?.row?.score)
        let score: string = par?.row?.oldScore;
        // console.log(score);
        if (typeof score === 'string' && score.includes('%')) {
          let pureNum = score.slice(0, score.length - 1);
          let intVal = +pureNum;
          let color = '';
          let fColor = ''
          switch (true) {
            case intVal >= 70:
              color = '#D5F7D4';
              fColor = '#125610'
              break;
            case intVal < 70 && intVal > 30:
              color = '#FFF8D0';
              fColor = '#6B6440'
              break
            default:
              color = '#FFEEE5'
              fColor = '#993600'
              break;
          }
          return <Box m={3}
            borderRadius={2}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'65%'}
            bgcolor={color}
            my={1}
          >

            <Typography px={8} color={fColor} fontSize={'0.8rem'} fontWeight={400} >
              {intVal}
            </Typography>
          </Box>

        }

        else {
          return <Box>
            <Typography>{score}</Typography>
          </Box>
        }





      }

    }
    ,
    {
      field: 'currentValue',
      headerName: 'مقدار جدید',
      align: 'right',
      sortable: false,
      headerAlign: 'right',
      width: 100,
      renderCell: ({ value }: any) => {
        return <Box>


          {
            value.length > 10 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }
    },
    {
      field: 'score',
      headerName: 'امتیاز جدید',
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 80,
      renderCell: (par: any) => {
        // console.log(par?.row?.score)
        let score: string = par?.row?.score;
        // console.log(score);
        if (typeof score === 'string' && score.includes('%')) {
          let pureNum = score.slice(0, score.length - 1);
          let intVal = +pureNum;
          let color = '';
          let fColor = ''
          switch (true) {
            case intVal >= 70:
              color = '#D5F7D4';
              fColor = '#125610'
              break;
            case intVal < 70 && intVal > 30:
              color = '#FFF8D0';
              fColor = '#6B6440'
              break
            default:
              color = '#FFEEE5'
              fColor = '#993600'
              break;
          }
          return <Box m={3}
            borderRadius={2}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'65%'}
            bgcolor={color}
            my={1}
          >

            <Typography px={8} color={fColor} fontSize={'0.8rem'} fontWeight={400} >
              {intVal}
            </Typography>
          </Box>

        }

        else {
          return <Box>
            <Typography>{score}</Typography>
          </Box>
        }





      }

    }
    ,


    {
      field: 'revenue',
      headerName: 'عملکرد ',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 100,
      fontsize: '14px',
      renderCell: (param: any) => {
        let revenue: string = param?.row?.revenue;
        // console.log(revenue?.length,revenue)
        let postive;
        if (revenue && revenue.length > 2 && revenue !== 'محاسبه نشده') {
          postive = revenue.includes('-');
          return <Box display={'flex'} alignItems={'center'} justifyContent={'center'} columnGap={1} >
            <Typography fontSize={'0.6rem'}  >
              {
                revenue.replace('-', '')
              }
            </Typography>

            {
              !postive ? <TrendingUpIcon color='secondary' /> : <TrendingDownIcon color='error' />
            }


          </Box>

        }
        else if (revenue && revenue.length <= 2 && revenue.includes('%')) {
          return <Box display={'flex'} alignItems={'center'} justifyContent={'center'} columnGap={1} >
            <Typography fontSize={'0.6rem'}  >
              {
                revenue
              }
            </Typography>
          </Box>
        }

        else {
          return <Typography fontSize={'0.6rem'} color={'red'}  >
            {
              revenue
            }
          </Typography>
        }

    

      }
    
    },





    //  
    {
      field: 'currentState',
      headerName: 'وضعیت فعلی',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 122,
      renderCell: ({ value }: any) => {
        return <Box m={3}
          borderRadius={2}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'75%'}
          bgcolor={value === 'در مسیر مناسب' ? '#D5F7D4' : value === 'نیازمند توجه' ? '#FFEBEF' : '#F0F1F2'}  >

          <Typography fontSize={'10px'} px={8} color={value === 'نیازمند توجه' ? '#F95700' : value === 'خارج از مسیر مناسب' ? '#CC0030' : 'black'} >
            {value}
          </Typography>
        </Box>
      }


    }
    ,

    {
      field: 'nextState',
      headerName: 'وضعیت آتی',
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 90,
      renderCell: (par: any) => {

        let value: string = par?.row?.nextState;
        switch (value) {
          case 'انتظار داریم به نتیجه درست برسیم':
            return <Box sx={{ width: '100%', textAlign: 'center' }}  ><img src={smil} width={'20px'} /></Box>
            break;

          case 'با ریسک عدم دستیابی مواجه هستیم اما تمام تلاش خود را خواهیم کرد':
            return <Box sx={{ width: '100%', textAlign: 'center' }}  ><img src={meh} width={'20px'} /></Box>
            break;
            case "اعتقادی نداریم به نتیجه برسیم مگر اینکه رویکرد جدیدی اتخاذ کنیم":
            return <Box sx={{ width: '100%', textAlign: 'center' }}  ><img src={sad} width={'20px'} /></Box>
            break;
            // "اعتقادی نداریم به نتیجه برسیم مگر اینکه رویکرد جدیدی اتخاذ کنیم"
          // 



          default:
            return null
            break;
        }

      }

    }
    ,

    {
      field: 'problems',
      headerName: 'موانع',
      align: 'center',
      // headerName: '100%',
      headerAlign: 'center',
      sortable: false,
      width: 80,
      hideable: true,
      hide: true,
      renderCell: ({ value }: any) => {
        if (typeof value === 'string') {
          let length = value.length;
          return <Box>
            {
              value.length > 6 ? <><Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
                <Typography textAlign={'left'} sx={{ fontSize: '12px' }}  >{value.slice(0, 3)}{length > 6 ? '...' : ''}</Typography>
              </Tooltip></> :
                <Typography textAlign={'left'} sx={{ fontSize: '12px' }} >{value}</Typography>
            }
          </Box>
        }
        else {
          return value
        }
      }

    }
    ,

    {
      field: 'description',
      headerName: 'توضیحات',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 150,
      fontsize: '14px',
      renderCell: ({ value }: any) => {
        return <Box>
          {
            value?.length > 10 ? <Tooltip sx={{ fontSize: '1.5rem !important' }} title={value}>
              {value}
            </Tooltip> :
              <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
          }
        </Box>
      }
      
    },

  


  ]






  // وضعیت آتی

  useEffect(() => {

   
    setKeysResultsList()
  }, [objectivee])

  const setKeysResultsList = (): any => {
    let keyrs = objectivee?.keyResultCheckingMeetingQueryResultDto
    setKeyR(keyrs)
  }


  const renderContents = () => {

    if (!keyR) {
      return <Box
        width={'50%'}

        mx={'auto'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'} >

        <EmptyDataIcon style={{ width: '80px', height: '80px' }} />

        <Typography mt={2} color={'blue'} textAlign={'center'}  >
          برای نمایش نتایج کلیدی از جدول بالا یک هدف را انتخاب نمایید.
        </Typography>
      </Box>
    }
    else {
      return <Grid item xs={12} >

        <Grid container  >
          <Grid item xs={6} >
            <Box py={1} px={3}  >
              <Typography fontSize={'14px'} fontWeight={500} >
                هدف : {objectivee?.name}
              </Typography>
            </Box>
          </Grid>


          <Grid item xs={6}  >
            <Box py={1} >
              <Typography fontSize={'14px'} fontWeight={500}  >
                مسئول هدف :  {objectivee?.responsibleName}
              </Typography>
            </Box>

          </Grid>
        </Grid>
        <Grid item xs={12}  >
          <DyDataGrid
          // initialMount
            data={keyR || []}
            columns={keyResultColumn || []}
            initialOnRowClick={setKrRowData}
            hideFooter={true}
            setSelectionModel={setKrSelectionModel}
            selectionModel={krSelectionModel}
            initState={KRinitialStatee}
            additionalToolbar={true}
            setShowHistory={setHistoryModal}
            setSpecialId={setKrId}
            setShowInformation={setShowModal}
            setShowAddEvalModal={setShowAddEvalModal}
            initialMount={true}
            setPointSys={setPointingSystem}
            drName={'KRinitialState'}
            setRowSelectedData={setRowSelectedData}
            // setKresultId={}
          />
        </Grid>

      </Grid>


    }



  }
  
  return (
    <>
      <Grid container sx={{ bgcolor: '#F9F9F9' }} style={{ width: '100%' }} >

        <Grid item xs={treeView ? 12 : 10}>
          <Box py={1} my={2} borderRadius={2} boxShadow={2} bgcolor={'white'} >
            <Grid container >
              <Grid item xs={12} md={3}  >

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}  >
                  <Typography variant='button' px={1}>{teamInfo.isCompany ? 'نام شرکت' : 'نام تیم'}</Typography>
                  <Typography fontWeight={600} fontSize={'14px'}  >{teamInfo?.name}</Typography>

                </Box>
              </Grid>
              <Grid item xs={12} md={3}  >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}  >
                  <Typography variant='button' px={1}>{teamInfo.isCompany ? 'مدیر شرکت' : 'مدیر تیم'}</Typography>
                  <Typography fontWeight={600} fontSize={'14px'}  >{teamInfo?.managerCompanyName}</Typography>

                </Box>
              </Grid>

              <Grid item xs={12} md={3}  >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}  >
                  <Typography variant='button' px={1}>{`تعداد اهداف ${teamInfo.isCompany ? 'شرکت' : 'تیم'}`}</Typography>
                  <Typography fontWeight={600} fontSize={'14px'}  >{teamInfo?.objectivesCount}</Typography>

                </Box>
              </Grid>

              <Grid item xs={12} md={3}  >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}  >
                  <Typography variant='button' px={1}>{`تعداد نتایج ${teamInfo.isCompany ? 'شرکت' : 'تیم'}`}</Typography>
                  <Typography fontWeight={600} fontSize={'14px'}   >{teamInfo?.keyResultsCount}</Typography>

                </Box>
              </Grid>


            </Grid>
          </Box>
        </Grid>


        {
          !treeView && <Grid mx={'auto'} item xs={12} sm={1.70} display={'flex'} alignItems={'center'}   >
            < Grid container borderRadius={2} boxShadow={1}   >
              {/* <Grid item xs={10}  >
                <Box py={1} display={'flex'} alignItems={'center'} justifyContent={'center'}  >
                  <Typography fontSize={'10px'}  >برای پیمایش تیم ها ورق بزنید</Typography>
                </Box>
              </Grid> */}
              <Grid item xs={9} my={'auto'}   >
                <TeamsNavigations />
              </Grid>
              <Grid item xs={3} py={1}  >
                <IconButton size='small'  onClick={() => {
                  dispatch(changeTreeViewStateR())
                }} >
                  <AccountTreeIcon />
                </IconButton>
              </Grid>

            </Grid>
          </Grid>
        }





        <Box width={'100%'} borderRadius={2} boxShadow={2} bgcolor={'white'}>
          <Grid item xs={12}  >

            <Typography px={3} py={1} textAlign={'left'} fontSize={'16px'} color={'blue'}  >
              لیست اهداف
            </Typography>
            <DyDataGrid
              initialOnRowClick={setObjectivee}
              data={objectivies}
              columns={objectiveColumns||[]}
              hideFooter={true}

              setRowSelectedData={setObjectiveSelectedData}
               objcSelectionModel={objcSelectionModel}
              setSelectionModel={setObjSelectionModel}
              selectionModel={objcSelectionModel}
              initState={ObjctivieInitialState}
              initialMount={true}
              additionalToolbar={false}
              drName={'ObjctivieInitialState'}


            />


          </Grid>
        </Box>

        <Box
          // bgcolor={'red'} 
          mt={2}
          width={'100%'}
          borderRadius={3}
          boxShadow={2}
          bgcolor={'white'}
        // rowGap={1} 
        >

          <Grid item xs={12}  >
            <Typography px={3}
              fontSize={'16px'}
              py={1}
              textAlign={'left'}
              variant='h6'
              color={'blue'}  >
              لیست نتایج کلیدی
            </Typography>
          </Grid>


          <Grid item xs={12} py={1}    >

            <Grid container  >
              {
                renderContents()
              }
            </Grid>

          </Grid>






        </Box>
        {
          showModal && krRowData &&
          <ModalLyt title={'اطلاعات نتیجه کلیدی'}
            showModal={Boolean(showModal)}
            setShowModal={setShowModal}

          >
            <KrDetails
              // krDetail={krRowData}
              data={krRowData}
            />
          </ModalLyt>

        }

        {
          historyModal && <ModalLyt
            //  loadingFlag={KRHLoading}
            title={'تاریخچه نتیجه کلیدی'}
            showModal={Boolean(historyModal)}
            setShowModal={setHistoryModal}
          >
            <KrHistoryModalContent
              loadingFlag={KRHLoading}
              data={KrHistoryData}
              krDetail={krRowData}
              objective={objectivee}
            />

          </ModalLyt>
        }

        {
          showAddEvalModal && <ModalLyt
            width={1300}
            title={'تعیین مقدار برای نتیجه کلیدی'}
            showModal={Boolean(showAddEvalModal)}
            setShowModal={setShowAddEvalModal}


          >
            {/* afterAddKr */}
            {/* <AddKrEvaluation
              cancelo={setShowAddEvalModal}
              objectiveId={objectivee?.id}
              kresultId={krId}
              onsucces={setSuccessState}
              pointingSystem={pointingSystem}
              afterAddKr={initialAfterAddKr}
              rowSelectedData={rowSelectedData}
            /> */}
    
            <CreateKReval
              cancelo={setShowAddEvalModal}
              objectiveManiInfo={objectiveManiInfo}
              krMainInfo={krMainInfo}
              // pointingSystem={pointingSystem}
              objectiveId={objectivee?.id}
              kresultId={krId}
              // afterAddKr={initialAfterAddKr}
              onsucces={setShowAddEvalModal}
              setShowToastMessage={setShowToastMessage}
              setAddEvalAsyncData={setAddEvalAsyncData}

              
            
            
            
            
            />


          </ModalLyt>
        }

        {
          showToolbarModal && <ModalLyt
            title={'نتیجه کلی'}
            showModal={Boolean(showToolbarModal)}
            setShowModal={setShowToolbarModal}
          >
            {/* <h1>ModaLOfDatagRid</h1> */}
          </ModalLyt>
        }

        {
          SuccessState && 
          <LyBackdrop 
          visible={SuccessState} 
          // successFlag={getObjectiveAgainFetched} 
           >
             <Box>
              <CircularProgress color='info'/>
            </Box>
            </LyBackdrop>
        }

       {
         
          showToastMessage && <DYToastMessage
          isSuccess={addEvalAsyncData?.isSuccess}
          message={addEvalAsyncData?.metaData.message}
          setShow={setShowToastMessage}
          show={showToastMessage}
          
          />
          
          
       }


{/* const[showToastMessage,setShowToastMessage]=useState<any>(false);
  const[addEvalAsyncData,setAddEvalAsyncData]=useState<any>(null); */}

      </Grid>
    </>
  )
}

export default ObjectiveKeyResults