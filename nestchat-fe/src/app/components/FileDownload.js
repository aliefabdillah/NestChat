import { downloadFile } from '../services/api';

export default function FileDownload({ chatId, file }) {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      const fileData = await downloadFile(token, chatId, file.id);

      const url = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  return (
    <div className="mb-2">
      <button onClick={handleDownload} className="bg-green-500 hover:bg-green-800 text-white w-full px-4 py-2 rounded whitespace-nowrap overflow-hidden text-ellipsis">
        Download {file.filename}
      </button>
    </div>
  );
}