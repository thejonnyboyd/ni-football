import { useState, useEffect, useMemo } from 'react';

const POSITION_ORDER = ['GK', 'RB', 'CB', 'LB', 'FB', 'DF', 'RM', 'DM', 'CM', 'LM', 'AM', 'MF', 'RW', 'LW', 'ST', 'FW'];

export function usePlayerFilters(players) {
  const [searchName, setSearchName] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMinCaps, setFilterMinCaps] = useState('');
  const [filterMaxCaps, setFilterMaxCaps] = useState('');
  const [sortField, setSortField] = useState('debut_date');
  const [sortOrder, setSortOrder] = useState('asc');

  const uniquePositions = useMemo(() => {
    return [...new Set(players.map(p => p.position))].sort();
  }, [players]);

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...players];

    if (searchName) {
      result = result.filter(player => 
        `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterPosition) {
      result = result.filter(player => player.position === filterPosition);
    }

    if (filterStatus) {
      result = result.filter(player => player.status === filterStatus);
    }

    if (filterMinCaps) {
      result = result.filter(player => player.caps >= parseInt(filterMinCaps));
    }

    if (filterMaxCaps) {
      result = result.filter(player => player.caps <= parseInt(filterMaxCaps));
    }

    result.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (!aValue) return 1;
      if (!bValue) return -1;

      if (sortField === 'position') {
        const aIndex = POSITION_ORDER.indexOf(aValue);
        const bIndex = POSITION_ORDER.indexOf(bValue);
        const aPos = aIndex === -1 ? 999 : aIndex;
        const bPos = bIndex === -1 ? 999 : bIndex;
        
        return sortOrder === 'asc' ? aPos - bPos : bPos - aPos;
      }
      
      if (sortField === 'caps') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      } else if (sortField.includes('date')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [players, searchName, filterPosition, filterStatus, filterMinCaps, filterMaxCaps, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchName('');
    setFilterPosition('');
    setFilterStatus('');
    setFilterMinCaps('');
    setFilterMaxCaps('');
  };

  return {
    searchName,
    setSearchName,
    filterPosition,
    setFilterPosition,
    filterStatus,
    setFilterStatus,
    filterMinCaps,
    setFilterMinCaps,
    filterMaxCaps,
    setFilterMaxCaps,
    sortField,
    sortOrder,
    handleSort,
    clearFilters,
    uniquePositions,
    filteredPlayers: filteredAndSortedPlayers
  };
}