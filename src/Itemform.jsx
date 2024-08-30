import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from './ItemsSlice';

function ItemForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  

  const handleAddTag = (e) => {
    if (e.key === 'Enter') {
      const tag = e.target.value.trim();
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        e.target.value = '';
      }
    }
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();

    if (!name || !quantity) {
      alert('Name and quantity are required!');
      return;
    }

    const item = { name, quantity, notes, category, tags };   
    dispatch(addItem({ ...item, id: Date.now() }));
    

    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setTags([]);
   
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{'Add New Item'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium text-gray-700">Item Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="font-medium text-gray-700">Notes (optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-medium text-gray-700">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags" className="font-medium text-gray-700">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            onKeyDown={handleAddTag}
            placeholder="Add tags"
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{'Add Item'}</button>
          {/* {currentItem && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>} */}
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
