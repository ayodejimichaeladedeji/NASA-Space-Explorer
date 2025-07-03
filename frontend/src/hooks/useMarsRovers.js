import { useState, useEffect } from "react";

import {
  getActiveRovers,
  getLatestPhotosFromAMarsRover,
  getRoversManifest,
  getPhotosByEarthDate,
  getPhotosBySol,
} from "../services/marsService.js";

export function useLatestPhotos(roverName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName) return;

    let isCancelled = false;
    let retryTimeout;

    async function loadData() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const marsRoversLatestData = await getLatestPhotosFromAMarsRover(roverName);
        if (!isCancelled) {
          setData(marsRoversLatestData);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(loadData, 10000); // Retry every 10 seconds
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
  }, [roverName]);

  return { data, loading, error };
}

export function useActiveRovers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    let retryTimeout;

    async function fetchActiveRovers() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const rovers = await getActiveRovers();
        if (!isCancelled) {
          setData(rovers);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(fetchActiveRovers, 10000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchActiveRovers();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, []);

  return { data, loading, error };
}

export function useRoverManifest(roverName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName) return;

    let isCancelled = false;
    let retryTimeout;

    async function fetchRoverInfo() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const info = await getRoversManifest(roverName);
        if (!isCancelled) {
          setData(info);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(fetchRoverInfo, 10000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchRoverInfo();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, [roverName]);

  return { data, loading, error };
}

export function usePhotosByEarthDate({ roverName, earth_date, camera }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName || !earth_date) return;

    let isCancelled = false;
    let retryTimeout;

    async function fetchPhotos() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const photos = await getPhotosByEarthDate({ roverName, earth_date, camera });
        if (!isCancelled) {
          setData(photos);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(fetchPhotos, 10000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchPhotos();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, [roverName, earth_date, camera]);

  return { data, loading, error };
}

export function usePhotosBySol({ roverName, sol, camera }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roverName || !sol) return;

    let isCancelled = false;
    let retryTimeout;

    async function fetchPhotos() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const photos = await getPhotosBySol({ roverName, sol, camera });
        if (!isCancelled) {
          setData(photos);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          retryTimeout = setTimeout(fetchPhotos, 10000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchPhotos();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeout);
    };
  }, [roverName, sol, camera]);

  return { data, loading, error };
}