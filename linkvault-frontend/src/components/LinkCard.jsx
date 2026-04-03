export default function LinkCard({ link, onDelete, onToggleRead }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border ${link.is_read ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <a href={link.url} target="_blank" rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline text-lg truncate block">
            {link.title || link.url}
          </a>
          {link.title && <p className="text-gray-400 text-sm truncate">{link.url}</p>}
          {link.note && <p className="text-gray-600 text-sm mt-2">{link.note}</p>}
          {link.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {link.tags.map(tag => (
                <span key={tag.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button onClick={() => onToggleRead(link)}
            className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50">
            {link.is_read ? 'Read' : 'Mark Read'}
          </button>
          <button onClick={() => onDelete(link.id)}
            className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-500 hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}