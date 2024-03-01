let ranking_list = {
    status: 200,
    message: 'success',
    data: {
      total: 10,
      'rows': [{
        img: "./static/similar.jpg",
        title: "这才是大学生该有的快乐生活！",
      },{
        img: "./static/similar.jpg",
        title: "ChatGPT会抢走哪些工作？我算是玩明白了…",
      },{
        img: "./static/similar.jpg",
        title: "92岁的世界最高龄模特，纵横T台76年 …",
      },{
        img: "./static/similar.jpg",
        title: "泳装芭芭拉“冲”呀！",
      },{
        img: "./static/similar.jpg",
        title: "EOE单曲《和你在一起》首次披露舞台！",
      },{
        img: "./static/similar.jpg",
        title: "如何30秒快速清空大脑停止胡思乱想？",
      },{
        img: "./static/similar.jpg",
        title: "《将军》他翻唱一直可以的",
      },{
        img: "./static/similar.jpg",
        title: "一个初中生花光压岁钱cos的W",
      },{
        img: "./static/similar.jpg",
        title: "1天学费1200！不听劝裸辞去学馒头了！",
      },{
        img: "./static/similar.jpg",
        title: "【原神】当小绫华开始阴阳怪气",
      }]
    }
  };
  
  export default {
    'get|/video/ranking': ranking_list
  }
  