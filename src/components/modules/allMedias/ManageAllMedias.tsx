"use client"

import React, { useEffect, useState} from 'react';
import Categories from './Categories';


import { useUser } from '@/context/UserContext';
import AllMedias from './AllMedias';
import { getAllItems } from '@/services/itemService';

const ManageAllMedias = () => {
    const{setMedias} = useUser();
    

    useEffect(()=>{

        const getItemData = async()=>{
            const res = await getAllItems();
            setMedias(res?.data);
        }
       getItemData();
       
    },[setMedias])

    // const handleCategories = async(category:string)=>{
        
    //     try {
    //         let cat;
    //         let con;
    //         if(category==="All") {
    //             con = '';
    //             cat='';
    //         }
    //         else{
    //             con = 'category';
    //             cat=category;
    //         }
    //         const res = await getAllItems(con,cat);
    //         setMedias(res?.data);
            
    //     } catch (error) {
    //         console.log(error)
    //     }
            
        
    // }
    return (
        <div className='flex lg:flex-row flex-col lg:justify-center lg:items-start gap-x-5'>
        {/* <Categories ></Categories> */}
        <AllMedias></AllMedias>
    </div>
    );
};

export default ManageAllMedias;