import { useState, useEffect } from "react";
import { getRandomFacts } from "../services/http.js";

export function useRandomFacts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    let isCancelled = false;

    const handler = setTimeout(() => {
      async function loadData() {
        try {
          const apodData = await getRandomFacts();
          if (!isCancelled) {
            setData(apodData);
          }
        } catch (err) {
          if (!isCancelled) {
            setError(err);
          }
        } finally {
          if (!isCancelled) {
            setLoading(false);
          }
        }
      }
      loadData();
      // Cleanup in case component unmounts - test this after implementing routing.
      // return () => { isCancelled = true;};
    }, 5000);
    return () => { clearTimeout(handler); isCancelled = true;}
  }, []);

  return { data, loading, error };
}
