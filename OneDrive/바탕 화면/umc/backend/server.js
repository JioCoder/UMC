const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.use(cors());

app.use(express.json());

let users = [];

app.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 모두 입력해야 합니다.' });
  }
  
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
  }
  
  users.push({ email, password });
  
  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(200).json({ message: '로그인 성공', token });
  } else {
    return res.status(401).json({ message: '잘못된 이메일 또는 비밀번호' });
  }
});

app.get('/user/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization 헤더에서 토큰 추출
  
  if (!token) {
    return res.status(401).json({ message: '토큰이 없습니다. 로그인 후 다시 시도하세요.' });
  }
  
  
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    
 
    res.json({ email: decoded.email });
  });
});



// 서버 실행 (3000 포트)
app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});
