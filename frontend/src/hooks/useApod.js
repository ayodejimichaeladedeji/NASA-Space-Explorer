import { useState, useEffect } from "react";
import { getApod } from "../services/http.js";

export function useApod({ date, start_date, end_date }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    let isCancelled = false;

    const handler = setTimeout(() => {
      if ((start_date && !end_date) || (!start_date && end_date)) {
        setError(
          new Error("Both start_date and end_date must be provided together.")
        );
        setLoading(false);
        return;
      }

      if (date && (start_date || end_date)) {
        setError(
          new Error("Provide either a single date OR a date range, not both.")
        );
        setLoading(false);
        return;
      }

      async function loadData() {
        try {
          const apodData = await getApod({ date, start_date, end_date });
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
  }, [date, start_date, end_date]);

  return { data, loading, error };
}

// export function useApod({ date, start_date, end_date, autoFetch = true }) {
  // const fetchApod = useCallback(async () => {
  //   setLoading(true);

  //   if ((start_date && !end_date) || (!start_date && end_date)) {
  //     setError(new Error("Both start_date and end_date must be provided together."));
  //     setLoading(false);

  //     return;
  //   }
    
  //   if (date && (start_date || end_date)) {
  //     setError(new Error("Provide either a single date OR a date range, not both."));
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //       const apodData = await getApod({ date, start_date, end_date });
  //       setData(apodData);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  // }, [date, start_date, end_date])

  // useEffect(() => {
  //   if(autoFetch){
  //     fetchApod();
  //   }
  // }, [fetchApod, autoFetch])

  // return { data, loading, error, autoFetch };
// }
