import { ChangeEvent, useState } from 'react'

export interface UserKey {
  label: string
  priv: string
  pub: string
  inRing: boolean
}

interface UserListProps {
  users: UserKey[]
  selectedIndex: number
  onSelect: (index: number) => void
  onKeyChange: (index: number, newPriv: string) => void
  onRegenerate: () => void
}

export default function UserList({ 
  users, 
  selectedIndex, 
  onSelect, 
  onKeyChange, 
  onRegenerate 
}: UserListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [localPriv, setLocalPriv] = useState("")

  const previewPub = (hex: string) => {
    if (!hex) return ""
    return hex.slice(0, 6) + "..." + hex.slice(-6)
  }

  const handlePrivInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalPriv(e.target.value.trim())
  }

  const handlePrivInputBlur = (index: number, newPriv: string) => {
    if (newPriv && newPriv !== users[index].priv) {
      onKeyChange(index, newPriv)
    }
    setEditingIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      (e.target as HTMLInputElement).blur()
      e.preventDefault()
    }
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setLocalPriv(users[index].priv)
  }

  return (
    <div className="terminal-panel">
      <h2 className="text-xl text-neonBlue glow-text-blue mb-6 border-b border-gray-700 pb-2">Users</h2>
      <div className="space-y-4">
        {users.map((user, idx) => {
          const isSelected = idx === selectedIndex
          const isRingMember = user.inRing
          return (
            <div 
              key={idx}
              onClick={() => onSelect(idx)}
              className={`p-3 rounded-md cursor-pointer transition-colors duration-150
                ${isSelected ? 'bg-gray-800 shadow-neon border-l-2 border-neonGreen' : 'bg-transparent hover:bg-gray-900'}
              `}
            >
              <div className={`font-bold text-base mb-1 ${isRingMember ? 'text-neonBlue glow-text-blue' : 'text-neonYellow glow-text-yellow'}`}>
                {user.label}{isRingMember ? "" : " (non-ring)"}
              </div>
              {editingIndex === idx ? (
                <input 
                  type="text" 
                  value={localPriv}
                  onChange={handlePrivInputChange}
                  onBlur={() => handlePrivInputBlur(idx, localPriv)}
                  onKeyDown={handleKeyDown}
                  className="mt-1 w-full bg-black bg-opacity-50 text-neonGreen text-sm border border-neonGreen rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-neonGreen"
                  autoFocus
                />
              ) : (
                <div 
                  className="mt-1 text-neonGreen text-sm font-mono truncate border-b border-dashed border-gray-700 pb-1 cursor-text" 
                  onDoubleClick={() => startEditing(idx)}
                >
                  <span className="opacity-80 mr-1">sk:</span> {user.priv}
                </div>
              )}
              <div className="text-gray-400 text-sm mt-1">
                <span className="opacity-80 mr-1">pk:</span> {previewPub(user.pub)}
              </div>
            </div>
          )
        })}
      </div>
      <button 
        onClick={onRegenerate} 
        className="mt-6 px-4 py-2 text-sm bg-gray-800 text-neonRed border border-gray-700 rounded hover:bg-gray-700 transition-colors duration-150 w-full font-bold hover:glow-text-red"
      >
        Regenerate All Keys
      </button>
    </div>
  )
} 