'use client'; // Perlu diubah ke 'use client' agar mendukung event-driven dan rendering di client-side

import { useEffect, useState } from "react";
import axios from "axios";
import { ContentComponent } from "./_components/content";

const LandingPage = () => {
  const [dataComputer, setDataComputer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/computer`);
        setDataComputer(response.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <ContentComponent computer={dataComputer} />;
};

export default LandingPage;
