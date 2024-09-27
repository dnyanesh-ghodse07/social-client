import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://stoked-keyword-436905-f9.el.r.appspot.com/api',
        prepareHeaders: (headers, {getState}) => {
            const token = getState()?.auth?.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Post','User', "Comments"],
    endpoints: () => ({})
})

export default apiSlice;