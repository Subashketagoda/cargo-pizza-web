import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'pizzas',
    tag: '',
    popular: false,
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchMenuItems();
      }
    });
    return unsubscribe;
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(items);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const loadDefaultMenu = async () => {
    if (window.confirm("This will add default dummy items to the database. Proceed?")) {
      setLoading(true);
      const dummyItems = [
        { name: 'Veggie Delight', price: '1,900', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false },
        { name: 'Margherita', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: true },
        { name: 'Fungi Fiesta', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false },
        { name: 'Sausage Delight', price: '1,800', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
        { name: 'Devilled Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true },
        { name: 'Tandoori Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
        { name: 'BBQ Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true },
        { name: 'Loaded Lamb', price: '2,600', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
        { name: 'Spicy Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
        { name: 'Fungi Chicken', price: '2,200', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
        { name: 'Lamb Slam', price: '2,600', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true },
        { name: 'Holy Prawn', price: '2,800', category: 'pizzas', tag: 'CARGO SPECIALS', popular: false },
        { name: 'Full Loaded Meat', price: '2,900', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true },
        { name: 'Tuna', price: '2,700', category: 'pizzas', tag: 'CARGO SPECIALS', popular: false },
        { name: 'Strawberry Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: true },
        { name: 'Black Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
        { name: 'Passion Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
        { name: 'Lime Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
        { name: 'Iced Milo', price: '350', category: 'drinks', tag: 'REFRESHERS', popular: false },
        { name: 'Peached Ice Tea', price: '300', category: 'drinks', tag: 'REFRESHERS', popular: false },
        { name: 'Chocolate Lava Cake', price: '600', category: 'desserts', tag: 'DESSERTS', popular: true },
        { name: 'Classic Hot Dog', price: '850', category: 'hotdogs', tag: 'HOT DOGS', popular: true }
      ];
      try {
        for (const item of dummyItems) {
          await addDoc(collection(db, "menuItems"), item);
        }
        fetchMenuItems();
        alert("Default items added!");
      } catch (err) {
        console.error("Error loading defaults:", err);
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let uploadedImageUrl = formData.imageUrl;
      
      if (imageFile) {
        const imageRef = ref(storage, `menu-images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(snapshot.ref);
      }

      const finalData = { ...formData, imageUrl: uploadedImageUrl };

      if (isEditing) {
        const itemRef = doc(db, "menuItems", editId);
        await updateDoc(itemRef, finalData);
      } else {
        await addDoc(collection(db, "menuItems"), finalData);
      }
      
      setFormData({ name: '', price: '', category: 'pizzas', tag: '', popular: false, imageUrl: '' });
      setImageFile(null);
      setIsEditing(false);
      setEditId(null);
      
      const fileInput = document.getElementById('image-upload-input');
      if (fileInput) fileInput.value = '';

      fetchMenuItems();
    } catch (err) {
      console.error("Error saving item:", err);
      setError("Error saving item. Ensure Firebase Storage is enabled in the Firebase Console!");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      tag: item.tag || '',
      popular: item.popular || false,
      imageUrl: item.imageUrl || ''
    });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "menuItems", id));
        fetchMenuItems();
      } catch (err) {
        console.error("Error deleting item:", err);
      }
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          {error && <p className="admin-error">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          <p className="admin-note">Make sure you enabled Email/Password auth in Firebase Console and created a user.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Menu Admin Dashboard</h2>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="logout-btn" onClick={loadDefaultMenu}>Load Default Data</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <div className="admin-content">
        <div className="admin-form-panel">
          <h3>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          {error && <p className="admin-error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-form">
            <input type="text" name="name" placeholder="Item Name (e.g. Margherita)" value={formData.name} onChange={handleInputChange} required />
            <input type="text" name="price" placeholder="Price (e.g. 2,000)" value={formData.price} onChange={handleInputChange} required />
            
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="pizzas">Pizzas</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
              <option value="hotdogs">Hot Dogs</option>
            </select>
            
            <input type="text" name="tag" placeholder="Tag Pill Text (e.g. CARGO SPECIALS)" value={formData.tag} onChange={handleInputChange} />
            
            <div className="form-group" style={{marginTop: '15px', marginBottom: '15px', textAlign: 'left'}}>
              <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 'bold'}}>Item Photo (Optional)</label>
              <input id="image-upload-input" type="file" accept="image/*" onChange={handleFileChange} />
              {formData.imageUrl && !imageFile && <p style={{fontSize: '0.8rem', color: 'green', marginTop: '5px'}}>Current image exists. Upload new to replace.</p>}
            </div>

            <label className="checkbox-label">
              <input type="checkbox" name="popular" checked={formData.popular} onChange={handleInputChange} />
              Is Popular? (Shows a badge, if supported)
            </label>
            
            <div className="form-actions">
              <button type="submit" disabled={loading}>{isEditing ? 'Update Item' : 'Add Item'}</button>
              {isEditing && <button type="button" onClick={() => { 
                setIsEditing(false); 
                setFormData({name:'', price:'', category:'pizzas', tag:'', popular:false, imageUrl:''}); 
                setImageFile(null);
                const fileInput = document.getElementById('image-upload-input');
                if (fileInput) fileInput.value = '';
              }}>Cancel</button>}
            </div>
          </form>
        </div>
        
        <div className="admin-list-panel">
          <h3>Current Menu Items</h3>
          {loading && <p>Loading...</p>}
          <div className="admin-items-list">
            {menuItems.map(item => (
              <div key={item.id} className="admin-item-card" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}} />
                ) : (
                  <div style={{width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#888'}}>No Img</div>
                )}
                
                <div style={{flex: 1, textAlign: 'left'}}>
                  <strong>{item.name}</strong> - Rs. {item.price}
                  <span className="admin-item-badge">{item.category}</span>
                </div>
                <div className="admin-item-actions">
                  <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
