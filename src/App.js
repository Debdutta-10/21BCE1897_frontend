import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

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

    const handleOptionChange = (event) => {
        const { options } = event.target;
        const selectedValues = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedOptions(selectedValues);
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        const selectedData = {
            Alphabets: alphabets,
            Numbers: numbers,
            'Highest lowercase alphabet': highest_lowercase_alphabet
        };

        return (
            <div>
                {selectedOptions.map(option => (
                    <div key={option}>
                        <h3>{option}</h3>
                        <pre>{JSON.stringify(selectedData[option], null, 2)}</pre>
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
                    <select multiple onChange={handleOptionChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <div>
                        {renderResponse()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
