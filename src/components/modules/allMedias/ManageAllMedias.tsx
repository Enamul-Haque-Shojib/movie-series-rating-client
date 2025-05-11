"use client"

import React, { useEffect} from 'react';



import { useUser } from '@/context/UserContext';
import AllMedias from './AllMedias';

import Categories from './Categories';
import { getAllItems } from '@/services/itemService';

const ManageAllMedias = () => {
    const{setMedias} = useUser();
    

   useEffect(()=>{

        const getItemData = async()=>{
            const res = await getAllItems('','');
            console.log(res)
            setMedias(res?.data);
        }
       getItemData();
       
    },[setMedias])

    const handleCategories = async(category:string)=>{
        console.log(category)
        try {
            let cat;
            let con;
            if(category==="All") {
                con = '';
                cat='';
            }
            else{
                con = 'category';
                cat=category;
            }
            const res = await getAllItems(con,cat);
            setMedias(res?.data);
            
        } catch (error) {
            console.log(error)
        }
            
        
    }
    return (
        <div className='flex lg:flex-row flex-col lg:justify-center lg:items-start gap-x-5'>
        <Categories handleCategories={handleCategories}></Categories>
        <AllMedias></AllMedias>
    </div>
    );
};

export default ManageAllMedias;