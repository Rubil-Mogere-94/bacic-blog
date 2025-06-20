# Blog Post Manager - Brief walk through

## Features ✨

- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Stunning UI**: Premium animations, gradients, and micro-interactions
- **Responsive Design**: Works flawlessly on all devices
- **Real API**: Powered by json-server with persistent data
- **Advanced Features**: Image support, instant search, animations
- **Developer Friendly**: Clean code structure with modern JavaScript

## Installation 🛠️

### Prerequisites
- Node.js (v14+ recommended for smooth experience) 
- npm (comes with Node.js)

### Steps

1. **Clone the repository** (or create files manually):
```bash
git clone https://github.com/yourusername/blog-post-manager.git
cd blog-post-manager
```

2. **Install dependencies**:
```bash
npm install -g json-server@0.17.4 live-server
```

3. **Start the development servers**:

(a) **Terminal** (backend):
```bash
json-server --watch db.json 
```
- json server is critical in running the app and shouldnt  be iterupted under any circumstances

(b) **click on html file**
- send it : run the html file using live server

## Running the App 🚀

1. The application will automatically open in your default browser at `http://127.0.0.1:8080`
2. The API will be available at `http://localhost:3000/posts`

## Project Structure 📁

```
blog-post-manager/
├── css/
│   └── styles.css       # Premium CSS styles
├── src/
│   └── index.js         # Main application logic
├── db.json              # Database file
├── index.html           # Main HTML structure
└── README.md            # This file
```

## Available Scripts 📜

- `json-server --watch db.json` - Starts the mock API server
- `live-server` - Starts the development server

## Advanced Configuration ⚙️

### Custom Ports
If you need to use different ports:

For the API (default 3000):
```bash
json-server --watch db.json --port 3001
```

For live-server (default 8080):
```bash
live-server --port=8000
```

### Custom API Endpoints
Modify the base URL in `src/index.js` if needed:
```javascript
const API_URL = 'http://localhost:3000'; // Change this if using different port
```

## Troubleshooting 🐛

**Issue**: Port already in use  
**Solution**: Either kill the process using the port or use a different port

**Issue**: CORS errors  
**Solution**: Ensure both servers are running and ports match

**Issue**: Styles not loading  
**Solution**: Check browser console for 404 errors on CSS file

## Contributing 🤝

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## Author
  
Mogere Rubil

## License 📄

MIT

---
