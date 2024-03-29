import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
    getAllMeetingByIds,
    getAllTeamsByTenantId,
    getTeamDetailsById,
    getAllObjectiveByTeamId,
    getAllKeyResultByObjectiveId,
    getAllTeamStatusByTenantId,
    getWebCheckinMeetingDetailsByMeetingId,
    getWebObjectiveDetailsCheckinMeetingByTeamId,
    getAllTeamsForSelByTenantId,
    getAllMeetingsTypeByTenantId, addMeeting

} from '../Api/Index';
import { setMeetingsListR, setObjectivieR, setKeyResultsR, setLoadingR } from '../MeetingsSlice/MeetingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamsDataR } from '../MeetingsSlice/MeetingsSlice'
// useQuery


const useGetAllMeetings = (meetIds: any | null) => {
    const dispatch = useDispatch();
    const changeTenantMode = useSelector((state: any) => state.meetings.changeTenantMode);
    // console.log(meetIds)
    return useQuery(['getAllMeetingByIds', meetIds], getAllMeetingByIds, {
        staleTime: 0,
        // cacheTime:Infinity,
        enabled: !!meetIds,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {



        }
        ,
        onError: (err) => {
            console.log(err)
        },
        select: (data: any) => {
            let rawData = data?.data.data
            dispatch(setMeetingsListR(rawData))
            return rawData
        }
    })
}


const useGetTeamsByTenantId = (getTeamsSuccess: any, getTeamsFailed: any, id: string) => {

    return useQuery(['getTeamsByTenantId', id], getAllTeamsByTenantId, {
        refetchOnWindowFocus: false,
        // cacheTime:Infinity,
        enabled: !!id,
        onSuccess: (data) => {

            getTeamsSuccess();

        },
        onError: (err) => {
            getTeamsFailed()
        }

    })
}

const useGetTeamDetailsById = () => {
    return useQuery(['getTeamDetailsById'], getTeamDetailsById, {
        onSuccess: (data) => {
            //    console.log(data)
        },
        onError: (err) => {
            console.log(err)
        }

    })
}
// nbiiiiajdliJDFLSDJfZDlZDh bikohodiiiiiiiiii


const useGetAllObjectiveByTeamId = (nodeId: any) => {
    const dispatch = useDispatch();
    return useQuery(['getAllObjectiveByTeamId', nodeId], getAllObjectiveByTeamId, {
        enabled: !!nodeId,
        cacheTime: Infinity,
        refetchOnWindowFocus: false
        ,
        onSuccess: (data: any) => {
            let rawData = data?.data?.data
            //    console.log(rawData)
            dispatch(setObjectivieR(rawData))
        },
        onError: (err) => {
            console.log(err)
        },


    })
}

const useGetAllKeyResultByObjectiveId = (objectiveId: any) => {
    const dispatch = useDispatch();
    return useQuery(['GetAllKeyResultByObjectiveId', objectiveId], getAllKeyResultByObjectiveId, {
        enabled: !!objectiveId,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.log(err)
        },
        onSuccess: (data) => {
            //    console.log(data)
            let rawdata = data?.data.data;
            //    console.log(rawdata);
            dispatch(setKeyResultsR(rawdata))
        },


    })
}

const useGetAllTeamStatusByTenantId = (id: any) => {
    return useQuery(['getAllTeamStatusByTenantId', 'f64c1efe-4213-4502-ab8a-018c88bc9f2d'], getAllTeamStatusByTenantId, {
        refetchOnWindowFocus: false,
        cacheTime: Infinity,
        enabled: !!id,
        onSuccess: (data) => {
            //  console.log(data)
        }
        ,
        onError: (err) => {
            console.log(err)
        }

    })
}

const UseGetWebCheckinMeetingDetailsByMeetingId = (getDetSuccess: any, getDetFailed: any, id: string) => {
    const dispatch = useDispatch()
    return useQuery(['getWebCheckinMeetingDetailsByMeetingId', id], getWebCheckinMeetingDetailsByMeetingId, {
        enabled: !!id,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            // console.log(data)
            getDetSuccess();
            // 
        }
        ,
        onError: (er) => {
            // console.log(er)
            getDetFailed()
        }
        ,
        select: (data) => {
            //  console.log(data)
            let teamData = data?.data?.data;
            // console.log(teamData)
            dispatch(setTeamsDataR(teamData));
        }
    })
}

const useGetWebObjectiveDetailsCheckinMeetingByTeamId = (getObjectiveSuccess: any, getObjectiveError: any, id: String, priodId: string, meetingId: string) => {
    // console.log(priodId)
    const dispatch = useDispatch();
    return useQuery(['getWebObjectiveDetailsCheckinMeetingByTeamId', id, priodId, meetingId]
        , getWebObjectiveDetailsCheckinMeetingByTeamId, {
        cacheTime:1000,
        refetchOnWindowFocus: false,
        staleTime:1000,
        enabled: !!id,
        onSuccess: (data) => {
            let rawData = data?.data?.data
            console.log(rawData)
            dispatch(setObjectivieR(rawData))
            getObjectiveSuccess();
            // return rawData

        }
        ,
        onError: (err) => {
            console.log(err)

            getObjectiveError()

        }
        // ,
        // select: (data: any) => {

        //     let { data: resData } = data;
        //     console.log(resData);
        //     return resData
        // }
    })
}


const useGetAllTeamsForSelByTenantId = (tenantId: any) => {
    return useQuery(['getAllTeamsForSelByTenantId', tenantId], getAllTeamsForSelByTenantId, {
        enabled: !!tenantId,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            // console.log(data)
        }

        ,
        onError: (err) => {
            console.log(err)
        },
        select: (data) => {
            let rawData = data?.data?.data;
            let readyData = rawData.map(({ id, name }: any) => {
                return { title: name, year: id }
            })
            return readyData
        }
    })
}


const useGetAllMeetingsTypeByTenantId = (tenantId: any) => {
    return useQuery(['GetAllMeetingsTypeByTenantId', tenantId], getAllMeetingsTypeByTenantId, {
        enabled: !!tenantId,
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.log(err)
        }
        ,
        onSuccess: (data) => {

        }
        ,
        select: (data: any) => {
            let rawData = data?.data?.data;
            let readyData: any[] = rawData.map(({ id, name }: any) => {
                return { key: name, value: id }
            })
            return readyData
        }
    })
}

const useAddMeeting = (addMeetingSuccess: any) => {
    const queryClient = useQueryClient();
    return useMutation(addMeeting, {
        onSuccess: () => {
            addMeetingSuccess()
            queryClient.invalidateQueries('getAllMeetingByIds')
        },
        onError: (err: any) => {
            console.log(err)
        }
    })
}

// const useAddCustomer = (onSuccessDon,failSend,err) => {
//     const navigate=useNavigate();
//     const queryClient=useQueryClient();
//     const dispatch=useDispatch();
//     return useMutation(addCustomer,{
//       onSuccess:()=>{
//       queryClient.invalidateQueries('getAllCustomers')
//       onSuccessDon()
//       }
//       ,onError:({response})=>{
//         let {data:{message}}=response;
//         const myArray = message.split("|");
//         dispatch(setErrorsR(myArray))
//         failSend()

//       }
//     })
//   };




export {
    useGetAllMeetings,
    useGetTeamsByTenantId,
    useGetTeamDetailsById,
    useGetAllObjectiveByTeamId,
    useGetAllKeyResultByObjectiveId,
    useGetAllTeamStatusByTenantId,
    UseGetWebCheckinMeetingDetailsByMeetingId,
    useGetWebObjectiveDetailsCheckinMeetingByTeamId,
    useGetAllTeamsForSelByTenantId,
    useGetAllMeetingsTypeByTenantId,
    useAddMeeting
}