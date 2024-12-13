'use server'

import axios from 'axios';
import { ContentComponent } from "./_components/content";

const LandingPage = async () => {
  try {
    const response = await axios.get(`/api/computer`);
    const dataComputer = response.data;

    return (
      <ContentComponent computer={dataComputer} />
    );
  } catch (error) {
    console.error("Error fetching computers:", error);
    return <div>Error fetching data</div>;
  }
}

export default LandingPage;
