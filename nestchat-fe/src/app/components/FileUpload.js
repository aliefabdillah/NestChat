import { useState } from 'react';
import { uploadFile } from '../services/api';

export default function FileUpload({ chatId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await uploadFile(token, chatId, file);
      setMessage('File uploaded successfully');
      setFile(null);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload File
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}