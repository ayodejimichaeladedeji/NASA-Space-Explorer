import { useState, useEffect } from "react";
import { getApod } from "../services/apodService.js";

export function useApod({ date, start_date, end_date }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    let retryTimeout;

    async function loadData() {
      if (isCancelled) return;

      setData(null);
      setError(null);
      setLoading(true);

      if ((start_date && !end_date)) {
        setError("Please select an end date");
        setLoading(false);
        return;
      }

      if ((!start_date && end_date)) {
        setError("Please select a start date.");
        setLoading(false);
        return;
      }

      try {
        const apodData = await getApod({ date, start_date, end_date });
        if (!isCancelled) {
          setData(apodData);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(loadData, 10000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, [date, start_date, end_date]);

  return { data, loading, error };
}
