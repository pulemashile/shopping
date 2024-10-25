import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItem } from './ItemsSlice';
import ItemForm from './ItemForm';



function ItemList() {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.list); // assuming you have a state with items.list



  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setShowForm(true);
  };


  const handleSave = (item) => {
    const updatedItem = { ...item };
    dispatch(updateItem({ id: item.id, updatedItem }));
    setEditingItem(null);
    setIsEditMode(false);
    setShowForm(false);
  };


  const handleCancel = () => {
    setEditingItem(null);
    setIsEditMode(false);
    setShowForm(false);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="p-6 bg-[#E5D9F2] shadow-xl " >
      <div className="flex justify-between mb-4">
        
        <button onClick={isEditMode ? handleSave : () => setShowForm(true)} className="px-4 py-2 bg-[#D6589F] text-white rounded-md hover:bg-[#D20062]">
          {isEditMode ? 'Save' : 'Add Item'}
        </button>
      </div>
      {showForm && (
        <div className="mb-4">
          {isEditMode ? (
            <ItemForm
              item={editingItem}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          ) : (
            <ItemForm />
          )}
        </div>
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
          {filteredItems.map((item, index) => (
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