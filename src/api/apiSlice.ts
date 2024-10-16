import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://stoked-keyword-436905-f9.el.r.appspot.com/api',
        // baseUrl: "http://localhost:9000/api",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Post','User', "Comments", 'Followers', 'Chat'],
    endpoints: () => ({})
})

export const baseUrl = "http://localhost:9000";

export default apiSlice;