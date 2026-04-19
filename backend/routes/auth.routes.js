// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // --- START ADMIN OVERRIDE ---
        // Checks .env for ADMIN_EMAIL and ADMIN_PASSWORD
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.json({
                token: generateToken('admin_001'), // Fake ID for admin session
                user: { 
                    id: 'admin_001', 
                    name: 'System Admin', 
                    email: process.env.ADMIN_EMAIL, 
                    role: 'admin', 
                    profile_pic: null 
                }
            });
        }
        // --- END ADMIN OVERRIDE ---

        // If not the Master Admin, check the Database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Your account is deactivated.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({
            token: generateToken(user.id),
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role, 
                profile_pic: user.profile_pic 
            }
        });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});