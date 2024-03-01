import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/users?search=${query}`);
            onSearch(response.data); // Pass the search results to the parent component
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search users..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
