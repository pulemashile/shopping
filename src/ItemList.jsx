import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from './ItemsSlice';
import ItemForm from './ItemForm';

function ItemList() {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {showForm && (
        <ItemForm
          item={editingItem}
          onCancel={handleCancel}
        />
      )}

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search items..."
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p>No items to display.</p>
      ) : (
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="p-4 bg-white shadow-md rounded-md flex flex-col gap-2">
              <strong className="text-lg">{item.name}</strong> (Quantity: {item.quantity})
              {item.notes && <p className="text-gray-600">Notes: {item.notes}</p>}
              {item.category && <p className="text-gray-600">Category: {item.category}</p>}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit</button>
                <button onClick={() => dispatch(removeItem(item.id))} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
