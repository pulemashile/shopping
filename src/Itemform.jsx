import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from './ItemsSlice';

function ItemForm({ currentItem, onCancel }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name || '');
      setQuantity(currentItem.quantity || '');
      setNotes(currentItem.notes || '');
      setCategory(currentItem.category || '');
      setTags(currentItem.tags || []);
    } else {
      // Clear the form if no currentItem
      setName('');
      setQuantity('');
      setNotes('');
      setCategory('');
      setTags([]);
    }
  }, [currentItem]);

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity) {
      alert('Name and quantity are required!');
      return;
    }

    const item = {
      name,
      quantity,
      notes,
      category,
      tags,
    };

    if (currentItem) {
      dispatch(updateItem({ id: currentItem.id, updatedItem: item }));
    } else {
      dispatch(addItem({ ...item, id: Date.now() }));
    }

    // Reset form and hide
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setTags([]);
    onCancel();
  };

  return (
    <div className="item-form">
      <h2>{currentItem ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes (optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            onChange={(e) => handleAddTag(e.target.value)}
            placeholder="Add tags"
          />
          <div className="tags-preview">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
        {currentItem && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
}

export default ItemForm;
