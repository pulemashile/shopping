import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from './ItemsSlice';
import AddItemForm from './AddItemform';
import EditItemForm from './edit';

function ItemList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.list);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleSave = () => {
    setEditingItem(null);
    setIsEditMode(false);
    setShowEditForm(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsEditMode(false);
    setShowEditForm(false);
    setShowAddForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 md:mb-0">My Shopping List</h2>

        {/* Add New Item Button */}
        {!showEditForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Item
          </button>
        )}
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-indigo-100 transition-all duration-300">
          <AddItemForm 
            onCancel={handleCancel} 
            onSave={handleCancel} 
            isEditMode={false}
          />
        </div>
      )}

      {/* Edit Item Form */}
      {showEditForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-indigo-100 transition-all duration-300">
          <AddItemForm 
            onCancel={handleCancel} 
            onSave={handleSave} 
            isEditMode={true}
            itemToEdit={editingItem}
          />
        </div>
      )}

      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search items..."
          className="pl-12 pr-4 py-4 w-full bg-white rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm border border-indigo-100">
          <svg className="h-16 w-16 text-indigo-200 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 text-lg">Your shopping list is empty</p>
          <p className="text-gray-400 mt-2">Add some items or try a different search</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {item.quantity} {parseInt(item.quantity) === 1 ? 'item' : 'items'}
                  </span>
                </div>
                
                {item.notes && (
                  <p className="text-gray-600 mb-3 italic">{item.notes}</p>
                )}
                
                {item.category && (
                  <div className="flex items-center text-gray-500 mb-3">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {item.category}
                  </div>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-200 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => dispatch(removeItem(item.id))} 
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;