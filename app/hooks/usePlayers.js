import { useState, useEffect } from 'react';

export function usePlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/players')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch players');
        return res.json();
      })
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching players:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { players, loading, error };
}