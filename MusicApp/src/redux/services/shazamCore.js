import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


    export const shazamCoreAPI = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) =>{
                headers.set('X-RapidAPI-Key', '3dd7129626msh279c82491011679p17ee54jsn159c4f5ec946');
                return headers;
            }
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({query: () => '/charts/world'}),
        })
    });

    export const{
        useGetTopChartsQuery,
    } = shazamCoreAPI;