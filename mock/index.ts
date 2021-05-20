import * as Mock from 'mockjs';
export default {
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
            "state|+1": [0,1],
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
  };