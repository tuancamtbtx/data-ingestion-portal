export default {
  'GET /v1/users/me': (req: any, res: any) => {
    const token = req.headers['authorization'];
    if (token === 'Bearer ROOT-TOKEN') {
      res.json({
        id: 1,
        display_name: 'Root',
        avatar: null,
        email: 'tuan.nguyen3@trustingsocial.com',
        role: 1,
        phone: '0339999999',
        permissions: [],
      });
    } else if (token === 'Bearer GUEST-TOKEN') {
      res.json({
        id: 2,
        display_name: 'Guest',
        avatar: null,
        email: 'guest@gmail.com',
        role: 6,
        phone: '0339999888',
        permissions: [],
      });
    } else {
      res.status(400).send({
        message: 'This is an error!',
      });
    }
  },
};
