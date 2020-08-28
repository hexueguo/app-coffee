// import Mock from 'mockjs';

const demo = {
  'GET /api/getMock': (req, res) => {
    res.status(200).json({
      errCode: 0,
      data: [],
    });
  },

  'GET /api/test': (req, res) => {
    res.status(200).json({
      errCode: 0,
      data: {
        flag: 'success',
      },
    });
  },

  'GET /api/loading': (req, res) => {
    setTimeout(() => {
      res.status(200).json({
        errCode: 0,
        errMsg: '请求成功',
        data: {
          name: '张三',
          age: 13,
        },
      });
    }, 2000);
  },
};

module.exports = demo;
