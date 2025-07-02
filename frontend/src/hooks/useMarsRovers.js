import { useState, useEffect } from "react";

import {
  getActiveRovers,
  getLatestPhotosFromAMarsRover,
  getRoversManifest,
  getPhotosByEarthDate,
  getPhotosBySol
} from "../services/http.js";

export function useLatestPhotos(roverName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!roverName) return;

    let timeoutId;
    let isMounted = true;

    const loadData = async (currentRetry = 0) => {
      if (!isMounted) return;

      setLoading(true);
      if (currentRetry === 0) {
        setError(null);
        setRetryCount(0);
      }

      try {
        const marsRoversLatestData = await getLatestPhotosFromAMarsRover(
          roverName
        );
        if (isMounted) {
          setData(marsRoversLatestData);
          setError(null);
          setRetryCount(0);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setRetryCount(currentRetry + 1);

          timeoutId = setTimeout(() => {
            if (isMounted) {
              loadData(currentRetry + 1);
            }
          }, 10000);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [roverName]);

  return { data, loading, error, retryCount };
}

export function useActiveRovers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const fetchActiveRovers = async (currentRetry = 0) => {
      if (!isMounted) return;

      setLoading(true);
      if (currentRetry === 0) {
        setError(null);
        setRetryCount(0);
      }

      try {
        const rovers = await getActiveRovers();
        if (isMounted) {
          setData(rovers);
          setError(null);
          setRetryCount(0);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setRetryCount(currentRetry + 1);

          timeoutId = setTimeout(() => {
            if (isMounted) {
              fetchActiveRovers(currentRetry + 1);
            }
          }, 10000);
        }
      }
    };

    fetchActiveRovers();

    // Cleanup function
    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { data, loading, error, retryCount };
}

export function useRoverManifest(roverName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName) return;

    async function fetchRoverInfo() {
      setLoading(true);
      setError(null);
      try {
        const info = await getRoversManifest(roverName);
        setData(info);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoverInfo();
  }, [roverName]);

  return { data, loading, error };
}

export function usePhotosByEarthDate({ roverName, earth_date, camera }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName || !earth_date) return;

    async function fetchPhotos() {
      setLoading(true);
      setError(null);
      try {
        const photos = await getPhotosByEarthDate({
          roverName,
          earth_date,
          camera,
        });
        setData(photos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [roverName, earth_date, camera]);

  return { data, loading, error };
}

export function usePhotosBySol({ roverName, sol, camera }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName || !sol) return;

    async function fetchPhotos() {
      setLoading(true);
      setError(null);
      try {
        const photos = await getPhotosBySol({
          roverName,
          sol,
          camera,
        });
        setData(photos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [roverName, sol, camera]);

  return { data, loading, error };
}
