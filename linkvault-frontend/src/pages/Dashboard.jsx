import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import LinkCard from '../components/LinkCard'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [tags, setTags] = useState([])
  const [collections, setCollections] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [quickUrl, setQuickUrl] = useState('')
  const [newLink, setNewLink] = useState({
    url: '', title: '', note: '', tag_ids: [], collection_id: null
  })
  const navigate = useNavigate()

  const fetchAll = async () => {
    try {
      const params = {}
      if (selectedTag) params.tag = selectedTag
      if (selectedCollection) params.collection = selectedCollection

      const [linksRes, tagsRes, collectionsRes] = await Promise.all([
        api.get('/links/', { params }),
        api.get('/tags/'),
        api.get('/collections/'),
      ])
      setLinks(linksRes.data)
      setTags(tagsRes.data)
      setCollections(collectionsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [selectedTag, selectedCollection])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const handleAddLink = async (e) => {
    e.preventDefault()
    try {
      await api.post('/links/', newLink)
      setNewLink({ url: '', title: '', note: '', tag_ids: [], collection_id: null })
      setShowModal(false)
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const handleQuickCapture = async (e) => {
    e.preventDefault()
    if (!quickUrl.trim()) return
    try {
      await api.post('/links/', { url: quickUrl })
      setQuickUrl('')
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/links/${id}/`)
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleRead = async (link) => {
    try {
      await api.patch(`/links/${link.id}/`, { is_read: !link.is_read })
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredLinks = links.filter(link =>
    link.title?.toLowerCase().includes(search.toLowerCase()) ||
    link.url?.toLowerCase().includes(search.toLowerCase()) ||
    link.note?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6 overflow-hidden">

        {/* Sidebar */}
        <div className="w-48 shrink-0 space-y-6">

          {/* Collections */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Collections</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className={`text-sm w-full text-left px-2 py-1 rounded-lg ${!selectedCollection ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  All
                </button>
              </li>
              {collections.map(col => (
                <li key={col.id}>
                  <button
                    onClick={() => setSelectedCollection(col.id)}
                    className={`text-sm w-full text-left px-2 py-1 rounded-lg ${selectedCollection === col.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    📁 {col.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-xs px-2 py-1 rounded-full border ${!selectedTag ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-gray-500 border-gray-300 hover:bg-gray-100'}`}
              >
                All
              </button>
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`text-xs px-2 py-1 rounded-full border ${selectedTag === tag.id ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-gray-500 border-gray-300 hover:bg-gray-100'}`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">

          {/* Quick Capture */}
          <form onSubmit={handleQuickCapture} className="flex gap-2 mb-4">
            <input
              type="url"
              placeholder="Quick capture — paste a URL and press Enter"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
            >
              Save
            </button>
          </form>

          {/* Search + Add */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search links..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Link
            </button>
          </div>

          {/* Links */}
          {filteredLinks.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">No links found.</p>
          ) : (
            <div className="space-y-4">
              {filteredLinks.map(link => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onDelete={handleDelete}
                  onToggleRead={handleToggleRead}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Link Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Link</h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">URL *</label>
                <input
                  type="url"
                  required
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional title"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Note</label>
                <textarea
                  value={newLink.note}
                  onChange={(e) => setNewLink({ ...newLink, note: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional note"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Collection</label>
                <select
                  value={newLink.collection_id || ''}
                  onChange={(e) => setNewLink({ ...newLink, collection_id: e.target.value || null })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None</option>
                  {collections.map(col => (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tags</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map(tag => (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => {
                        const already = newLink.tag_ids.includes(tag.id)
                        setNewLink({
                          ...newLink,
                          tag_ids: already
                            ? newLink.tag_ids.filter(id => id !== tag.id)
                            : [...newLink.tag_ids, tag.id]
                        })
                      }}
                      className={`text-xs px-3 py-1 rounded-full border transition ${
                        newLink.tag_ids.includes(tag.id)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'text-gray-500 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-xs text-gray-400">No tags yet. Create tags from the admin panel.</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}