const { Tweet, User, sequelize } = require('../models')
const tweetController = {
  getTweets: async (req, res, next) => {
    try {
      const tweets = await Tweet.findAll({
        include: {
          model: User, attributes: ['id', 'name', 'account', 'avatar']
        },
        attributes: ['id', 'description', 'createdAt',
          [sequelize.literal('(SELECT COUNT(*) FROM Replies WHERE Replies.TweetId = Tweet.id)'), 'replyCount'],
          [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.TweetId = Tweet.id)'), 'likeCount']
        ],
        order: [['createdAt', 'DESC']],
        nest: true,
        raw: true
      })
      return res.status(200).json(tweets)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = tweetController
