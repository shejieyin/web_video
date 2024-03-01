let recommend_list = {
  status: 200,
  message: 'success',
  data: {
    total: 5,
    'rows': [{
      id: '@guid',
      image: './static/1.jpg',
      name: '@name'
    },{
      id: '@guid',
      image: './static/2.jpg',
      name: '@name'
    },{
      id: '@guid',
      image: './static/3.jpg',
      name: '@name'
    },{
      id: '@guid',
      image: './static/4.jpg',
      name: '@name'
    },{
      id: '@guid',
      image: './static/5.jpg',
      name: '@name'
    }]
  }
};

export default {
  'get|/video/recommend': recommend_list,
}
