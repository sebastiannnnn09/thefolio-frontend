// 1. Load environment variables and dependencies
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const path = require('path');


// 2. Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

// 3. CREATE the app (Crucial: Must happen before app.use or app.get)
const app = express();

// 4. Initialize Database Connection


// 5. Middleware 
// Allow React (port 3000) to call this server
app.use(cors({
origin: [
'http://localhost:3000', // local dev
'https://thefolio-frontend.vercel.app', // production (update after Step 8)
],
credentials: true
}));
// Parse incoming JSON request bodies
app.use(express.json());
// Serve uploaded image files as public URLs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. Routes
app.get('/', (req, res) => {
  res.send('GamerZone API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});