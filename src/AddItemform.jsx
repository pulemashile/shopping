import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from './ItemsSlice'; // Import both addItem and updateItem

function AddItemForm({ onCancel, onSave, isEditMode, itemToEdit }) { // Added isEditMode and itemToEdit
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const dispatch = useDispatch();

  // Prepopulate the form when in edit mode
  useEffect(() => {
    if (isEditMode && itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
      setNotes(itemToEdit.notes || '');
      setCategory(itemToEdit.category || '');
      setTags(itemToEdit.tags || []);
    }
  }, [isEditMode, itemToEdit]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTags(tagInput);
    }
  };

  const addTags = (input) => {
    const newTags = input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !tags.includes(tag));

    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity) {
      alert('Name and quantity are required!');
      return;
    }

    const newItem = { name, quantity, notes, category, tags, id: isEditMode ? itemToEdit.id : Date.now() }; // Use existing ID in edit mode

    if (isEditMode) {
      dispatch(updateItem(newItem)); // Dispatch updateItem when in edit mode
    } else {
      dispatch(addItem(newItem)); // Dispatch addItem when creating a new item
    }

    if (onSave) onSave(); // Notify the parent component

    // Reset the form fields after submission
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setTags([]);
    setTagInput('');
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputBlur = () => {
    if (tagInput.trim()) {
      addTags(tagInput);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="font-medium text-gray-700">Notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags" className="font-medium text-gray-700">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleAddTag}
            onBlur={handleTagInputBlur}
            placeholder="Add tags, press Enter or comma to add"
            className="mt-1 p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button 
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-800 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#3B1E54] text-white rounded-md hover:bg-purple-800"
          >
            {isEditMode ? 'Save Changes' : 'Submit'}
          </button>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddItemForm; // Export as AddItemForm
