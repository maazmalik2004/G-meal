import React, { useState } from 'react';

import Chatbot from '../../components/Chatbot/Chatbot.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import Plan from '../../components/Plan/Plan';
import Preferences from '../../components/Preferences/Preferences';
import ImageUploader from '../../components/uploadImage/upload.jsx';
import HydrationReminder from '../../components/stayhydrated/stayhydrated.jsx';
import RedirectButton from '../../components/redirect.jsx';

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <RedirectButton/>
      <Preferences/>
      <Plan/>
      <Chatbot/>
      <ImageUploader/>
      <HydrationReminder/>
    </>
  )
}

export default Home
