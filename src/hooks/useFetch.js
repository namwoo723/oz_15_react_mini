import { useEffect, useState } from "react";

export default function useFetch (url) {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  
  useEffect(() => {
    const options = {
      method: 'GET', 
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      }
    };

    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json)
      } catch {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url])

  return { data, loading, error };
}