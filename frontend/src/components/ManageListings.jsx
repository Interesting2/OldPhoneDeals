import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageListings.css'

function ManageListings() {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ title: '', brand: '', image: '', stock: 0, price: 0 });

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:3500/api/user/listings', config);
      setListings(response.data);
    };
    fetchListings();
  }, []);

  async function createListing(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:3500/api/user/listings', newListing, config);
    setListings([...listings, response.data]);
    setNewListing({ title: '', brand: '', image: '', stock: '', price: '' });
  }

  async function deleteListing(listingId) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`http://localhost:3500/api/user/listings/${listingId}`, config);
    setListings(listings.filter((listing) => listing._id !== listingId));
  }

  async function updateListing(listing) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updatedListing = await axios.put(`http://localhost:3500/api/user/listings/${listing._id}`, { disabled: !listing.disabled }, config);
    setListings(listings.map((l) => (l._id === listing._id ? updatedListing.data : l)));
  }

  return (
      // <div>
      //   <form onSubmit={createListing}>
      //     <input name="title" value={newListing.title} onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} placeholder="Title" />
      //     <input name="brand" value={newListing.brand} onChange={(e) => setNewListing({ ...newListing, brand: e.target.value })} placeholder="Brand" />
      //     <input name="image" value={newListing.image} onChange={(e) => setNewListing({ ...newListing, image: e.target.value })} placeholder="Image URL" />
      //     <input name="stock" value={newListing.stock} onChange={(e) => setNewListing({ ...newListing, stock: e.target.value })} placeholder="Stock" />
      //     <input name="price" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} placeholder="Price" />
      //     <button type="submit">Create New Listing</button>
      //   </form>
      //
      //   {listings.map((listing) => (
      //       <div key={listing._id}>
      //         <h3>{listing.title}</h3>
      //         <p>{listing.brand}</p>
      //         <img src={listing.image} alt={listing.title} />
      //         <p>Stock: {listing.stock}</p>
      //         <p>Price: {listing.price}</p>
      //         <button onClick={() => deleteListing(listing._id)}>Delete Listing</button>
      //         <button onClick={() => updateListing(listing)}>{listing.disabled ? 'Enable' : 'Disable'}</button>
      //       </div>
      //   ))}
      // </div>
      <div>
        <form onSubmit={createListing} className="listing-form">
          <input name="title" value={newListing.title} onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} placeholder="Title" />
          <input name="brand" value={newListing.brand} onChange={(e) => setNewListing({ ...newListing, brand: e.target.value })} placeholder="Brand" />
          <input name="image" value={newListing.image} onChange={(e) => setNewListing({ ...newListing, image: e.target.value })} placeholder="Image URL" />
          <input name="stock" value={newListing.stock} onChange={(e) => setNewListing({ ...newListing, stock: e.target.value })} placeholder="Stock" />
          <input name="price" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} placeholder="Price" />
          <button type="submit">Create New Listing</button>
        </form>

        {listings.map((listing) => (
            <div key={listing._id} className="listing">
              <h3>{listing.title}</h3>
              <p>{listing.brand}</p>
              <img src={listing.image} alt={listing.title} />
              <p>Stock: {listing.stock}</p>
              <p>Price: {listing.price}</p>
              <button onClick={() => deleteListing(listing._id)}>Delete Listing</button>
              <button onClick={() => updateListing(listing)}>{listing.disabled ? 'Enable' : 'Disable'}</button>
            </div>
        ))}
      </div>
  );
}

export default ManageListings;
