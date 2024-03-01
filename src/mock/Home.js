
let user = {
  status: 200,
  message: 'success',
  data: {
    nickName: "Barry",
  }
};

let ranking_list = {
  status: 200,
  message: 'success',
  data: {
    total: 10,
    'rows|10': [{
      checked:false,
      status:1,
      photoUrl: "./static/5.jpg",
      articleTitle: "乌克兰体操公主的拳击训练，吃我这一小拳拳！",
      articleDetails: "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
      author:'@cname',
      like:100,
      collect:100,
      good:40,
      play_times:100000
    }]
  }
};

let follow_list = {
  status: 200,
  message: 'success',
  data: {
    total: 10,
    'rows|10': [{
      photoUrl: "./static/avatar.png",
      nickName: '@cname',
    }]
  }
};

let collect_list = {
  status: 200,
  message: 'success',
  data: {
    total: 10,
    'rows|10': [{
      photoUrl: "./static/5.jpg",
      articleTitle: "乌克兰体操公主的拳击训练，吃我这一小拳拳！",
      articleDetails: "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
      author:'@cname',
      like:100,
      collect:100,
      good:40,
      play_times:100000
    }]
  }
};
export default {
  'get|/list/UserLists': ranking_list,
  'get|/ranking_list': ranking_list,
  'post|/follow/followlist': follow_list,
  'post|/collect/queryal': collect_list,
  'get|/user/queryuser': user
}
