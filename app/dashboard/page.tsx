'use server'

import { ContentDashboard } from "./_components/content"
import axios from "axios";

const LandingPage = async () => {
  try {
    const response = await axios.get(`/api/computer`);
    
    const dataComputer = response.data;

    return (
      <ContentDashboard computer={dataComputer} />
    );
  } catch (error) {
    console.error('Error fetching data: ', error);
    return (
      <ContentDashboard computer={[]} />
    );
  }
}

export default LandingPage
