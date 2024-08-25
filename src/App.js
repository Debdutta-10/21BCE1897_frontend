import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];

    const handleSubmit = async () => {
        setError('');
        try {
            const parsedData = JSON.parse(jsonInput);
            if (!parsedData.data || !Array.isArray(parsedData.data)) {
                throw new Error('Invalid input format');
            }

            const result = await axios.post('https://two1bce1897-backend.onrender.com/bfhl', parsedData);
            setResponse(result.data);
        } catch (err) {
            setError('Invalid JSON input or API error');
            setResponse(null);
        }
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    const renderResponse = () => {
        if (!response) return null;

        const { alphabets, numbers, highest_lowercase_alphabet } = response;
        const selectedData = {
            alphabets,
            numbers,
            highest_lowercase_alphabet,
        };

        return (
            <div>
                {selectedOptions.map(option => (
                    <div key={option.value}>
                        <h3>{option.label}</h3>
                        <pre>{JSON.stringify(selectedData[option.value], null, 2)}</pre>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>21BCE1897</h1>
            <textarea
                rows="4"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />
            {response && (
                <div>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                        placeholder="Select options to view"
                    />
                    <div>
                        {renderResponse()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
