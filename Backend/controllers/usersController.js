//  Add user (user/admin)
exports.createUser = async (req, res) => {
    const { name,email,password,phone, role = "user" } = req.body;
  
    try {
      const newuser = await Users.create({
        name ,
        email,
        password: await bcrypt.hash(password, 15),
        phone,
        role,
      });
  
      res.status(201).json(newuser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 //get all users  
 exports.getAllUsers = async (req, res) => {
    try {
      const users = await Users.findAll({
        where: { role: "user" },  // Fetch only users with role = "user"
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  //get user by id
  exports.getuserbyid = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await Users.findOne({ where: { id: id, role: "user" } });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //delete user 
  exports.deleteUserbyid = (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    });
};


// Sign in user
exports.signinuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Authenticate user with JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Debugging line
    
    
    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign in error" });
  }
};
