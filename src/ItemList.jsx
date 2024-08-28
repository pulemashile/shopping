import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from './itemsSlice';
import ItemForm from './Itemform.jsx';

function ItemList() {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false); // Manage form visibility
  const [editingItem, setEditingItem] = useState(null); // Manage item being edited

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

 

  return (
    <div className="item-list">
     
      
      {/* Show the form based on state */}
      {showForm && <ItemForm currentItem={editingItem} onCancel={handleCancel} />}
      
     
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> (Quantity: {item.quantity})
            {item.notes && <p>Notes: {item.notes}</p>}
            {item.category && <p>Category: {item.category}</p>}
            {item.tags.length > 0 && (
              <div className="tags-preview">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => dispatch(removeItem(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
