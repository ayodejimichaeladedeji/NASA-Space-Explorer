import { useState, useEffect } from "react";
import { getRandomFacts } from "../services/geminiService.js";

export function useRandomFacts() {
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

      try {
        const factsData = await getRandomFacts();
        if (!isCancelled) {
          setData(factsData);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(loadData, 10000);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, []);

  return { data, loading, error };
}