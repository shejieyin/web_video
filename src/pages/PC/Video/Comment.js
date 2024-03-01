class Message {
  constructor(id, nickName, replyData) {
    this.id = id,
      this.nickName = nickName,
      this.replyData = replyData,
      this.good = 0,
      this.bad = 0,
      this.showTextarea = false,
      this.timestamp=new Date().getTime()
  }
}

export class Comment extends Message {
  constructor(id, nickName, replyData) {
    super(id, nickName, replyData)
    this.replyList = [];
  }
  addReply(reply) {
    this.replyList.push(reply)
  }
  removeReply(index) {
    this.replyList.split(index, 1)
  }
}
export class Reply extends Message {
  constructor(id, nickName, replyData, toUser) {
    super(id, nickName, replyData)
    this.toUser = toUser;
  }
}
