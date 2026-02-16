export default function PlayersTable({ players, sortField, sortOrder, onSort }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-green-700 text-white">
              <th 
                onClick={() => onSort('last_name')}
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Player
                  {sortField === 'last_name' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('position')}
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Position
                  {sortField === 'position' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('date_of_birth')}
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Date of Birth
                  {sortField === 'date_of_birth' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('place_of_birth')}
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Place of Birth
                  {sortField === 'place_of_birth' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('debut_date')}
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Debut
                  {sortField === 'debut_date' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('caps')}
                className="px-6 py-4 text-center text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  Caps
                  {sortField === 'caps' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => onSort('status')}
                className="px-6 py-4 text-center text-sm font-semibold cursor-pointer hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  Status
                  {sortField === 'status' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {players.map((player, index) => (
              <tr 
                key={player.id} 
                className={`hover:bg-green-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {player.first_name} {player.last_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {player.position}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {player.date_of_birth ? new Date(player.date_of_birth).toLocaleDateString('en-GB') : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {player.place_of_birth || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {player.debut_date ? new Date(player.debut_date).toLocaleDateString('en-GB') : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-center font-semibold text-gray-900">
                  {player.caps}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    player.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {player.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}