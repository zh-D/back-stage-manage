import * as Mock from 'mockjs';
export default {
  // house interface start
    '/api/gethouseinfo': (req, res) => {
      const list = Mock.mock({
        "data|5-10": [
          {
            "name|+1": [
              "Hello",
              "Mock.js",
              "!"
            ],
            "roomid|+1":100,
            "state|+1": ["业主", "租客"],
            "phone": /[0-9]+11/
          }
        ]
      })
      res.send(list.data);
    },
    '/api/deletehouseinfo/:id': (req,res) => {
      const { id } = req.params;
      console.log(req.params);
      console.log(id);
      console.log(req.method);
      res.send(id)
      
    },

    '/api/edithouseinfo': async (req,res) => {
      const data =  req.body;
      console.log(data);
      console.log(req.method);
      res.send(String(data.roomid))
      
    },
    '/api/addhouseinfo': async (req,res) => {
      const data =  req.body;
      console.log(data);
      console.log(req.method);
      res.send(null)
      
    },
  // house interface end    

  // repiare interface start
  '/api/getrepaireinfo': (req, res) => {
    const list = Mock.mock({
      "data|5-10": [
        {
          "wxid|+1": 10,
          "wxryname|+1": [
            "修理工小黄",
            "修理工小聪",
          ],
          "roomid|+1":100,
          "wxsj|+1": [new Date().getDate(), new Date().getDate() + 1, new Date().getDate() + 2],
          "wxwp|+1": ["电视", "电脑", "旧冰箱", "旧手机", "洗衣机"],
          "wxje|+1": [100, 130, 120, 156, 178] 
        }
      ]
    })
    res.send(list.data);
  },
  '/api/deleterepaireinfo/:id': (req,res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(id);
    console.log(req.method);
    res.send(id)
    
  },

  '/api/editrepaireinfo': async (req,res) => {
    const data =  req.body;
    console.log(data);
    console.log(req.method);
    res.send(String(data.roomid))
    
  },
  '/api/addrepaireinfo': async (req,res) => {
    const data =  req.body;
    console.log(data);
    console.log(req.method);
    res.send(null)
    
  },
// repaire interface end  

  // greening interface start
  '/api/getgreeninginfo': (req, res) => {
    const list = Mock.mock({
      "data|5-10": [
        {
          "lhryid|+1": 10,
          "lhryname|+1": [
            "绿化员小黄",
            "绿化员小聪",
          ],
          "ldh|+1": 500,
          "lhsj|+1": [new Date().getDate(), new Date().getDate() + 1, new Date().getDate() + 2],
        }
      ]
    })
    res.send(list.data);
  },
  '/api/deletegreeninginfo/:id': (req,res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(id);
    console.log(req.method);
    res.send(id)
    
  },

  '/api/editgreeninginfo': async (req,res) => {
    const data =  req.body;
    console.log(data);
    console.log(req.method);
    res.send(String(data.roomid))
    
  },
  '/api/addgreeninginfo': async (req,res) => {
    const data =  req.body;
    console.log(data);
    console.log(req.method);
    res.send(null)
    
  },
// greening interface end    
  };