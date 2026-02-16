'use client';
import { useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerFilters } from '../hooks/usePlayerFilters';
import PlayerFilters from '../components/players/PlayerFilters';
import PlayersTable from '../components/players/PlayersTable';

export default function PlayersPage() {
  const { players, loading, error } = usePlayers();
  const [showFilters, setShowFilters] = useState(false);
  
  const {
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
    filteredPlayers
  } = usePlayerFilters(players);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading players...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Northern Ireland Players</h1>
          <p className="text-green-100">Complete player database from 1950 onwards</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <p className="text-gray-700 text-lg">
            Showing <span className="font-bold text-green-700">{filteredPlayers.length}</span> of <span className="font-bold text-green-700">{players.length}</span> players
          </p>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium rounded-md transition-colors flex items-center gap-2"
          >
            {showFilters ? '✕ Hide Filters' : '⚙ Show Filters'}
          </button>
        </div>

        {showFilters && (
          <PlayerFilters
            searchName={searchName}
            setSearchName={setSearchName}
            filterPosition={filterPosition}
            setFilterPosition={setFilterPosition}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterMinCaps={filterMinCaps}
            setFilterMinCaps={setFilterMinCaps}
            filterMaxCaps={filterMaxCaps}
            setFilterMaxCaps={setFilterMaxCaps}
            uniquePositions={uniquePositions}
            onClearFilters={clearFilters}
          />
        )}

        <PlayersTable 
          players={filteredPlayers}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}