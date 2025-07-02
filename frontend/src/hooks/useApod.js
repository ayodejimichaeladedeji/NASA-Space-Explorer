import { useState, useEffect } from "react";
import { getApod } from "../services/http.js";

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
      
      if ((start_date && !end_date) || (!start_date && end_date)) {
        setError(new Error("Both start_date and end_date must be provided together."));
        setLoading(false);
        return;
      }

      if (date && (start_date || end_date)) {
        setError(new Error("Provide either a single date OR a date range, not both."));
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