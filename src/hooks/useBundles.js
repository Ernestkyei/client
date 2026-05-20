import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useBundles = (network) => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBundles = async () => {
      setLoading(true);
      try {
        const data = await api.getBundles();
        if (data.success) {
          let filteredBundles = data.data;
          if (network) {
            filteredBundles = data.data.filter(b => b.network === network);
          }
          setBundles(filteredBundles);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBundles();
  }, [network]);

  return { bundles, loading, error };
};
