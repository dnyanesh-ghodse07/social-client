import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:9000/api',
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