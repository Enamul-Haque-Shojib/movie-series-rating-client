/* eslint-disable @typescript-eslint/no-explicit-any */



import ManageMediaDetails from '@/components/modules/MediaDetails/ManageMediaDetails';

import { getSingleMedia} from '@/services/itemService';
import React from 'react';



const MediaDetails = async ({ params }: any) => {
  const { mediaId } : any = params;

  console.log('id',mediaId)


  
  const { data: media } = await getSingleMedia(mediaId);

  return (
    <div className="w-[90%] mx-auto">
      <ManageMediaDetails media={media} />
    </div>
  );
};

export default MediaDetails;



